import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { findById } from '@/shared/lib';

export const getCategoryMonthlyTrends = (
  transactions: Transaction[],
  categories: Category[],
  limit = 5,
): { categoryName: string; color: string; data: { month: string; amount: number }[] }[] => {
  const expenses = transactions.filter((t) => t.type === 'expense');

  const categoryMap = new Map<string, Map<string, number>>();
  expenses.forEach(({ categoryId, amount, date }) => {
    const month = date.slice(0, 7);
    if (!categoryMap.has(categoryId)) {
      categoryMap.set(categoryId, new Map());
    }
    const monthMap = categoryMap.get(categoryId)!;
    const current = monthMap.get(month) || 0;
    monthMap.set(month, current + amount);
  });

  const categoryTotals: { categoryId: string; total: number }[] = [];
  for (const [catId, monthMap] of categoryMap.entries()) {
    let total = 0;
    for (const amount of monthMap.values()) total += amount;
    categoryTotals.push({ categoryId: catId, total });
  }
  categoryTotals.sort((a, b) => b.total - a.total);
  const topCategoryIds = categoryTotals.slice(0, limit).map((item) => item.categoryId);

  const allMonths = new Set<string>();
  for (const monthMap of categoryMap.values()) {
    for (const month of monthMap.keys()) allMonths.add(month);
  }
  const sortedMonths = Array.from(allMonths).sort();

  const result: {
    categoryName: string;
    color: string;
    data: { month: string; amount: number }[];
  }[] = [];
  for (const categoryId of topCategoryIds) {
    const category = findById(categories, categoryId);
    const monthMap = categoryMap.get(categoryId)!;
    const data = sortedMonths.map((month) => ({
      month,
      amount: monthMap.get(month) || 0,
    }));
    result.push({
      categoryName: category?.name || 'Unknown',
      color: category?.color || '#888888',
      data,
    });
  }
  return result;
};
