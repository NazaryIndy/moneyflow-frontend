import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type {
  Category,
  CategoryTotal,
  CategoryTotalsResult,
} from '@/entities/category/model/category.types.ts';

export const getCategoryTotals = (
  transactions: Transaction[],
  categories: Category[],
): CategoryTotalsResult => {
  const categoryMap = new Map(categories.map((cat) => [cat.id, cat]));

  const incomeMap = new Map<string, number>();
  const expenseMap = new Map<string, number>();

  for (const { categoryId, amount, type } of transactions) {
    const category = categoryMap.get(categoryId);
    if (!category) continue;

    const targetMap = type === 'income' ? incomeMap : expenseMap;
    const current = targetMap.get(categoryId) ?? 0;
    targetMap.set(categoryId, current + amount);
  }

  const buildResult = (map: Map<string, number>): CategoryTotal[] => {
    return Array.from(map.entries())
      .map(([categoryId, amount]) => {
        const category = categoryMap.get(categoryId)!;
        return {
          categoryId,
          categoryName: category.name,
          amount,
          color: category.color,
        };
      })
      .sort((a, b) => b.amount - a.amount); // сортируем по убыванию суммы
  };

  return {
    income: buildResult(incomeMap),
    expense: buildResult(expenseMap),
  };
};
