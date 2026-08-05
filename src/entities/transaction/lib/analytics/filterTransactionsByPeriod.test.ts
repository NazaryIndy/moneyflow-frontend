import { afterEach, describe, expect, it, vi, beforeEach } from 'vitest';
import { filterTransactionsByPeriod } from './filterTransactionsByPeriod';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

const transactions: Transaction[] = [
  {
    id: '1',
    date: '2026-08-05',
    title: 'Today',
    type: 'expense',
    categoryId: 'food',
    amount: 100,
  },
  {
    id: '2',
    date: '2026-08-01',
    title: 'Within 7 days',
    type: 'expense',
    categoryId: 'food',
    amount: 200,
  },
  {
    id: '3',
    date: '2026-07-01',
    title: 'Outside one month',
    type: 'expense',
    categoryId: 'food',
    amount: 300,
  },
  {
    id: '4',
    date: '2026-05-15',
    title: 'Within 3 months',
    type: 'expense',
    categoryId: 'food',
    amount: 400,
  },
  {
    id: '5',
    date: '2025-10-01',
    title: 'Within 12 months',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
  },
  {
    id: '6',
    date: '2025-01-01',
    title: 'Older than 12 months',
    type: 'expense',
    categoryId: 'food',
    amount: 600,
  },
];

describe('filterTransactionsByPeriod', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-08-05T12:00:00.000Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('excludes transaction exactly before the one-month boundary', () => {
    const result = filterTransactionsByPeriod(
      [
        {
          ...transactions[0],
          id: 'before-boundary',
          date: '2026-07-04',
        },
        {
          ...transactions[0],
          id: 'at-boundary',
          date: '2026-07-05',
        },
      ],
      '1m',
    );

    expect(result.map((transaction) => transaction.id)).toEqual(['at-boundary']);
  });

  it('returns transactions from the last 7 days', () => {
    const result = filterTransactionsByPeriod(transactions, '7d');

    expect(result.map((transaction) => transaction.id)).toEqual(['1', '2']);
  });

  it('returns transactions from the last month', () => {
    const result = filterTransactionsByPeriod(transactions, '1m');

    expect(result.map((transaction) => transaction.id)).toEqual(['1', '2']);
  });

  it('returns transactions from the last 3 months', () => {
    const result = filterTransactionsByPeriod(transactions, '3m');

    expect(result.map((transaction) => transaction.id)).toEqual(['1', '2', '3', '4']);
  });

  it('returns transactions from the last 12 months', () => {
    const result = filterTransactionsByPeriod(transactions, '12m');

    expect(result.map((transaction) => transaction.id)).toEqual(['1', '2', '3', '4', '5']);
  });

  it('returns all transactions for custom period when dates are not provided', () => {
    const result = filterTransactionsByPeriod(transactions, 'custom');

    expect(result).toEqual(transactions);
  });

  it('filters transactions by custom date range', () => {
    const result = filterTransactionsByPeriod(transactions, 'custom', {
      from: new Date('2026-05-01'),
      to: new Date('2026-07-31T23:59:59'),
    });

    expect(result.map((transaction) => transaction.id)).toEqual(['3', '4']);
  });

  it('returns an empty array when no transactions match the period', () => {
    const result = filterTransactionsByPeriod([], '7d');

    expect(result).toEqual([]);
  });
});
