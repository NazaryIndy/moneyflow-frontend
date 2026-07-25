import type { FC } from 'react';
import { Wallet } from 'lucide-react';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';

type AverageExpenseProps = {
  value: number;
  currencySymbol?: string;
};

const AverageExpense: FC<AverageExpenseProps> = ({ value, currencySymbol = '$' }) => {
  const formatted = `${currencySymbol}${value.toLocaleString()}`;
  return (
    <DashboardCard
      title="Average Expense"
      value={formatted}
      icon={<Wallet className="h-4 w-4" />}
      description="per transaction"
    />
  );
};

export { AverageExpense };
