import { calculateIncomeAndExpense } from '@/entities/transaction/lib/calculateIncomeAndExpense.ts';
import { useTransactions } from '@/entities/transaction/api';
import { useCategories } from '@/entities/category/api';
import { useMemo } from 'react';
import { calculateCategoryExpenses } from '@/features/analytics/lib/calculateCategoryExpenses.ts';
import { calculateMonthlyStatistics } from '@/features/analytics/lib/calculateMonthlyStatistics.ts';
import { calculateTopCategories } from '@/features/analytics/lib/calculateTopCategories.ts';
import type { UseAnalyticsOptions } from '@/features/analytics/model/analytics.types.ts';

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const { topCategoriesLimit = 5 } = options;

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

  const isLoading = isLoadingTransactions || isLoadingCategories;
  const isError = isErrorTransactions || isErrorCategories;

  const result = useMemo(() => {
    const transactions = transactionsData ?? [];
    const categories = categoriesData ?? [];

    const { income, expense } = calculateIncomeAndExpense(transactions);
    const balance = income - expense;

    const categoryExpenses = calculateCategoryExpenses(transactions, categories);

    const monthlyStats = calculateMonthlyStatistics(transactions);

    const topCategories = calculateTopCategories(transactions, categories, topCategoriesLimit);

    return {
      summary: { income, expense, balance },
      categoryExpenses,
      monthlyStats,
      topCategories,
    };
  }, [transactionsData, categoriesData, topCategoriesLimit]);

  return {
    isLoading,
    isError,
    ...result,
  };
};
