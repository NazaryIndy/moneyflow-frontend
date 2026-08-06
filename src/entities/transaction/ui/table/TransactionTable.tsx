import type { FC, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/shadcn/table.tsx';
import { cn } from '@/shared/lib/utils.ts';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import {
  TRANSACTION_COLUMNS,
  type TransactionColumnKey,
} from '@/entities/transaction/ui/table/TransactionTableColumns.tsx';

type TransactionTableProps = {
  transactions: Transaction[];
  settings: UserSettings;
  categories?: Category[];
  columns: TransactionColumnKey[];
  renderRowActions?: (transaction: Transaction) => ReactNode;
};

export const TransactionTable: FC<TransactionTableProps> = ({
  transactions,
  settings,
  categories,
  columns,
  renderRowActions,
}) => {
  const { t } = useTranslation(['common', 'transactions']);

  return (
    <Table className="mt-5 mb-5">
      <TableHeader>
        <TableRow>
          {columns.map((key) => {
            const column = TRANSACTION_COLUMNS[key];
            return (
              <TableHead key={key} className={cn(column.align === 'right' && 'text-right')}>
                {t(column.headerKey)}
              </TableHead>
            );
          })}
          {renderRowActions && (
            <TableHead className="text-right">{t('transactions:Actions')}</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TableRow key={transaction.id}>
            {columns.map((key, index) => {
              const column = TRANSACTION_COLUMNS[key];
              return (
                <TableCell
                  key={key}
                  className={cn(
                    index === 0 && 'font-medium',
                    column.align === 'right' && 'text-right',
                  )}
                >
                  {column.render(transaction, { settings, categories })}
                </TableCell>
              );
            })}
            {renderRowActions && (
              <TableCell className="text-right">{renderRowActions(transaction)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
