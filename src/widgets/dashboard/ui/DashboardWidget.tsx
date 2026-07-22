import type { FC } from 'react';
import { RecentTransactionsCard, StatsCard } from '@/shared/ui';
import { BanknoteArrowDown, BanknoteArrowUp, Landmark, Loader2Icon, Wallet } from 'lucide-react';
import { useDashboardStatistics } from '@/widgets/dashboard/model/useDashboardStatistics.ts';
import { DashboardError } from '@/widgets/dashboard/ui/DashboardError.tsx';

const DashboardWidget: FC = () => {
  const { statistics, recentTransactions, isLoading, isError } = useDashboardStatistics();

  if (isLoading) {
    return <Loader2Icon className="size-4 animate-spin" />;
  }

  if (isError) {
    return <DashboardError />;
  }

  return (
    <>
      <StatsCard title={'Balance'} value={statistics.balance} icon={Landmark} tag={'Balance'} />
      <StatsCard title={'Income'} value={statistics.income} icon={BanknoteArrowUp} tag={'Income'} />
      <StatsCard
        title={'Expense'}
        value={statistics.expense}
        icon={BanknoteArrowDown}
        tag={'Expense'}
      />
      <StatsCard title={'Budget'} value={60} icon={Wallet} tag={'Budget'} />
      <RecentTransactionsCard title={'Recent Transactions'} transactions={recentTransactions} />
    </>
  );
};

export { DashboardWidget };
