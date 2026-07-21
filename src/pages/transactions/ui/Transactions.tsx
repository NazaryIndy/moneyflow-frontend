import { type FC, useState } from 'react';
import { PageContainer } from '@/shared/ui';
import { useTransactions } from '@/entities/transaction/api';
import { TransactionTable } from '@/widgets/transactionTable';
import { EmptyTransactions } from '@/entities/transaction/ui/EmptyTransactions.tsx';
import { CreateTransactionButton, CreateTransactionDialog } from '@/features/createTransaction';

const Transactions: FC = () => {
  const { data } = useTransactions();
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <PageContainer title="Transactions">
      <CreateTransactionButton setOpen={setDialogOpen} />
      <CreateTransactionDialog open={dialogOpen} setOpen={setDialogOpen} />

      {data?.length ? <TransactionTable transactions={data} /> : <EmptyTransactions />}
    </PageContainer>
  );
};

export { Transactions };
