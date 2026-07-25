import type { FC } from 'react';
import { ListChecks } from 'lucide-react';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';

type TotalTransactionsProps = {
  value: number;
  incomeCount?: number;
  expenseCount?: number;
};

const TotalTransactions: FC<TotalTransactionsProps> = ({ value, incomeCount, expenseCount }) => {
  return (
    <DashboardCard
      title="Total Transactions"
      value={value}
      icon={<ListChecks className="h-4 w-4" />}
      description={`${incomeCount ?? '?'} income · ${expenseCount ?? '?'} expense`}
    />
  );
};

export { TotalTransactions };
