import { AlertCircle } from 'lucide-react';
import { ErrorState } from '@/shared/ui';

const TransactionsError = () => {
  return (
    <ErrorState
      icon={AlertCircle}
      title="Failed to load transactions"
      description="Something went wrong while loading your transactions data. Please try again."
    />
  );
};

export { TransactionsError };
