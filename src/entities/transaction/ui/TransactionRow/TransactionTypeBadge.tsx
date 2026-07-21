import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { Badge } from '@/shared/ui';

type TransactionTypeBadgeProps = {
  type: TransactionType;
};

const TransactionTypeBadge: FC<TransactionTypeBadgeProps> = ({ type }) => {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <Badge
      className={
        type === 'income'
          ? 'border-income-border bg-income-background text-income'
          : 'border-expense-border bg-expense-background text-expense'
      }
    >
      {typeName}
    </Badge>
  );
};

export { TransactionTypeBadge };
