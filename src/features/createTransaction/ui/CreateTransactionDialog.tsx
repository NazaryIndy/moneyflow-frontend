import { useCreateTransaction } from '@/features/createTransaction/api/useCreateTransaction.ts';
import type { TransactionFormOutput } from '@/entities/transaction/model/transaction.schema.ts';
import { toastError, toastSuccess } from '@/shared/lib';
import { ResponsiveDialog } from '@/shared/ui';
import { TransactionForm } from '@/entities/transaction/ui/TransactionForm.tsx';
import type { FC } from 'react';

type CreateTransactionDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CreateTransactionDialog: FC<CreateTransactionDialogProps> = ({ open, setOpen }) => {
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
      />
    </ResponsiveDialog>
  );
};

export { CreateTransactionDialog };
