import { type FC, useRef, type ChangeEvent, useState } from 'react';
import { Button, Dialog } from '@/shared/ui';
import { DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/ui/shadcn/dialog';
import { ImportPreview } from '@/features/importExportTransaction/ui/ImportPreview.tsx';
import { ImportErrors } from '@/features/importExportTransaction/ui/ImportErrors.tsx';
import { useImportTransactions } from '@/features/importExportTransaction/model/useImportTransactions.ts';
import { useTranslation } from 'react-i18next';
import type { ImportError } from '@/features/importExportTransaction/model/types.ts';

interface ImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ImportDialog: FC<ImportDialogProps> = ({ open, onOpenChange }) => {
  const { t } = useTranslation(['transactions', 'common']);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { importResult, parseFile, importTransactions, reset, isImporting, isCreating } =
    useImportTransactions();

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }
    setError(null);

    try {
      await parseFile(file);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        const errorObj = error as ImportError;
        setError(t(errorObj.code, errorObj.params));
      } else {
        setError(t('ErrorReadingCsv'));
      }
      console.error(error);
    } finally {
      event.target.value = '';
    }
  };

  const handleClose = () => {
    reset();
    setError(null);
    onOpenChange(false);
  };

  const handleImport = async () => {
    try {
      await importTransactions();
      setError(null);
      onOpenChange(false);
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error) {
        const errorObj = error as ImportError;
        setError(t(errorObj.code, errorObj.params));
      } else {
        setError(t('ImportErrorTitle'));
      }
      console.error(t('ErrorReadingCsv'), error);
    }
  };

  const hasErrors = importResult !== null && importResult.invalidRows.length > 0;

  const canImport = importResult !== null && importResult.validRows.length > 0;

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent
        className="flex max-h-[90vh]  flex-col"
        style={{
          width: importResult ? '85vw' : '30rem',
          maxWidth: importResult ? '85vw' : '30rem',
        }}
      >
        <DialogHeader>
          <DialogTitle>{t('ImportTransactions')}</DialogTitle>
        </DialogHeader>
        {error && <div className="text-sm text-destructive mt-2">{error}</div>}
        {!importResult ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border-2 border-dashed">
            <p className="mb-4 text-muted-foreground">{t('SelectCsvFile')}</p>

            <Button onClick={() => fileInputRef.current?.click()} disabled={isImporting}>
              {isImporting ? t('common:Loading') : t('SelectFile')}
            </Button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        ) : (
          <div className="flex max-h-[60vh] flex-col gap-4">
            <div className="flex gap-4 text-sm">
              <span>
                {t('Total')} {importResult.rows.length}
              </span>

              <span className="text-green-600">
                {t('Valid')} {importResult.validRows.length}
              </span>

              <span className="text-red-600">
                {t('WithErrors')} {importResult.invalidRows.length}
              </span>
            </div>

            <div className="overflow-auto rounded-md border">
              <ImportPreview rows={importResult.rows} />
            </div>

            {hasErrors && (
              <div className="max-h-40 overflow-auto rounded-md border p-3">
                <ImportErrors invalidRows={importResult.invalidRows} />
              </div>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            {t('Cancel')}
          </Button>

          {importResult && (
            <Button onClick={handleImport} disabled={!canImport || isCreating}>
              {isCreating
                ? t('Importing')
                : t('ImportWithCount', { count: importResult.validRows.length })}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export { ImportDialog };
