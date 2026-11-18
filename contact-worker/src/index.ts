interface Env {
	TURNSTILE_SECRET: string;
	RESEND_API_KEY: string;
	ALLOWED_ORIGINS: string;
	CONTACT_TO: string;
	CONTACT_FROM: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (value: unknown, max: number) => (typeof value === 'string' && value.trim().length <= max ? value.trim() : '');

export default {
	async fetch(request, env): Promise<Response> {
		const origin = request.headers.get('Origin') ?? '';
		const allowed = env.ALLOWED_ORIGINS.split(',').map((value) => value.trim());
		const isAllowed = allowed.includes(origin);

		const cors: Record<string, string> = {
			'Access-Control-Allow-Methods': 'POST, OPTIONS',
			'Access-Control-Allow-Headers': 'Content-Type',
			'Access-Control-Max-Age': '86400',
			Vary: 'Origin',
			...(isAllowed ? { 'Access-Control-Allow-Origin': origin } : {}),
		};

		const json = (status: number, body: Record<string, unknown>) =>
			new Response(JSON.stringify(body), {
				status,
				headers: { ...cors, 'Content-Type': 'application/json' },
			});

		if (request.method === 'OPTIONS') {
			return new Response(null, { status: isAllowed ? 204 : 403, headers: cors });
		}
		if (request.method !== 'POST') return json(405, { success: false, error: 'method_not_allowed' });
		if (!isAllowed) return json(403, { success: false, error: 'forbidden_origin' });

		let payload: Record<string, unknown>;
		try {
			payload = await request.json();
		} catch {
			return json(400, { success: false, error: 'invalid_json' });
		}

		const name = text(payload.name, 100).replace(/[\r\n]+/g, ' ');
		const email = text(payload.email, 200);
		const message = text(payload.message, 5000);
		const token = text(payload.token, 4096);

		if (!name || !message || !token || !EMAIL_PATTERN.test(email)) {
			return json(422, { success: false, error: 'invalid_input' });
		}

		const verification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
			method: 'POST',
			body: new URLSearchParams({
				secret: env.TURNSTILE_SECRET,
				response: token,
				remoteip: request.headers.get('CF-Connecting-IP') ?? '',
			}),
		});
		const outcome = (await verification.json()) as { success: boolean };
		if (!outcome.success) return json(403, { success: false, error: 'captcha_failed' });

		const sent = await fetch('https://api.resend.com/emails', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${env.RESEND_API_KEY}`,
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				from: env.CONTACT_FROM,
				to: [env.CONTACT_TO],
				reply_to: email,
				subject: `Portfolio-Kontakt: ${name}`,
				text: `Name: ${name}\nE-Mail: ${email}\n\n${message}`,
			}),
		});

		if (!sent.ok) return json(502, { success: false, error: 'send_failed' });
		return json(200, { success: true });
	},
} satisfies ExportedHandler<Env>;
