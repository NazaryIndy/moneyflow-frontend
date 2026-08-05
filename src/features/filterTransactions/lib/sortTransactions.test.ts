import { describe, expect, it } from 'vitest';

import { sortTransactions } from './sortTransactions';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { TransactionSortBy } from '@/features/filterTransactions/model/filterTransactions.types.ts';

const transactions = [
  {
    id: '1',
    title: 'Grocery shopping',
    date: '2025-03-15',
    amount: 50,
  },
  {
    id: '2',
    title: 'Monthly rent',
    date: '2025-03-01',
    amount: 1000,
  },
  {
    id: '3',
    title: 'Coffee',
    date: '2025-03-20',
    amount: 5,
  },
] as Transaction[];

describe('sortTransactions', () => {
  it('sorts transactions from newest to oldest', () => {
    const result = sortTransactions(transactions, 'newest');

    expect(result.map((transaction) => transaction.id)).toEqual(['3', '1', '2']);
  });

  it('sorts transactions from oldest to newest', () => {
    const result = sortTransactions(transactions, 'oldest');

    expect(result.map((transaction) => transaction.id)).toEqual(['2', '1', '3']);
  });

  it('sorts transactions from highest to lowest amount', () => {
    const result = sortTransactions(transactions, 'highest');

    expect(result.map((transaction) => transaction.id)).toEqual(['2', '1', '3']);
  });

  it('sorts transactions from lowest to highest amount', () => {
    const result = sortTransactions(transactions, 'lowest');

    expect(result.map((transaction) => transaction.id)).toEqual(['3', '1', '2']);
  });

  it('returns transactions in the original order for an unsupported sort option', () => {
    const result = sortTransactions(transactions, 'unsupported' as TransactionSortBy);

    expect(result).toEqual(transactions);
  });

  it('does not mutate the original transactions array', () => {
    const originalOrder = [...transactions];

    sortTransactions(transactions, 'newest');

    expect(transactions).toEqual(originalOrder);
  });
});
