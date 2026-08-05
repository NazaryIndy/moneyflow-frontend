import type {
  ImportRow,
  ParsedCsvRow,
  RawImportTransaction,
} from '@/features/importExportTransaction/model/types.ts';

export const normalizeImportData = (rows: ParsedCsvRow[]): ImportRow[] => {
  return rows.map((row, index) => {
    const data: RawImportTransaction = {
      id: row.id?.trim() || undefined,
      date: row.date?.trim() || '',
      title: row.title?.trim() || '',
      type: row.type?.trim() || '',
      category: row.category?.trim() || '',
      amount: row.amount?.trim() || '',
    };

    return {
      rowNumber: index + 2,
      data,
      errors: [],
      isValid: false,
    };
  });
};
