import { describe, expect, it } from 'vitest';
import { getAverageExpense } from './getAverageExpense';
import type { Transaction } from '../../model/transaction.types';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

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
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 2000,
  },
  {
    id: '4',
    date: '2026-06-04',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 3000,
  },
];

describe('getAverageExpense', () => {
  it('returns the average expense amount', () => {
    expect(getAverageExpense(transactions)).toBe(1500);
  });

  it('returns zero when there are no transactions', () => {
    expect(getAverageExpense([])).toBe(0);
  });

  it('returns zero when there are no expenses', () => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === TRANSACTION_TYPE.INCOME,
    );

    expect(getAverageExpense(incomeTransactions)).toBe(0);
  });

  it('ignores income transactions', () => {
    const expensesOnly: Transaction[] = [
      {
        id: '5',
        date: '2026-06-05',
        title: 'Food',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
      {
        id: '6',
        date: '2026-06-06',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 9000,
      },
      {
        id: '7',
        date: '2026-06-07',
        title: 'Transport',
        type: 'expense',
        categoryId: 'transport',
        amount: 500,
      },
    ];

    expect(getAverageExpense(expensesOnly)).toBe(750);
  });

  it('rounds the average to the nearest integer', () => {
    const expenses: Transaction[] = [
      {
        id: '8',
        date: '2026-06-08',
        title: 'Food',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
      {
        id: '9',
        date: '2026-06-09',
        title: 'Transport',
        type: 'expense',
        categoryId: 'transport',
        amount: 500,
      },
      {
        id: '10',
        date: '2026-06-10',
        title: 'Coffee',
        type: 'expense',
        categoryId: 'food',
        amount: 200,
      },
    ];

    // (1000 + 500 + 200) / 3 = 566.666...
    expect(getAverageExpense(expenses)).toBe(567);
  });

  it('returns the expense amount when there is only one expense', () => {
    const singleExpense: Transaction[] = [
      {
        id: '11',
        date: '2026-06-11',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1500,
      },
    ];

    expect(getAverageExpense(singleExpense)).toBe(1500);
  });
});
