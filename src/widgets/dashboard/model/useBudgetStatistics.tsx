import { useMemo } from 'react';
import { useBudget } from '@/entities/budget/api/useBudget.ts';
import { useTransactionsData } from '@/entities/transaction';
import type { BudgetStatistics, MonthBudget } from '@/entities/budget/model/budget.types';
import { calculateBudgetStatistics } from '@/entities/budget/lib/calculateBudgetStatistics.ts';

export interface CurrentMonthBudget extends BudgetStatistics {
  budget: MonthBudget;
}

export const useBudgetStatistics = (): CurrentMonthBudget | null => {
  const { transactions } = useTransactionsData();
  const { data: budgets } = useBudget();

  return useMemo(() => {
    if (!transactions || !budgets) return null;

    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthBudget = budgets.find(
      (budget) => budget.month === currentMonth && budget.year === currentYear,
    );

    if (!monthBudget) return null;

    const stats = calculateBudgetStatistics(monthBudget, transactions);

    return {
      budget: monthBudget,
      ...stats,
    };
  }, [transactions, budgets]);
};
