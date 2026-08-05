import { describe, expect, it } from 'vitest';
import { getRecentTransactions } from './getRecentTransactions';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2026-06-01',
    title: 'Old transaction',
    type: 'expense',
    categoryId: 'food',
    amount: 100,
  },
  {
    id: '2',
    date: '2026-06-15',
    title: 'Middle transaction',
    type: 'expense',
    categoryId: 'transport',
    amount: 200,
  },
  {
    id: '3',
    date: '2026-07-01',
    title: 'Recent transaction',
    type: 'income',
    categoryId: 'salary',
    amount: 3000,
  },
  {
    id: '4',
    date: '2026-07-10',
    title: 'Newest transaction',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
  },
];

describe('getRecentTransactions', () => {
  it('returns transactions sorted from newest to oldest', () => {
    const result = getRecentTransactions(transactions, 4);
    expect(result.map((transaction) => transaction.id)).toEqual(['4', '3', '2', '1']);
  });

  it('returns the requested number of recent transactions', () => {
    const result = getRecentTransactions(transactions, 2);
    expect(result).toHaveLength(2);
    expect(result.map((transaction) => transaction.id)).toEqual(['4', '3']);
  });

  it('returns all transactions when transactionCount is greater than the array length', () => {
    const result = getRecentTransactions(transactions, 10);
    expect(result).toHaveLength(4);
    expect(result.map((transaction) => transaction.id)).toEqual(['4', '3', '2', '1']);
  });

  it('returns an empty array when there are no transactions', () => {
    expect(getRecentTransactions([], 5)).toEqual([]);
  });

  it('returns an empty array when transactionCount is zero', () => {
    expect(getRecentTransactions(transactions, 0)).toEqual([]);
  });

  it('does not mutate the original transactions array', () => {
    const originalTransactions = [...transactions];
    getRecentTransactions(transactions, 2);
    expect(transactions).toEqual(originalTransactions);
  });

  it('returns the newest transaction when transactionCount is one', () => {
    const result = getRecentTransactions(transactions, 1);
    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe('4');
  });
});
