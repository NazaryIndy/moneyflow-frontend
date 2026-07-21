import type { FC } from 'react';

type CategoryBadgeProps = {
  category: string;
};

const CategoryBadge: FC<CategoryBadgeProps> = ({ category }) => {
  return <span>{category}</span>;
};

export { CategoryBadge };
