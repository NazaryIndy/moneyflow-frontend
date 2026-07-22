import { Table, TableBody, TableHead, TableHeader, TableRow } from '@/shared/ui/table.tsx';
import type { FC } from 'react';
import { TransactionRow } from '@/entities/transaction/ui/table/TransactionRow.tsx';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

type TransactionTableProps = {
  transactions: Transaction[];
};

const TransactionTable: FC<TransactionTableProps> = ({ transactions }) => {
  const columns = ['Date', 'Title', 'Type', 'Category', 'Amount'];

  return (
    <Table className="mt-5 mb-5">
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column}>{column}</TableHead>
          ))}
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {transactions.map((transaction) => (
          <TransactionRow key={transaction.id} transaction={transaction} />
        ))}
      </TableBody>
    </Table>
  );
};

export { TransactionTable };
