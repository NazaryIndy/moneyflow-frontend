import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export const getIncomeCount = (transactions: Transaction[]): number => {
  return transactions.filter((transaction) => transaction.type === TRANSACTION_TYPE.INCOME).length;
};
