import type { FC } from 'react';
import type { IconType } from '@/shared/config/types.ts';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';
import type { CurrencyType, LocaleType } from '@/shared/types';
import { formatCurrency } from '@/shared/lib';

type BalanceProps = {
  title: string;
  value: number;
  icon: IconType;
  tag: string;
  currency: CurrencyType;
  locale: LocaleType;
  badge?: string;
  subtitle?: string;
};

const Balance: FC<BalanceProps> = ({
  title,
  value,
  icon: Icon,
  tag,
  badge,
  subtitle,
  currency,
  locale,
}) => {
  const formatted = formatCurrency(value, currency, locale);
  return (
    <DashboardCard
      title={title}
      value={formatted}
      icon={<Icon className="h-4 w-4" />}
      badge={badge || tag}
      description={subtitle}
      className="bg-gradient-to-br from-background to-muted/20"
    />
  );
};

export { Balance };
