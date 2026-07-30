import { useCreateTransaction } from '@/features/createTransaction/api/useCreateTransaction.ts';
import type { TransactionFormOutput } from '@/entities/transaction/model/transaction.schema.ts';
import { toastError, toastSuccess } from '@/shared/lib';
import { ResponsiveDialog } from '@/shared/ui';
import { TransactionForm } from '@/entities/transaction/ui/TransactionForm.tsx';
import type { FC } from 'react';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

type CreateTransactionDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  settings: UserSettings;
};

const CreateTransactionDialog: FC<CreateTransactionDialogProps> = ({ open, setOpen, settings }) => {
  const { mutateAsync: createTransaction, isPending: isCreating } = useCreateTransaction();

  const handleAddTransaction = async (data: TransactionFormOutput) => {
    try {
      await createTransaction(data);

      toastSuccess('Transaction created');

      setOpen(false);
    } catch {
      toastError('Failed to create transaction');
    }
  };

  return (
    <ResponsiveDialog title="Add Transaction" open={open} onOpenChange={setOpen}>
      <TransactionForm
        onSubmit={handleAddTransaction}
        submitButtonText="Add transaction"
        isLoading={isCreating}
        settings={settings}
      />
    </ResponsiveDialog>
  );
};

export { CreateTransactionDialog };
