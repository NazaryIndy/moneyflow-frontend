import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import type { TimePeriod } from '@/shared/types';
import type { FilterOption } from '@/shared/ui/FilterSelect/FilterSelect.types.ts';

export type TransactionTypeFilter = TransactionType | 'all';
export type TransactionSortBy = 'newest' | 'oldest' | 'highest' | 'lowest';
export type TransactionFilters = {
  search?: string;
  type: TransactionTypeFilter;
  category: CategoryFilter;
  sort?: TransactionSortBy;
  period?: TimePeriod;
};

export type CategoryFilter = string | 'all';

export const TRANSACTION_TYPE_OPTIONS: FilterOption[] = [
  { value: 'all', label: 'All' },
  { value: 'income', label: 'Income' },
  { value: 'expense', label: 'Expense' },
];

export const TRANSACTION_SORT_OPTIONS: FilterOption[] = [
  { value: 'newest', label: 'Newest first' },
  { value: 'oldest', label: 'Oldest first' },
  { value: 'highest', label: 'Highest amount' },
  { value: 'lowest', label: 'Lowest amount' },
];
