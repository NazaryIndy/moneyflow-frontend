import type { FC } from 'react';
import BoardCard from '@/shared/ui/board-card/BoardCard.tsx';

type DashboardProps = {};

const Dashboard: FC<DashboardProps> = (props) => {
  const {} = props;

  return (
    <>
      <h1>Dashboard</h1>
      <BoardCard title={'Balance'} />
      <BoardCard title={'Income'} />
      <BoardCard title={'Expense'} />
      <BoardCard title={'Budget'} />
    </>
  );
};

export { Dashboard, type DashboardProps };
