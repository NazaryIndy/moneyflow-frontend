import { type FC, useState } from 'react';
import { ConfirmDialog, ResponsiveDialog } from '@/shared/ui';
import { DropdownMenuItem } from '@/shared/ui/dropdown-menu.tsx';
import { Loader2 } from 'lucide-react';
import { useDeleteTransaction } from '@/features/deleteTransaction/api/useDeleteTransaction.ts';
import { toastError, toastSuccess } from '@/shared/lib';

type DeleteTransactionActionProps = {
  transactionId: string;
};

const DeleteTransactionAction: FC<DeleteTransactionActionProps> = ({ transactionId }) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: deleteTransaction, isPending } = useDeleteTransaction();

  const handleDelete = async () => {
    try {
      await deleteTransaction(transactionId);

      toastSuccess('Transaction deleted');

      setOpen(false);
    } catch {
      toastError('Failed to delete transaction');
    }
  };

  return (
    <>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete transaction"
        description="This action cannot be undone."
      >
        <ConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setOpen(false)}
          actionButtonTitle="Delete"
        />
      </ResponsiveDialog>

      <DropdownMenuItem
        variant="destructive"
        onSelect={(event) => {
          event.preventDefault();
          setOpen(true);
        }}
      >
        {isPending && <Loader2 className="mr-2 size-4 animate-spin" />}
        Delete
      </DropdownMenuItem>
    </>
  );
};

export { DeleteTransactionAction };
