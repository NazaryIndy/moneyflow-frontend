import type { FC } from 'react';
import { Button, PageContainer } from '@/shared/ui';
import { transactions as operations } from '@/shared/mock/transactions.ts';
import type { Transaction } from '@/entities/transaction/model/types.ts';
import { TransactionItem } from '@/pages/transactions/ui/TransactionItem.tsx';

const Transactions: FC = () => {
  const transactions: Transaction[] = operations as Transaction[];

  return (
    <PageContainer title="Transactions">
      <Button className="w-md">+ Add transaction</Button>

      {transactions.length ? (
        <div className="flex flex-col gap-2 mt-5">
          {transactions.map(({ id, ...rest }) => (
            <TransactionItem key={id} transaction={rest} />
          ))}
        </div>
      ) : (
        <div className="text-2xl mt-10">No transactions yet</div>
      )}
    </PageContainer>
  );
};

export { Transactions };
