import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';

export const getLargestExpense = (
  transactions: Transaction[],
  categories: Category[],
): { amount: number; title: string; categoryName: string } | null => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  if (expenses.length === 0) return null;

  const largest = expenses.reduce((max, curr) => (curr.amount > max.amount ? curr : max));

  const category = categories.find((c) => c.id === largest.categoryId);
  const categoryName = category ? category.name : 'Unknown';

  return {
    amount: largest.amount,
    title: largest.title,
    categoryName,
  };
};
