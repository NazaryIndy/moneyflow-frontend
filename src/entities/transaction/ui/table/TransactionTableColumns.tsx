import type { ReactNode } from 'react';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { TransactionTypeBadge } from '@/entities/transaction/ui/TransactionTypeBadge.tsx';
import { TransactionAmount } from '@/entities/transaction/ui/TransactionAmount.tsx';
import { CategoryBadge } from '@/entities/transaction/ui/CategoryBadge.tsx';
import { findById, formatDate } from '@/shared/lib';

export type TransactionColumnKey = 'date' | 'title' | 'type' | 'category' | 'amount';

export type TransactionColumnHeaderKey = 'Date' | 'Title' | 'Type' | 'Category' | 'Amount';

export type TransactionColumnContext = {
  settings: UserSettings;
  categories?: Category[];
};

export type TransactionColumn = {
  headerKey: TransactionColumnHeaderKey;
  align?: 'right';
  render: (transaction: Transaction, ctx: TransactionColumnContext) => ReactNode;
};

export const TRANSACTION_COLUMNS: Record<TransactionColumnKey, TransactionColumn> = {
  date: {
    headerKey: 'Date',
    render: (transaction, { settings }) => formatDate(transaction.date, settings.dateFormat),
  },
  title: {
    headerKey: 'Title',
    render: (transaction) => transaction.title,
  },
  type: {
    headerKey: 'Type',
    render: (transaction) => <TransactionTypeBadge type={transaction.type} />,
  },
  category: {
    headerKey: 'Category',
    render: (transaction, { categories }) => (
      <CategoryBadge category={findById(categories ?? [], transaction.categoryId)} />
    ),
  },
  amount: {
    headerKey: 'Amount',
    render: (transaction, { settings }) => (
      <TransactionAmount
        amount={transaction.amount}
        currency={settings.currency}
        locale={settings.locale}
        type={transaction.type}
      />
    ),
  },
};
