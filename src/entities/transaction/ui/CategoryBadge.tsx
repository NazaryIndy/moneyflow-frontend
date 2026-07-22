import type { FC } from 'react';

type CategoryBadgeProps = {
  categoryId: string;
};

const CategoryBadge: FC<CategoryBadgeProps> = ({ categoryId }) => {
  return <span>{categoryId}</span>;
};

export { CategoryBadge };
