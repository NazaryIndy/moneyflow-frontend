import type { FC } from 'react';

type PageTitleProps = {
  title: string;
};
const PageTitle: FC<PageTitleProps> = ({ title }) => {
  return <h1 className="text-3xl mb-5">{title}</h1>;
};

export { PageTitle };
