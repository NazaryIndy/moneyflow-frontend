import { type FC, useMemo } from 'react';
import { TransactionTable } from '@/entities/transaction/ui/table/TransactionTable.tsx';
import { EmptyTransactions } from '@/entities/transaction/ui/EmptyTransactions.tsx';
import { EmptySearchTransactions } from '@/widgets/transaction/ui/EmptySearchTransactions.tsx';
import { applyFilters } from '@/features/filterTransactions/lib/applyFilters.ts';
import { useTransactionsData } from '@/entities/transaction';
import { TransactionsToolbar } from '@/features/filterTransactions/ui/TransactionsToolbar.tsx';
import { useTransactionFilters } from '@/features/filterTransactions/model/useTransactionFilters.ts';
import { Loader } from '@/shared/ui';

const TransactionsWidget: FC = () => {
  const {
    transactions,
    categories,
    isLoadingCategories,
    isLoadingTransactions,
    isErrorCategories,
    isErrorTransactions,
  } = useTransactionsData();

  const { search, typeFilter, categoryFilter, sortBy } = useTransactionFilters();

  const filteredTransactions = useMemo(() => {
    return applyFilters(transactions, {
      search,
      type: typeFilter,
      category: categoryFilter,
      sort: sortBy,
    });
  }, [transactions, search, typeFilter, categoryFilter, sortBy]);

  const hasActiveFilters =
    search !== '' || typeFilter !== 'all' || categoryFilter !== 'all' || sortBy !== 'newest';

  if (isLoadingCategories || isLoadingTransactions) return <Loader />;
  if (isErrorCategories || isErrorTransactions) return <div>Error...</div>;

  return (
    <div className="space-y-4">
      <TransactionsToolbar
        categories={categories}
        resultsCount={filteredTransactions.length}
        hasActiveFilters={hasActiveFilters}
      />

      {transactions.length === 0 ? (
        <EmptyTransactions />
      ) : filteredTransactions.length === 0 ? (
        <EmptySearchTransactions />
      ) : (
        <TransactionTable transactions={filteredTransactions} />
      )}
    </div>
  );
};

export { TransactionsWidget };
