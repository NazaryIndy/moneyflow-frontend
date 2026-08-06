import { ResponsiveDialog } from '@/shared/ui/ResponsiveDialog/ResponsiveDialog.tsx';
import { TransactionForm } from '@/entities/transaction/ui/TransactionForm.tsx';
import type { FC } from 'react';
import { useUpdateTransactions } from '@/features/editTransaction/api/useUpdateTransaction.ts';
import type { TransactionFormOutput } from '@/entities/transaction/model/transaction.schema.ts';
import { toastError, toastSuccess } from '@/shared/lib';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

type EditTransactionDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  transaction: Transaction;
  settings: UserSettings;
};

const EditTransactionDialog: FC<EditTransactionDialogProps> = ({
  open,
  onOpenChange,
  transaction,
  settings,
}) => {
  const { mutateAsync: updateTransaction, isPending } = useUpdateTransactions();

  const handleEdit = async (data: TransactionFormOutput) => {
    try {
      await updateTransaction({
        id: transaction.id,
        ...data,
      });

      toastSuccess('Transaction updated');

      onOpenChange(false);
    } catch {
      toastError('Failed to update transaction');
    }
  };

  return (
    <ResponsiveDialog title="Edit Transaction" open={open} onOpenChange={onOpenChange}>
      <TransactionForm
        onSubmit={handleEdit}
        submitButtonText="Save Changes"
        settings={settings}
        isLoading={isPending}
        defaultValues={transaction}
      />
    </ResponsiveDialog>
  );
};

export { EditTransactionDialog };
