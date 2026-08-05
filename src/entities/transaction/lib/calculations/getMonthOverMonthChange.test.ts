import { describe, expect, it } from 'vitest';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { getMonthOverMonthChange } from '@/entities/transaction/lib/calculations/getMonthOverMonthChange.ts';

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

describe('getMonthOverMonthChange', () => {
  it('calculates month-over-month percentage change', () => {
    const result = getMonthOverMonthChange(transactions, 'expense');
    // June: 1000 + 500 + 2000 = 3500
    // July: 1200 + 800 = 2000
    // ((2000 - 3500) / 3500) * 100 = -42.857...
    expect(result).toBeCloseTo(-42.857, 3);
  });
  it('calculates positive change when the total increases', () => {
    const monthlyTransactions: Transaction[] = [
      {
        id: '20',
        date: '2026-06-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1000,
      },
      {
        id: '21',
        date: '2026-07-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1500,
      },
    ];
    expect(getMonthOverMonthChange(monthlyTransactions, 'expense')).toBe(50);
  });
  it('calculates negative change when the total decreases', () => {
    const monthlyTransactions: Transaction[] = [
      {
        id: '22',
        date: '2026-06-01',
        title: 'Shopping',
        type: 'expense',
        categoryId: 'food',
        amount: 2000,
      },
      {
        id: '23',
        date: '2026-07-01',
        title: 'Shopping',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
    ];
    expect(getMonthOverMonthChange(monthlyTransactions, 'expense')).toBe(-50);
  });
  it('ignores transactions of another type', () => {
    const monthlyTransactions: Transaction[] = [
      {
        id: '24',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
      {
        id: '25',
        date: '2026-06-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1000,
      },
      {
        id: '26',
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 7000,
      },
      {
        id: '27',
        date: '2026-07-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1500,
      },
    ];
    expect(getMonthOverMonthChange(monthlyTransactions, 'expense')).toBe(50);
  });
  it('calculates month-over-month change for income', () => {
    const incomeTransactions: Transaction[] = [
      {
        id: '28',
        date: '2026-06-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 4000,
      },
      {
        id: '29',
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
    ];
    expect(getMonthOverMonthChange(incomeTransactions, 'income')).toBe(25);
  });
  it('returns null when there is only one month', () => {
    const oneMonthTransactions: Transaction[] = [
      {
        id: '30',
        date: '2026-07-01',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1000,
      },
      {
        id: '31',
        date: '2026-07-15',
        title: 'Food',
        type: 'expense',
        categoryId: 'food',
        amount: 500,
      },
    ];
    expect(getMonthOverMonthChange(oneMonthTransactions, 'expense')).toBeNull();
  });
  it('returns null when there are no transactions', () => {
    expect(getMonthOverMonthChange([], 'expense')).toBeNull();
  });
  it('returns null when the previous month total is zero', () => {
    const transactionsWithZeroPreviousMonth: Transaction[] = [
      {
        id: '32',
        date: '2026-06-01',
        title: 'Nothing',
        type: 'expense',
        categoryId: 'food',
        amount: 0,
      },
      {
        id: '33',
        date: '2026-07-01',
        title: 'Groceries',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
    ];
    expect(getMonthOverMonthChange(transactionsWithZeroPreviousMonth, 'expense')).toBeNull();
  });
  it('uses the two latest months when more than two months exist', () => {
    const threeMonths: Transaction[] = [
      {
        id: '34',
        date: '2026-05-01',
        title: 'Old expense',
        type: 'expense',
        categoryId: 'food',
        amount: 1000,
      },
      {
        id: '35',
        date: '2026-06-01',
        title: 'June expense',
        type: 'expense',
        categoryId: 'food',
        amount: 2000,
      },
      {
        id: '36',
        date: '2026-07-01',
        title: 'July expense',
        type: 'expense',
        categoryId: 'food',
        amount: 3000,
      },
    ];
    // Сравниваем только June и July:
    // ((3000 - 2000) / 2000) * 100 = 50
    expect(getMonthOverMonthChange(threeMonths, 'expense')).toBe(50);
  });
});
