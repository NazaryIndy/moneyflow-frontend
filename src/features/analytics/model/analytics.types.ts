export interface CategoryExpense {
  categoryId: string;
  categoryName: string;
  total: number;
  color?: string;
}

export interface MonthlyStatistics {
  month: string;
  income: number;
  expense: number;
}

export interface UseAnalyticsOptions {
  topCategoriesLimit?: number;
}
