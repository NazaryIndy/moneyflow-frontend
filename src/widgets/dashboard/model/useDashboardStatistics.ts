import { useMemo } from 'react';
import { useTransactionsData } from '@/entities/transaction';

import {
  calculateBalance,
  calculateIncomeAndExpense,
  getLargestExpense,
  getLargestExpenseCategory,
  getMonthOverMonthChange,
} from '@/entities/transaction/lib/calculations';
import {
  getAverageExpense,
  getRecentTransactions,
  getTotalTransactionCount,
  getExpenseCount,
  getIncomeCount,
  getMonthlyExpenses,
} from '@/entities/transaction/lib/dashboard';
import { getDaysPassedInMonth, getTotalDaysInMonth } from '@/shared/lib/utils.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

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
    const balance = calculateBalance(income, expense);
    const recent = getRecentTransactions(transactionsData, 5);

    const totalTransactions = getTotalTransactionCount(transactionsData);
    const incomeCount = getIncomeCount(transactionsData);
    const expenseCount = getExpenseCount(transactionsData);

    const averageExpense = getAverageExpense(transactionsData);
    const largestExpense = getLargestExpense(transactionsData, categoriesData);
    const largestExpenseCategory = getLargestExpenseCategory(transactionsData, categoriesData);

    const incomeChange = getMonthOverMonthChange(transactionsData, TRANSACTION_TYPE.INCOME);
    const expenseChange = getMonthOverMonthChange(transactionsData, TRANSACTION_TYPE.EXPENSE);

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const spentThisMonth = getMonthlyExpenses(transactionsData, currentMonth, currentYear);
    const daysPassed = getDaysPassedInMonth(now);
    const totalDays = getTotalDaysInMonth(currentYear, currentMonth);

    const averageDailySpending = daysPassed > 0 ? spentThisMonth / daysPassed : 0;
    const projectedMonthEndSpending = averageDailySpending * totalDays;

    return {
      statistics: {
        income,
        expense,
        balance,
      },
      incomeCount,
      expenseCount,
      recentTransactions: recent,
      totalTransactions,
      averageExpense,
      largestExpense,
      largestExpenseCategory,
      monthOverMonth: {
        incomeChange,
        expenseChange,
      },
      averageDailySpending,
      projectedMonthEndSpending,
    };
  }, [transactions, categories]);

  return {
    isLoading,
    isError,
    ...result,
  };
};
