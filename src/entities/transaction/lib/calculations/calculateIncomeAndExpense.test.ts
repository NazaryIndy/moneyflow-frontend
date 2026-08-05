import { describe, expect, it } from 'vitest';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { calculateIncomeAndExpense } from '@/entities/transaction/lib/calculations/calculateIncomeAndExpense.ts';

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
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 1000,
  },
  {
    id: '3',
    date: '2026-06-03',
    title: 'Freelance',
    type: 'income',
    categoryId: 'freelance',
    amount: 2000,
  },
];

describe('calculateIncomeAndExpense', () => {
  it('calculates income and expenses', () => {
    expect(calculateIncomeAndExpense(transactions)).toEqual({
      income: 7000,
      expense: 1000,
    });
  });

  it('returns zero for empty transactions', () => {
    expect(calculateIncomeAndExpense([])).toEqual({
      income: 0,
      expense: 0,
    });
  });
});
