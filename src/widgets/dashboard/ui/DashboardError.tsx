import { AlertCircle } from 'lucide-react';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState.tsx';

const DashboardError = () => {
  return (
    <ErrorState
      icon={AlertCircle}
      title="Failed to load dashboard"
      description="Something went wrong while loading your dashboard data. Please try again."
    />
  );
};

export { DashboardError };
