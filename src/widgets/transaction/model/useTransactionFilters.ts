import { useState } from 'react';
import type {
  TransactionSortBy,
  TransactionTypeFilter,
} from '@/features/filterTransactions/model/transactionFilters.types.ts';

export const useTransactionFilters = () => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<TransactionTypeFilter>('all');
  const [sortBy, setSortBy] = useState<TransactionSortBy>('newest');
  const [categoryFilter, setCategoryFilter] = useState<string | 'all'>('all');

  const resetFilters = () => {
    setSearch('');
    setTypeFilter('all');
    setCategoryFilter('all');
    setSortBy('newest');
  };

  return {
    search,
    setSearch,
    typeFilter,
    setTypeFilter,
    sortBy,
    setSortBy,
    categoryFilter,
    setCategoryFilter,
    resetFilters,
  };
};
