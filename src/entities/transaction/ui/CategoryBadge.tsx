import type { FC } from 'react';
import type { Category } from '@/entities/category/model/category.types.ts';
import { Badge } from '@/shared/ui/Badge/badge.tsx';
import { useTranslation } from 'react-i18next';

type CategoryBadgeProps = {
  category?: Category;
};

const CategoryBadge: FC<CategoryBadgeProps> = ({ category }) => {
  const { t } = useTranslation(['transactions']);

  if (!category) {
    return (
      <Badge variant="outline" className="text-muted-foreground">
        {t('NoCategory')}
      </Badge>
    );
  }

  return (
    <Badge
      style={{
        backgroundColor: `${category.color}20`,
        color: category.color,
      }}
    >
      {category.name}
    </Badge>
  );
};

export { CategoryBadge };
