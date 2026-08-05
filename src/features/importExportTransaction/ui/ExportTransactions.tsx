import type { FC } from 'react';
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui';
import { ChevronDown } from 'lucide-react';
import { useExportTransactions } from '@/features/importExportTransaction/model/useExportTransactions.ts';
import { useTranslation } from 'react-i18next';

const ExportTransactions: FC = () => {
  const { exportCsv, exportExcel, isLoading, hasTransactions } = useExportTransactions();
  const { t } = useTranslation(['transactions']);

  const disabled = isLoading || !hasTransactions;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" disabled={disabled}>
          {t('Export')}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={exportCsv}>{t('ExportCsv')}</DropdownMenuItem>

        <DropdownMenuItem onClick={exportExcel}> {t('ExportExcel')}</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { ExportTransactions };
