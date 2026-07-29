import { calculateIncomeAndExpense } from '@/entities/transaction/lib/calculations/calculateIncomeAndExpense.ts';
import { getRecentTransactions } from '@/entities/transaction/lib/getRecentTransactions.ts';
import { getTotalTransactionCount } from '@/entities/transaction/lib/getTotalTransactionCount';
import { getAverageExpense } from '@/entities/transaction/lib/getAverageExpense.ts';
import { useMemo } from 'react';
// TODO убрать импорты из feature ?
import { getLargestExpense } from '@/entities/transaction/lib/getLargestExpense.ts';
import { getLargestExpenseCategory } from '@/entities/transaction/lib/getLargestExpenseCategory.ts';

import { getMonthOverMonthChange } from '@/entities/transaction/lib/getMonthOverMonthChange.ts';
import { useTransactionsData } from '@/entities/transaction';

export const useDashboardStatistics = () => {
  const {
    transactions,
    categories,
    isErrorCategories,
    isLoadingCategories,
    isLoadingTransactions,
    isErrorTransactions,
  } = useTransactionsData();

  const isLoading = isLoadingTransactions || isLoadingCategories;
  const isError = isErrorTransactions || isErrorCategories;

  const result = useMemo(() => {
    const transactionsData = transactions ?? [];
    const categoriesData = categories ?? [];

    const { income, expense } = calculateIncomeAndExpense(transactionsData);
    const balance = income - expense;
    const recent = getRecentTransactions(transactionsData, 5);

    const totalTransactions = getTotalTransactionCount(transactionsData);
    const averageExpense = getAverageExpense(transactionsData);
    const largestExpense = getLargestExpense(transactionsData, categoriesData);
    const largestExpenseCategory = getLargestExpenseCategory(transactionsData, categoriesData);

    const incomeChange = getMonthOverMonthChange(transactionsData, 'income');
    const expenseChange = getMonthOverMonthChange(transactionsData, 'expense');

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
  }, [transactions, categories]);

  return {
    isLoading,
    isError,
    ...result,
  };
};
