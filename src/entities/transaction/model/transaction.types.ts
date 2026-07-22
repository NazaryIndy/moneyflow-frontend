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
