import { describe, expect, it, vi } from 'vitest';

import { csvToTransactions } from './csvToTransactions';
import { normalizeImportData } from './normalizeImportData';
import { validateImport } from './validateImport';
import type { ImportResult, ImportRow } from '../model/types';

vi.mock('./normalizeImportData', () => ({
  normalizeImportData: vi.fn(),
}));

vi.mock('./validateImport', () => ({
  validateImport: vi.fn(),
}));

describe('csvToTransactions', () => {
  const normalizedRow: ImportRow = {
    rowNumber: 2,
    data: {
      id: undefined,
      date: '2025-03-15',
      title: 'Grocery shopping',
      type: 'expense',
      amount: '50',
      category: 'Food',
    },
    errors: [],
    isValid: false,
  };

  const importResult: ImportResult = {
    rows: [
      {
        ...normalizedRow,
        isValid: true,
      },
    ],
    validRows: [
      {
        ...normalizedRow,
        isValid: true,
      },
    ],
    invalidRows: [],
  };

  it('parses CSV and returns validated transactions', () => {
    const csv = `date,title,type,amount,category
2025-03-15,Grocery shopping,expense,50,Food`;

    vi.mocked(normalizeImportData).mockReturnValue([normalizedRow]);
    vi.mocked(validateImport).mockReturnValue(importResult);

    const result = csvToTransactions(csv);

    expect(normalizeImportData).toHaveBeenCalledWith([
      {
        date: '2025-03-15',
        title: 'Grocery shopping',
        type: 'expense',
        amount: '50',
        category: 'Food',
      },
    ]);

    expect(validateImport).toHaveBeenCalledWith([normalizedRow]);
    expect(result).toEqual(importResult);
  });

  it('normalizes CSV headers before processing', () => {
    const csv = `DATE , TITLE , TYPE , AMOUNT , CATEGORY
2025-03-15,Grocery shopping,expense,50,Food`;

    vi.mocked(normalizeImportData).mockReturnValue([]);
    vi.mocked(validateImport).mockReturnValue({
      rows: [],
      validRows: [],
      invalidRows: [],
    });

    csvToTransactions(csv);

    expect(normalizeImportData).toHaveBeenCalledWith([
      {
        date: '2025-03-15',
        title: 'Grocery shopping',
        type: 'expense',
        amount: '50',
        category: 'Food',
      },
    ]);
  });

  it('skips empty lines', () => {
    const csv = `date,title,type,amount,category

2025-03-15,Grocery shopping,expense,50,Food

2025-03-20,Coffee,expense,5,Food`;

    vi.mocked(normalizeImportData).mockReturnValue([]);
    vi.mocked(validateImport).mockReturnValue({
      rows: [],
      validRows: [],
      invalidRows: [],
    });

    csvToTransactions(csv);

    expect(normalizeImportData).toHaveBeenCalledWith([
      {
        date: '2025-03-15',
        title: 'Grocery shopping',
        type: 'expense',
        amount: '50',
        category: 'Food',
      },
      {
        date: '2025-03-20',
        title: 'Coffee',
        type: 'expense',
        amount: '5',
        category: 'Food',
      },
    ]);
  });

  it('throws a parsing error when Papa Parse returns errors', () => {
    const invalidCsv = `"date,title
2025-03-15,Grocery shopping`;

    expect(() => csvToTransactions(invalidCsv)).toThrow(
      expect.objectContaining({
        code: 'error.parsing.csv',
        params: {
          message: expect.any(String),
        },
      }),
    );
  });

  it('returns the result from validateImport', () => {
    const csv = `date,title,type,amount,category
2025-03-15,Grocery shopping,expense,50,Food`;

    const validationResult: ImportResult = {
      rows: [
        {
          ...normalizedRow,
          isValid: false,
          errors: [
            {
              code: 'error.category.empty',
            },
          ],
        },
      ],
      validRows: [],
      invalidRows: [
        {
          ...normalizedRow,
          isValid: false,
          errors: [
            {
              code: 'error.category.empty',
            },
          ],
        },
      ],
    };

    vi.mocked(normalizeImportData).mockReturnValue([normalizedRow]);
    vi.mocked(validateImport).mockReturnValue(validationResult);

    const result = csvToTransactions(csv);

    expect(validateImport).toHaveBeenCalledWith([normalizedRow]);
    expect(result).toEqual(validationResult);
  });
});
