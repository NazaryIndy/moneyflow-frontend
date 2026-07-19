import type { Transaction } from '@/entities/transaction/model/types.ts';

export const calculateIncome = (transactions: Transaction[]) => {
  return transactions.reduce((acc, tr) => (tr.type === 'income' ? acc + tr.amount : acc), 0);
};

export const calculateExpense = (transactions: Transaction[]) => {
  return transactions.reduce((acc, tr) => (tr.type === 'expense' ? acc + tr.amount : acc), 0);
};

export const calculateBalance = (transactions: Transaction[]) => {
  const income = transactions.reduce(
    (acc, tr) => (tr.type === 'income' ? acc + tr.amount : acc),
    0,
  );
  const expense = transactions.reduce(
    (acc, tr) => (tr.type === 'income' ? acc + tr.amount : acc),
    0,
  );
  return income - expense;
};

export const recentTransactions = (transactions: Transaction[], transactionCount: number) => {
  const sorted = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sorted.slice(0, transactionCount);
};
