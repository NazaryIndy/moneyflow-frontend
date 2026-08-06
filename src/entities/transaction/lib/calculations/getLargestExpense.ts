import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { findById } from '@/shared/lib';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export const getLargestExpense = (
  transactions: Transaction[],
  categories: Category[],
): { amount: number; title: string; categoryName: string } | null => {
  const expenses = transactions.filter(
    (transaction) => transaction.type === TRANSACTION_TYPE.EXPENSE,
  );
  if (expenses.length === 0) return null;

  const largest = expenses.reduce((max, curr) => (curr.amount > max.amount ? curr : max));

  const category = findById(categories, largest.categoryId);
  const categoryName = category ? category.name : 'Unknown';

  return {
    amount: largest.amount,
    title: largest.title,
    categoryName,
  };
};
