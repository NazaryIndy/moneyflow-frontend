import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getRecentTransactions = (transactions: Transaction[], transactionCount: number) => {
  const sorted = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sorted.slice(0, transactionCount);
};
