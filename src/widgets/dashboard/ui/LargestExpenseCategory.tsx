import type { FC } from 'react';
import { PieChart } from 'lucide-react';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';
import { formatCurrency } from '@/shared/lib';
import type { CurrencyType, LocaleType } from '@/shared/types';

type LargestExpenseCategoryProps = {
  categoryName: string;
  total: number;
  currency: CurrencyType;
  locale: LocaleType;
};

const LargestExpenseCategory: FC<LargestExpenseCategoryProps> = ({
  categoryName,
  total,
  currency,
  locale,
}) => {
  const formatted = formatCurrency(total, currency, locale, 0);

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
