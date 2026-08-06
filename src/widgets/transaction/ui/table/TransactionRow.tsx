import { TableCell, TableRow } from '@/shared/ui/shadcn/table.tsx';

import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { TransactionTypeBadge } from '../../../../entities/transaction/ui/TransactionTypeBadge.tsx';
import { TransactionActions } from '../TransactionActions.tsx';
import { TransactionAmount } from '../../../../entities/transaction/ui/TransactionAmount.tsx';
import { CategoryBadge } from '../../../../entities/transaction/ui/CategoryBadge.tsx';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { findById, formatDate } from '@/shared/lib';
import type { Category } from '@/entities/category/model/category.types.ts';

type TransactionRowProps = {
  transaction: Transaction;
  settings: UserSettings;
  categories: Category[];
};

const TransactionRow: FC<TransactionRowProps> = ({ transaction, settings, categories }) => {
  const { date, title, type, amount } = transaction;

  const category = findById(categories, transaction.categoryId);

  return (
    <TableRow>
      <TableCell className="font-medium">{formatDate(date, settings.dateFormat)}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        <TransactionTypeBadge type={type} />
      </TableCell>
      <TableCell>
        <CategoryBadge category={category} />
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
