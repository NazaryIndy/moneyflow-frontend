import { getMonthOverMonthChange } from '@/entities/transaction/lib/calculations/getMonthOverMonthChange.ts';
import type { Insight, Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { getLargestExpenseCategory } from '@/entities/transaction/lib/calculations/getLargestExpenseCategory.ts';
import { getCategoryRanking } from '@/entities/transaction/lib/analytics/getCategoryRanking.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { formatCurrency } from '@/shared/lib';
import type { TranslationFunction } from '@/shared/types/translation.type.ts';

export const getInsights = (
  transactions: Transaction[],
  categories: Category[],
  settings: UserSettings,
  t: TranslationFunction,
): Insight[] => {
  const insights: Insight[] = [];

  const incomeChange = getMonthOverMonthChange(transactions, 'income');
  const expenseChange = getMonthOverMonthChange(transactions, 'expense');

  if (incomeChange !== null) {
    const key = incomeChange > 0 ? 'insight.income.increased' : 'insight.income.decreased';
    insights.push({
      id: 'income-change',
      text: t(key, { percentage: Math.abs(incomeChange).toFixed(1) }),
    });
  }

  if (expenseChange !== null) {
    const key = expenseChange > 0 ? 'insight.expense.increased' : 'insight.expense.decreased';
    insights.push({
      id: 'expense-change',
      text: t(key, { percentage: Math.abs(expenseChange).toFixed(1) }),
    });
  }

  const largestCategory = getLargestExpenseCategory(transactions, categories);
  if (largestCategory) {
    const formattedAmount = formatCurrency(
      largestCategory.total,
      settings.currency,
      settings.locale,
      0,
    );
    insights.push({
      id: 'largest-category',
      text: t('insight.largestCategory', {
        categoryName: largestCategory.categoryName,
        amount: formattedAmount,
      }),
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
      text: t('insight.topIncrease', {
        percentage: Math.abs(maxInc.change!).toFixed(1),
        categoryName: maxInc.categoryName,
      }),
    });
  }

  if (topDecrease.length) {
    const maxDec = topDecrease[0];
    insights.push({
      id: 'top-decrease',
      text: t('insight.topDecrease', {
        percentage: Math.abs(maxDec.change || 0).toFixed(1),
        categoryName: maxDec.categoryName,
      }),
    });
  }

  return insights;
};
