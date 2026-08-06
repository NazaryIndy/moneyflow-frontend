import type {
  CategoryExpense,
  Transaction,
} from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export const calculateCategoryExpenses = (
  transactions: Transaction[],
  categories: Category[],
): CategoryExpense[] => {
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  const expensesByCategory = new Map<string, number>();

  transactions
    .filter((transaction) => transaction.type === TRANSACTION_TYPE.EXPENSE)
    .forEach(({ categoryId, amount }) => {
      const current = expensesByCategory.get(categoryId) || 0;
      expensesByCategory.set(categoryId, current + amount);
    });

  const result: CategoryExpense[] = [];
  for (const [categoryId, total] of expensesByCategory.entries()) {
    const category = categoryMap.get(categoryId);
    if (category) {
      result.push({
        categoryId,
        categoryName: category.name,
        total,
        color: category.color,
      });
    } else {
      result.push({
        categoryId,
        categoryName: `Unknown (${categoryId})`,
        total,
      });
    }
  }

  result.sort((a, b) => b.total - a.total);

  return result;
};
