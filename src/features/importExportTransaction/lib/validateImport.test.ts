import { describe, expect, it } from 'vitest';

import { validateImport } from './validateImport';
import type { ImportRow } from '@/features/importExportTransaction/model/types.ts';

describe('validateImport', () => {
  const createRow = (overrides: Partial<ImportRow['data']> = {}): ImportRow => ({
    rowNumber: 2,
    data: {
      id: '1',
      date: '2025-03-15',
      title: 'Grocery shopping',
      type: 'expense',
      category: 'Food',
      amount: '50',
      ...overrides,
    },
    errors: [],
    isValid: false,
  });

  it('returns a valid row when all fields are correct', () => {
    const rows = [createRow()];

    const result = validateImport(rows);

    expect(result.rows).toEqual([
      {
        ...rows[0],
        data: {
          ...rows[0].data,
          amount: '50',
        },
        errors: [],
        isValid: true,
      },
    ]);

    expect(result.validRows).toHaveLength(1);
    expect(result.invalidRows).toHaveLength(0);
  });

  describe('date validation', () => {
    it('returns error when date is empty', () => {
      const result = validateImport([createRow({ date: '' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.date.empty',
      });
    });

    it('returns error when date has invalid format', () => {
      const result = validateImport([createRow({ date: '15-03-2025' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.date.format',
      });
    });

    it('accepts date in YYYY-MM-DD format', () => {
      const result = validateImport([createRow({ date: '2025-03-15' })]);

      expect(result.rows[0]?.errors).not.toContainEqual({
        code: 'error.date.empty',
      });

      expect(result.rows[0]?.errors).not.toContainEqual({
        code: 'error.date.format',
      });
    });
  });

  describe('title validation', () => {
    it('returns error when title is empty', () => {
      const result = validateImport([createRow({ title: '' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.title.empty',
      });
    });

    it('returns error when title contains only spaces', () => {
      const result = validateImport([createRow({ title: '   ' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.title.empty',
      });
    });
  });

  describe('type validation', () => {
    it('returns error when type is empty', () => {
      const result = validateImport([createRow({ type: '' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.type.empty',
      });
    });

    it('returns error when type is invalid', () => {
      const result = validateImport([createRow({ type: 'transfer' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.type.invalid',
        params: {
          value: 'transfer',
        },
      });
    });

    it('normalizes type to lowercase', () => {
      const result = validateImport([createRow({ type: 'EXPENSE' })]);

      expect(result.rows[0]?.data.type).toBe('expense');
      expect(result.rows[0]?.isValid).toBe(true);
    });

    it('accepts income type', () => {
      const result = validateImport([createRow({ type: 'income' })]);

      expect(result.rows[0]?.isValid).toBe(true);
    });

    it('accepts expense type', () => {
      const result = validateImport([createRow({ type: 'expense' })]);

      expect(result.rows[0]?.isValid).toBe(true);
    });
  });

  describe('category validation', () => {
    it('returns error when category is empty', () => {
      const result = validateImport([createRow({ category: '' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.category.empty',
      });
    });

    it('returns error when category contains only spaces', () => {
      const result = validateImport([createRow({ category: '   ' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.category.empty',
      });
    });
  });

  describe('amount validation', () => {
    it('returns error when amount is empty', () => {
      const result = validateImport([createRow({ amount: '' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.amount.empty',
      });
    });

    it('returns error when amount is zero', () => {
      const result = validateImport([createRow({ amount: '0' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.amount.positive',
      });
    });

    it('returns error when amount is negative', () => {
      const result = validateImport([createRow({ amount: '-10' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.amount.positive',
      });
    });

    it('returns error when amount is not a number', () => {
      const result = validateImport([createRow({ amount: 'abc' })]);

      expect(result.rows[0]?.errors).toContainEqual({
        code: 'error.amount.positive',
      });
    });

    it('accepts decimal amount with a dot', () => {
      const result = validateImport([createRow({ amount: '10.50' })]);

      expect(result.rows[0]?.data.amount).toBe('10.5');
      expect(result.rows[0]?.isValid).toBe(true);
    });

    it('accepts decimal amount with a comma', () => {
      const result = validateImport([createRow({ amount: '10,50' })]);

      expect(result.rows[0]?.data.amount).toBe('10.5');
      expect(result.rows[0]?.isValid).toBe(true);
    });

    it('normalizes amount to a numeric string', () => {
      const result = validateImport([createRow({ amount: ' 100.00 ' })]);

      expect(result.rows[0]?.data.amount).toBe('100');
      expect(result.rows[0]?.isValid).toBe(true);
    });
  });

  describe('rows classification', () => {
    it('separates valid and invalid rows', () => {
      const rows = [
        createRow({
          id: '1',
          title: 'Valid transaction',
        }),
        createRow({
          id: '2',
          title: '',
        }),
      ];

      const result = validateImport(rows);

      expect(result.validRows).toHaveLength(1);
      expect(result.invalidRows).toHaveLength(1);

      expect(result.validRows[0]?.data.id).toBe('1');
      expect(result.invalidRows[0]?.data.id).toBe('2');
    });

    it('returns all validated rows in the rows property', () => {
      const rows = [createRow({ id: '1' }), createRow({ id: '2', amount: '-10' })];

      const result = validateImport(rows);

      expect(result.rows).toHaveLength(2);
      expect(result.rows[0]?.isValid).toBe(true);
      expect(result.rows[1]?.isValid).toBe(false);
    });

    it('marks a row as invalid when it has multiple errors', () => {
      const result = validateImport([
        createRow({
          date: '',
          title: '',
          type: '',
          category: '',
          amount: '',
        }),
      ]);

      expect(result.rows[0]?.isValid).toBe(false);
      expect(result.rows[0]?.errors).toHaveLength(5);

      expect(result.rows[0]?.errors).toEqual([
        { code: 'error.date.empty' },
        { code: 'error.title.empty' },
        { code: 'error.type.empty' },
        { code: 'error.category.empty' },
        { code: 'error.amount.empty' },
      ]);
    });
  });

  it('returns empty result for empty input', () => {
    const result = validateImport([]);

    expect(result).toEqual({
      rows: [],
      validRows: [],
      invalidRows: [],
    });
  });

  it('does not mutate the original rows', () => {
    const rows = [
      createRow({
        type: 'EXPENSE',
        amount: '10,50',
      }),
    ];

    const originalRows = structuredClone(rows);

    validateImport(rows);

    expect(rows).toEqual(originalRows);
  });
});
