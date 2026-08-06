import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { TimePeriod } from '@/shared/types';
import { TIME_PERIOD } from '@/shared/constants';

type CustomPeriod = {
  from: Date;
  to: Date;
};

const parseDateOnly = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);

  return new Date(year, month - 1, day);
};

export const filterTransactionsByPeriod = (
  transactions: Transaction[],
  period: TimePeriod,
  customPeriod?: CustomPeriod,
): Transaction[] => {
  const now = new Date();
  now.setHours(23, 59, 59, 999);

  if (period === TIME_PERIOD.CUSTOM) {
    if (!customPeriod) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      const transactionDate = parseDateOnly(transaction.date);

      return transactionDate >= customPeriod.from && transactionDate <= customPeriod.to;
    });
  }

  const dateFrom = new Date(now);
  dateFrom.setHours(0, 0, 0, 0);

  switch (period) {
    case TIME_PERIOD.WEEK:
      dateFrom.setDate(dateFrom.getDate() - 7);
      break;

    case TIME_PERIOD.MONTH:
      dateFrom.setMonth(dateFrom.getMonth() - 1);
      break;

    case TIME_PERIOD.THREE_MONTHS:
      dateFrom.setMonth(dateFrom.getMonth() - 3);
      break;

    case TIME_PERIOD.YEAR:
      dateFrom.setMonth(dateFrom.getMonth() - 12);
      break;

    default:
      return transactions;
  }

  return transactions.filter((transaction) => {
    const transactionDate = parseDateOnly(transaction.date);

    return transactionDate >= dateFrom && transactionDate <= now;
  });
};
