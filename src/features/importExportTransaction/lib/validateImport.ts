import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import type { ImportError, ImportResult, ImportRow } from '../model/types';

const VALID_TYPES: TransactionType[] = ['income', 'expense'];

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export const validateImport = (rows: ImportRow[]): ImportResult => {
  const validatedRows = rows.map((row) => {
    const errors: ImportError[] = [];
    const data = { ...row.data };

    // Date
    if (!data.date) {
      errors.push({ code: 'error.date.empty' });
    } else if (!DATE_REGEX.test(data.date)) {
      errors.push({ code: 'error.date.format' });
    }

    // Title
    if (!data.title.trim()) {
      errors.push({ code: 'error.title.empty' });
    }

    // Type
    const normalizedType = data.type.trim().toLowerCase();
    if (!normalizedType) {
      errors.push({ code: 'error.type.empty' });
    } else if (!VALID_TYPES.includes(normalizedType as TransactionType)) {
      errors.push({ code: 'error.type.invalid', params: { value: data.type } });
    } else {
      data.type = normalizedType;
    }

    // Category
    if (!data.category.trim()) {
      errors.push({ code: 'error.category.empty' });
    }

    // Amount
    const normalizedAmount = data.amount.trim().replace(',', '.');
    if (!normalizedAmount) {
      errors.push({ code: 'error.amount.empty' });
    } else {
      const numericAmount = Number(normalizedAmount);
      if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
        errors.push({ code: 'error.amount.positive' });
      } else {
        data.amount = String(numericAmount);
      }
    }

    return {
      ...row,
      data,
      errors,
      isValid: errors.length === 0,
    };
  });

  const validRows = validatedRows.filter((row) => row.isValid);

  const invalidRows = validatedRows.filter((row) => !row.isValid);

  return {
    rows: validatedRows,
    validRows,
    invalidRows,
  };
};
