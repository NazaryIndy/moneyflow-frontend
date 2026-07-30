import type { FC } from 'react';
import { Wallet } from 'lucide-react';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';
import type { CurrencyType, LocaleType } from '@/shared/types';
import { formatCurrency } from '@/shared/lib';

type AverageExpenseProps = {
  value: number;
  currency: CurrencyType;
  locale: LocaleType;
};

const AverageExpense: FC<AverageExpenseProps> = ({ value, currency, locale }) => {
  const formatted = formatCurrency(value, currency, locale, 0);

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
