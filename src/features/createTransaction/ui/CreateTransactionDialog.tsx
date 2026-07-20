import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/shared/ui/dialog.tsx';
import type { FC } from 'react';
import type { CreateTransactionFormOutput } from '@/entities/transaction/model/transaction.schema.ts';
import { TransactionForm } from '@/features/createTransaction/ui/TransactionForm.tsx';

type CreateTransactionDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: CreateTransactionFormOutput) => Promise<void> | void;
  isLoading?: boolean;
};

export const CreateTransactionDialog: FC<CreateTransactionDialogProps> = ({
  open,
  onOpenChange,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Add Transaction</DialogTitle>
        </DialogHeader>
        <TransactionForm
          onSubmit={async (data) => {
            await onSubmit(data);
            onOpenChange(false);
          }}
          isLoading={isLoading}
        />
      </DialogContent>
    </Dialog>
  );
};
