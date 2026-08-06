import { describe, expect, it } from 'vitest';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { getLargestExpense } from '@/entities/transaction/lib/calculations/getLargestExpense.ts';
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

describe('getLargestExpense', () => {
  it('returns the largest individual expense', () => {
    expect(getLargestExpense(transactions, categories)).toEqual({
      amount: 2000,
      title: 'Car repair',
      categoryName: 'Transport',
    });
  });
  it('ignores income transactions', () => {
    const result = getLargestExpense(transactions, categories);
    expect(result).not.toEqual(expect.objectContaining({ title: 'Salary' }));
  });
  it('returns null when there are no transactions', () => {
    expect(getLargestExpense([], categories)).toBeNull();
  });
  it('returns null when there are only income transactions', () => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === TRANSACTION_TYPE.INCOME,
    );
    expect(getLargestExpense(incomeTransactions, categories)).toBeNull();
  });
  it('returns Unknown when the category does not exist', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '10',
        date: '2026-07-10',
        title: 'Unknown expense',
        type: 'expense',
        categoryId: 'unknown',
        amount: 3000,
      },
    ];
    expect(getLargestExpense(transactionsWithUnknownCategory, categories)).toEqual({
      amount: 3000,
      title: 'Unknown expense',
      categoryName: 'Unknown',
    });
  });
  it('returns the expense when there is only one expense', () => {
    const singleExpense: Transaction[] = [
      {
        id: '11',
        date: '2026-07-10',
        title: 'Coffee',
        type: 'expense',
        categoryId: 'food',
        amount: 10,
      },
    ];
    expect(getLargestExpense(singleExpense, categories)).toEqual({
      amount: 10,
      title: 'Coffee',
      categoryName: 'Food',
    });
  });
});
