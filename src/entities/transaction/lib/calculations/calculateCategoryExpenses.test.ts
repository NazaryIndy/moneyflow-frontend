import { describe, expect, it } from 'vitest';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { calculateCategoryExpenses } from '@/entities/transaction/lib/calculations/calculateCategoryExpenses.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2026-06-01',
    title: 'Tax return',
    type: 'income',
    categoryId: 'tax_return',
    amount: 5000,
  },
  {
    id: '2',
    date: '2026-06-02',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1000,
  },
  {
    id: '3',
    date: '2026-06-03',
    title: 'Gas',
    type: 'expense',
    categoryId: 'transport',
    amount: 2000,
  },
];

const categories: Category[] = [
  {
    id: 'transport',
    name: 'Transport',
    color: '#3b82f6',
    type: 'expense',
  },
  {
    id: 'housing',
    name: 'Housing',
    color: '#8b5cf6',
    type: 'expense',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    color: '#f59e0b',
    type: 'expense',
  },
  {
    id: 'tax_return',
    name: 'Tax Return',
    color: '#a78bfa',
    type: 'income',
  },
];

describe('calculateCategoryExpenses', () => {
  it('calculates expenses grouped by category', () => {
    expect(calculateCategoryExpenses(transactions, categories)).toEqual([
      {
        categoryId: 'transport',
        categoryName: 'Transport',
        total: 2000,
        color: '#3b82f6',
      },
      {
        categoryId: 'housing',
        categoryName: 'Housing',
        total: 1000,
        color: '#8b5cf6',
      },
    ]);
  });

  it('ignores income transactions', () => {
    const result = calculateCategoryExpenses(transactions, categories);

    expect(result).not.toContainEqual(
      expect.objectContaining({
        categoryId: 'tax_return',
      }),
    );
  });

  it('combines expenses from the same category', () => {
    const transactionsWithRepeatedCategory: Transaction[] = [
      ...transactions,
      {
        id: '4',
        date: '2026-06-04',
        title: 'Groceries',
        type: 'expense',
        categoryId: 'housing',
        amount: 500,
      },
    ];

    expect(calculateCategoryExpenses(transactionsWithRepeatedCategory, categories)).toEqual([
      {
        categoryId: 'transport',
        categoryName: 'Transport',
        total: 2000,
        color: '#3b82f6',
      },
      {
        categoryId: 'housing',
        categoryName: 'Housing',
        total: 1500,
        color: '#8b5cf6',
      },
    ]);
  });

  it('sorts categories by total in descending order', () => {
    const result = calculateCategoryExpenses(transactions, categories);

    expect(result.map((item) => item.total)).toEqual([2000, 1000]);
  });

  it('returns an empty array for empty transactions', () => {
    expect(calculateCategoryExpenses([], categories)).toEqual([]);
  });

  it('returns an unknown category when category does not exist', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '5',
        date: '2026-06-05',
        title: 'Unknown expense',
        type: 'expense',
        categoryId: 'unknown',
        amount: 300,
      },
    ];

    expect(calculateCategoryExpenses(transactionsWithUnknownCategory, categories)).toEqual([
      {
        categoryId: 'unknown',
        categoryName: 'Unknown (unknown)',
        total: 300,
      },
    ]);
  });

  it('preserves the category color', () => {
    const result = calculateCategoryExpenses(transactions, categories);

    const transport = result.find((item) => item.categoryId === 'transport');

    expect(transport?.color).toBe('#3b82f6');
  });
});
