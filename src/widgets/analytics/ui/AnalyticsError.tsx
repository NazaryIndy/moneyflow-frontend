import { AlertCircle } from 'lucide-react';
import { ErrorState } from '@/shared/ui/ErrorState/ErrorState.tsx';

const AnalyticsError = () => {
  return (
    <ErrorState
      icon={AlertCircle}
      title="Failed to load analytics"
      description="Something went wrong while loading your analytics data. Please try again."
    />
  );
};

export { AnalyticsError };
