import type { CurrencyType } from '@/shared/types/currency.type.ts';
import type { LocaleType } from '@/shared/types/locale.types.ts';
import type { DateFormatType } from '@/shared/types';
import { DATE_FORMAT } from '@/shared/constants';

export const formatCurrency = (
  value: number,
  currency: CurrencyType,
  locale: LocaleType,
  fractionDigits: number = 2,
): string => {
  const formatter = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
    currencyDisplay: 'symbol',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
  return formatter.format(value);
};

export const formatDate = (date: Date | string, format: DateFormatType): string => {
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) {
    return '';
  }

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();

  if (format === DATE_FORMAT.US) {
    return `${month}/${day}/${year}`;
  }
  // формат 'dd.MM.yyyy'
  return `${day}.${month}.${year}`;
};
