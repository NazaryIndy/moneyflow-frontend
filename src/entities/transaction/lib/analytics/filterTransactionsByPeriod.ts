import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { TimePeriod } from '@/shared/types';

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

  if (period === 'custom') {
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
    case '7d':
      dateFrom.setDate(dateFrom.getDate() - 7);
      break;

    case '1m':
      dateFrom.setMonth(dateFrom.getMonth() - 1);
      break;

    case '3m':
      dateFrom.setMonth(dateFrom.getMonth() - 3);
      break;

    case '12m':
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
