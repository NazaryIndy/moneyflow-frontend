import {
  useCategoryFilter,
  usePeriod,
  useResetFilters,
  useSearch,
  useSetCategory,
  useSetPeriod,
  useSetSearch,
  useSetSortBy,
  useSetType,
  useSortBy,
  useTypeFilter,
} from '@/features/filterTransactions/model/filterTransactionsStore/hooks.ts';

export const useTransactionFilters = () => {
  const search = useSearch();
  const typeFilter = useTypeFilter();
  const categoryFilter = useCategoryFilter();
  const period = usePeriod();
  const sortBy = useSortBy();

  const setSearch = useSetSearch();
  const setTypeFilter = useSetType();
  const setCategoryFilter = useSetCategory();
  const setPeriod = useSetPeriod();
  const setSortBy = useSetSortBy();
  const resetFilters = useResetFilters();

  return {
    search,
    typeFilter,
    categoryFilter,
    period,
    sortBy,

    setSearch,
    setTypeFilter,
    setCategoryFilter,
    setPeriod,
    setSortBy,
    resetFilters,
  };
};
