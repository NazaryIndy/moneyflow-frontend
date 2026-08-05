import type { FC } from 'react';
import { AlertTriangle } from 'lucide-react';
import type { ImportRow } from '@/features/importExportTransaction/model/types.ts';
import { useTranslation } from 'react-i18next';

interface ImportErrorsProps {
  invalidRows: ImportRow[];
}

export const ImportErrors: FC<ImportErrorsProps> = ({ invalidRows }) => {
  const { t } = useTranslation(['transactions']);

  return (
    <div className="space-y-1">
      {invalidRows.map((row) => (
        <div key={row.rowNumber} className="flex items-start gap-2 text-sm text-destructive">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />

          <span>
            <strong>{t('RowWithNumber', { rowNumber: row.rowNumber })}</strong>{' '}
            {row.errors.map((error, idx) => (
              <span key={idx}>
                {idx > 0 && '; '}
                {t(error.code, error.params)}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};
