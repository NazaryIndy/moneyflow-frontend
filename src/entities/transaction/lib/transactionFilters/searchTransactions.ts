import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const searchTransactions = (
  transactions: Transaction[],
  searchTerm: string,
): Transaction[] => {
  if (!searchTerm.trim()) return transactions;
  const lower = searchTerm.toLowerCase().trim();
  return transactions.filter((t) => t.title.toLowerCase().includes(lower));
};
