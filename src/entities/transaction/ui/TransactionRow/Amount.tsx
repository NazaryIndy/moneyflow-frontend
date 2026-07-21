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

  const amountClass = type === 'income' ? 'text-income' : 'text-expense';

  return (
    <span className={amountClass}>
      {currencySymbol}
      {formatted}
    </span>
  );
};

export { Amount };
