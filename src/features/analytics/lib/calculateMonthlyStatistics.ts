import type { MonthlyStatistics } from '@/features/analytics/model/analytics.types.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export const calculateMonthlyStatistics = (transactions: Transaction[]): MonthlyStatistics[] => {
  const monthMap = new Map<string, { income: number; expense: number }>();

  transactions.forEach(({ date, type, amount }) => {
    const month = date.slice(0, 7);

    const entry = monthMap.get(month) || { income: 0, expense: 0 };

    if (type === 'income') {
      entry.income += amount;
    } else {
      entry.expense += amount;
    }

    monthMap.set(month, entry);
  });

  const result: MonthlyStatistics[] = [];
  for (const [month, { income, expense }] of monthMap.entries()) {
    result.push({ month, income, expense });
  }

  result.sort((a, b) => a.month.localeCompare(b.month));

  return result;
};
