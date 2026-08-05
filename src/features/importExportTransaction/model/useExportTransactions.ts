import { exportTransactionsToCsv } from '@/features/importExportTransaction/lib/exportTransactionsToCsv.ts';
import { useTransactions } from '@/entities/transaction';
import { downloadCsv } from '@/features/importExportTransaction/lib/downloadCsv.ts';
import { exportTransactionsToExcel } from '@/features/importExportTransaction/lib/exportTransactionsToExcel.ts';
import { useCategories } from '@/entities/category';

export const useExportTransactions = () => {
  const { data: transactions = [], isLoading: isTransactionsLoading } = useTransactions();
  const { data: categories = [], isLoading: isCategoriesLoading } = useCategories();
  const isLoading = isTransactionsLoading || isCategoriesLoading;

  const exportCsv = () => {
    if (transactions.length === 0) {
      return;
    }

    const csv = exportTransactionsToCsv(transactions, categories);

    downloadCsv(csv, 'moneyflow-transactions.csv');
  };

  const exportExcel = () => {
    if (transactions.length === 0) {
      return;
    }

    exportTransactionsToExcel(transactions, categories);
  };

  return {
    exportCsv,
    exportExcel,
    isLoading,
    hasTransactions: transactions.length > 0,
  };
};
