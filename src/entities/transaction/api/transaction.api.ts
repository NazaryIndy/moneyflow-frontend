import { api } from '@/shared/api';
import type { Transaction } from '@/entities/transaction/model/types.ts';

export async function getTransactions(): Promise<Transaction[]> {
  const response = await api.get('/transactions');
  console.log('response', response);
  return response.data;
}

export async function createTransaction() {
  const response = await api.get('/transactions');

  return response.data;
}

export async function deleteTransaction() {
  const response = await api.get('/transactions');

  return response.data;
}
