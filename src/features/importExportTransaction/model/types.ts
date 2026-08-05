export interface RawImportTransaction {
  id?: string;
  date: string;
  title: string;
  type: string;
  category: string;
  amount: string;
}

export interface ImportRow {
  rowNumber: number;
  data: RawImportTransaction;
  errors: ImportError[];
  isValid: boolean;
}

export interface ImportResult {
  rows: ImportRow[];
  validRows: ImportRow[];
  invalidRows: ImportRow[];
}

export interface ParsedCsvRow {
  id?: string;
  date?: string;
  title?: string;
  type?: string;
  category?: string;
  amount?: string;
}

export interface ImportError {
  code: ImportErrorCode; // ключ для i18n
  params?: Record<string, string | number>;
}

export type ImportErrorCode =
  | 'error.date.empty'
  | 'error.date.format'
  | 'error.title.empty'
  | 'error.type.empty'
  | 'error.type.invalid'
  | 'error.category.empty'
  | 'error.amount.empty'
  | 'error.amount.positive'
  | 'error.category.notFound'
  | 'error.parsing.csv';

export interface ParsedCsvRow {
  id?: string;
  date?: string;
  title?: string;
  type?: string;
  category?: string;
  amount?: string;
}
