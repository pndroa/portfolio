import Anthropic from '@anthropic-ai/sdk';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { HTTPException } from 'hono/http-exception';
import { jwt, type JwtVariables } from 'hono/jwt';
import { streamSSE } from 'hono/streaming';

import { streamAnswer } from './llm';

import { CHAT_DAILY_LIMIT, SESSION_TTL_SECONDS } from './config';
import { retrieve } from './retrieval';
import { ChatRequestSchema, SessionRequestSchema } from './schemas';
import { isAllowedOrigin, originGuard } from './security/origin';
import { createSession, type SessionPayload } from './security/session';
import { verifyTurnstile } from './security/turnstile';

export { DailyBudget } from './security/budget';

type AppEnv = {
	Bindings: Env;
	Variables: JwtVariables<SessionPayload>;
};

const app = new Hono<AppEnv>();

app.use('*', originGuard);

app.use(
	'*',
	cors({
		origin: (origin, c) => (isAllowedOrigin(c.env, origin) ? origin : null),
		allowMethods: ['POST', 'OPTIONS'],
		allowHeaders: ['Content-Type', 'Authorization'],
		maxAge: 600,
	}),
);

app.post('/session', async (c) => {
	const body = await c.req.json().catch(() => null);
	const parsed = SessionRequestSchema.safeParse(body);

	if (!parsed.success) {
		return c.json({ error: 'invalid_request' }, 400);
	}

	const ip = c.req.header('CF-Connecting-IP') ?? '';
	const human = await verifyTurnstile(c.env.TURNSTILE_SECRET, parsed.data.token, ip);

	if (!human) {
		return c.json({ error: 'turnstile_failed' }, 403);
	}

	const session = await createSession(c.env.SESSION_SECRET);
	return c.json({ session, expiresIn: SESSION_TTL_SECONDS });
});

app.use('/chat', (c, next) => jwt({ secret: c.env.SESSION_SECRET, alg: 'HS256' })(c, next));

app.post('/chat', async (c) => {
	const { sid } = c.get('jwtPayload');
	const { success } = await c.env.CHAT_LIMITER.limit({ key: `session:${sid}` });

	if (!success) {
		return c.json({ error: 'rate_limited' }, 429);
	}

	const body = await c.req.json().catch(() => null);
	const parsed = ChatRequestSchema.safeParse(body);

	if (!parsed.success) {
		return c.json({ error: 'invalid_request' }, 400);
	}

	const withinBudget = await c.env.BUDGET.getByName('global').consume(CHAT_DAILY_LIMIT);

	if (!withinBudget) {
		return c.json({ error: 'daily_limit_reached' }, 429);
	}

	const question = parsed.data.messages.at(-1)!.content;
	const chunks = await retrieve(c.env, question);
	const answer = streamAnswer(c.env, parsed.data.messages, chunks);

	return streamSSE(c, async (stream) => {
		stream.onAbort(() => answer.abort());

		try {
			for await (const event of answer) {
				if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
					await stream.writeSSE({ event: 'delta', data: JSON.stringify({ text: event.delta.text }) });
				}
			}

			const message = await answer.finalMessage();

			console.log(JSON.stringify({ stopReason: message.stop_reason, usage: message.usage }));

			await stream.writeSSE({ event: 'done', data: JSON.stringify({ stopReason: message.stop_reason }) });
		} catch (err) {
			if (stream.aborted) {
				return;
			}

			if (err instanceof Anthropic.APIError) {
				console.error('Anthropic error', err.status, err.message);
			} else {
				console.error();
			}

			await stream.writeSSE({ event: 'error', data: JSON.stringify({ error: 'llm_error' }) });
		}
	});
});

app.notFound((c) => c.json({ error: 'not_found' }, 404));

app.onError((err, c) => {
	if (err instanceof HTTPException) {
		return err.getResponse();
	}
	console.error(err);
	return c.json({ error: 'internal_error' }, 500);
});

export default app;
