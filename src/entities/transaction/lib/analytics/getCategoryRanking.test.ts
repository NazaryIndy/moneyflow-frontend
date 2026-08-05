import { describe, expect, it } from 'vitest';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

import { getCategoryRanking } from './getCategoryRanking.ts';

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
    date: '2026-06-10',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 3000,
  },
  {
    id: '3',
    date: '2026-07-01',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 6000,
  },
  {
    id: '4',
    date: '2026-07-10',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 2000,
  },
  {
    id: '5',
    date: '2026-08-01',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 7000,
  },
  {
    id: '6',
    date: '2026-08-05',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 4000,
  },

  // Expenses — должны игнорироваться при type = income
  {
    id: '7',
    date: '2026-08-02',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 2000,
  },
];

const categories: Category[] = [
  {
    id: 'salary',
    name: 'Salary',
    color: '#22c55e',
    type: 'income',
  },
  {
    id: 'freelance',
    name: 'Freelance',
    color: '#3b82f6',
    type: 'income',
  },
  {
    id: 'housing',
    name: 'Housing',
    color: '#8b5cf6',
    type: 'expense',
  },
];

describe('getCategoryRanking', () => {
  it('calculates ranking for income categories', () => {
    const result = getCategoryRanking(transactions, categories, 'income');

    expect(result).toEqual([
      {
        categoryName: 'Salary',
        amount: 18000,
        percentage: expect.closeTo(66.6666666667, 10),
        change: expect.closeTo(16.6666666667, 10),
      },
      {
        categoryName: 'Freelance',
        amount: 9000,
        percentage: expect.closeTo(33.3333333333, 10),
        change: 100,
      },
    ]);
  });

  it('filters transactions by type', () => {
    const result = getCategoryRanking(transactions, categories, 'income');

    expect(result).not.toContainEqual(
      expect.objectContaining({
        categoryName: 'Housing',
      }),
    );
  });

  it('calculates percentage based on total amount', () => {
    const result = getCategoryRanking(transactions, categories, 'income');

    const salary = result.find((item) => item.categoryName === 'Salary');
    const freelance = result.find((item) => item.categoryName === 'Freelance');

    expect(salary?.percentage).toBeCloseTo(66.6666666667, 10);
    expect(freelance?.percentage).toBeCloseTo(33.3333333333, 10);
  });

  it('calculates month-over-month change', () => {
    const result = getCategoryRanking(transactions, categories, 'income');

    const salary = result.find((item) => item.categoryName === 'Salary');
    const freelance = result.find((item) => item.categoryName === 'Freelance');

    // Salary: July 6000 -> August 7000
    // (7000 - 6000) / 6000 * 100 = 16.666...
    expect(salary?.change).toBeCloseTo(16.6666666667, 10);

    // Freelance: July 2000 -> August 4000
    // (4000 - 2000) / 2000 * 100 = 100
    expect(freelance?.change).toBe(100);
  });

  it('sorts categories by amount in descending order', () => {
    const result = getCategoryRanking(transactions, categories, 'income');

    expect(result.map((item) => item.categoryName)).toEqual(['Salary', 'Freelance']);

    expect(result.map((item) => item.amount)).toEqual([18000, 9000]);
  });

  it('returns null change when there is no previous month', () => {
    const transactionsOneMonth: Transaction[] = [
      {
        id: '1',
        date: '2026-08-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
    ];

    const result = getCategoryRanking(transactionsOneMonth, categories, 'income');

    expect(result).toEqual([
      {
        categoryName: 'Salary',
        amount: 5000,
        percentage: 100,
        change: null,
      },
    ]);
  });

  it('returns null change when previous month amount is zero', () => {
    const transactionsWithZeroPreviousMonth: Transaction[] = [
      {
        id: '1',
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 0,
      },
      {
        id: '2',
        date: '2026-08-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
    ];

    const result = getCategoryRanking(transactionsWithZeroPreviousMonth, categories, 'income');

    expect(result[0]?.change).toBeNull();
  });

  it('calculates ranking for expenses', () => {
    const expenseTransactions: Transaction[] = [
      {
        id: '1',
        date: '2026-07-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 2000,
      },
      {
        id: '2',
        date: '2026-08-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 2500,
      },
    ];

    const result = getCategoryRanking(expenseTransactions, categories, 'expense');

    expect(result).toEqual([
      {
        categoryName: 'Housing',
        amount: 4500,
        percentage: 100,
        change: 25,
      },
    ]);
  });

  it('returns an empty array when there are no matching transactions', () => {
    const result = getCategoryRanking([], categories, 'income');

    expect(result).toEqual([]);
  });

  it('returns an empty array when there are no transactions of the requested type', () => {
    const expensesOnly: Transaction[] = [
      {
        id: '1',
        date: '2026-08-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 2000,
      },
    ];

    const result = getCategoryRanking(expensesOnly, categories, 'income');

    expect(result).toEqual([]);
  });

  it('uses Unknown when category is not found', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '1',
        date: '2026-08-01',
        title: 'Unknown income',
        type: 'income',
        categoryId: 'unknown',
        amount: 1000,
      },
    ];

    const result = getCategoryRanking(transactionsWithUnknownCategory, categories, 'income');

    expect(result).toEqual([
      {
        categoryName: 'Unknown',
        amount: 1000,
        percentage: 100,
        change: null,
      },
    ]);
  });
});
