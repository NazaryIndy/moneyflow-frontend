import { describe, expect, it } from 'vitest';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

import { getCategoryMonthlyTrends } from './getCategoryMonthlyTrends.ts';

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2026-06-01',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1000,
  },
  {
    id: '2',
    date: '2026-06-10',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
  },
  {
    id: '3',
    date: '2026-07-01',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1200,
  },
  {
    id: '4',
    date: '2026-07-05',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 700,
  },
  {
    id: '5',
    date: '2026-08-01',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1100,
  },
  {
    id: '6',
    date: '2026-08-03',
    title: 'Transport',
    type: 'expense',
    categoryId: 'transport',
    amount: 400,
  },
  {
    id: '7',
    date: '2026-06-15',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 5000,
  },
];

const categories: Category[] = [
  {
    id: 'housing',
    name: 'Housing',
    color: '#8b5cf6',
    type: 'expense',
  },
  {
    id: 'food',
    name: 'Food',
    color: '#22c55e',
    type: 'expense',
  },
  {
    id: 'transport',
    name: 'Transport',
    color: '#3b82f6',
    type: 'expense',
  },
  {
    id: 'salary',
    name: 'Salary',
    color: '#f59e0b',
    type: 'income',
  },
];

describe('getCategoryMonthlyTrends', () => {
  it('calculates monthly expenses for each category', () => {
    const result = getCategoryMonthlyTrends(transactions, categories);

    expect(result).toEqual([
      {
        categoryName: 'Housing',
        color: '#8b5cf6',
        data: [
          { month: '2026-06', amount: 1000 },
          { month: '2026-07', amount: 1200 },
          { month: '2026-08', amount: 1100 },
        ],
      },
      {
        categoryName: 'Food',
        color: '#22c55e',
        data: [
          { month: '2026-06', amount: 500 },
          { month: '2026-07', amount: 700 },
          { month: '2026-08', amount: 0 },
        ],
      },
      {
        categoryName: 'Transport',
        color: '#3b82f6',
        data: [
          { month: '2026-06', amount: 0 },
          { month: '2026-07', amount: 0 },
          { month: '2026-08', amount: 400 },
        ],
      },
    ]);
  });

  it('ignores income transactions', () => {
    const result = getCategoryMonthlyTrends(transactions, categories);

    expect(result).not.toContainEqual(
      expect.objectContaining({
        categoryName: 'Salary',
      }),
    );
  });

  it('sorts categories by total expenses', () => {
    const result = getCategoryMonthlyTrends(transactions, categories);

    expect(result.map((category) => category.categoryName)).toEqual([
      'Housing',
      'Food',
      'Transport',
    ]);
  });

  it('limits the number of returned categories', () => {
    const result = getCategoryMonthlyTrends(transactions, categories, 2);

    expect(result).toHaveLength(2);

    expect(result.map((category) => category.categoryName)).toEqual(['Housing', 'Food']);
  });

  it('uses default limit of 5', () => {
    const result = getCategoryMonthlyTrends(transactions, categories);

    expect(result).toHaveLength(3);
  });

  it('returns zero for months where a category has no expenses', () => {
    const result = getCategoryMonthlyTrends(transactions, categories);

    const food = result.find((category) => category.categoryName === 'Food');

    expect(food?.data).toEqual([
      { month: '2026-06', amount: 500 },
      { month: '2026-07', amount: 700 },
      { month: '2026-08', amount: 0 },
    ]);
  });

  it('sorts months chronologically', () => {
    const unorderedTransactions: Transaction[] = [
      {
        id: '1',
        date: '2026-08-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1000,
      },
      {
        id: '2',
        date: '2026-06-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 800,
      },
      {
        id: '3',
        date: '2026-07-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 900,
      },
    ];

    const result = getCategoryMonthlyTrends(unorderedTransactions, categories);

    expect(result[0]?.data).toEqual([
      { month: '2026-06', amount: 800 },
      { month: '2026-07', amount: 900 },
      { month: '2026-08', amount: 1000 },
    ]);
  });

  it('returns empty array when there are no transactions', () => {
    expect(getCategoryMonthlyTrends([], categories)).toEqual([]);
  });

  it('returns empty array when there are no expenses', () => {
    const incomeOnly: Transaction[] = [
      {
        id: '1',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
    ];

    expect(getCategoryMonthlyTrends(incomeOnly, categories)).toEqual([]);
  });

  it('uses Unknown and default color when category is not found', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '1',
        date: '2026-06-01',
        title: 'Unknown expense',
        type: 'expense',
        categoryId: 'unknown',
        amount: 1000,
      },
    ];

    const result = getCategoryMonthlyTrends(transactionsWithUnknownCategory, categories);

    expect(result).toEqual([
      {
        categoryName: 'Unknown',
        color: '#888888',
        data: [{ month: '2026-06', amount: 1000 }],
      },
    ]);
  });
});
