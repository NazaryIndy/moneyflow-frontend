import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export const getAverageExpense = (transactions: Transaction[]): number => {
  const expenses = transactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.EXPENSE,
  );
  if (expenses.length === 0) return 0;
  const total = expenses.reduce((sum, transaction) => sum + transaction.amount, 0);
  return Math.round(total / expenses.length);
};
