import { sign } from 'hono/jwt';
import { SESSION_TTL_SECONDS } from '../config';

export type SessionPayload = {
	sid: string;
	iat: number;
	exp: number;
};

export async function createSession(secret: string): Promise<string> {
	const now = Math.floor(Date.now() / 1000);

	return sign({ sid: crypto.randomUUID(), iat: now, exp: now + SESSION_TTL_SECONDS }, secret, 'HS256');
}
