import { describe, expect, it } from 'vitest';
import { getMonthlySummary } from './getMonthlySummary.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

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
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 2000,
  },
  {
    id: '3',
    date: '2026-06-10',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
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
    date: '2026-07-05',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 1500,
  },
  {
    id: '6',
    date: '2026-07-10',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 2000,
  },
  {
    id: '7',
    date: '2026-07-15',
    title: 'Restaurant',
    type: 'expense',
    categoryId: 'food',
    amount: 800,
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
  {
    id: 'food',
    name: 'Food',
    color: '#f59e0b',
    type: 'expense',
  },
];

describe('getMonthlySummary', () => {
  it('returns monthly income and expense totals', () => {
    const result = getMonthlySummary(transactions, categories);

    expect(result).toEqual([
      expect.objectContaining({
        month: '2026-06',
        income: 5000,
        expense: 2500,
      }),
      expect.objectContaining({
        month: '2026-07',
        income: 7500,
        expense: 2800,
      }),
    ]);
  });

  it('calculates savings for each month', () => {
    const result = getMonthlySummary(transactions, categories);

    expect(result.find((item) => item.month === '2026-06')?.savings).toBe(2500);
    expect(result.find((item) => item.month === '2026-07')?.savings).toBe(4700);
  });

  it('calculates average transaction amount for each month', () => {
    const result = getMonthlySummary(transactions, categories);

    // June: (5000 + 2000 + 500) / 3 = 2500
    expect(result.find((item) => item.month === '2026-06')?.avgTransaction).toBe(2500);

    // July: (6000 + 1500 + 2000 + 800) / 4 = 2575
    expect(result.find((item) => item.month === '2026-07')?.avgTransaction).toBe(2575);
  });

  it('returns the largest expense with category name', () => {
    const result = getMonthlySummary(transactions, categories);

    expect(result.find((item) => item.month === '2026-06')?.largestExpense).toEqual({
      amount: 2000,
      title: 'Rent',
      categoryName: 'Housing',
    });

    expect(result.find((item) => item.month === '2026-07')?.largestExpense).toEqual({
      amount: 2000,
      title: 'Rent',
      categoryName: 'Housing',
    });
  });

  it('returns the largest income with category name', () => {
    const result = getMonthlySummary(transactions, categories);

    expect(result.find((item) => item.month === '2026-06')?.largestIncome).toEqual({
      amount: 5000,
      title: 'Salary',
      categoryName: 'Salary',
    });

    expect(result.find((item) => item.month === '2026-07')?.largestIncome).toEqual({
      amount: 6000,
      title: 'Salary',
      categoryName: 'Salary',
    });
  });

  it('returns null for largest expense when a month has no expenses', () => {
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

    const result = getMonthlySummary(incomeOnly, categories);

    expect(result[0].largestExpense).toBeNull();
    expect(result[0].largestIncome).toEqual({
      amount: 5000,
      title: 'Salary',
      categoryName: 'Salary',
    });
  });

  it('returns null for largest income when a month has no income', () => {
    const expenseOnly: Transaction[] = [
      {
        id: '1',
        date: '2026-06-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 2000,
      },
    ];

    const result = getMonthlySummary(expenseOnly, categories);

    expect(result[0].largestIncome).toBeNull();
    expect(result[0].largestExpense).toEqual({
      amount: 2000,
      title: 'Rent',
      categoryName: 'Housing',
    });
  });

  it('uses Unknown when the largest transaction category does not exist', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '1',
        date: '2026-06-01',
        title: 'Unknown expense',
        type: 'expense',
        categoryId: 'unknown',
        amount: 1000,
      },
      {
        id: '2',
        date: '2026-06-02',
        title: 'Unknown income',
        type: 'income',
        categoryId: 'unknown',
        amount: 5000,
      },
    ];

    const result = getMonthlySummary(transactionsWithUnknownCategory, categories);

    expect(result[0].largestExpense).toEqual({
      amount: 1000,
      title: 'Unknown expense',
      categoryName: 'Unknown',
    });

    expect(result[0].largestIncome).toEqual({
      amount: 5000,
      title: 'Unknown income',
      categoryName: 'Unknown',
    });
  });

  it('sorts results by month ascending', () => {
    const unsortedTransactions: Transaction[] = [
      {
        id: '1',
        date: '2026-08-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
      {
        id: '2',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 4000,
      },
      {
        id: '3',
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 4500,
      },
    ];

    const result = getMonthlySummary(unsortedTransactions, categories);

    expect(result.map((item) => item.month)).toEqual(['2026-06', '2026-07', '2026-08']);
  });

  it('returns an empty array when there are no transactions', () => {
    expect(getMonthlySummary([], categories)).toEqual([]);
  });

  it('returns an empty array when there are no transactions even if categories exist', () => {
    expect(getMonthlySummary([], [])).toEqual([]);
  });
});
