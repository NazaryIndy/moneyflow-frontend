import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { unparse } from 'papaparse';
import type { Category } from '@/entities/category/model/category.types.ts';
import { findCategoryById } from '@/features/importExportTransaction/lib/findCategoryById.ts';

export const exportTransactionsToCsv = (
  transactions: Transaction[],
  categories: Category[],
): string => {
  const data = transactions.map((transaction) => {
    const category = findCategoryById(categories, transaction.categoryId);

    return {
      id: transaction.id,
      date: transaction.date,
      title: transaction.title,
      type: transaction.type,
      category: category?.name ?? '',
      amount: transaction.amount,
    };
  });

  return unparse(data);
};
