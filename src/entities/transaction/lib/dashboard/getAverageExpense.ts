import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getAverageExpense = (transactions: Transaction[]): number => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return 0;
  const total = expenses.reduce((sum, t) => sum + t.amount, 0);
  return Math.round(total / expenses.length);
};
