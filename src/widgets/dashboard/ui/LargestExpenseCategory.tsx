import type { FC } from 'react';
import { PieChart } from 'lucide-react';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';

type LargestExpenseCategoryProps = {
  categoryName: string;
  total: number;
  currencySymbol?: string;
};

const LargestExpenseCategory: FC<LargestExpenseCategoryProps> = ({
  categoryName,
  total,
  currencySymbol = '$',
}) => {
  const formatted = `${currencySymbol}${total.toLocaleString()}`;
  return (
    <DashboardCard
      title="Top Spending Category"
      value={categoryName}
      icon={<PieChart className="h-4 w-4" />}
      description={`Total: ${formatted}`}
    />
  );
};

export { LargestExpenseCategory };
