import { calculateIncomeAndExpense } from '@/entities/transaction/lib/calculations/calculateIncomeAndExpense.ts';
import { useMemo } from 'react';
import { calculateCategoryExpenses } from '@/entities/transaction/lib/calculations/calculateCategoryExpenses.ts';
import { calculateMonthlyStatistics } from '@/entities/transaction/lib/calculateMonthlyStatistics.ts';
import { calculateTopCategories } from '@/entities/transaction/lib/calculateTopCategories.ts';
import type { UseAnalyticsOptions } from '@/widgets/analytics/model/analytics.types.ts';
import { useTransactionsData } from '@/entities/transaction';

export const useAnalytics = (options: UseAnalyticsOptions = {}) => {
  const { topCategoriesLimit = 5, transactions: externalTransactions } = options;

  const {
    transactions: globalTransactions,
    categories,
    isLoadingCategories,
    isLoadingTransactions,
    isErrorCategories,
    isErrorTransactions,
  } = useTransactionsData();

  const transactions = externalTransactions ?? globalTransactions;

  const isLoading = isLoadingTransactions || isLoadingCategories;
  const isError = isErrorTransactions || isErrorCategories;

  const result = useMemo(() => {
    const transactionsData = transactions ?? [];
    const categoriesData = categories ?? [];

    const { income, expense } = calculateIncomeAndExpense(transactionsData);
    const balance = income - expense;

    const categoryExpenses = calculateCategoryExpenses(transactionsData, categoriesData);

    const monthlyStats = calculateMonthlyStatistics(transactionsData);

    const topCategories = calculateTopCategories(
      transactionsData,
      categoriesData,
      topCategoriesLimit,
    );

    return {
      summary: { income, expense, balance },
      categoryExpenses,
      monthlyStats,
      topCategories,
    };
  }, [transactions, categories, topCategoriesLimit]);

  return {
    isLoading,
    isError,
    ...result,
  };
};
