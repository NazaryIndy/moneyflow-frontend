import { beforeEach, describe, expect, it, vi } from 'vitest';

import { exportTransactionsToExcel } from './exportTransactionsToExcel';

import type { Category } from '@/entities/category/model/category.types.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

import * as XLSX from 'xlsx';

vi.mock('xlsx', () => ({
  utils: {
    json_to_sheet: vi.fn(),
    book_new: vi.fn(),
    book_append_sheet: vi.fn(),
  },
  writeFile: vi.fn(),
}));

describe('exportTransactionsToExcel', () => {
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

  const worksheet = { mock: 'worksheet' };
  const workbook = { mock: 'workbook' };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(XLSX.utils.json_to_sheet).mockReturnValue(worksheet as never);
    vi.mocked(XLSX.utils.book_new).mockReturnValue(workbook as never);
  });

  it('creates a worksheet with transaction data and category names', () => {
    exportTransactionsToExcel(transactions, categories);

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([
      {
        ID: '1',
        Date: '2025-03-15',
        Title: 'Grocery shopping',
        Type: 'expense',
        Category: 'Food',
        Amount: 50,
      },
      {
        ID: '2',
        Date: '2025-03-16',
        Title: 'Bus ticket',
        Type: 'expense',
        Category: 'Transport',
        Amount: 5,
      },
    ]);
  });

  it('uses an empty category when category is not found', () => {
    const transactionsWithUnknownCategory = [
      {
        ...transactions[0],
        categoryId: 'unknown',
      },
    ] as Transaction[];

    exportTransactionsToExcel(transactionsWithUnknownCategory, categories);

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([
      {
        ID: '1',
        Date: '2025-03-15',
        Title: 'Grocery shopping',
        Type: 'expense',
        Category: '',
        Amount: 50,
      },
    ]);
  });

  it('creates a new workbook', () => {
    exportTransactionsToExcel(transactions, categories);

    expect(XLSX.utils.book_new).toHaveBeenCalledOnce();
  });

  it('appends the Transactions worksheet to the workbook', () => {
    exportTransactionsToExcel(transactions, categories);

    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(workbook, worksheet, 'Transactions');
  });

  it('writes the workbook to the correct file', () => {
    exportTransactionsToExcel(transactions, categories);

    expect(XLSX.writeFile).toHaveBeenCalledWith(workbook, 'moneyflow-transactions.xlsx');
  });

  it('handles an empty transactions array', () => {
    exportTransactionsToExcel([], categories);

    expect(XLSX.utils.json_to_sheet).toHaveBeenCalledWith([]);
    expect(XLSX.utils.book_new).toHaveBeenCalledOnce();
    expect(XLSX.utils.book_append_sheet).toHaveBeenCalledWith(workbook, worksheet, 'Transactions');
    expect(XLSX.writeFile).toHaveBeenCalledWith(workbook, 'moneyflow-transactions.xlsx');
  });

  it('does not modify the original transactions or categories', () => {
    const originalTransactions = [...transactions];
    const originalCategories = [...categories];

    exportTransactionsToExcel(transactions, categories);

    expect(transactions).toEqual(originalTransactions);
    expect(categories).toEqual(originalCategories);
  });
});
