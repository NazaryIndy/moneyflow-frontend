import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { TableCell, TableRow } from '@/shared/ui/shadcn/table.tsx';
import { TransactionAmount } from '@/entities/transaction/ui/TransactionAmount.tsx';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

type TransactionPreviewRowProps = {
  transaction: Transaction;
  settings: UserSettings;
};

const TransactionPreviewRow: FC<TransactionPreviewRowProps> = ({ transaction, settings }) => {
  const { date, title, type, amount } = transaction;

  return (
    <TableRow>
      <TableCell className="font-medium">{date}</TableCell>
      <TableCell>{title}</TableCell>
      <TableCell>
        <TransactionAmount
          amount={amount}
          type={type}
          currency={settings.currency}
          locale={settings.locale}
        />
      </TableCell>
    </TableRow>
  );
};

export { TransactionPreviewRow };
