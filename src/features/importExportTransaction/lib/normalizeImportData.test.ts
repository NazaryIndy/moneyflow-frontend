import { describe, expect, it } from 'vitest';

import { normalizeImportData } from './normalizeImportData';
import type { ParsedCsvRow } from '../model/types';

describe('normalizeImportData', () => {
  it('normalizes all fields and assigns the correct row number', () => {
    const rows: ParsedCsvRow[] = [
      {
        id: '  123  ',
        date: ' 2025-03-15 ',
        title: ' Grocery shopping ',
        type: ' expense ',
        category: ' Food ',
        amount: ' 50 ',
      },
    ];

    const result = normalizeImportData(rows);

    expect(result).toEqual([
      {
        rowNumber: 2,
        data: {
          id: '123',
          date: '2025-03-15',
          title: 'Grocery shopping',
          type: 'expense',
          category: 'Food',
          amount: '50',
        },
        errors: [],
        isValid: false,
      },
    ]);
  });

  it('converts an empty id to undefined', () => {
    const rows: ParsedCsvRow[] = [
      {
        id: '   ',
        date: '2025-03-15',
        title: 'Grocery shopping',
        type: 'expense',
        category: 'Food',
        amount: '50',
      },
    ];

    const result = normalizeImportData(rows);

    expect(result[0]?.data.id).toBeUndefined();
  });

  it('converts missing fields to empty strings', () => {
    const rows: ParsedCsvRow[] = [{}];

    const result = normalizeImportData(rows);

    expect(result).toEqual([
      {
        rowNumber: 2,
        data: {
          id: undefined,
          date: '',
          title: '',
          type: '',
          category: '',
          amount: '',
        },
        errors: [],
        isValid: false,
      },
    ]);
  });

  it('trims whitespace from all fields', () => {
    const rows: ParsedCsvRow[] = [
      {
        id: ' 1 ',
        date: ' 2025-03-15 ',
        title: '  Coffee  ',
        type: '  income ',
        category: '  Salary ',
        amount: ' 1000 ',
      },
    ];

    const result = normalizeImportData(rows);

    expect(result[0]?.data).toEqual({
      id: '1',
      date: '2025-03-15',
      title: 'Coffee',
      type: 'income',
      category: 'Salary',
      amount: '1000',
    });
  });

  it('assigns sequential row numbers starting from 2', () => {
    const rows: ParsedCsvRow[] = [
      {
        id: '1',
        date: '2025-03-15',
        title: 'Grocery shopping',
        type: 'expense',
        category: 'Food',
        amount: '50',
      },
      {
        id: '2',
        date: '2025-03-16',
        title: 'Bus ticket',
        type: 'expense',
        category: 'Transport',
        amount: '5',
      },
      {
        id: '3',
        date: '2025-03-17',
        title: 'Salary',
        type: 'income',
        category: 'Salary',
        amount: '2000',
      },
    ];

    const result = normalizeImportData(rows);

    expect(result.map((row) => row.rowNumber)).toEqual([2, 3, 4]);
  });

  it('initializes errors as an empty array and isValid as false', () => {
    const rows: ParsedCsvRow[] = [
      {
        id: '1',
        date: '2025-03-15',
        title: 'Grocery shopping',
        type: 'expense',
        category: 'Food',
        amount: '50',
      },
    ];

    const result = normalizeImportData(rows);

    expect(result[0]?.errors).toEqual([]);
    expect(result[0]?.isValid).toBe(false);
  });

  it('returns an empty array when there are no rows', () => {
    const result = normalizeImportData([]);

    expect(result).toEqual([]);
  });

  it('does not mutate the original rows', () => {
    const rows: ParsedCsvRow[] = [
      {
        id: ' 1 ',
        date: ' 2025-03-15 ',
        title: ' Coffee ',
        type: ' expense ',
        category: ' Food ',
        amount: ' 5 ',
      },
    ];

    const originalRows = structuredClone(rows);

    normalizeImportData(rows);

    expect(rows).toEqual(originalRows);
  });
});
