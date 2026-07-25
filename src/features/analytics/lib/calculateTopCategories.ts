import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import type { CategoryExpense } from '@/features/analytics/model/analytics.types.ts';
import { calculateCategoryExpenses } from '@/features/analytics/lib/calculateCategoryExpenses.ts';

export const calculateTopCategories = (
  transactions: Transaction[],
  categories: Category[],
  topN: number = 5,
): CategoryExpense[] => {
  const allExpenses = calculateCategoryExpenses(transactions, categories);
  return allExpenses.slice(0, topN);
};
