import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';
import { ProgressBar } from '@/widgets/dashboard/ui/ProgressBar.tsx';
import { EditBudgetAction } from '@/features/editBudget';
import type { CurrentMonthBudget } from '@/widgets/dashboard/model/useBudgetStatistics.tsx';
import type { CurrencyType, LocaleType } from '@/shared/types';
import { formatCurrency } from '@/shared/lib';

interface BudgetCardProps {
  budgetStatistics: CurrentMonthBudget;
  currency: CurrencyType;
  locale: LocaleType;
  className?: string;
}

const BudgetCard = ({ budgetStatistics, currency, locale, className }: BudgetCardProps) => {
  const { budget, percentage, spent, remaining, isOverBudget } = budgetStatistics;
  const formattedBudget = formatCurrency(budget.amount, currency, locale);
  const formattedSpent = formatCurrency(spent, currency, locale);
  const formattedRemaining = formatCurrency(remaining, currency, locale);

  return (
    <DashboardCard
      title="Monthly Budget"
      value={formattedBudget}
      description={`Spent: ${formattedSpent}`}
      badge={`Remaining: ${formattedRemaining}`}
      className={className}
      action={<EditBudgetAction budget={budget} />}
    >
      <ProgressBar percentage={percentage} isOverBudget={isOverBudget} />
    </DashboardCard>
  );
};

export { BudgetCard };
