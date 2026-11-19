import { z } from 'zod';

import { MAX_MESSAGE_CHARS, MAX_MESSAGES } from './config';

const MessageSchema = z.object({
	role: z.enum(['user', 'assistant']),
	content: z.string().trim().min(1).max(MAX_MESSAGE_CHARS),
});

export const ChatRequestSchema = z
	.object({
		messages: z.array(MessageSchema).min(1).max(MAX_MESSAGES),
	})
	.refine((body) => body.messages.at(-1)?.role === 'user', {
		error: 'Last message must be from the user',
	});

export type ChatRequest = z.infer<typeof ChatRequestSchema>;

export const SessionRequestSchema = z.object({
	token: z.string().min(1).max(2048),
});
