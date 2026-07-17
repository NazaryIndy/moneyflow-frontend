import type { FC } from 'react';
import { StatsCard } from '@/shared/ui';

const Dashboard: FC = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <StatsCard title={'Balance'} value={10000} />
      <StatsCard title={'Income'} value={6000} />
      <StatsCard title={'Expense'} value={2300} />
      <StatsCard title={'Budget'} value={60} />
    </>
  );
};

export { Dashboard };
