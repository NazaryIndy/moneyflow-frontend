import { calculateIncomeAndExpense } from '@/entities/transaction/lib/calculateIncomeAndExpense.ts';
import { getRecentTransactions } from '@/entities/transaction/lib/getRecentTransactions.ts';
import { useTransactions } from '@/entities/transaction/api';

export const useDashboardStatistics = () => {
  const { data, isLoading, isError } = useTransactions();

  const transactions = data ?? [];

  const { income, expense } = calculateIncomeAndExpense(transactions);

  const balance = income - expense;

  const recent = getRecentTransactions(transactions, 5);

  return {
    statistics: {
      income,
      expense,
      balance,
    },
    recentTransactions: recent,
    isLoading,
    isError,
  };
};
