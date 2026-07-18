import type { FC } from 'react';
import { PageContainer, PageTitle, StatsCard } from '@/shared/ui';

const Dashboard: FC = () => {
  return (
    <PageContainer>
      <PageTitle title="Dashboard" />
      <StatsCard title={'Balance'} value={10000} />
      <StatsCard title={'Income'} value={6000} />
      <StatsCard title={'Expense'} value={2300} />
      <StatsCard title={'Budget'} value={60} />
    </PageContainer>
  );
};

export { Dashboard };
