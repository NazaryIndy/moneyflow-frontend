import type { Category } from '@/entities/category/model/category.types.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { findById } from '@/shared/lib';

export const getMonthlySummary = (
  transactions: Transaction[],
  categories: Category[],
): {
  month: string;
  income: number;
  expense: number;
  savings: number;
  avgTransaction: number;
  largestExpense: { amount: number; title: string; categoryName: string } | null;
  largestIncome: { amount: number; title: string; categoryName: string } | null;
}[] => {
  const monthMap = new Map<
    string,
    {
      income: number;
      expense: number;
      transactions: Transaction[];
    }
  >();

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);
    if (!monthMap.has(month)) {
      monthMap.set(month, { income: 0, expense: 0, transactions: [] });
    }
    const entry = monthMap.get(month)!;
    if (transaction.type === 'income') entry.income += transaction.amount;
    else entry.expense += transaction.amount;
    entry.transactions.push(transaction);
  });

  const result = [];
  for (const [month, { income, expense, transactions: monthTxs }] of monthMap.entries()) {
    const totalTx = monthTxs.length;
    const avgTransaction =
      totalTx > 0 ? monthTxs.reduce((sum, t) => sum + t.amount, 0) / totalTx : 0;
    const expensesOnly = monthTxs.filter((t) => t.type === 'expense');
    const incomesOnly = monthTxs.filter((t) => t.type === 'income');

    let largestExpense = null;
    if (expensesOnly.length) {
      const maxExp = expensesOnly.reduce((a, b) => (a.amount > b.amount ? a : b));
      const category = findById(categories, maxExp.categoryId);
      largestExpense = {
        amount: maxExp.amount,
        title: maxExp.title,
        categoryName: category?.name || 'Unknown',
      };
    }

    let largestIncome = null;
    if (incomesOnly.length) {
      const maxInc = incomesOnly.reduce((a, b) => (a.amount > b.amount ? a : b));
      const category = findById(categories, maxInc.categoryId);
      largestIncome = {
        amount: maxInc.amount,
        title: maxInc.title,
        categoryName: category?.name || 'Unknown',
      };
    }

    result.push({
      month,
      income,
      expense,
      savings: income - expense,
      avgTransaction,
      largestExpense,
      largestIncome,
    });
  }

  return result.sort((a, b) => a.month.localeCompare(b.month));
};
