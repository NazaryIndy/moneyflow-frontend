export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export type CreateTransactionDto = Omit<Transaction, 'id'>;
