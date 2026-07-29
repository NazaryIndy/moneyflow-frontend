import { http, HttpResponse } from 'msw';

import { budgets } from '@/shared/mock/budget.ts';
import type { CreateMonthBudgetDto, MonthBudget } from '@/entities/budget/model/budget.types.ts';

export const budgetHandlers = [
  http.get('api/budgets', () => {
    return HttpResponse.json(budgets);
  }),

  http.post('api/budgets', async ({ request }) => {
    const data = (await request.json()) as CreateMonthBudgetDto;

    const newBudget = {
      id: crypto.randomUUID(),
      ...data,
    };

    budgets.push(newBudget);

    return HttpResponse.json(newBudget, {
      status: 201,
    });
  }),

  http.put('api/budgets/:id', async ({ request, params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id || typeof id !== 'string') {
      return HttpResponse.json({ error: 'Invalid budgets id' }, { status: 400 });
    }

    const data = (await request.json()) as Partial<MonthBudget>;

    const index = budgets.findIndex((t) => t.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Budget for this month not found' }, { status: 404 });
    }

    const updatedBudget = { ...budgets[index], ...data, id };
    budgets[index] = updatedBudget;

    return HttpResponse.json(updatedBudget, { status: 200 });
  }),
];
