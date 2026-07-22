import { TableCell, TableRow } from '@/shared/ui/table.tsx';

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
  const { date, title, type, category, amount } = transaction;

  return (
    <TableRow>
      <TableCell className="font-medium">{date}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        <TransactionTypeBadge type={type} />
      </TableCell>
      <TableCell>
        <CategoryBadge category={category} />
      </TableCell>
      <TableCell>
        <TransactionAmount amount={amount} currency={'euro'} type={type} />
      </TableCell>
      <TableCell className="text-right">
        <TransactionActions transaction={transaction} />
      </TableCell>
    </TableRow>
  );
};

export { TransactionRow };
