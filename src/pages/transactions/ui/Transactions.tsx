import { type FC, useState } from 'react';
import { Button, PageContainer } from '@/shared/ui';
import { TransactionItem } from '@/pages/transactions/ui/TransactionItem.tsx';
import { useTransactions } from '@/entities/transaction/api';
import { CreateTransactionDialog } from '@/features/createTransaction/ui/CreateTransactionDialog.tsx';
import { useCreateTransaction } from '@/entities/transaction/api/useCreateTransaction.ts';
import type { CreateTransactionFormOutput } from '@/entities/transaction/model/transaction.schema.ts';
import { PlusIcon } from 'lucide-react';

const Transactions: FC = () => {
  const { data } = useTransactions();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutateAsync, isPending } = useCreateTransaction();

  const handleAddTransaction = async (data: CreateTransactionFormOutput) => {
    await mutateAsync(data);
  };

  if (!data) {
    return (
      <PageContainer title={'Transactions'} className="flex justify-between gap-10 flex-wrap">
        <Button onClick={() => setDialogOpen(true)}>
          <PlusIcon /> Add transaction
        </Button>
        <CreateTransactionDialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSubmit={handleAddTransaction}
          isLoading={isPending}
        />
        <div className="mt-5 text-2xl">No transactions yet</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Transactions">
      <Button onClick={() => setDialogOpen(true)}>+ Add transaction</Button>

      <CreateTransactionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onSubmit={handleAddTransaction}
        isLoading={isPending}
      />

      <div className="flex flex-col gap-2 mt-5">
        {data.map(({ id, ...rest }) => (
          <TransactionItem key={id} transaction={rest} />
        ))}
      </div>
    </PageContainer>
  );
};

export { Transactions };
