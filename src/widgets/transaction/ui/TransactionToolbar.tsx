import { type FC, useState } from 'react';
import type { Category } from '@/entities/category/model/category.types.ts';
import { Button, type FilterOption, FilterSelect } from '@/shared/ui';
import { RotateCcw } from 'lucide-react';
import { CreateTransactionButton, CreateTransactionDialog } from '@/features/createTransaction';
import { ToolbarSearch } from '@/widgets/transaction/ui/ToolbarSearch.tsx';
import type {
  TransactionSortBy,
  TransactionTypeFilter,
} from '@/entities/transaction/model/transaction.types.ts';
import {
  TRANSACTION_SORT_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/widgets/transaction/model/constants.ts';

type TransactionsToolbarProps = {
  search: string;
  onSearchChange: (value: string) => void;
  typeFilter: TransactionTypeFilter;
  onTypeFilterChange: (value: TransactionTypeFilter) => void;
  categoryFilter: string | 'all';
  onCategoryFilterChange: (value: string | 'all') => void;
  sortBy: TransactionSortBy;
  onSortChange: (value: TransactionSortBy) => void;
  categories: Category[];
  resultsCount: number;
  hasActiveFilters: boolean;
  onResetFilters: () => void;
};

const TransactionsToolbar: FC<TransactionsToolbarProps> = ({
  search,
  onSearchChange,
  typeFilter,
  onTypeFilterChange,
  categoryFilter,
  onCategoryFilterChange,
  sortBy,
  onSortChange,
  categories,
  resultsCount,
  hasActiveFilters,
  onResetFilters,
}) => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: 'All' },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <ToolbarSearch
          search={search}
          onSearchChange={onSearchChange}
          resultsCount={resultsCount}
        />

        <FilterSelect
          value={typeFilter}
          onValueChange={(val) => onTypeFilterChange(val as TransactionTypeFilter)}
          placeholder="Type"
          options={TRANSACTION_TYPE_OPTIONS}
          className="w-full sm:w-[130px]"
        />

        <FilterSelect
          value={categoryFilter}
          onValueChange={onCategoryFilterChange}
          placeholder="Category"
          options={categoryOptions}
          className="w-full sm:w-[150px]"
        />

        <FilterSelect
          value={sortBy}
          onValueChange={(val) => onSortChange(val as TransactionSortBy)}
          placeholder="Sort by"
          options={TRANSACTION_SORT_OPTIONS}
          className="w-full sm:w-[160px]"
        />

        <div className="ml-auto w-full sm:w-auto flex items-center">
          <CreateTransactionButton setOpen={setDialogOpen} />
          <CreateTransactionDialog open={dialogOpen} setOpen={setDialogOpen} />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-muted-foreground hover:text-foreground"
            onClick={onResetFilters}
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            Reset filters
          </Button>
        </div>
      )}
    </div>
  );
};

export { TransactionsToolbar };
