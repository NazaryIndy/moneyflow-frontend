import { http, HttpResponse } from 'msw';
import { transactions } from '@/shared/mock/transactions.ts';

export const transactionHandlers = [
  http.get('api/transactions', () => {
    return HttpResponse.json(transactions);
  }),
];
