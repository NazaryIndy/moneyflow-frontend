import { describe, expect, it } from 'vitest';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

import { getCategoryIncome } from './getCategoryIncome.ts';

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
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 3000,
  },
  {
    id: '3',
    date: '2026-06-03',
    title: 'Bonus',
    type: 'income',
    categoryId: 'salary',
    amount: 2000,
  },
  {
    id: '4',
    date: '2026-06-04',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 1000,
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
    id: 'food',
    name: 'Food',
    color: '#ef4444',
    type: 'expense',
  },
];

describe('getCategoryIncome', () => {
  it('calculates income grouped by category', () => {
    const result = getCategoryIncome(transactions, categories);

    expect(result).toEqual([
      {
        categoryId: 'salary',
        categoryName: 'Salary',
        total: 7000,
        color: '#22c55e',
      },
      {
        categoryId: 'freelance',
        categoryName: 'Freelance',
        total: 3000,
        color: '#3b82f6',
      },
    ]);
  });

  it('ignores expenses', () => {
    const result = getCategoryIncome(transactions, categories);

    expect(result).not.toContainEqual(
      expect.objectContaining({
        categoryId: 'food',
      }),
    );
  });

  it('sorts categories by total income in descending order', () => {
    const result = getCategoryIncome(transactions, categories);

    expect(result.map((category) => category.total)).toEqual([7000, 3000]);
  });

  it('returns an empty array when there are no transactions', () => {
    expect(getCategoryIncome([], categories)).toEqual([]);
  });

  it('returns an empty array when there are no income transactions', () => {
    const expensesOnly: Transaction[] = [
      {
        id: '1',
        date: '2026-06-01',
        title: 'Groceries',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
    ];

    expect(getCategoryIncome(expensesOnly, categories)).toEqual([]);
  });

  it('uses Unknown when category is not found', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '1',
        date: '2026-06-01',
        title: 'Unknown income',
        type: 'income',
        categoryId: 'unknown',
        amount: 1500,
      },
    ];

    const result = getCategoryIncome(transactionsWithUnknownCategory, categories);

    expect(result).toEqual([
      {
        categoryId: 'unknown',
        categoryName: 'Unknown',
        total: 1500,
        color: undefined,
      },
    ]);
  });

  it('preserves category color', () => {
    const result = getCategoryIncome(transactions, categories);

    expect(result[0]).toMatchObject({
      categoryName: 'Salary',
      color: '#22c55e',
    });
  });
});
