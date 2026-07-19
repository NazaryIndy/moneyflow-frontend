import type { FC, ReactNode } from 'react';
import { PageTitle } from '@/shared/ui';

type PageContainerProps = {
  children: ReactNode | ReactNode[];
  title: string;
  className?: string;
};

const PageContainer: FC<PageContainerProps> = ({ children, className, title }) => {
  return (
    <div className="mx-auto w-full max-w-7xl px-6 py-6">
      <PageTitle title={title} />
      <div className={className}>{children}</div>
    </div>
  );
};

export { PageContainer };
