import type {
  CurrencyType,
  TransactionType,
} from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { formatNumbers, getCurrencySimbol } from '@/shared/lib/format.ts';

type TransactionAmountProps = {
  amount: number;
  currency: CurrencyType;
  type: TransactionType;
};

const TransactionAmount: FC<TransactionAmountProps> = ({ amount, currency, type }) => {
  const formatted = formatNumbers(amount);

  const currencySymbol = getCurrencySimbol(currency);

  const amountClass = type === 'income' ? 'text-income' : 'text-expense';

  return (
    <span className={amountClass}>
      {currencySymbol}
      {formatted}
    </span>
  );
};

export { TransactionAmount };
