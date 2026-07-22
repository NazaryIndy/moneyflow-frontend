import { Button, DropdownMenu } from '@/shared/ui';
import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu.tsx';
import { MoreHorizontalIcon } from 'lucide-react';
import { type FC } from 'react';
import { DeleteTransactionAction } from '@/features/deleteTransaction';
import { EditTransactionAction } from '@/features/editTransaction';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';

type TransactionActionsProps = {
  transaction: Transaction;
};

const TransactionActions: FC<TransactionActionsProps> = ({ transaction }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="size-8">
          <MoreHorizontalIcon />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <EditTransactionAction transaction={transaction} />

        <DropdownMenuSeparator />

        <DeleteTransactionAction transactionId={transaction.id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export { TransactionActions };
