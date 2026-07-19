import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';

type TransactionItemProps = {
  transaction: Omit<Transaction, 'id'>;
};

const TransactionItem: FC<TransactionItemProps> = ({ transaction }) => {
  const { title, type, category, amount, date } = transaction;

  return (
    <div>
      {title} - {type} - {category} - {amount} - {date}
    </div>
  );
};

export { TransactionItem };
