import { useMemo, useState, type FC } from 'react';
import { useTransactionsData } from '@/entities/transaction';
import { AnalyticsFilters } from './AnalyticsFilters';
import { useAnalytics } from '../model/useAnalytics';
import { getCategoryMonthlyTrends } from '@/entities/transaction/lib/getCategoryMonthlyTrends';
import { getCategoryRanking } from '@/entities/transaction/lib/getCategoryRanking';
import { getMonthlySummary } from '@/entities/transaction/lib/getMonthlySummary.tsx';
import { IncomeExpenseChart } from '@/widgets/analytics/ui/IncomeExpenseChart.tsx';
import { CategoryBreakdown } from '@/widgets/analytics/ui/CategoryBreakdown.tsx';
import { SpendingTrends } from '@/widgets/analytics/ui/SpendingTrends.tsx';
import { CategoryRanking } from '@/widgets/analytics/ui/CategoryRanking.tsx';
import { MonthlySummary } from '@/widgets/analytics/ui/MonthlySummary.tsx';
import { Insights } from '@/widgets/analytics/ui/Insights.tsx';
import { filterTransactionsByPeriod } from '@/entities/transaction/lib/filterTransactionsByPeriod.tsx';
import { getInsights } from '@/entities/transaction/lib/getInsights.tsx';
import { getCategoryIncome } from '@/entities/transaction/lib/getCategoryIncome.tsx';
import type {
  CategoryFilter,
  TimePeriod,
  TypeFilter,
} from '@/widgets/analytics/model/analytics.types.ts';

const AnalyticsWidget: FC = () => {
  const {
    transactions,
    categories,
    isLoadingCategories,
    isLoadingTransactions,
    isErrorCategories,
    isErrorTransactions,
  } = useTransactionsData();

  const [period, setPeriod] = useState<TimePeriod>('1m');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all');
  const [breakdownType, setBreakdownType] = useState<'expense' | 'income'>('expense');

  const filteredTransactions = useMemo(() => {
    return filterTransactionsByPeriod(transactions, period);
  }, [transactions, period]);

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
    () => getInsights(filteredTransactions, categories),
    [filteredTransactions, categories],
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

  if (isLoadingCategories || isLoadingTransactions) return <div>Loading...</div>;
  if (isErrorCategories || isErrorTransactions) return <div>Error...</div>;

  return (
    <div className="p-6 space-y-6">
      <AnalyticsFilters
        period={period}
        setPeriod={setPeriod}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        categories={categories}
      />

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
        <CategoryRanking data={rankingExpense} type="expense" />
      </div>

      <MonthlySummary data={monthlySummary} />
      <Insights insights={insights} />
    </div>
  );
};
export { AnalyticsWidget };
