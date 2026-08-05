import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { findById } from '@/shared/lib';

export const getLargestExpenseCategory = (
  transactions: Transaction[],
  categories: Category[],
): { categoryName: string; total: number } | null => {
  const expenses = transactions.filter((transaction) => transaction.type === 'expense');
  if (expenses.length === 0) return null;

  const categoryMap = new Map<string, number>();
  for (const transaction of expenses) {
    const current = categoryMap.get(transaction.categoryId) || 0;
    categoryMap.set(transaction.categoryId, current + transaction.amount);
  }

  let maxCategoryId = '';
  let maxTotal = 0;
  for (const [id, total] of categoryMap.entries()) {
    if (total > maxTotal) {
      maxTotal = total;
      maxCategoryId = id;
    }
  }

  const category = findById(categories, maxCategoryId);
  const categoryName = category ? category.name : 'Unknown';

  return { categoryName, total: maxTotal };
};
