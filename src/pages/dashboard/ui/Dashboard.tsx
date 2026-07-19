import type { FC } from 'react';
import { PageContainer, RecentTransactionsCard, StatsCard } from '@/shared/ui';
import { calculateStatistics } from '@/entities/transaction/lib/calculations.ts';
import { BanknoteArrowDown, BanknoteArrowUp, Landmark, Wallet } from 'lucide-react';
import { useTransactions } from '@/entities/transaction/api';

const Dashboard: FC = () => {
  const { data } = useTransactions();

  if (!data) {
    return (
      <PageContainer title={'Dashboard'} className="flex justify-between gap-10 flex-wrap">
        <div className="mt-5 text-2xl">No transactions yet</div>
      </PageContainer>
    );
  }

  const { income, expense, balance, recent } = calculateStatistics(data, 5);

  return (
    <PageContainer title={'Dashboard'} className="flex justify-between gap-10 flex-wrap">
      <StatsCard title={'Balance'} value={balance} icon={Wallet} tag={'Balance'} color={'blue'} />
      <StatsCard
        title={'Income'}
        value={income}
        icon={BanknoteArrowUp}
        tag={'Income'}
        color={'green'}
      />
      <StatsCard
        title={'Expense'}
        value={expense}
        icon={BanknoteArrowDown}
        tag={'Expense'}
        color={'red'}
      />
      <StatsCard title={'Budget'} value={60} icon={Landmark} tag={'Budget'} color={'purple'} />
      <RecentTransactionsCard title={'Recent Transactions'} transactions={recent} />
    </PageContainer>
  );
};

export { Dashboard };
