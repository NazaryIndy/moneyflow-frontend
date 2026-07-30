import { type FC } from 'react';
import { Loader, PageContainer } from '@/shared/ui';
import { TransactionsWidget } from '@/widgets/transaction/ui/TransactionsWidget.tsx';
import { useSettings } from '@/entities/settings';
import { TransactionsError } from '@/widgets/transaction/ui/TransactionsError.tsx';

const Transactions: FC = () => {
  const { data: settings, isLoading, isError } = useSettings();

  if (isLoading) {
    return <Loader />;
  }

  if (!settings || isError) {
    return <TransactionsError />;
  }

  return (
    <PageContainer title="Transactions">
      <TransactionsWidget settings={settings} />
    </PageContainer>
  );
};

export { Transactions };
