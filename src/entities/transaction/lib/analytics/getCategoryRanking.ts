import type {
  Transaction,
  TransactionType,
} from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { findById } from '@/shared/lib';

export const getCategoryRanking = (
  transactions: Transaction[],
  categories: Category[],
  type: TransactionType,
): { categoryName: string; amount: number; percentage: number; change: number | null }[] => {
  const filtered = transactions.filter((transaction) => transaction.type === type);

  const totalAmount = filtered.reduce((sum, transaction) => sum + transaction.amount, 0);

  const categoryMap = new Map<string, { total: number; monthly: Map<string, number> }>();
  filtered.forEach(({ categoryId, amount, date }) => {
    const month = date.slice(0, 7);
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, { total: 0, monthly: new Map() });
    }
    const entry = categoryMap.get(categoryId)!;
    entry.total += amount;
    const currentMonth = entry.monthly.get(month) || 0;
    entry.monthly.set(month, currentMonth + amount);
  });

  const allMonths = Array.from(
    new Set(Array.from(categoryMap.values()).flatMap((entry) => Array.from(entry.monthly.keys()))),
  ).sort();

  const lastMonth = allMonths[allMonths.length - 1];
  const prevMonth = allMonths[allMonths.length - 2];

  const result: {
    categoryName: string;
    amount: number;
    percentage: number;
    change: number | null;
  }[] = [];

  for (const [categoryId, { total, monthly }] of categoryMap.entries()) {
    const category = findById(categories, categoryId);
    const percentage = totalAmount > 0 ? (total / totalAmount) * 100 : 0;

    let change: number | null = null;
    if (lastMonth && prevMonth) {
      const currentMonthAmount = monthly.get(lastMonth) || 0;
      const prevMonthAmount = monthly.get(prevMonth) || 0;
      if (prevMonthAmount > 0) {
        change = ((currentMonthAmount - prevMonthAmount) / prevMonthAmount) * 100;
      }
    }

    result.push({
      categoryName: category?.name || 'Unknown',
      amount: total,
      percentage,
      change,
    });
  }

  return result.sort((a, b) => b.amount - a.amount);
};
