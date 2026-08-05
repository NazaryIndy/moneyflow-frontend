import { describe, expect, it } from 'vitest';
import { calculateBudgetStatistics } from './calculateBudgetStatistics.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { MonthBudget } from '@/entities/budget/model/budget.types.ts';

const transactions: Transaction[] = [
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
    date: '2026-07-10',
    title: 'Groceries',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
  },
  {
    id: '3',
    date: '2026-07-15',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 5000,
  },
  {
    id: '4',
    date: '2026-06-20',
    title: 'Old expense',
    type: 'expense',
    categoryId: 'food',
    amount: 1000,
  },
  {
    id: '5',
    date: '2026-08-01',
    title: 'Future expense',
    type: 'expense',
    categoryId: 'food',
    amount: 800,
  },
];

describe('calculateBudgetStatistics', () => {
  it('calculates spent amount for the budget month', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 3000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result.spent).toBe(2500);
  });

  it('ignores income transactions', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 6000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result.spent).toBe(2500);
  });

  it('ignores expenses from other months', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 3000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result.spent).toBe(2500);
  });

  it('calculates remaining budget', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 3000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result.remaining).toBe(500);
  });

  it('calculates spending percentage', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 5000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result.percentage).toBe(50);
  });

  it('sets isOverBudget to false when spending is exactly at the budget', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 2500,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result.spent).toBe(2500);
    expect(result.remaining).toBe(0);
    expect(result.percentage).toBe(100);
    expect(result.isOverBudget).toBe(false);
  });

  it('sets isOverBudget to true when spending exceeds the budget', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 2000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result.spent).toBe(2500);
    expect(result.remaining).toBe(-500);
    expect(result.percentage).toBe(125);
    expect(result.isOverBudget).toBe(true);
  });

  it('returns zero percentage when budget amount is zero', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 0,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result).toEqual({
      spent: 2500,
      remaining: -2500,
      percentage: 0,
      isOverBudget: false,
    });
  });

  it('returns zero spent when there are no transactions', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 3000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, []);

    expect(result).toEqual({
      spent: 0,
      remaining: 3000,
      percentage: 0,
      isOverBudget: false,
    });
  });

  it('returns zero spent when there are no expenses in the budget month', () => {
    const budget: MonthBudget = {
      id: '1',
      amount: 3000,
      month: 8, // September
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactions);

    expect(result).toEqual({
      spent: 0,
      remaining: 3000,
      percentage: 0,
      isOverBudget: false,
    });
  });

  it('does not mix transactions from the same month in a different year', () => {
    const transactionsWithDifferentYear: Transaction[] = [
      {
        id: '1',
        date: '2025-07-10',
        title: 'Old rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1000,
      },
      {
        id: '2',
        date: '2026-07-10',
        title: 'Current rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 2000,
      },
    ];

    const budget: MonthBudget = {
      id: '1',
      amount: 3000,
      month: 6,
      year: 2026,
    };

    const result = calculateBudgetStatistics(budget, transactionsWithDifferentYear);

    expect(result.spent).toBe(2000);
  });
});
