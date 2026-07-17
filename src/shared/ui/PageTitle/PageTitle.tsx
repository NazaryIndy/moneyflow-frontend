import type { FC } from 'react';

type PageTitleProps = {
  title: string;
};
const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return <h1>{title}</h1>;
};

export { PageTitle };
