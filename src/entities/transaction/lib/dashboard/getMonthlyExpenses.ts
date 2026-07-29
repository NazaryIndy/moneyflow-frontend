import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const getMonthlyExpenses = (
  transactions: Transaction[],
  month: number,
  year: number,
): number => {
  return transactions
    .filter((t) => {
      if (t.type !== 'expense') return false;
      const date = new Date(t.date);
      return date.getMonth() === month && date.getFullYear() === year;
    })
    .reduce((sum, t) => sum + t.amount, 0);
};
