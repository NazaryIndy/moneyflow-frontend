import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getAverageExpense = (transactions: Transaction[]): number => {
  const expenses = transactions.filter((transaction) => transaction.type === 'expense');
  if (expenses.length === 0) return 0;
  const total = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
  return Math.round(total / expenses.length);
};
