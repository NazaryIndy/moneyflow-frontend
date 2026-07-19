export interface Transaction {
  id: string;
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
}

export interface TransactionDTO {
  title: string;
  category: string;
  amount: number;
  type: 'income' | 'expense';
}
