import { Badge, Card, CardContent, CardHeader, CardTitle } from '@/shared/ui';
import { cn } from '@/shared/lib/utils.ts';
import type { FC, ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  description?: string;
  badge?: string;
  badgeClassName?: string;
  footer?: ReactNode;
  className?: string;
  children?: ReactNode;
  action?: ReactNode;
}

const DashboardCard: FC<DashboardCardProps> = ({
  title,
  value,
  icon,
  description,
  badge,
  badgeClassName,
  footer,
  className,
  children,
  action,
}) => {
  return (
    <Card className={cn('overflow-hidden h-full flex flex-col', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {action && action}
        {icon && <div className="h-4 w-4 text-muted-foreground">{icon}</div>}
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between">
        <div>
          <div className="text-2xl font-bold">{value}</div>
          {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
          {badge && <Badge className={cn('mt-2', badgeClassName)}>{badge}</Badge>}
        </div>
        {footer && <div className="mt-4">{footer}</div>}
        {children}
      </CardContent>
    </Card>
  );
};

export { DashboardCard };
