import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/shadcn/table.tsx';
import type { FC } from 'react';
import { TransactionRow } from '@/entities/transaction/ui/table/TransactionRow.tsx';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { useTranslation } from 'react-i18next';
import type { Category } from '@/entities/category/model/category.types.ts';

type TransactionTableProps = {
  transactions: Transaction[];
  settings: UserSettings;
  categories: Category[];
};

const TransactionTable: FC<TransactionTableProps> = ({ transactions, settings, categories }) => {
  const { t } = useTranslation(['common', 'transactions']);
  // TODO Вынести
  const columns = ['Date', 'Title', 'Type', 'Category', 'Amount'] as const;

  return (
    <Table className="mt-5 mb-5">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{t(column)}</TableHead>
          ))}
          <TableHead className="text-right">{t('transactions:Actions')}</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionRow
            key={transaction.id}
            categories={categories}
            transaction={transaction}
            settings={settings}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export { TransactionTable };
