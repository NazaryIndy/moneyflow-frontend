import type {
  CategoryFilter,
  TimePeriod,
  TransactionSortBy,
  TransactionTypeFilter,
} from '@/features/filterTransactions/model/filterTransactions.types.ts';

export interface FilterTransactionsState {
  period: TimePeriod;
  type: TransactionTypeFilter;
  category: CategoryFilter;
  search: string;
  sortBy: TransactionSortBy;
}

export interface FilterTransactionsActions {
  setPeriod: (period: TimePeriod) => void;
  setTypeFilter: (type: TransactionTypeFilter) => void;
  setCategoryFilter: (category: CategoryFilter) => void;
  setSearch: (search: string) => void;
  setSortBy: (sortBy: TransactionSortBy) => void;
  resetFilters: () => void;
}

export interface FilterTransactionsStore extends FilterTransactionsState {
  actions: FilterTransactionsActions;
}
