import type { FC } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';
import type { CurrencyType, LocaleType } from '@/shared/types';
import { formatCurrency } from '@/shared/lib';

type LargestExpenseProps = {
  amount: number;
  title: string;
  categoryName: string;
  currency: CurrencyType;
  locale: LocaleType;
};

const LargestExpense: FC<LargestExpenseProps> = ({
  amount,
  title,
  categoryName,
  currency,
  locale,
}) => {
  const formatted = formatCurrency(amount, currency, locale, 0);

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
