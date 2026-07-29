import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getTotalTransactionCount = (transactions: Transaction[]): number => {
  return transactions.length;
};
