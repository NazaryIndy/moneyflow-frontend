import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export const getMonthlyExpenses = (
  transactions: Transaction[],
  month: number,
  year: number,
): number => {
  return transactions
    .filter((transaction) => {
      if (transaction.type !== TRANSACTION_TYPE.EXPENSE) return false;
      const date = new Date(transaction.date);
      return date.getMonth() === month && date.getFullYear() === year;
    })
    .reduce((sum, transaction) => sum + transaction.amount, 0);
};
