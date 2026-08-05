import { describe, expect, it } from 'vitest';

import { searchTransactions } from './searchTransactions';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

const transactions = [
  {
    id: '1',
    title: 'Grocery shopping',
  },
  {
    id: '2',
    title: 'Monthly rent',
  },
  {
    id: '3',
    title: 'Coffee with friends',
  },
] as Transaction[];

describe('searchTransactions', () => {
  it('returns all transactions when search term is empty', () => {
    const result = searchTransactions(transactions, '');

    expect(result).toEqual(transactions);
  });

  it('returns all transactions when search term contains only spaces', () => {
    const result = searchTransactions(transactions, '   ');

    expect(result).toEqual(transactions);
  });

  it('finds transactions by part of the title', () => {
    const result = searchTransactions(transactions, 'coffee');

    expect(result).toEqual([
      {
        id: '3',
        title: 'Coffee with friends',
      },
    ]);
  });

  it('searches case-insensitively', () => {
    const result = searchTransactions(transactions, 'GROCERY');

    expect(result).toEqual([
      {
        id: '1',
        title: 'Grocery shopping',
      },
    ]);
  });

  it('ignores leading and trailing spaces in the search term', () => {
    const result = searchTransactions(transactions, '  rent  ');

    expect(result).toEqual([
      {
        id: '2',
        title: 'Monthly rent',
      },
    ]);
  });

  it('returns an empty array when no transactions match the search term', () => {
    const result = searchTransactions(transactions, 'travel');

    expect(result).toEqual([]);
  });

  it('does not mutate the original transactions array', () => {
    const result = searchTransactions(transactions, 'coffee');

    expect(result).not.toBe(transactions);
    expect(transactions).toHaveLength(3);
  });
});
