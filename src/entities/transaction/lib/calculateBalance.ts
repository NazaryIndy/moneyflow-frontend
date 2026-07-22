import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);
};
