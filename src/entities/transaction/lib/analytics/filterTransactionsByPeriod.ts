import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { TimePeriod } from '@/widgets/analytics/model/analytics.types.ts';

export const filterTransactionsByPeriod = (
  transactions: Transaction[],
  period: TimePeriod,
): Transaction[] => {
  if (period === '7d') {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return transactions.filter((t) => new Date(t.date) >= date);
  }
  if (period === '1m') {
    const date = new Date();
    date.setMonth(date.getMonth() - 1);
    return transactions.filter((t) => new Date(t.date) >= date);
  }
  return transactions;
};
