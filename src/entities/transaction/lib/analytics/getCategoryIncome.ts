import type {
  CategoryIncome,
  Transaction,
} from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export const getCategoryIncome = (
  transactions: Transaction[],
  categories: Category[],
): CategoryIncome[] => {
  const categoryMap = new Map(categories.map((category) => [category.id, category]));
  const incomeByCategory = new Map<string, number>();

  transactions
    .filter((transaction) => transaction.type === TRANSACTION_TYPE.INCOME)
    .forEach(({ categoryId, amount }) => {
      const current = incomeByCategory.get(categoryId) || 0;
      incomeByCategory.set(categoryId, current + amount);
    });

  const result: CategoryIncome[] = [];
  for (const [categoryId, total] of incomeByCategory.entries()) {
    const category = categoryMap.get(categoryId);
    result.push({
      categoryId,
      categoryName: category?.name || 'Unknown',
      total,
      color: category?.color,
    });
  }
  return result.sort((a, b) => b.total - a.total);
};
