import { Wallet } from 'lucide-react';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState.tsx';
import { useTranslation } from 'react-i18next';

const EmptyTransactions = () => {
  const { t } = useTranslation(['transactions']);

  return (
    <EmptyState
      icon={Wallet}
      title={t('NoTransactionsYet')}
      description={t('CreateFirstTransaction')}
    />
  );
};

export { EmptyTransactions };
