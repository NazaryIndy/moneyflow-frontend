import { http, HttpResponse } from 'msw';
import { transactions } from '@/shared/mock/transactions.ts';
import type { CreateTransactionDto } from '@/entities/transaction/model/transaction.types.ts';

export const transactionHandlers = [
  http.get('api/transactions', () => {
    return HttpResponse.json(transactions);
  }),

  http.post('api/transactions', async ({ request }) => {
    const data = (await request.json()) as CreateTransactionDto;

    const newTransaction = {
      id: crypto.randomUUID(),
      ...data,
    };

    transactions.push(newTransaction);

    return HttpResponse.json(newTransaction, {
      status: 201,
    });
  }),
];
