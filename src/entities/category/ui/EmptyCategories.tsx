import { SquareStack } from 'lucide-react';
import { EmptyState } from '@/shared/ui';

const EmptyCategories = () => {
  return (
    <EmptyState
      icon={SquareStack}
      title="No categories yet"
      description="Create your first category to get started."
    />
  );
};

export { EmptyCategories };
