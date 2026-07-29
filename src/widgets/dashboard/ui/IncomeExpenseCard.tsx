import type { FC } from 'react';
import { Badge, Card, Separator } from '@/shared/ui';
import { CardContent } from '@/shared/ui/shadcn/card.tsx';
import { cn } from '@/shared/lib/utils.ts';
import type { MainDashboardData } from '@/widgets/dashboard/lib/dashboard-helpers.ts';

type IncomeExpenseCardProps = {
  mainDashboard: MainDashboardData;
};

const IncomeExpenseCard: FC<IncomeExpenseCardProps> = ({ mainDashboard }) => {
  return (
    <Card className="relative overflow-hidden w-full">
      <CardContent className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col gap-4 sm:gap-6">
          <div>
            <p className="text-base sm:text-lg font-medium text-card-foreground">
              {mainDashboard.title}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground">{mainDashboard.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-3">
            {mainDashboard.metrics.map((metric, index) => (
              <div key={index} className="flex items-center gap-3 sm:gap-6">
                <div className="flex-1">
                  <p className="text-xs font-normal text-muted-foreground">{metric.label}</p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <p className="text-xl sm:text-2xl font-medium text-card-foreground">
                      {metric.value}
                    </p>
                    <Badge
                      className={cn(
                        'font-normal text-xs',
                        metric.isPositive
                          ? 'bg-income-background text-income'
                          : 'bg-expense-background text-expense',
                      )}
                    >
                      {metric.percentage}
                    </Badge>
                  </div>
                </div>
                {index < mainDashboard.metrics.length - 1 && (
                  <>
                    <Separator className="sm:hidden w-full" />
                    <Separator orientation="vertical" className="hidden sm:block h-12" />
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

        <img
          src="https://images.shadcnspace.com/assets/backgrounds/stats-01.webp"
          alt=""
          width={211}
          height={168}
          className="absolute bottom-0 right-0 hidden sm:block opacity-80 pointer-events-none"
        />
      </CardContent>
    </Card>
  );
};

export { IncomeExpenseCard };
