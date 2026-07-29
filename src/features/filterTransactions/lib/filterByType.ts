import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { TransactionTypeFilter } from '@/features/filterTransactions/model/transactionFilters.types.ts';

export const filterByType = (
  transactions: Transaction[],
  type: TransactionTypeFilter,
): Transaction[] => {
  if (type === 'all') return transactions;
  return transactions.filter((t) => t.type === type);
};
