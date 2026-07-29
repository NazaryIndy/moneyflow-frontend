export type TransactionTypeFilter = 'all' | 'income' | 'expense';
export type TransactionSortBy = 'newest' | 'oldest' | 'highest' | 'lowest';
export type TransactionFilters = {
  search: string;
  type: TransactionTypeFilter;
  category: string | 'all';
  sort: TransactionSortBy;
};
