import { useTransactions } from '@/entities/transaction/api/useTransactions.ts';
import { useCategories } from '@/entities/category';

export const useTransactionsData = () => {
  const {
    data: transactionsData,
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useTransactions();
  const {
    data: categoriesData,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useCategories();
  return {
    transactions: transactionsData ?? [],
    categories: categoriesData ?? [],
    isLoadingTransactions,
    isErrorTransactions,
    isLoadingCategories,
    isErrorCategories,
  };
};
