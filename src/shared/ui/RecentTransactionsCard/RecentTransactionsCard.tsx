import type { FC } from 'react';
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card.tsx';
import { Button } from '@/shared/ui/button.tsx';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/app/router/routePaths.tsx';
import { TransactionPreviewTable } from '@/entities/transaction/ui/preview/TransactionPreviewTable.tsx';

type RecentTransactionsCardProps = {
  title: string;
  transactions: Transaction[];
};

const RecentTransactionsCard: FC<RecentTransactionsCardProps> = ({ title, transactions }) => {
  const navigate = useNavigate();

  return (
    <Card size={'sm'} className="relative mx-auto w-full max-w-lg ">
      <CardHeader>
        <CardAction></CardAction>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          <TransactionPreviewTable transactions={transactions} />
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          className="ml-auto"
          variant="outline"
          onClick={() => navigate(RoutePath.transactions)}
        >
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
};

export { RecentTransactionsCard };
