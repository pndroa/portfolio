const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

type SiteverifyResult = {
	success: boolean;
};

export async function verifyTurnstile(secret: string, token: string, ip: string): Promise<boolean> {
	const response = await fetch(SITEVERIFY_URL, {
		method: 'POST',
		body: new URLSearchParams({ secret, response: token, remoteip: ip }),
	});

	if (!response.ok) {
		return false;
	}

	const result = await response.json<SiteverifyResult>();

	return result.success;
}
