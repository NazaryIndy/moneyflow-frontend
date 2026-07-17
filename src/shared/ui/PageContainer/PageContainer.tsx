import type { FC, ReactNode } from 'react';

type PageContainerProps = {
  children: ReactNode | ReactNode[];
};
const PageContainer: FC<PageContainerProps> = ({ children }) => {
  return <div className="mx-auto w-full max-w-7xl px-6 py-6">{children}</div>;
};

export { PageContainer };
