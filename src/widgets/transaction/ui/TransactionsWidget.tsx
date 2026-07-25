import type { Transaction } from '@/entities/transaction/model/transaction.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { type FC, useMemo } from 'react';
import { TransactionsToolbar } from '@/widgets/transaction/ui/TransactionToolbar.tsx';
import { TransactionTable } from '@/entities/transaction/ui/table/TransactionTable.tsx';
import { EmptyTransactions } from '@/entities/transaction/ui/EmptyTransactions.tsx';
import { EmptySearchTransactions } from '@/widgets/transaction/ui/EmptySearchTransactions.tsx';
import { useTransactionFilters } from '@/widgets/transaction/model/useTransactionFilters.ts';
import { applyFilters } from '@/features/transactionFilters/lib/applyFilters.ts';

type TransactionsWidgetProps = {
  transactions: Transaction[];
  categories: Category[];
};

const TransactionsWidget: FC<TransactionsWidgetProps> = ({ transactions, categories }) => {
  const {
    sortBy,
    setSortBy,
    categoryFilter,
    setCategoryFilter,
    setSearch,
    setTypeFilter,
    search,
    typeFilter,
    resetFilters,
  } = useTransactionFilters();

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

  return (
    <div className="space-y-4">
      <TransactionsToolbar
        search={search}
        onSearchChange={setSearch}
        typeFilter={typeFilter}
        onTypeFilterChange={setTypeFilter}
        categoryFilter={categoryFilter}
        onCategoryFilterChange={setCategoryFilter}
        sortBy={sortBy}
        onSortChange={setSortBy}
        categories={categories}
        resultsCount={filteredTransactions.length}
        hasActiveFilters={hasActiveFilters}
        onResetFilters={resetFilters}
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
