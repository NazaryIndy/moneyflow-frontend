import { useState } from 'react';
import type {
  TransactionSortBy,
  TransactionTypeFilter,
} from '@/entities/transaction/model/transaction.types.ts';

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
