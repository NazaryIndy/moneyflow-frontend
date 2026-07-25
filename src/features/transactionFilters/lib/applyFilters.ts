import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { searchTransactions } from '@/features/transactionFilters/lib/searchTransactions.ts';
import { filterByType } from '@/features/transactionFilters/lib/filterByType.ts';
import { filterByCategory } from '@/features/transactionFilters/lib/filterByCategory.ts';
import { sortTransactions } from '@/features/transactionFilters/lib/sortTransactions.ts';
import type { TransactionFilters } from '@/features/transactionFilters/model/transactionFilters.types.ts';

export const applyFilters = (
  transactions: Transaction[],
  filters: TransactionFilters,
): Transaction[] => {
  const filtered = searchTransactions(transactions, filters.search);
  const typeFiltered = filterByType(filtered, filters.type);
  const categoryFiltered = filterByCategory(typeFiltered, filters.category);
  return sortTransactions(categoryFiltered, filters.sort);
};
