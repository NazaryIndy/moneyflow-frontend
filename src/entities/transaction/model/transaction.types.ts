export interface Transaction {
  id: string;
  title: string;
  categoryId: string;
  amount: number;
  type: TransactionType;
  date: string;
}

export type CreateTransactionDto = Omit<Transaction, 'id'>;

export type TransactionType = 'income' | 'expense';

export type CurrencyType = 'ruble' | 'euro' | 'dollar';

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
