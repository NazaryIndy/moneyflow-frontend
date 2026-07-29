import { create } from 'zustand';
import { devtools, type DevtoolsOptions, persist, type PersistOptions } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type {
  FilterTransactionsState,
  FilterTransactionsStore,
} from '@/features/filterTransactions/model/filterTransactionsStore/types.ts';

const devToolsOptions: DevtoolsOptions = {
  store: 'useFilterTransactionsStore',
  enabled: import.meta.env.DEV,
};

const persistOptions: PersistOptions<
  FilterTransactionsStore,
  Omit<FilterTransactionsStore, 'actions'>
> = {
  name: 'useFilterTransactionsStore',
  partialize: (state) => ({
    search: state.search,
    sortBy: state.sortBy,
    category: state.category,
    type: state.type,
    period: state.period,
  }),
  version: 1.0,
};

const defaultFilter: FilterTransactionsState = {
  search: '',
  type: 'all',
  category: 'all',
  sortBy: 'newest',
  period: '1m',
};

export const useFilterTransactionsStore = create<FilterTransactionsStore>()(
  persist(
    devtools(
      immer((set) => ({
        ...defaultFilter,
        actions: {
          setCategoryFilter: (category) => {
            set({ category }, false, { type: 'category', payload: category });
          },
          setPeriod: (period) => {
            set({ period }, false, { type: 'period', payload: period });
          },
          setSearch: (search) => {
            set({ search }, false, { type: 'search', payload: search });
          },
          setTypeFilter: (type) => {
            set({ type }, false, { type: 'type', payload: type });
          },
          setSortBy: (sortBy) => {
            set({ sortBy }, false, { type: 'sortBy', payload: sortBy });
          },
          resetFilters: () => {
            set({ search: '', type: 'all', category: 'all', sortBy: 'newest', period: '1m' });
          },
        },
      })),
      devToolsOptions,
    ),
    persistOptions,
  ),
);
