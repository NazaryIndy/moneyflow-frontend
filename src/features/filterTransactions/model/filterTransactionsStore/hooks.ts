import type { FilterTransactionsStore } from '@/features/filterTransactions/model/filterTransactionsStore/types.ts';
import { useFilterTransactionsStore } from '@/features/filterTransactions/model/filterTransactionsStore/filterTransactionsStore.ts';
import {
  categorySelector,
  periodSelector,
  resetFiltersSelector,
  searchSelector,
  setCategory,
  setPeriodSelector,
  setSearchSelector,
  setSortBySelector,
  setTypeSelector,
  sortBySelector,
  typeSelector,
} from '@/features/filterTransactions/model/filterTransactionsStore/selectors.ts';

export const useSortBy = (): FilterTransactionsStore['sortBy'] =>
  useFilterTransactionsStore(sortBySelector);
export const useSearch = (): FilterTransactionsStore['search'] =>
  useFilterTransactionsStore(searchSelector);
export const useTypeFilter = (): FilterTransactionsStore['type'] =>
  useFilterTransactionsStore(typeSelector);
export const useCategoryFilter = (): FilterTransactionsStore['category'] =>
  useFilterTransactionsStore(categorySelector);
export const usePeriod = (): FilterTransactionsStore['period'] =>
  useFilterTransactionsStore(periodSelector);

export const useSetSortBy = (): FilterTransactionsStore['actions']['setSortBy'] =>
  useFilterTransactionsStore(setSortBySelector);
export const useSetCategory = (): FilterTransactionsStore['actions']['setCategoryFilter'] =>
  useFilterTransactionsStore(setCategory);
export const useSetType = (): FilterTransactionsStore['actions']['setTypeFilter'] =>
  useFilterTransactionsStore(setTypeSelector);
export const useSetPeriod = (): FilterTransactionsStore['actions']['setPeriod'] =>
  useFilterTransactionsStore(setPeriodSelector);
export const useSetSearch = (): FilterTransactionsStore['actions']['setSearch'] =>
  useFilterTransactionsStore(setSearchSelector);
export const useResetFilters = (): FilterTransactionsStore['actions']['resetFilters'] =>
  useFilterTransactionsStore(resetFiltersSelector);
