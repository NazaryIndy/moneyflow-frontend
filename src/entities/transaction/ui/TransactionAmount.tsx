import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';
import type { FC } from 'react';
import { formatCurrency } from '@/shared/lib/format.ts';
import type { CurrencyType, LocaleType } from '@/shared/types';

type TransactionAmountProps = {
  amount: number;
  currency: CurrencyType;
  type: TransactionType;
  locale: LocaleType;
};

const TransactionAmount: FC<TransactionAmountProps> = ({ amount, type, currency, locale }) => {
  const amountClass = type === 'income' ? 'text-income' : 'text-expense';

  const formatted = formatCurrency(amount, currency, locale);

  return <span className={amountClass}>{formatted}</span>;
};

export { TransactionAmount };
