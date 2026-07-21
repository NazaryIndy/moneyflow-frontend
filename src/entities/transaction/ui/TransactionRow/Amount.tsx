import type {
  CurrencyType,
  TransactionType,
} from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';

type AmountProps = {
  amount: number;
  currency: CurrencyType;
  type: TransactionType;
};

const Amount: FC<AmountProps> = ({ amount, currency, type }) => {
  const formatted = amount.toLocaleString('ru-RU');

  const currencySymbol = currency === 'dollar' ? '$' : currency === 'euro' ? '€' : '₽';

  const amountClass =
    type === 'income' ? 'text-green-700 dark:text-green-300' : 'text-red-700 dark:text-red-300';

  return (
    <span className={amountClass}>
      {currencySymbol}

      {formatted}
    </span>
  );
};

export { Amount };
