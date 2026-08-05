import { describe, expect, it, vi } from 'vitest';

import { getInsights } from '@/entities/transaction/lib/analytics/getInsights.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import type { TranslationFunction } from '@/shared/types/translation.type.ts';

const categories: Category[] = [
  {
    id: 'housing',
    name: 'Housing',
    color: '#8b5cf6',
    type: 'expense',
  },
  {
    id: 'food',
    name: 'Food',
    color: '#f59e0b',
    type: 'expense',
  },
  {
    id: 'salary',
    name: 'Salary',
    color: '#22c55e',
    type: 'income',
  },
];

const settings: UserSettings = {
  id: '1',
  currency: 'USD',
  locale: 'en',
  dateFormat: 'MM/dd/yyyy',
  theme: 'system',
};

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
    date: '2026-06-05',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1000,
  },
  {
    id: '3',
    date: '2026-06-10',
    title: 'Food',
    type: 'expense',
    categoryId: 'food',
    amount: 500,
  },
  {
    id: '4',
    date: '2026-07-01',
    title: 'Salary',
    type: 'income',
    categoryId: 'salary',
    amount: 6000,
  },
  {
    id: '5',
    date: '2026-07-05',
    title: 'Rent',
    type: 'expense',
    categoryId: 'housing',
    amount: 1200,
  },
  {
    id: '6',
    date: '2026-07-10',
    title: 'Food',
    type: 'expense',
    categoryId: 'food',
    amount: 300,
  },
];

const t: TranslationFunction = vi.fn((key, options) => {
  return `${key} ${JSON.stringify(options ?? {})}`;
});

describe('getInsights', () => {
  it('returns income and expense change insights', () => {
    const result = getInsights(transactions, categories, settings, t);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: 'income-change',
        }),
        expect.objectContaining({
          id: 'expense-change',
        }),
      ]),
    );
  });

  it('returns largest category insight', () => {
    const result = getInsights(transactions, categories, settings, t);

    const insight = result.find((item) => item.id === 'largest-category');

    expect(insight).toBeDefined();
    expect(insight?.text).toContain('Housing');
  });

  it('returns top increase insight', () => {
    const result = getInsights(transactions, categories, settings, t);

    const insight = result.find((item) => item.id === 'top-increase');

    expect(insight).toBeDefined();
    expect(insight?.text).toContain('Housing');
  });

  it('returns top decrease insight', () => {
    const result = getInsights(transactions, categories, settings, t);

    const insight = result.find((item) => item.id === 'top-decrease');

    expect(insight).toBeDefined();
    expect(insight?.text).toContain('Food');
  });

  it('returns all expected insights when enough data is available', () => {
    const result = getInsights(transactions, categories, settings, t);

    expect(result).toHaveLength(5);

    expect(result.map((item) => item.id)).toEqual([
      'income-change',
      'expense-change',
      'largest-category',
      'top-increase',
      'top-decrease',
    ]);
  });

  it('returns no insights when there are no transactions', () => {
    const result = getInsights([], categories, settings, t);

    expect(result).toEqual([]);
  });

  it('does not return change insights when there is only one month', () => {
    const singleMonthTransactions: Transaction[] = [
      {
        id: '1',
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 5000,
      },
      {
        id: '2',
        date: '2026-07-05',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 1000,
      },
    ];

    const result = getInsights(singleMonthTransactions, categories, settings, t);

    expect(result.find((item) => item.id === 'income-change')).toBeUndefined();
    expect(result.find((item) => item.id === 'expense-change')).toBeUndefined();

    expect(result.find((item) => item.id === 'largest-category')).toBeDefined();
  });

  it('does not add largest category insight when there are no expenses', () => {
    const incomeOnlyTransactions: Transaction[] = [
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
        date: '2026-07-01',
        title: 'Salary',
        type: 'income',
        categoryId: 'salary',
        amount: 6000,
      },
    ];

    const result = getInsights(incomeOnlyTransactions, categories, settings, t);

    expect(result.find((item) => item.id === 'largest-category')).toBeUndefined();
    expect(result.find((item) => item.id === 'top-increase')).toBeUndefined();
    expect(result.find((item) => item.id === 'top-decrease')).toBeUndefined();
  });

  it('uses Unknown when an expense category does not exist', () => {
    const transactionsWithUnknownCategory: Transaction[] = [
      {
        id: '1',
        date: '2026-06-01',
        title: 'Unknown expense',
        type: 'expense',
        categoryId: 'unknown-category',
        amount: 1000,
      },
      {
        id: '2',
        date: '2026-07-01',
        title: 'Unknown expense',
        type: 'expense',
        categoryId: 'unknown-category',
        amount: 1500,
      },
    ];

    const result = getInsights(transactionsWithUnknownCategory, categories, settings, t);

    const insight = result.find((item) => item.id === 'largest-category');

    expect(insight).toBeDefined();
    expect(insight?.text).toContain('Unknown');
  });

  it('passes correct data to translation function', () => {
    getInsights(transactions, categories, settings, t);

    expect(t).toHaveBeenCalledWith(
      'insight.largestCategory',
      expect.objectContaining({
        categoryName: 'Housing',
      }),
    );
  });

  it('passes absolute increase percentage to translation function', () => {
    getInsights(transactions, categories, settings, t);

    expect(t).toHaveBeenCalledWith(
      'insight.topIncrease',
      expect.objectContaining({
        categoryName: 'Housing',
        percentage: expect.any(String),
      }),
    );
  });
});
