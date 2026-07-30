import { type FC, useState } from 'react';
import { Loader, RecentTransactionsCard } from '@/shared/ui';
import { Calendar, Landmark, TrendingDown } from 'lucide-react';
import { useDashboardStatistics } from '@/widgets/dashboard/model/useDashboardStatistics.ts';
import { DashboardError } from '@/widgets/dashboard/ui/DashboardError.tsx';
import { TotalTransactions } from '@/widgets/dashboard/ui/TotalTransactions.tsx';
import { AverageExpense } from '@/widgets/dashboard/ui/AverageExpense.tsx';
import { LargestExpense } from '@/widgets/dashboard/ui/LargestExpense.tsx';
import { LargestExpenseCategory } from '@/widgets/dashboard/ui/LargestExpenseCategory.tsx';
import { buildMainDashboardData } from '@/widgets/dashboard/lib/dashboard-helpers.ts';
import { IncomeExpenseCard } from '@/widgets/dashboard/ui/IncomeExpenseCard.tsx';
import { Balance } from '@/widgets/dashboard/ui/Balance.tsx';
import { BudgetCard } from '@/widgets/dashboard/ui/BudgetCard.tsx';
import { SetBudgetButton, SetBudgetDialog } from '@/features/setBudget';
import { useBudgetStatistics } from '@/widgets/dashboard/model/useBudgetStatistics.tsx';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { formatCurrency } from '@/shared/lib';

interface DashboardWidgetProps {
  settings: UserSettings;
}

const DashboardWidget: FC<DashboardWidgetProps> = ({ settings }) => {
  const {
    isLoading,
    isError,
    statistics,
    recentTransactions,
    totalTransactions,
    averageExpense,
    largestExpense,
    largestExpenseCategory,
    monthOverMonth,
    incomeCount,
    expenseCount,
    averageDailySpending,
    projectedMonthEndSpending,
  } = useDashboardStatistics();

  const mainData = buildMainDashboardData(
    statistics.income,
    statistics.expense,
    monthOverMonth.incomeChange,
    monthOverMonth.expenseChange,
    settings.currency,
    settings.locale,
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const budgetStatistics = useBudgetStatistics();

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <DashboardError />;
  }

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8">
      <IncomeExpenseCard mainDashboard={mainData} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {budgetStatistics ? (
          <BudgetCard
            budgetStatistics={budgetStatistics}
            currency={settings.currency}
            locale={settings.locale}
          />
        ) : (
          <>
            <SetBudgetButton setOpen={setDialogOpen} />
            <SetBudgetDialog open={dialogOpen} setOpen={setDialogOpen} />
          </>
        )}
        <Balance
          title="Balance"
          value={statistics.balance}
          icon={Landmark}
          tag="Balance"
          subtitle="Current balance"
          currency={settings.currency}
          locale={settings.locale}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <DashboardCard
          title="Average Daily Spending"
          value={formatCurrency(averageDailySpending, settings.currency, settings.locale)}
          description="per day"
          icon={<TrendingDown className="h-4 w-4" />}
        />
        <DashboardCard
          title="Projected Month End Spending"
          value={formatCurrency(projectedMonthEndSpending, settings.currency, settings.locale)}
          description={`Based on ${averageDailySpending.toFixed(0)} ${settings.currency}/day`}
          icon={<Calendar className="h-4 w-4" />}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <AverageExpense
          value={averageExpense}
          currency={settings.currency}
          locale={settings.locale}
        />
        {largestExpense && (
          <LargestExpense
            amount={largestExpense.amount}
            title={largestExpense.title}
            categoryName={largestExpense.categoryName}
            currency={settings.currency}
            locale={settings.locale}
          />
        )}
        {largestExpenseCategory && (
          <LargestExpenseCategory
            categoryName={largestExpenseCategory.categoryName}
            total={largestExpenseCategory.total}
            currency={settings.currency}
            locale={settings.locale}
          />
        )}
        <TotalTransactions
          value={totalTransactions}
          incomeCount={incomeCount}
          expenseCount={expenseCount}
        />
      </div>

      <RecentTransactionsCard
        title="Recent Transactions"
        transactions={recentTransactions}
        settings={settings}
      />
    </div>
  );
};

export { DashboardWidget };
