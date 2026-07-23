import { type FC } from 'react';
import { PageContainer } from '@/shared/ui';
import { useTransactions } from '@/entities/transaction/api';
import { Loader2 } from 'lucide-react';
import { useCategories } from '@/entities/category/api';
import { TransactionsWidget } from '@/widgets/transaction/ui/TransactionsWidget.tsx';

const Transactions: FC = () => {
  const { data: transactions, isLoading: isLoadingTransactions } = useTransactions();
  const { data: categories, isLoading: isLoadingCategories } = useCategories();

  if (isLoadingTransactions || isLoadingCategories) {
    return (
      <PageContainer title="Transactions">
        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer title="Transactions">
      <TransactionsWidget transactions={transactions ?? []} categories={categories ?? []} />
    </PageContainer>
  );
};

export { Transactions };
