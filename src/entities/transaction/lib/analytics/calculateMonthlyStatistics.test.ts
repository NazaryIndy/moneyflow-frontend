import { describe, expect, it } from 'vitest';
import { calculateMonthlyStatistics } from './calculateMonthlyStatistics';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

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
    date: '2026-06-05',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 1000,
  },
  {
    id: '3',
    date: '2026-06-15',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 2000,
  },
  {
    id: '4',
    date: '2026-07-01',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 6000,
  },
  {
    id: '5',
    date: '2026-07-10',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 1500,
  },
];

describe('calculateMonthlyStatistics', () => {
  it('calculates income and expenses for each month', () => {
    expect(calculateMonthlyStatistics(transactions)).toEqual([
      { month: '2026-06', income: 5000, expense: 3000 },
      { month: '2026-07', income: 6000, expense: 1500 },
    ]);
  });

  it('groups multiple transactions from the same month', () => {
    const juneTransactions: Transaction[] = [
      {
        id: '6',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
      {
        id: '7',
        date: '2026-06-10',
        title: 'Freelance',
        type: 'income',
        categoryId: 'freelance',
        amount: 2000,
      },
      {
        id: '8',
        date: '2026-06-15',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1500,
      },
      {
        id: '9',
        date: '2026-06-20',
        title: 'Groceries',
        type: 'expense',
        categoryId: 'food',
        amount: 500,
      },
    ];
    expect(calculateMonthlyStatistics(juneTransactions)).toEqual([
      { month: '2026-06', income: 7000, expense: 2000 },
    ]);
  });

  it('returns an empty array for empty transactions', () => {
    expect(calculateMonthlyStatistics([])).toEqual([]);
  });

  it('returns only income when a month has no expenses', () => {
    const incomeOnly: Transaction[] = [
      {
        id: '10',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
      {
        id: '11',
        date: '2026-06-15',
        title: 'Freelance',
        type: 'income',
        categoryId: 'freelance',
        amount: 2000,
      },
    ];
    expect(calculateMonthlyStatistics(incomeOnly)).toEqual([
      { month: '2026-06', income: 7000, expense: 0 },
    ]);
  });

  it('returns only expenses when a month has no income', () => {
    const expenseOnly: Transaction[] = [
      {
        id: '12',
        date: '2026-06-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 2000,
      },
      {
        id: '13',
        date: '2026-06-15',
        title: 'Groceries',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
    ];
    expect(calculateMonthlyStatistics(expenseOnly)).toEqual([
      { month: '2026-06', income: 0, expense: 3000 },
    ]);
  });

  it('sorts months chronologically', () => {
    const unsortedTransactions: Transaction[] = [
      {
        id: '14',
        date: '2026-08-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 8000,
      },
      {
        id: '15',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
      {
        id: '16',
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 6000,
      },
    ];
    expect(calculateMonthlyStatistics(unsortedTransactions)).toEqual([
      { month: '2026-06', income: 5000, expense: 0 },
      { month: '2026-07', income: 6000, expense: 0 },
      { month: '2026-08', income: 8000, expense: 0 },
    ]);
  });

  it('keeps income and expenses separate', () => {
    const mixedTransactions: Transaction[] = [
      {
        id: '17',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 10000,
      },
      {
        id: '18',
        date: '2026-06-05',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 3000,
      },
      {
        id: '19',
        date: '2026-06-10',
        title: 'Freelance',
        type: 'income',
        categoryId: 'freelance',
        amount: 2000,
      },
      {
        id: '20',
        date: '2026-06-15',
        title: 'Food',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
    ];
    expect(calculateMonthlyStatistics(mixedTransactions)).toEqual([
      { month: '2026-06', income: 12000, expense: 4000 },
    ]);
  });

  it('handles transactions from different years', () => {
    const differentYears: Transaction[] = [
      {
        id: '21',
        date: '2025-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 4000,
      },
      {
        id: '22',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
    ];
    expect(calculateMonthlyStatistics(differentYears)).toEqual([
      { month: '2025-06', income: 4000, expense: 0 },
      { month: '2026-06', income: 5000, expense: 0 },
    ]);
  });
});
