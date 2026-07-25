export interface Metric {
  label: string;
  value: string;
  percentage: string;
  isPositive: boolean;
}

export interface MainDashboardData {
  title: string;
  description: string;
  metrics: Metric[];
}

export const buildMainDashboardData = (
  income: number,
  expense: number,
  incomeChange: number | null,
  expenseChange: number | null,
  currencySymbol: string = '$',
  title: string = 'Analytics Dashboard',
  description: string = 'Check all the statistics',
): MainDashboardData => {
  const formatCurrency = (amount: number): string => {
    return `${currencySymbol}${amount.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })}`;
  };

  const formatPercentage = (change: number | null): { percentage: string; isPositive: boolean } => {
    if (change === null) {
      return { percentage: '—', isPositive: false };
    }
    const sign = change > 0 ? '+' : '';
    const rounded = change.toFixed(1);
    return {
      percentage: `${sign}${rounded}%`,
      isPositive: change >= 0,
    };
  };

  const incomePercent = formatPercentage(incomeChange);
  const expensePercent = formatPercentage(expenseChange);

  return {
    title,
    description,
    metrics: [
      {
        label: 'Earnings',
        value: formatCurrency(income),
        percentage: incomePercent.percentage,
        isPositive: incomePercent.isPositive,
      },
      {
        label: 'Expense',
        value: formatCurrency(expense),
        percentage: expensePercent.percentage,
        isPositive: expensePercent.isPositive,
      },
    ],
  };
};
