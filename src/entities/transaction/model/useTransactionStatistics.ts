import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { calculateIncomeAndExpense } from '@/entities/transaction/lib/calculateIncomeAndExpense.ts';
import { getRecentTransactions } from '@/entities/transaction/lib/getRecentTransactions.ts';

export const useTransactionStatistics = (
  transactions: Transaction[],
  transactionCount: number = 5,
) => {
  const { income, expense } = calculateIncomeAndExpense(transactions);

  const balance = income - expense;
  const recent = getRecentTransactions(transactions, transactionCount);

  return { income, expense, balance, recent };
};
