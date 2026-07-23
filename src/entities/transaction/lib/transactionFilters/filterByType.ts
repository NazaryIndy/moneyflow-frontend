import type {
  Transaction,
  TransactionTypeFilter,
} from '@/entities/transaction/model/transaction.types.ts';

export const filterByType = (
  transactions: Transaction[],
  type: TransactionTypeFilter,
): Transaction[] => {
  if (type === 'all') return transactions;
  return transactions.filter((t) => t.type === type);
};
