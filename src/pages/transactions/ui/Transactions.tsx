import type { FC } from 'react';
import { Button, PageContainer } from '@/shared/ui';
import { TransactionItem } from '@/pages/transactions/ui/TransactionItem.tsx';
import { useTransactions } from '@/entities/transaction/api';

const Transactions: FC = () => {
  const { data } = useTransactions();

  if (!data) {
    return (
      <PageContainer title={'Transactions'} className="flex justify-between gap-10 flex-wrap">
        <div className="mt-5 text-2xl">No transactions yet</div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Transactions">
      <Button className="w-md">+ Add transaction</Button>
      <div className="flex flex-col gap-2 mt-5">
        {data.map(({ id, ...rest }) => (
          <TransactionItem key={id} transaction={rest} />
        ))}
      </div>
    </PageContainer>
  );
};

export { Transactions };
