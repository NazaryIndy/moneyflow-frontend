import type { FC } from 'react';
import { Button, PageContainer, PageTitle } from '@/shared/ui';

type TransactionsProps = {};

const Transactions: FC<TransactionsProps> = (props) => {
  const {} = props;

  return (
    <PageContainer>
      <PageTitle title="Transactions" />
      <Button className="w-md">+ Add transaction</Button>
    </PageContainer>
  );
};

export { Transactions, type TransactionsProps };
