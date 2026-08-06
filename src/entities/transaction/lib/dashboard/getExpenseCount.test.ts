import { describe, expect, it } from 'vitest';

import { getExpenseCount } from '@/entities/transaction/lib/dashboard/getExpenseCount.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

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

describe('getExpenseCount', () => {
  it('returns the number of expense transactions', () => {
    expect(getExpenseCount(transactions)).toBe(1);
  });

  it('returns zero for empty transactions', () => {
    expect(getExpenseCount([])).toBe(0);
  });

  it('does not count income transactions', () => {
    const incomeTransactions = transactions.filter(
      (transaction) => transaction.type === TRANSACTION_TYPE.INCOME,
    );
    expect(getExpenseCount(incomeTransactions)).toBe(0);
  });

  it('counts multiple expense transactions', () => {
    const transactionsWithMultipleExpenses: Transaction[] = [
      ...transactions,
      {
        id: '4',
        date: '2026-06-04',
        title: 'Rent',
        type: 'expense',
        categoryId: 'housing',
        amount: 2000,
      },
      {
        id: '5',
        date: '2026-06-05',
        title: 'Transport',
        type: 'expense',
        categoryId: 'transport',
        amount: 500,
      },
    ];
    expect(getExpenseCount(transactionsWithMultipleExpenses)).toBe(3);
  });
});
