import { api } from '@/shared/api';
import type {
  Transaction,
  TransactionDTO,
} from '@/entities/transaction/model/transaction.types.ts';

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get('/transactions');

  return response.data;
}

export async function createTransaction(data: TransactionDTO) {
  const response = await api.post('/transactions', data);

  return response.data;
}

export async function deleteTransaction(id: string) {
  const response = await api.delete(`/transactions/${id}`);

  return response.data;
}
