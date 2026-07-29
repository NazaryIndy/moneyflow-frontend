import type { BudgetStatistics, MonthBudget } from '@/entities/budget/model/budget.types.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const calculateBudgetStatistics = (
  budget: MonthBudget,
  transactions: Transaction[],
): BudgetStatistics => {
  let spent = 0;
  for (const transaction of transactions) {
    if (transaction.type !== 'expense') continue;
    const transactionDate = new Date(transaction.date);
    if (
      transactionDate.getMonth() === budget.month &&
      transactionDate.getFullYear() === budget.year
    ) {
      spent += transaction.amount;
    }
  }

  const budgetAmount = budget.amount;
  const remaining = budgetAmount - spent;
  const percentage = budgetAmount > 0 ? (spent / budgetAmount) * 100 : 0;
  const isOverBudget = percentage > 100;

  return { spent, remaining, percentage, isOverBudget };
};
