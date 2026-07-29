export interface MonthBudget {
  id: string;
  amount: number;
  month: number;
  year: number;
}

export type CreateMonthBudgetDto = Omit<MonthBudget, 'id'>;

export interface BudgetStatistics {
  spent: number;
  remaining: number;
  percentage: number;
  isOverBudget: boolean;
}
