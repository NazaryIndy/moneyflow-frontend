import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

export interface UseAnalyticsOptions {
  topCategoriesLimit?: number;
  transactions?: Transaction[];
}

export interface MonthlySummaryItem {
  month: string;
  income: number;
  expense: number;
  savings: number;
  avgTransaction: number;
  largestExpense: { amount: number; title: string; categoryName: string } | null;
  largestIncome: { amount: number; title: string; categoryName: string } | null;
}
