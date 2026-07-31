import { type FC } from 'react';
import { Loader, PageContainer } from '@/shared/ui';
import { TransactionsWidget } from '@/widgets/transaction/ui/TransactionsWidget.tsx';
import { useSettings } from '@/entities/settings';
import { TransactionsError } from '@/widgets/transaction/ui/TransactionsError.tsx';
import { useTranslation } from 'react-i18next';

const Transactions: FC = () => {
  const { data: settings, isLoading, isError } = useSettings();
  const { t } = useTranslation(['common']);

  if (isLoading) {
    return <Loader />;
  }

  if (!settings || isError) {
    return <TransactionsError />;
  }

  return (
    <PageContainer title={t('Transactions')}>
      <TransactionsWidget settings={settings} />
    </PageContainer>
  );
};

export { Transactions };
