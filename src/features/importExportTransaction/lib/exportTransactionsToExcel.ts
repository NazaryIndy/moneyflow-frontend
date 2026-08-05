import type { Transaction } from '@/entities/transaction/model/transaction.types';
import * as XLSX from 'xlsx';
import type { Category } from '@/entities/category/model/category.types.ts';

export const exportTransactionsToExcel = (
  transactions: Transaction[],
  categories: Category[],
): void => {
  const categoryMap = new Map(categories.map((category) => [category.id, category.name]));

  const data = transactions.map((transaction) => ({
    ID: transaction.id,
    Date: transaction.date,
    Title: transaction.title,
    Type: transaction.type,
    Category: categoryMap.get(transaction.categoryId) ?? '',
    Amount: transaction.amount,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');

  XLSX.writeFile(workbook, 'moneyflow-transactions.xlsx');
};
