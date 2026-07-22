import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { TableCell, TableRow } from '@/shared/ui/table.tsx';
import { TransactionAmount } from '@/entities/transaction/ui/TransactionAmount.tsx';

type TransactionPreviewRowProps = {
  transaction: Transaction;
};

const TransactionPreviewRow: FC<TransactionPreviewRowProps> = ({ transaction }) => {
  const { date, title, type, amount } = transaction;

  return (
    <TableRow>
      <TableCell className="font-medium">{date}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        <TransactionAmount amount={amount} currency={'euro'} type={type} />
      </TableCell>
    </TableRow>
  );
};

export { TransactionPreviewRow };
