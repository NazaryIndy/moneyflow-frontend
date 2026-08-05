import { useMemo, useState, type FC } from 'react';
import { useTransactionsData } from '@/entities/transaction';
import { useAnalytics } from '../model/useAnalytics';
import { getCategoryMonthlyTrends } from '@/entities/transaction/lib/analytics/getCategoryMonthlyTrends.ts';
import { getCategoryRanking } from '@/entities/transaction/lib/analytics/getCategoryRanking.ts';
import { getMonthlySummary } from '@/entities/transaction/lib/analytics/getMonthlySummary.ts';
import { IncomeExpenseChart } from '@/widgets/analytics/ui/IncomeExpenseChart.tsx';
import { CategoryBreakdown } from '@/widgets/analytics/ui/CategoryBreakdown.tsx';
import { SpendingTrends } from '@/widgets/analytics/ui/SpendingTrends.tsx';
import { CategoryRanking } from '@/widgets/analytics/ui/CategoryRanking.tsx';
import { MonthlySummary } from '@/widgets/analytics/ui/MonthlySummary.tsx';
import { Insights } from '@/widgets/analytics/ui/Insights.tsx';
import { getInsights } from '@/entities/transaction/lib/analytics/getInsights.ts';
import { getCategoryIncome } from '@/entities/transaction/lib/analytics/getCategoryIncome.ts';

import { AnalyticsFilters } from '@/features/filterTransactions/ui/AnalyticsFilters.tsx';

import { useTransactionFilters } from '@/features/filterTransactions/model/useTransactionFilters.ts';
import { applyFilters } from '@/features/filterTransactions/lib/applyFilters.ts';
import { Loader } from '@/shared/ui';
import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { useTranslation } from 'react-i18next';
import { createAnalyticsTranslation } from '@/shared/lib/createAnalyticsTranslation.ts';

interface AnalyticsWidgetProps {
  settings: UserSettings;
}

const AnalyticsWidget: FC<AnalyticsWidgetProps> = ({ settings }) => {
  const { t } = useTranslation('analytics');

  const translation = createAnalyticsTranslation(t);

  const {
    transactions,
    categories,
    isLoadingCategories,
    isLoadingTransactions,
    isErrorCategories,
    isErrorTransactions,
  } = useTransactionsData();

  const { period, categoryFilter, typeFilter } = useTransactionFilters();
  const [breakdownType, setBreakdownType] = useState<TransactionType>('expense');

  const filteredTransactions = useMemo(() => {
    return applyFilters(transactions, {
      period,
      type: typeFilter,
      category: categoryFilter,
    });
  }, [transactions, period, typeFilter, categoryFilter]);

  const { categoryExpenses, monthlyStats } = useAnalytics({
    topCategoriesLimit: 5,
    transactions: filteredTransactions,
  });

  const trends = useMemo(
    () => getCategoryMonthlyTrends(filteredTransactions, categories, 5),
    [filteredTransactions, categories],
  );
  const rankingExpense = useMemo(
    () => getCategoryRanking(filteredTransactions, categories, 'expense'),
    [filteredTransactions, categories],
  );
  const monthlySummary = useMemo(
    () => getMonthlySummary(filteredTransactions, categories),
    [filteredTransactions, categories],
  );
  const insights = useMemo(
    () => getInsights(filteredTransactions, categories, settings, translation),
    [filteredTransactions, categories, settings, translation],
  );

  const handleBreakdownToggle = () => {
    setBreakdownType((prev) => (prev === 'expense' ? 'income' : 'expense'));
  };

  const breakdownData = useMemo(() => {
    if (breakdownType === 'expense') {
      return categoryExpenses;
    } else {
      return getCategoryIncome(filteredTransactions, categories);
    }
  }, [breakdownType, categoryExpenses, filteredTransactions, categories]);

  if (isLoadingCategories || isLoadingTransactions) return <Loader />;
  if (isErrorCategories || isErrorTransactions) return <div>Error...</div>;

  return (
    <div className="p-6 space-y-6">
      <AnalyticsFilters categories={categories} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <IncomeExpenseChart data={monthlyStats} className="lg:col-span-3" />
        <CategoryBreakdown
          data={breakdownData}
          type={breakdownType}
          onTypeChange={handleBreakdownToggle}
          className="lg:col-span-2"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SpendingTrends data={trends} />
        <CategoryRanking
          data={rankingExpense}
          type="expense"
          currency={settings.currency}
          locale={settings.locale}
        />
      </div>

      <MonthlySummary data={monthlySummary} currency={settings.currency} locale={settings.locale} />
      <Insights insights={insights} />
    </div>
  );
};
export { AnalyticsWidget };
