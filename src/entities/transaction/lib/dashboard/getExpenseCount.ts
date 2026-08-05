import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getExpenseCount = (transactions: Transaction[]): number => {
  return transactions.filter((transaction) => transaction.type === 'expense').length;
};
