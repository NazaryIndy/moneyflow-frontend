import type { FC, ReactNode } from 'react';
import type { Category } from '@/entities/category/model/category.types.ts';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';
import { Card, CardContent } from '@/shared/ui/shadcn/card.tsx';
import { Badge } from '@/shared/ui/Badge/badge.tsx';

interface CategoryCardProps {
  category: Category;
  actions: ReactNode;
}

const CategoryCard: FC<CategoryCardProps> = ({ category, actions }) => {
  const isIncome = category.type === TRANSACTION_TYPE.INCOME;

  const badgeStyle = {
    backgroundColor: isIncome ? 'var(--income-background)' : 'var(--expense-background)',
    color: isIncome ? 'var(--income)' : 'var(--expense)',
  };

  return (
    <Card
      className="w-full shadow-sm hover:shadow-md transition-shadow"
      style={{ borderLeftColor: category.color, borderLeftWidth: '4px' }}
    >
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex flex-col gap-1.5">
          <span className="font-medium text-foreground">{category.name}</span>
          <Badge
            className="text-xs font-medium px-2.5 py-0.5 rounded-full border-0"
            style={badgeStyle}
          >
            {isIncome ? 'Доход' : 'Расход'}
          </Badge>
        </div>

        <div className="flex items-center gap-1">{actions}</div>
      </CardContent>
    </Card>
  );
};

export { CategoryCard };
