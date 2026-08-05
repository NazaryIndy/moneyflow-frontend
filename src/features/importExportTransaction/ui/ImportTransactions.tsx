import { type FC, useState } from 'react';
import { Button } from '@/shared/ui';
import { ImportDialog } from '@/features/importExportTransaction/ui/ImportDialog.tsx';
import { useTranslation } from 'react-i18next';

const ImportTransactions: FC = () => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['transactions']);

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        {t('Import')}
      </Button>

      <ImportDialog open={open} onOpenChange={setOpen} />
    </>
  );
};

export { ImportTransactions };
