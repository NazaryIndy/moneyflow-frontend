import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { Table } from '@/shared/ui/shadcn/table.tsx';
import { TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/shadcn/table.tsx';
import { TransactionPreviewRow } from '@/entities/transaction/ui/preview/TransactionPreviewRow.tsx';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

type TransactionPreviewTableProps = {
  transactions: Transaction[];
  settings: UserSettings;
};

const TransactionPreviewTable: FC<TransactionPreviewTableProps> = ({ transactions, settings }) => {
  const columns = ['Date', 'Title', 'Amount'];

  return (
    <Table className="mt-5 mb-5">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionPreviewRow
            key={transaction.id}
            transaction={transaction}
            settings={settings}
          />
        ))}
      </TableBody>
    </Table>
  );
};
export { TransactionPreviewTable };
