import type { IconType } from '@/shared/config/types.ts';
import type { FC, ReactNode } from 'react';

type EmptyStateProps = {
  icon: IconType;
  title: string;
  description: string;
  action?: ReactNode;
};

const EmptyState: FC<EmptyStateProps> = ({ icon, title, description, action }) => {
  const Icon = icon;
  return (
    <div className="flex flex-col items-center justify-center text-center py-12 px-4">
      <div className="text-muted-foreground mb-4">
        <Icon />
      </div>

      <h2 className="text-2xl font-semibold text-foreground mb-2">{title}</h2>

      <p className="text-muted-foreground max-w-sm mb-6">{description}</p>

      {action && <div>{action}</div>}
    </div>
  );
};

export { EmptyState };
