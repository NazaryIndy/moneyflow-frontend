import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export { calculateStatistics, calculateBalance };

const calculateStatistics = (transactions: Transaction[], transactionCount: number = 5) => {
  const { income, expense } = calculateIncomeAndExpense(transactions);

  const balance = income - expense;
  const recent = getRecentTransactions(transactions, transactionCount);

  return { income, expense, balance, recent };
};

const getRecentTransactions = (transactions: Transaction[], transactionCount: number) => {
  const sorted = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sorted.slice(0, transactionCount);
};

const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);
};

const calculateIncomeAndExpense = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, tr) => {
      if (tr.type === 'income') acc.income += tr.amount;
      else if (tr.type === 'expense') acc.expense += tr.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
};
