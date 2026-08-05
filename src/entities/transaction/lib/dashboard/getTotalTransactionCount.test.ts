import { describe, expect, it } from 'vitest';
import { getTotalTransactionCount } from './getTotalTransactionCount';
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
describe('getTotalTransactionCount', () => {
  it('returns the total number of transactions', () => {
    expect(getTotalTransactionCount(transactions)).toBe(3);
  });

  it('returns zero for empty transactions', () => {
    expect(getTotalTransactionCount([])).toBe(0);
  });

  it('returns one for a single transaction', () => {
    expect(getTotalTransactionCount([transactions[0]])).toBe(1);
  });
});
