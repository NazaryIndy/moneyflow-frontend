import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getIncomeCount = (transactions: Transaction[]): number => {
  return transactions.filter((t) => t.type === 'income').length;
};
