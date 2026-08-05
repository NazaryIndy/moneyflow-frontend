import { describe, expect, it } from 'vitest';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { getLargestExpenseCategory } from '@/entities/transaction/lib/calculations/getLargestExpenseCategory.ts';

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
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1000,
  },
  {
    id: '3',
    date: '2026-06-03',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
  },
  {
    id: '4',
    date: '2026-06-10',
    title: 'Car repair',
    type: 'expense',
    categoryId: 'transport',
    amount: 2000,
  },
  {
    id: '5',
    date: '2026-07-01',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 5000,
  },
  {
    id: '6',
    date: '2026-07-02',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1200,
  },
  {
    id: '7',
    date: '2026-07-03',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 800,
  },
];
const categories: Category[] = [
  { id: 'housing', name: 'Housing', color: '#8b5cf6', type: 'expense' },
  { id: 'food', name: 'Food', color: '#f59e0b', type: 'expense' },
  { id: 'transport', name: 'Transport', color: '#3b82f6', type: 'expense' },
  { id: 'salary', name: 'Salary', color: '#22c55e', type: 'income' },
];

describe('getLargestExpenseCategory', () => {
  it('returns the category with the largest total expenses', () => {
    expect(getLargestExpenseCategory(transactions, categories)).toEqual({
      categoryName: 'Housing',
      total: 2200,
    });
  });
  it('combines expenses from the same category', () => {
    const result = getLargestExpenseCategory(transactions, categories); // Housing: 1000 + 1200 = 2200 // Food: 500 + 800 = 1300 // Transport: 2000
    expect(result).toEqual({ categoryName: 'Housing', total: 2200 });
  });
  it('ignores income transactions', () => {
    const incomeOnly: Transaction[] = [
      {
        id: '12',
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 10000,
      },
    ];
    expect(getLargestExpenseCategory(incomeOnly, categories)).toBeNull();
  });
  it('returns null when there are no transactions', () => {
    expect(getLargestExpenseCategory([], categories)).toBeNull();
  });
  it('returns Unknown when the largest category does not exist', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '13',
        date: '2026-07-01',
        title: 'Unknown expense',
        type: 'expense',
        categoryId: 'unknown',
        amount: 5000,
      },
      {
        id: '14',
        date: '2026-07-02',
        title: 'Food',
        type: 'expense',
        categoryId: 'food',
        amount: 100,
      },
    ];
    expect(getLargestExpenseCategory(transactionsWithUnknownCategory, categories)).toEqual({
      categoryName: 'Unknown',
      total: 5000,
    });
  });
  it('returns the only expense category', () => {
    const singleCategoryTransactions: Transaction[] = [
      {
        id: '15',
        date: '2026-07-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1500,
      },
      {
        id: '16',
        date: '2026-07-02',
        title: 'Rent 2',
        type: 'expense',
        categoryId: 'housing',
        amount: 500,
      },
    ];
    expect(getLargestExpenseCategory(singleCategoryTransactions, categories)).toEqual({
      categoryName: 'Housing',
      total: 2000,
    });
  });
});
