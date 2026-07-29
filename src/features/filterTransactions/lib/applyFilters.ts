import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { searchTransactions } from '@/features/filterTransactions/lib/searchTransactions.ts';
import { filterByType } from '@/features/filterTransactions/lib/filterByType.ts';
import { filterByCategory } from '@/features/filterTransactions/lib/filterByCategory.ts';
import { sortTransactions } from '@/features/filterTransactions/lib/sortTransactions.ts';
import type { TransactionFilters } from '@/features/filterTransactions/model/filterTransactions.types.ts';
import { filterTransactionsByPeriod } from '@/entities/transaction/lib/analytics/filterTransactionsByPeriod.ts';

export const applyFilters = (
  transactions: Transaction[],
  filters: TransactionFilters,
): Transaction[] => {
  let result = transactions;

  if (filters.period) {
    result = filterTransactionsByPeriod(result, filters.period);
  }

  if (filters.search) {
    result = searchTransactions(result, filters.search);
  }

  result = filterByType(result, filters.type);
  result = filterByCategory(result, filters.category);

  if (filters.sort) {
    result = sortTransactions(result, filters.sort);
  }

  return result;
};
