import type { FC } from 'react';
import { PageContainer, RecentTransactionsCard, StatsCard } from '@/shared/ui';
import { transactions as operations } from '@/shared/mock/transactions.ts';
import type { Transaction } from '@/entities/transaction/model/types.ts';
import {
  calculateExpense,
  calculateIncome,
  recentTransactions,
} from '@/entities/transaction/lib/calculations.ts';
import { BanknoteArrowDown, BanknoteArrowUp, Landmark, Wallet } from 'lucide-react';

const Dashboard: FC = () => {
  const transactions: Transaction[] = operations as Transaction[];
  const recent = recentTransactions(transactions, 5);

  const income = calculateIncome(transactions);
  const expense = calculateExpense(transactions);
  const balance = income - expense;

  return (
    <PageContainer title={'Dashboard'} className="flex justify-between gap-10 flex-wrap">
      <StatsCard title={'Balance'} value={balance} icon={Wallet} tag={'Balance'} color={'blue'} />
      <StatsCard
        title={'Income'}
        value={income}
        icon={BanknoteArrowUp}
        tag={'Income'}
        color={'green'}
      />
      <StatsCard
        title={'Expense'}
        value={expense}
        icon={BanknoteArrowDown}
        tag={'Expense'}
        color={'red'}
      />
      <StatsCard title={'Budget'} value={60} icon={Landmark} tag={'Budget'} color={'purple'} />
      <RecentTransactionsCard title={'Recent Transactions'} transactions={recent} />
    </PageContainer>
  );
};

export { Dashboard };
