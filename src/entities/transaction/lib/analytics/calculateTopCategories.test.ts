import { describe, expect, it } from 'vitest';

import { calculateTopCategories } from './calculateTopCategories';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2026-06-01',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
  },
  {
    id: '2',
    date: '2026-06-02',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 3000,
  },
  {
    id: '3',
    date: '2026-06-03',
    title: 'Gas',
    type: 'expense',
    categoryId: 'transport',
    amount: 1500,
  },
  {
    id: '4',
    date: '2026-06-04',
    title: 'Restaurant',
    type: 'expense',
    categoryId: 'food',
    amount: 1000,
  },
  {
    id: '5',
    date: '2026-06-05',
    title: 'Electricity',
    type: 'expense',
    categoryId: 'utilities',
    amount: 800,
  },
  {
    id: '6',
    date: '2026-06-06',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 5000,
  },
];

const categories: Category[] = [
  {
    id: 'food',
    name: 'Food',
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
    id: 'transport',
    name: 'Transport',
    color: '#f59e0b',
    type: 'expense',
  },
  {
    id: 'utilities',
    name: 'Utilities',
    color: '#22c55e',
    type: 'expense',
  },
  {
    id: 'salary',
    name: 'Salary',
    color: '#10b981',
    type: 'income',
  },
];

describe('calculateTopCategories', () => {
  it('returns top categories sorted by total expenses', () => {
    expect(calculateTopCategories(transactions, categories)).toEqual([
      {
        categoryId: 'housing',
        categoryName: 'Housing',
        total: 3000,
        color: '#8b5cf6',
      },
      {
        categoryId: 'food',
        categoryName: 'Food',
        total: 1500,
        color: '#3b82f6',
      },
      {
        categoryId: 'transport',
        categoryName: 'Transport',
        total: 1500,
        color: '#f59e0b',
      },
      {
        categoryId: 'utilities',
        categoryName: 'Utilities',
        total: 800,
        color: '#22c55e',
      },
    ]);
  });

  it('returns only the requested number of categories', () => {
    const result = calculateTopCategories(transactions, categories, 2);

    expect(result).toHaveLength(2);

    expect(result.map((category) => category.categoryId)).toEqual(['housing', 'food']);
  });

  it('returns all categories when topN is greater than the number of categories', () => {
    const result = calculateTopCategories(transactions, categories, 10);

    expect(result).toHaveLength(4);
  });

  it('returns an empty array when there are no transactions', () => {
    expect(calculateTopCategories([], categories)).toEqual([]);
  });

  it('uses Unknown when categories are not found', () => {
    const result = calculateTopCategories(transactions, []);

    expect(result).toEqual([
      {
        categoryId: 'housing',
        categoryName: 'Unknown (housing)',
        total: 3000,
      },
      {
        categoryId: 'food',
        categoryName: 'Unknown (food)',
        total: 1500,
      },
      {
        categoryId: 'transport',
        categoryName: 'Unknown (transport)',
        total: 1500,
      },
      {
        categoryId: 'utilities',
        categoryName: 'Unknown (utilities)',
        total: 800,
      },
    ]);
  });

  it('ignores income transactions', () => {
    const incomeOnly: Transaction[] = [
      {
        id: '7',
        date: '2026-06-10',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 10000,
      },
    ];

    expect(calculateTopCategories(incomeOnly, categories)).toEqual([]);
  });

  it('uses five categories by default', () => {
    const manyCategories: Category[] = Array.from({ length: 6 }, (_, index) => ({
      id: `category-${index}`,
      name: `Category ${index}`,
      color: '#000000',
      type: 'expense',
    }));

    const manyTransactions: Transaction[] = manyCategories.map((category, index) => ({
      id: `transaction-${index}`,
      date: '2026-06-01',
      title: `Expense ${index}`,
      type: 'expense',
      categoryId: category.id,
      amount: 1000 + index * 100,
    }));

    const result = calculateTopCategories(manyTransactions, manyCategories);

    expect(result).toHaveLength(5);
  });

  it('returns zero categories when topN is zero', () => {
    expect(calculateTopCategories(transactions, categories, 0)).toEqual([]);
  });
});
