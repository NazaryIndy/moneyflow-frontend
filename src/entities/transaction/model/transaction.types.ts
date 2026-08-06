import type { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';

export interface Transaction {
  id: string;
  title: string;
  categoryId: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export type CreateTransactionDto = Omit<Transaction, 'id'>;

export type TransactionType = (typeof TRANSACTION_TYPE)[keyof typeof TRANSACTION_TYPE];

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

export interface CategoryIncome {
  categoryId: string;
  categoryName: string;
  total: number;
  color?: string;
}

export interface Insight {
  id: string;
  text: string;
}
