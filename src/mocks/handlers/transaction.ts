import { http, HttpResponse } from 'msw';
import { transactions } from '@/shared/mock/transactions.ts';
import type {
  CreateTransactionDto,
  Transaction,
} from '@/entities/transaction/model/transaction.types.ts';

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

  http.put('api/transactions/:id', async ({ request, params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id || typeof id !== 'string') {
      return HttpResponse.json({ error: 'Invalid transaction id' }, { status: 400 });
    }

    const data = (await request.json()) as Partial<Transaction>;

    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    const updatedTransaction = { ...transactions[index], ...data, id };
    transactions[index] = updatedTransaction;

    return HttpResponse.json(updatedTransaction, { status: 200 });
  }),

  http.delete('api/transactions/:id', async ({ params }) => {
    const { id } = params;

    const index = transactions.findIndex((t) => t.id === id);

    if (index === -1) {
      return HttpResponse.json({ error: 'Transaction not found' }, { status: 404 });
    }

    transactions.splice(index, 1);

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
