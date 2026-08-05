import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const calculateIncomeAndExpense = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'income') acc.income += transaction.amount;
      else if (transaction.type === 'expense') acc.expense += transaction.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
};
