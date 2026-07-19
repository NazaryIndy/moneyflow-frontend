import type { FC } from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card.tsx';
import { Button } from '@/shared/ui';
import type { Transaction } from '@/entities/transaction/model/types.ts';

type RecentTransactionsCardProps = {
  title: string;
  transactions: Transaction[];
};

const RecentTransactionsCard: FC<RecentTransactionsCardProps> = ({ title, transactions }) => {
  return (
    <Card size={'sm'} className="relative mx-auto w-full max-w-sm pt-0">
      <CardHeader>
        <CardAction></CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {transactions.map((tr) => (
            <div key={tr.id}>
              {tr.title} {tr.type === 'income' ? '+' : '-'}
              {tr.amount}
            </div>
          ))}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">View History</Button>
      </CardFooter>
    </Card>
  );
};

export { RecentTransactionsCard };
