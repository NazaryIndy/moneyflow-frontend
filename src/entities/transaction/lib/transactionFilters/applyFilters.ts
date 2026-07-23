import type {
  Transaction,
  TransactionFilters,
} from '@/entities/transaction/model/transaction.types.ts';
import { searchTransactions } from '@/entities/transaction/lib/transactionFilters/searchTransactions.ts';
import { filterByType } from '@/entities/transaction/lib/transactionFilters/filterByType.ts';
import { filterByCategory } from '@/entities/transaction/lib/transactionFilters/filterByCategory.ts';
import { sortTransactions } from '@/entities/transaction/lib/transactionFilters/sortTransactions.ts';

export const applyFilters = (
  transactions: Transaction[],
  filters: TransactionFilters,
): Transaction[] => {
  const filtered = searchTransactions(transactions, filters.search);
  const typeFiltered = filterByType(filtered, filters.type);
  const categoryFiltered = filterByCategory(typeFiltered, filters.category);
  return sortTransactions(categoryFiltered, filters.sort);
};
