import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { Badge } from '@/shared/ui';

type TransactionTypeBadgeProps = {
  type: TransactionType;
};

const TransactionTypeBadge: FC<TransactionTypeBadgeProps> = ({ type }) => {
  const typeName = type.charAt(0).toUpperCase() + type.slice(1);

  switch (type) {
    case 'income':
      return (
        <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
          {typeName}
        </Badge>
      );
    default:
      return (
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
          {typeName}
        </Badge>
      );
  }
};

export { TransactionTypeBadge };
