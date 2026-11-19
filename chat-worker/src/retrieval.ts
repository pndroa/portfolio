import { EMBED_MODEL, TOP_K } from './config';

export type Chunk = {
	id: string;
	score: number;
	text: string;
};

export async function retrieve(env: Env, question: string): Promise<Chunk[]> {
	const output = await env.AI.run(EMBED_MODEL, { text: [question] });
	const vector = 'data' in output ? output.data?.[0] : undefined;

	if (!vector) {
		throw new Error('Embedding returned no vector');
	}

	const result = await env.VECTORIZE.query(vector, {
		topK: TOP_K,
		returnMetadata: 'all',
	});

	return result.matches.map((match) => ({
		id: match.id,
		score: match.score,
		text: String(match.metadata?.text ?? ''),
	}));
}
