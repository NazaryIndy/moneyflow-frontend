import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table';
import type { FC } from 'react';
import type { ImportRow } from '@/features/importExportTransaction/model/types.ts';
import { Badge } from '@/shared/ui';
import { useTranslation } from 'react-i18next';

interface ImportPreviewProps {
  rows: ImportRow[];
}

const ImportPreview: FC<ImportPreviewProps> = ({ rows }) => {
  const { t } = useTranslation(['common']);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>{t('Date')}</TableHead>
          <TableHead>{t('Title')}</TableHead>
          <TableHead>{t('Type')}</TableHead>
          <TableHead>{t('Category')}</TableHead>
          <TableHead className="text-right">{t('Amount')}</TableHead>
          <TableHead>{t('Status')}</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.rowNumber} className={!row.isValid ? 'bg-destructive/10' : undefined}>
            <TableCell>{row.rowNumber}</TableCell>

            <TableCell>{row.data.date}</TableCell>

            <TableCell>{row.data.title}</TableCell>

            <TableCell>{row.data.type}</TableCell>

            <TableCell>{row.data.category}</TableCell>

            <TableCell className="text-right">{row.data.amount}</TableCell>

            <TableCell>
              {row.isValid ? (
                <Badge variant="outline">✓</Badge>
              ) : (
                <Badge variant="destructive">✗</Badge>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { ImportPreview };
