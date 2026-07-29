import { type FC } from 'react';
import { PageContainer } from '@/shared/ui';
import { TransactionsWidget } from '@/widgets/transaction/ui/TransactionsWidget.tsx';

const Transactions: FC = () => {
  return (
    <PageContainer title="Transactions">
      <TransactionsWidget />
    </PageContainer>
  );
};

export { Transactions };
