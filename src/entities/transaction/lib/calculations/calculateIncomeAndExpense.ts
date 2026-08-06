import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export const calculateIncomeAndExpense = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === TRANSACTION_TYPE.INCOME) acc.income += transaction.amount;
      else if (transaction.type === TRANSACTION_TYPE.EXPENSE) acc.expense += transaction.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
};
