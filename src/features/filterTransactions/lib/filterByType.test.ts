import { describe, expect, it } from 'vitest';

import { filterByType } from './filterByType';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { TransactionTypeFilter } from '@/features/filterTransactions/model/filterTransactions.types.ts';

const transactions = [
  {
    id: '1',
    type: 'income',
  },
  {
    id: '2',
    type: 'expense',
  },
  {
    id: '3',
    type: 'income',
  },
] as Transaction[];

describe('filterByType', () => {
  it('returns all transactions when type is "all"', () => {
    const result = filterByType(transactions, 'all');

    expect(result).toEqual(transactions);
  });

  it('returns transactions with the selected type', () => {
    const result = filterByType(transactions, 'income' as TransactionTypeFilter);

    expect(result).toEqual([
      {
        id: '1',
        type: 'income',
      },
      {
        id: '3',
        type: 'income',
      },
    ]);
  });

  it('returns an empty array when no transactions match the type', () => {
    const result = filterByType(transactions, 'transfer' as TransactionTypeFilter);
    expect(result).toEqual([]);
  });

  it('does not mutate the original transactions array', () => {
    const result = filterByType(transactions, 'income' as TransactionTypeFilter);

    expect(result).not.toBe(transactions);
    expect(transactions).toHaveLength(3);
  });
});
