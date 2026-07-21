import { type FC, useState } from 'react';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu.tsx';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { EditTransactionDialog } from '@/features/editTransaction/ui/EditTransactionDialog.tsx';

type EditTransactionActionProps = {
  transaction: Transaction;
};

const EditTransactionAction: FC<EditTransactionActionProps> = ({ transaction }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditTransactionDialog transaction={transaction} onOpenChange={setOpen} open={open} />
      <DropdownMenuItem
        onSelect={(event) => {
          event.preventDefault();

          setOpen(true);
        }}
      >
        Edit
      </DropdownMenuItem>
    </>
  );
};

export { EditTransactionAction };
