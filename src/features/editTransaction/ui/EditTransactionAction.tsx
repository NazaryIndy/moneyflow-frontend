import { type FC, useState } from 'react';
import { DropdownMenuItem } from '@/shared/ui/shadcn/dropdown-menu.tsx';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { EditTransactionDialog } from '@/features/editTransaction/ui/EditTransactionDialog.tsx';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

type EditTransactionActionProps = {
  transaction: Transaction;
  settings: UserSettings;
};

const EditTransactionAction: FC<EditTransactionActionProps> = ({ transaction, settings }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditTransactionDialog
        transaction={transaction}
        onOpenChange={setOpen}
        open={open}
        settings={settings}
      />
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
