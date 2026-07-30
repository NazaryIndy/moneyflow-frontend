import { Button, DropdownMenu } from '@/shared/ui';
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/shadcn/dropdown-menu.tsx';
import { MoreHorizontalIcon } from 'lucide-react';
import { type FC } from 'react';
import { DeleteTransactionAction } from '@/features/deleteTransaction';
import { EditTransactionAction } from '@/features/editTransaction';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

type TransactionActionsProps = {
  transaction: Transaction;
  settings: UserSettings;
};

const TransactionActions: FC<TransactionActionsProps> = ({ transaction, settings }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <EditTransactionAction transaction={transaction} settings={settings} />

        <DropdownMenuSeparator />

        <DeleteTransactionAction transactionId={transaction.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TransactionActions };
