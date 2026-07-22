import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type {
  Category,
  CategoryTotal,
  CategoryTotalsResult,
} from '@/entities/category/model/category.types.ts';

export { getDashboardStatistics, calculateBalance, getCategoryTotals };

const getCategoryTotals = (
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

const getDashboardStatistics = (transactions: Transaction[], transactionCount: number = 5) => {
  const { income, expense } = calculateIncomeAndExpense(transactions);

  const balance = income - expense;
  const recent = getRecentTransactions(transactions, transactionCount);

  return { income, expense, balance, recent };
};

const getRecentTransactions = (transactions: Transaction[], transactionCount: number) => {
  const sorted = [...transactions].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return sorted.slice(0, transactionCount);
};

const calculateBalance = (transactions: Transaction[]) => {
  return transactions.reduce((total, transaction) => {
    return transaction.type === 'income' ? total + transaction.amount : total - transaction.amount;
  }, 0);
};

const calculateIncomeAndExpense = (transactions: Transaction[]) => {
  return transactions.reduce(
    (acc, tr) => {
      if (tr.type === 'income') acc.income += tr.amount;
      else if (tr.type === 'expense') acc.expense += tr.amount;
      return acc;
    },
    { income: 0, expense: 0 },
  );
};
