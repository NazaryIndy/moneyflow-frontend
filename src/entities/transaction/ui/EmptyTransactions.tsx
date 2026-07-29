import { Wallet } from 'lucide-react';
import { EmptyState } from '@/shared/ui/EmptyState/EmptyState.tsx';

const EmptyTransactions = () => {
  return (
    <EmptyState
      icon={Wallet}
      title="No transactions yet"
      description="Create your first transaction to get started."
    />
  );
};

export { EmptyTransactions };
