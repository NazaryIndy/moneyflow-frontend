import { TableCell, TableRow } from '@/shared/ui/shadcn/table.tsx';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { TransactionTypeBadge } from '../TransactionTypeBadge.tsx';
import { TransactionActions } from '../TransactionActions.tsx';
import { TransactionAmount } from '../TransactionAmount.tsx';
import { CategoryBadge } from '../CategoryBadge.tsx';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { formatDate } from '@/shared/lib';

type TransactionRowProps = {
  transaction: Transaction;
  settings: UserSettings;
};

const TransactionRow: FC<TransactionRowProps> = ({ transaction, settings }) => {
  const { date, title, type, categoryId, amount } = transaction;

  return (
    <TableRow>
      <TableCell className="font-medium">{formatDate(date, settings.dateFormat)}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        <TransactionTypeBadge type={type} />
      </TableCell>
      <TableCell>
        {/* TODO replace with category name*/}
        <CategoryBadge categoryId={categoryId} />
      </TableCell>
      <TableCell>
        <TransactionAmount
          amount={amount}
          currency={settings.currency}
          locale={settings.locale}
          type={type}
        />
      </TableCell>
      <TableCell className="text-right">
        <TransactionActions transaction={transaction} settings={settings} />
      </TableCell>
    </TableRow>
  );
};

export { TransactionRow };
