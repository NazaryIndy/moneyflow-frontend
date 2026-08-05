import { describe, expect, it } from 'vitest';
import { getMonthlyExpenses } from './getMonthlyExpenses';
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
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 1500,
  },
  {
    id: '5',
    date: '2026-07-10',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 3000,
  },
];

describe('getMonthlyExpenses', () => {
  it('returns total expenses for the specified month', () => {
    // June: 1000 + 2000 = 3000
    expect(getMonthlyExpenses(transactions, 5, 2026)).toBe(3000);
  });

  it('does not include expenses from another month', () => {
    // July: 1500
    expect(getMonthlyExpenses(transactions, 6, 2026)).toBe(1500);
  });

  it('does not include income transactions', () => {
    expect(getMonthlyExpenses(transactions, 5, 2026)).toBe(3000);
  });

  it('returns zero when there are no transactions', () => {
    expect(getMonthlyExpenses([], 5, 2026)).toBe(0);
  });

  it('returns zero when there are no expenses in the specified month', () => {
    expect(getMonthlyExpenses(transactions, 7, 2026)).toBe(0);
  });

  it('takes the year into account', () => {
    const transactionsWithDifferentYear: Transaction[] = [
      ...transactions,
      {
        id: '6',
        date: '2025-06-10',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 5000,
      },
    ];

    // Should include only June 2026 expenses.
    expect(getMonthlyExpenses(transactionsWithDifferentYear, 5, 2026)).toBe(3000);
  });

  it('includes multiple expenses from the same month', () => {
    const juneTransactions: Transaction[] = [
      {
        id: '7',
        date: '2026-06-01',
        title: 'Food',
        type: 'expense',
        categoryId: 'food',
        amount: 500,
      },
      {
        id: '8',
        date: '2026-06-10',
        title: 'Transport',
        type: 'expense',
        categoryId: 'transport',
        amount: 700,
      },
      {
        id: '9',
        date: '2026-06-20',
        title: 'Utilities',
        type: 'expense',
        categoryId: 'utilities',
        amount: 800,
      },
    ];

    expect(getMonthlyExpenses(juneTransactions, 5, 2026)).toBe(2000);
  });
});
