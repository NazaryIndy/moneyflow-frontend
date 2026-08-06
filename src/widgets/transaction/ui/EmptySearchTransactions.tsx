import { Wallet } from 'lucide-react';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState.tsx';

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
