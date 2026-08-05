import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { describe, expect, it } from 'vitest';
import { getIncomeCount } from '@/entities/transaction/lib/dashboard/getIncomeCount.ts';

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2026-06-01',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 5000,
  },
  {
    id: '2',
    date: '2026-06-02',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 1000,
  },
  {
    id: '3',
    date: '2026-06-03',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 2000,
  },
];

describe('getIncomeCount', () => {
  it('returns the number of income transactions', () => {
    expect(getIncomeCount(transactions)).toBe(2);
  });

  it('returns zero for empty transactions', () => {
    expect(getIncomeCount([])).toBe(0);
  });

  it('does not count expense transactions', () => {
    const expenseTransactions = transactions.filter(
      (transaction) => transaction.type === 'expense',
    );
    expect(getIncomeCount(expenseTransactions)).toBe(0);
  });

  it('counts multiple income transactions', () => {
    const transactionsWithMultipleIncome: Transaction[] = [
      ...transactions,
      {
        id: '4',
        date: '2026-06-04',
        title: 'Bonus',
        type: 'income',
        categoryId: 'bonus',
        amount: 3000,
      },
      {
        id: '5',
        date: '2026-06-05',
        title: 'Dividend',
        type: 'income',
        categoryId: 'dividends',
        amount: 500,
      },
    ];
    expect(getIncomeCount(transactionsWithMultipleIncome)).toBe(4);
  });
});
