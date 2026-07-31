import { type FC, useState } from 'react';
import {
  TRANSACTION_SORT_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
  type TransactionSortBy,
  type TransactionTypeFilter,
} from '@/features/filterTransactions/model/filterTransactions.types.ts';
import type { Category } from '@/entities/category/model/category.types.ts';
import { Button, type FilterOption, FilterSelect } from '@/shared/ui';
import { ToolbarSearch } from '@/widgets/transaction/ui/ToolbarSearch.tsx';

import { CreateTransactionButton, CreateTransactionDialog } from '@/features/createTransaction';
import { RotateCcw } from 'lucide-react';

import { useTransactionFilters } from '@/features/filterTransactions/model/useTransactionFilters.ts';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { useTranslation } from 'react-i18next';

type TransactionsToolbarProps = {
  categories: Category[];
  resultsCount: number;
  hasActiveFilters: boolean;
  settings: UserSettings;
};

const TransactionsToolbar: FC<TransactionsToolbarProps> = ({
  categories,
  resultsCount,
  hasActiveFilters,
  settings,
}) => {
  const { t } = useTranslation(['transactions', 'common']);

  const {
    search,
    typeFilter,
    categoryFilter,
    sortBy,

    setSearch,
    setTypeFilter,
    setCategoryFilter,
    setSortBy,
    resetFilters,
  } = useTransactionFilters();

  const [dialogOpen, setDialogOpen] = useState(false);

  const categoryOptions: FilterOption[] = [
    { value: 'all', label: t('common:All') },
    ...categories.map((cat) => ({ value: cat.id, label: cat.name })),
  ];

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-3">
        <ToolbarSearch search={search} onSearchChange={setSearch} resultsCount={resultsCount} />

        <FilterSelect
          value={typeFilter}
          onValueChange={(val) => setTypeFilter(val as TransactionTypeFilter)}
          placeholder={t('common:Type')}
          options={TRANSACTION_TYPE_OPTIONS}
          className="w-full sm:w-[130px]"
        />

        <FilterSelect
          value={categoryFilter}
          onValueChange={setCategoryFilter}
          placeholder={t('common:Category')}
          options={categoryOptions}
          className="w-full sm:w-[150px]"
        />

        <FilterSelect
          value={sortBy}
          onValueChange={(val) => setSortBy(val as TransactionSortBy)}
          placeholder={t('common:SortBy')}
          options={TRANSACTION_SORT_OPTIONS}
          className="w-full sm:w-[160px]"
        />

        <div className="ml-auto w-full sm:w-auto flex items-center">
          <CreateTransactionButton setOpen={setDialogOpen} />
          <CreateTransactionDialog open={dialogOpen} setOpen={setDialogOpen} settings={settings} />
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex justify-end">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-3 text-muted-foreground hover:text-foreground"
            onClick={resetFilters}
          >
            <RotateCcw className="h-4 w-4 mr-1.5" />
            {t('ResetFilters')}
          </Button>
        </div>
      )}
    </div>
  );
};

export { TransactionsToolbar };
