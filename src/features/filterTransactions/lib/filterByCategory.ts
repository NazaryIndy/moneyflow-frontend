import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { CategoryFilter } from '@/features/filterTransactions/model/filterTransactions.types.ts';

export const filterByCategory = (
  transactions: Transaction[],
  categoryId: CategoryFilter,
): Transaction[] => {
  if (categoryId === 'all') return transactions;
  return transactions.filter((transaction) => transaction.categoryId === categoryId);
};
