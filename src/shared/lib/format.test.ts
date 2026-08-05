import { describe, expect, it } from 'vitest';
import { formatCurrency, formatDate } from './format';

describe('formatCurrency', () => {
  it('formats USD currency for English locale', () => {
    expect(formatCurrency(1234.56, 'USD', 'en')).toBe('$1,234.56');
  });

  it('formats USD currency for Russian locale', () => {
    expect(formatCurrency(1234.56, 'USD', 'ru')).toBe('1\u00A0234,56\u00A0$');
  });

  it('formats EUR currency for English locale', () => {
    expect(formatCurrency(1234.56, 'EUR', 'en')).toBe('€1,234.56');
  });

  it('formats EUR currency for Russian locale', () => {
    expect(formatCurrency(1234.56, 'EUR', 'ru')).toBe('1\u00A0234,56\u00A0€');
  });

  it('uses two fraction digits by default', () => {
    expect(formatCurrency(100, 'USD', 'en')).toBe('$100.00');
  });

  it('uses custom fraction digits', () => {
    expect(formatCurrency(1234.567, 'USD', 'en', 0)).toBe('$1,235');
  });

  it('formats zero correctly', () => {
    expect(formatCurrency(0, 'USD', 'en')).toBe('$0.00');
  });

  it('formats negative values correctly', () => {
    expect(formatCurrency(-1234.56, 'USD', 'en')).toBe('-$1,234.56');
  });
});

describe('formatDate', () => {
  it('formats date as MM/dd/yyyy', () => {
    expect(formatDate(new Date(2026, 7, 5), 'MM/dd/yyyy')).toBe('08/05/2026');
  });

  it('formats date as dd.MM.yyyy', () => {
    expect(formatDate(new Date(2026, 7, 5), 'dd.MM.yyyy')).toBe('05.08.2026');
  });

  it('accepts date string', () => {
    expect(formatDate('2026-08-05', 'MM/dd/yyyy')).toBe('08/05/2026');
  });

  it('accepts Date object', () => {
    expect(formatDate(new Date(2026, 7, 5), 'MM/dd/yyyy')).toBe('08/05/2026');
  });

  it('pads single-digit day and month with zeros', () => {
    expect(formatDate(new Date(2026, 0, 5), 'MM/dd/yyyy')).toBe('01/05/2026');
    expect(formatDate(new Date(2026, 7, 5), 'dd.MM.yyyy')).toBe('05.08.2026');
  });

  it('returns empty string for invalid date string', () => {
    expect(formatDate('invalid-date', 'MM/dd/yyyy')).toBe('');
  });

  it('returns empty string for invalid Date object', () => {
    expect(formatDate(new Date('invalid'), 'MM/dd/yyyy')).toBe('');
  });
});
