import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const filterByCategory = (
  transactions: Transaction[],
  categoryId: string | 'all',
): Transaction[] => {
  if (categoryId === 'all') return transactions;
  return transactions.filter((t) => t.categoryId === categoryId);
};
