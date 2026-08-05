import type {
  Transaction,
  TransactionType,
} from '@/entities/transaction/model/transaction.types.ts';

export const getMonthOverMonthChange = (
  transactions: Transaction[],
  type: TransactionType,
): number | null => {
  const monthMap = new Map<string, number>();
  for (const transaction of transactions) {
    if (transaction.type !== type) continue;
    const month = transaction.date.slice(0, 7);
    const current = monthMap.get(month) || 0;
    monthMap.set(month, current + transaction.amount);
  }

  const sortedMonths = Array.from(monthMap.keys()).sort();
  if (sortedMonths.length < 2) return null;

  const currentMonth = sortedMonths[sortedMonths.length - 1];
  const previousMonth = sortedMonths[sortedMonths.length - 2];

  const currentTotal = monthMap.get(currentMonth)!;
  const previousTotal = monthMap.get(previousMonth)!;

  if (previousTotal === 0) return null;

  return ((currentTotal - previousTotal) / previousTotal) * 100;
};
