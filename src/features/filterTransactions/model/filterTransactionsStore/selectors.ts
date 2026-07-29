import type { FilterTransactionsStore } from '@/features/filterTransactions/model/filterTransactionsStore/types.ts';

export const searchSelector = (state: FilterTransactionsStore) => state.search;
export const sortBySelector = (state: FilterTransactionsStore) => state.sortBy;
export const typeSelector = (state: FilterTransactionsStore) => state.type;
export const categorySelector = (state: FilterTransactionsStore) => state.category;
export const periodSelector = (state: FilterTransactionsStore) => state.period;

export const setSortBySelector = (state: FilterTransactionsStore) => {
  return state.actions.setSortBy;
};
export const setCategory = (state: FilterTransactionsStore) => {
  return state.actions.setCategoryFilter;
};
export const setTypeSelector = (state: FilterTransactionsStore) => {
  return state.actions.setTypeFilter;
};
export const setPeriodSelector = (state: FilterTransactionsStore) => {
  return state.actions.setPeriod;
};
export const setSearchSelector = (state: FilterTransactionsStore) => {
  return state.actions.setSearch;
};
