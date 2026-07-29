import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const calculateIncomeAndExpense = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, tr) => {
      if (tr.type === 'income') acc.income += tr.amount;
      else if (tr.type === 'expense') acc.expense += tr.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
};
