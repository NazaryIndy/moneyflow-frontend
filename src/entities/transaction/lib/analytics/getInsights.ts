import { getMonthOverMonthChange } from '@/entities/transaction/lib/getMonthOverMonthChange.ts';
import type { Insight, Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { getLargestExpenseCategory } from '@/entities/transaction/lib/getLargestExpenseCategory.ts';
import { getCategoryRanking } from '@/entities/transaction/lib/analytics/getCategoryRanking.ts';

export const getInsights = (transactions: Transaction[], categories: Category[]): Insight[] => {
  const insights: Insight[] = [];

  const incomeChange = getMonthOverMonthChange(transactions, 'income');
  const expenseChange = getMonthOverMonthChange(transactions, 'expense');

  if (incomeChange !== null) {
    const sign = incomeChange > 0 ? 'increased' : 'decreased';
    insights.push({
      id: 'income-change',
      text: `Your income ${sign} by ${Math.abs(incomeChange).toFixed(1)}% compared to last month.`,
    });
  }
  if (expenseChange !== null) {
    const sign = expenseChange > 0 ? 'increased' : 'decreased';
    insights.push({
      id: 'expense-change',
      text: `Your expenses ${sign} by ${Math.abs(expenseChange).toFixed(1)}% compared to last month.`,
    });
  }

  const largestCategory = getLargestExpenseCategory(transactions, categories);
  if (largestCategory) {
    insights.push({
      id: 'largest-category',
      text: `Your largest spending category is "${largestCategory.categoryName}" with $${largestCategory.total}.`,
    });
  }

  const ranking = getCategoryRanking(transactions, categories, 'expense');
  const topIncrease = ranking
    .filter((item) => item.change !== null && item.change > 0)
    .sort((a, b) => (b.change || 0) - (a.change || 0));
  const topDecrease = ranking
    .filter((item) => item.change !== null && item.change < 0)
    .sort((a, b) => (a.change || 0) - (b.change || 0));

  if (topIncrease.length) {
    const maxInc = topIncrease[0];
    insights.push({
      id: 'top-increase',
      text: `You spent ${maxInc.percentage.toFixed(1)}% more on "${maxInc.categoryName}" than last month.`,
    });
  }
  if (topDecrease.length) {
    const maxDec = topDecrease[0];
    insights.push({
      id: 'top-decrease',
      text: `You spent ${Math.abs(maxDec.change || 0).toFixed(1)}% less on "${maxDec.categoryName}" than last month.`,
    });
  }

  return insights;
};
