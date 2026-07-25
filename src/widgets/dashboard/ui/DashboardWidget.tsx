import type { FC } from 'react';
import { RecentTransactionsCard } from '@/shared/ui';
import { Landmark, Loader2Icon } from 'lucide-react';
import { useDashboardStatistics } from '@/widgets/dashboard/model/useDashboardStatistics.ts';
import { DashboardError } from '@/widgets/dashboard/ui/DashboardError.tsx';
import { TotalTransactions } from '@/widgets/dashboard/ui/TotalTransactions.tsx';
import { AverageExpense } from '@/widgets/dashboard/ui/AverageExpense.tsx';
import { LargestExpense } from '@/widgets/dashboard/ui/LargestExpense.tsx';
import { LargestExpenseCategory } from '@/widgets/dashboard/ui/LargestExpenseCategory.tsx';
import { buildMainDashboardData } from '@/widgets/dashboard/lib/dashboard-helpers.ts';
import { IncomeExpenseCard } from '@/widgets/dashboard/ui/IncomeExpenseCard.tsx';
import { Balance } from '@/widgets/dashboard/ui/Balance.tsx';

const DashboardWidget: FC = () => {
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
  } = useDashboardStatistics();

  const mainData = buildMainDashboardData(
    statistics.income,
    statistics.expense,
    monthOverMonth.incomeChange,
    monthOverMonth.expenseChange,
    '$', // TODO брать из контекста валюты
  );

  if (isLoading) {
    return <Loader2Icon className="size-4 animate-spin" />;
  }

  if (isError) {
    return <DashboardError />;
  }

  return (
    <div className="space-y-6 w-full px-4 sm:px-6 lg:px-8">
      <IncomeExpenseCard mainDashboard={mainData} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        <AverageExpense value={averageExpense} />
        {largestExpense && (
          <LargestExpense
            amount={largestExpense.amount}
            title={largestExpense.title}
            categoryName={largestExpense.categoryName}
          />
        )}
        {largestExpenseCategory && (
          <LargestExpenseCategory
            categoryName={largestExpenseCategory.categoryName}
            total={largestExpenseCategory.total}
          />
        )}
        <TotalTransactions value={totalTransactions} />
        <Balance
          title="Balance"
          value={statistics.balance}
          icon={Landmark}
          tag="Balance"
          subtitle="Current balance"
        />
      </div>

      <RecentTransactionsCard title="Recent Transactions" transactions={recentTransactions} />
    </div>
  );
};

export { DashboardWidget };
