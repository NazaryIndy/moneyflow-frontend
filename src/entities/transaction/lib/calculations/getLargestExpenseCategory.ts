import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

export const getLargestExpenseCategory = (
  transactions: Transaction[],
  categories: Category[],
): { categoryName: string; total: number } | null => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return null;

  const categoryMap = new Map<string, number>();
  for (const t of expenses) {
    const current = categoryMap.get(t.categoryId) || 0;
    categoryMap.set(t.categoryId, current + t.amount);
  }

  let maxCategoryId = '';
  let maxTotal = 0;
  for (const [id, total] of categoryMap.entries()) {
    if (total > maxTotal) {
      maxTotal = total;
      maxCategoryId = id;
    }
  }

  const category = categories.find((c) => c.id === maxCategoryId);
  const categoryName = category ? category.name : 'Unknown';

  return { categoryName, total: maxTotal };
};
