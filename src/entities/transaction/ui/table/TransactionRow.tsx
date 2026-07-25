import { TableCell, TableRow } from '@/shared/ui/shadcn/table.tsx';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { TransactionTypeBadge } from '../TransactionTypeBadge.tsx';
import { TransactionActions } from '../TransactionActions.tsx';
import { TransactionAmount } from '../TransactionAmount.tsx';
import { CategoryBadge } from '../CategoryBadge.tsx';

type TransactionRowProps = {
  transaction: Transaction;
};

const TransactionRow: FC<TransactionRowProps> = ({ transaction }) => {
  const { date, title, type, categoryId, amount } = transaction;

  return (
    <TableRow>
      <TableCell className="font-medium">{date}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        <TransactionTypeBadge type={type} />
      </TableCell>
      <TableCell>
        <CategoryBadge categoryId={categoryId} />
      </TableCell>
      <TableCell>
        <TransactionAmount amount={amount} currency={'dollar'} type={type} />
      </TableCell>
      <TableCell className="text-right">
        <TransactionActions transaction={transaction} />
      </TableCell>
    </TableRow>
  );
};

export { TransactionRow };
