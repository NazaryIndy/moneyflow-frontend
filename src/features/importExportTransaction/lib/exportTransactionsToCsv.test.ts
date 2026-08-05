import { describe, expect, it } from 'vitest';

import { exportTransactionsToCsv } from './exportTransactionsToCsv';

import type { Category } from '@/entities/category/model/category.types.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

const categories = [
  {
    id: 'food',
    name: 'Food',
  },
  {
    id: 'transport',
    name: 'Transport',
  },
] as Category[];

const transactions = [
  {
    id: '1',
    date: '2025-03-15',
    title: 'Grocery shopping',
    type: 'expense',
    categoryId: 'food',
    amount: 50,
  },
  {
    id: '2',
    date: '2025-03-16',
    title: 'Bus ticket',
    type: 'expense',
    categoryId: 'transport',
    amount: 5,
  },
] as Transaction[];

describe('exportTransactionsToCsv', () => {
  it('exports transactions to CSV with category names', () => {
    const result = exportTransactionsToCsv(transactions, categories);

    expect(result).toContain('id,date,title,type,category,amount');
    expect(result).toContain('1,2025-03-15,Grocery shopping,expense,Food,50');
    expect(result).toContain('2,2025-03-16,Bus ticket,expense,Transport,5');
  });

  it('exports an empty category when category is not found', () => {
    const transactionsWithUnknownCategory = [
      {
        ...transactions[0],
        categoryId: 'unknown',
      },
    ] as Transaction[];

    const result = exportTransactionsToCsv(transactionsWithUnknownCategory, categories);

    expect(result).toContain('1,2025-03-15,Grocery shopping,expense,,50');
  });

  it('returns an empty string when transactions array is empty', () => {
    const result = exportTransactionsToCsv([], categories);

    expect(result).toBe('');
  });

  it('exports all transaction fields', () => {
    const result = exportTransactionsToCsv(transactions, categories);

    expect(result).toContain('1');
    expect(result).toContain('2025-03-15');
    expect(result).toContain('Grocery shopping');
    expect(result).toContain('expense');
    expect(result).toContain('Food');
    expect(result).toContain('50');
  });

  it('does not modify the original transactions or categories', () => {
    const originalTransactions = [...transactions];
    const originalCategories = [...categories];

    exportTransactionsToCsv(transactions, categories);

    expect(transactions).toEqual(originalTransactions);
    expect(categories).toEqual(originalCategories);
  });
});
