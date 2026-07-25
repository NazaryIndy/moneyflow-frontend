import type { FC } from 'react';
import type { IconType } from '@/shared/config/types.ts';
import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';

type BalanceProps = {
  title: string;
  value: number;
  icon: IconType;
  tag: string;
  badge?: string;
  subtitle?: string;
  currencySymbol?: string;
};

const Balance: FC<BalanceProps> = ({
  title,
  value,
  icon: Icon,
  tag,
  badge,
  subtitle,
  currencySymbol = '$',
}) => {
  const formatted = `${currencySymbol}${value.toLocaleString()}`;
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
