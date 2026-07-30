import type { FC } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/shared/ui/shadcn/card.tsx';
import { Button } from '@/shared/ui/shadcn/button.tsx';
import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routePaths.tsx';
import { TransactionPreviewTable } from '@/entities/transaction/ui/preview/TransactionPreviewTable.tsx';
import { EmptyTransactions } from '@/entities/transaction/ui/EmptyTransactions.tsx';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';

type RecentTransactionsCardProps = {
  title: string;
  transactions: Transaction[];
  settings: UserSettings;
};

const RecentTransactionsCard: FC<RecentTransactionsCardProps> = ({
  title,
  transactions,
  settings,
}) => {
  const navigate = useNavigate();

  if (!transactions.length) {
    return (
      <Card size={'sm'} className="relative mx-auto w-full max-w-lg ">
        <CardHeader>
          <CardDescription>
            <EmptyTransactions />
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card size={'sm'} className="relative mx-auto w-full max-w-lg ">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <TransactionPreviewTable transactions={transactions} settings={settings} />
      </CardContent>
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
