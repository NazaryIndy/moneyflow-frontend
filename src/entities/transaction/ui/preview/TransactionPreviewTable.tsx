import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { Table } from '@/shared/ui/table.tsx';
import { TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table.tsx';
import { TransactionPreviewRow } from '@/entities/transaction/ui/preview/TransactionPreviewRow.tsx';

type TransactionPreviewTableProps = {
  transactions: Transaction[];
};

const TransactionPreviewTable: FC<TransactionPreviewTableProps> = ({ transactions }) => {
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
          <TransactionPreviewRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  );
};
export { TransactionPreviewTable };
