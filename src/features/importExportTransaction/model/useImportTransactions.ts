import { csvToTransactions } from '@/features/importExportTransaction/lib/csvToTransactions.ts';
import { useState } from 'react';
import type { ImportResult } from '@/features/importExportTransaction/model/types.ts';
import { useCategories } from '@/entities/category';
import { useCreateTransaction } from '@/features/createTransaction/api/useCreateTransaction.ts';
import type { CreateTransactionDto } from '@/entities/transaction/model/transaction.types.ts';
import { findByName } from '@/shared/lib';

export const useImportTransactions = () => {
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const { data: categories = [] } = useCategories();

  const createTransaction = useCreateTransaction();

  const parseFile = async (file: File) => {
    setIsImporting(true);

    try {
      const content = await file.text();

      const result = csvToTransactions(content);

      setImportResult(result);

      return result;
    } finally {
      setIsImporting(false);
    }
  };

  const importTransactions = async () => {
    if (!importResult) {
      return;
    }

    const transactionsToCreate: CreateTransactionDto[] = [];

    for (const row of importResult.validRows) {
      const category = findByName(categories, row.data.category);

      if (!category) {
        throw { code: 'error.category.notFound', params: { categoryName: row.data.category } };
      }

      transactionsToCreate.push({
        date: row.data.date,
        title: row.data.title,
        type: row.data.type as CreateTransactionDto['type'],
        categoryId: category.id,
        amount: Number(row.data.amount.replace(',', '.')),
      });
    }

    await Promise.all(
      transactionsToCreate.map((transaction) => createTransaction.mutateAsync(transaction)),
    );

    setImportResult(null);
  };

  const reset = () => {
    setImportResult(null);
  };

  return {
    importResult,
    parseFile,
    importTransactions,
    reset,
    isImporting,
    isCreating: createTransaction.isPending,
  };
};
