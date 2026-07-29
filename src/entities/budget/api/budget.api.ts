import { api } from '@/shared/api';
import type { CreateMonthBudgetDto, MonthBudget } from '@/entities/budget/model/budget.types.ts';

export async function getBudget(): Promise<MonthBudget[]> {
  const response = await api.get('/budgets');

  return response.data;
}

export async function createBudget(data: CreateMonthBudgetDto) {
  const response = await api.post('/budgets', data);

  return response.data;
}

export async function updateBudget(data: MonthBudget) {
  const response = await api.put(`/budgets/${data.id}`, data);

  return response.data;
}
