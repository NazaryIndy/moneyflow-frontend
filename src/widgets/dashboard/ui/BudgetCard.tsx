import { DashboardCard } from '@/widgets/dashboard/ui/DashboardCard.tsx';
import { ProgressBar } from '@/widgets/dashboard/ui/ProgressBar.tsx';
import { EditBudgetAction } from '@/features/editBudget';
import type { CurrentMonthBudget } from '@/widgets/dashboard/model/useBudgetStatistics.tsx';

interface BudgetCardProps {
  budgetStatistics: CurrentMonthBudget;
  currency?: string;
  className?: string;
}

const BudgetCard = ({ budgetStatistics, currency = '$', className }: BudgetCardProps) => {
  const { budget, percentage, spent, remaining, isOverBudget } = budgetStatistics;

  return (
    <DashboardCard
      title="Monthly Budget"
      value={`${currency}${budget.amount.toLocaleString()}`}
      description={`Spent: ${currency}${spent.toLocaleString()}`}
      badge={`Remaining: ${currency}${remaining.toLocaleString()}`}
      className={className}
      action={<EditBudgetAction budget={budget} />}
    >
      <ProgressBar percentage={percentage} isOverBudget={isOverBudget} />
    </DashboardCard>
  );
};

export { BudgetCard };
