import type { FC } from 'react';
import { ChevronDown } from 'lucide-react';
import { useExportTransactions } from '@/features/importExportTransaction/model/useExportTransactions.ts';
import { useTranslation } from 'react-i18next';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu.tsx';
import { Button } from '@/shared/ui/shadcn/button.tsx';

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
