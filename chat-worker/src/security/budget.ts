import { DurableObject } from 'cloudflare:workers';

type BudgetState = {
	day: string;
	count: number;
};

export class DailyBudget extends DurableObject<Env> {
	async consume(limit: number): Promise<boolean> {
		const today = new Date().toISOString().slice(0, 10);
		const state = await this.ctx.storage.get<BudgetState>('state');
		const count = state?.day === today ? state.count : 0;

		if (count >= limit) {
			return false;
		}

		await this.ctx.storage.put('state', { day: today, count: count + 1 });

		return true;
	}
}
