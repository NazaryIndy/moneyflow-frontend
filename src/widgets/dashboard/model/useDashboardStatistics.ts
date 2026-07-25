import { calculateIncomeAndExpense } from '@/entities/transaction/lib/calculateIncomeAndExpense.ts';
import { getRecentTransactions } from '@/entities/transaction/lib/getRecentTransactions.ts';
import { useTransactions } from '@/entities/transaction/api';
import { getTotalTransactionCount } from '@/entities/transaction/lib/getTotalTransactionCount';
import { getAverageExpense } from '@/entities/transaction/lib/getAverageExpense.ts';
import { useCategories } from '@/entities/category/api';
import { useMemo } from 'react';
import { getLargestExpense } from '@/features/analytics/lib/getLargestExpense.ts';
import { getLargestExpenseCategory } from '@/features/analytics/lib/getLargestExpenseCategory.ts';
import { getMonthOverMonthChange } from '@/entities/transaction/lib/getMonthOverMonthChange.ts';

export const useDashboardStatistics = () => {
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
    const recent = getRecentTransactions(transactions, 5);

    const totalTransactions = getTotalTransactionCount(transactions);
    const averageExpense = getAverageExpense(transactions);
    const largestExpense = getLargestExpense(transactions, categories);
    const largestExpenseCategory = getLargestExpenseCategory(transactions, categories);

    const incomeChange = getMonthOverMonthChange(transactions, 'income');
    const expenseChange = getMonthOverMonthChange(transactions, 'expense');

    return {
      statistics: {
        income,
        expense,
        balance,
      },
      recentTransactions: recent,
      totalTransactions,
      averageExpense,
      largestExpense,
      largestExpenseCategory,
      monthOverMonth: {
        incomeChange,
        expenseChange,
      },
    };
  }, [transactionsData, categoriesData]);

  return {
    isLoading,
    isError,
    ...result,
  };
};
