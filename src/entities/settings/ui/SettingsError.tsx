import { AlertCircle } from 'lucide-react';
import { ErrorState } from '@/shared/ui';
// TODO combine all errors pages
const SettingsError = () => {
  return (
    <ErrorState
      icon={AlertCircle}
      title="Failed to load settings"
      description="Something went wrong while loading your settings data. Please try again."
    />
  );
};

export { SettingsError };
