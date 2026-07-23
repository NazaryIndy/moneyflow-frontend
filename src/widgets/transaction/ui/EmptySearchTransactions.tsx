import { Wallet } from 'lucide-react';
import { EmptyState } from '@/shared/ui';

const EmptySearchTransactions = () => {
  return (
    <EmptyState
      icon={Wallet}
      title="No transactions found"
      description="Try another search or clear filters"
    />
  );
};

export { EmptySearchTransactions };
