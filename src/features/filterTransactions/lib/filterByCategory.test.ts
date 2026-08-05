import { describe, expect, it } from 'vitest';

import { filterByCategory } from './filterByCategory';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { CategoryFilter } from '@/features/filterTransactions/model/filterTransactions.types.ts';

describe('filterByCategory', () => {
  const transactions = [
    {
      id: '1',
      categoryId: 'food',
    },
    {
      id: '2',
      categoryId: 'transport',
    },
    {
      id: '3',
      categoryId: 'food',
    },
  ] as Transaction[];

  it('returns all transactions when category is "all"', () => {
    const result = filterByCategory(transactions, 'all');

    expect(result).toEqual(transactions);
  });

  it('returns transactions with the selected category', () => {
    const result = filterByCategory(transactions, 'food' as CategoryFilter);

    expect(result).toEqual([
      {
        id: '1',
        categoryId: 'food',
      },
      {
        id: '3',
        categoryId: 'food',
      },
    ]);
  });

  it('returns an empty array when no transactions match the category', () => {
    const result = filterByCategory(transactions, 'shopping' as CategoryFilter);

    expect(result).toEqual([]);
  });

  it('does not mutate the original transactions array', () => {
    const result = filterByCategory(transactions, 'food' as CategoryFilter);

    expect(result).not.toBe(transactions);
    expect(transactions).toHaveLength(3);
  });
});
