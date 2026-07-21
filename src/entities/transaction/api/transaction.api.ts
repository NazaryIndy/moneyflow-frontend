import { api } from '@/shared/api';
import type {
  CreateTransactionDto,
  Transaction,
} from '@/entities/transaction/model/transaction.types.ts';

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get('/transactions');

  return response.data;
}

export async function createTransaction(data: CreateTransactionDto) {
  const response = await api.post('/transactions', data);

  return response.data;
}

export async function updateTransaction(data: Transaction) {
  const response = await api.put(`/transactions/${data.id}`, data);

  return response.data;
}

export async function deleteTransaction(id: string) {
  const response = await api.delete(`/transactions/${id}`);

  return response.data;
}
