import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { TransactionSortBy } from '@/features/filterTransactions/model/transactionFilters.types.ts';

export const sortTransactions = (
  transactions: Transaction[],
  sortBy: TransactionSortBy,
): Transaction[] => {
  const sorted = [...transactions];
  switch (sortBy) {
    case 'newest':
      sorted.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      break;
    case 'oldest':
      sorted.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      break;
    case 'highest':
      sorted.sort((a, b) => b.amount - a.amount);
      break;
    case 'lowest':
      sorted.sort((a, b) => a.amount - b.amount);
      break;
    default:
      break;
  }
  return sorted;
};
