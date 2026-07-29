import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getExpenseCount = (transactions: Transaction[]): number => {
  return transactions.filter((t) => t.type === 'expense').length;
};
