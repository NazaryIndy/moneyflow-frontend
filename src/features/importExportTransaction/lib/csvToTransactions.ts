import type { ImportResult, ParsedCsvRow } from '@/features/importExportTransaction/model/types.ts';
import { normalizeImportData } from '@/features/importExportTransaction/lib/normalizeImportData.ts';
import { validateImport } from '@/features/importExportTransaction/lib/validateImport.ts';

const { parse } = await import('papaparse');

export function csvToTransactions(csvContent: string): ImportResult {
  const parsed = parse<ParsedCsvRow>(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.trim().toLowerCase(),
  });

  if (parsed.errors.length > 0) {
    throw { code: 'error.parsing.csv', params: { message: parsed.errors[0]?.message || '' } };
  }

  const normalizedRows = normalizeImportData(parsed.data);

  return validateImport(normalizedRows);
}
