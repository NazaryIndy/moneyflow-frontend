import type { FC } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';

type LargestExpenseProps = {
  amount: number;
  title: string;
  categoryName: string;
  currencySymbol?: string;
};

const LargestExpense: FC<LargestExpenseProps> = ({
  amount,
  title,
  categoryName,
  currencySymbol = '$',
}) => {
  const formatted = `${currencySymbol}${amount.toLocaleString()}`;
  return (
    <DashboardCard
      title="Largest Expense"
      value={formatted}
      icon={<ArrowUpRight className="h-4 w-4 text-expense" />}
      description={`${title} (${categoryName})`}
    />
  );
};

export { LargestExpense };
