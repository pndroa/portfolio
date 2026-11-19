import type { MiddlewareHandler } from 'hono';

export function isAllowedOrigin(env: Env, origin: string | undefined): boolean {
	return origin !== undefined && env.ALLOWED_ORIGINS.split(',').includes(origin);
}

export const originGuard: MiddlewareHandler<{ Bindings: Env }> = async (c, next) => {
	if (!isAllowedOrigin(c.env, c.req.header('Origin'))) {
		return c.json({ error: 'forbidden' }, 403);
	}

	await next();
};
