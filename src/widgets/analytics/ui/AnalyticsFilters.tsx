import type { FC } from 'react';
import type { Category } from '@/entities/category/model/category.types.ts';
import { cn } from '@/shared/lib/utils.ts';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui';
import { PERIODS } from '@/widgets/analytics/model/constants.ts';
import type {
  CategoryFilter,
  TimePeriod,
  TypeFilter,
} from '@/widgets/analytics/model/analytics.types.ts';

interface AnalyticsFiltersProps {
  period: TimePeriod;
  setPeriod: (p: TimePeriod) => void;
  categoryFilter: CategoryFilter;
  setCategoryFilter: (c: CategoryFilter) => void;
  typeFilter: TypeFilter;
  setTypeFilter: (t: TypeFilter) => void;
  categories: Category[];
  className?: string;
}

const AnalyticsFilters: FC<AnalyticsFiltersProps> = ({
  period,
  setPeriod,
  categoryFilter,
  setCategoryFilter,
  typeFilter,
  setTypeFilter,
  categories,
  className,
}) => {
  return (
    <div
      className={cn('flex flex-wrap items-center gap-3 p-4 bg-card rounded-lg border', className)}
    >
      <div className="flex flex-wrap items-center gap-2">
        {PERIODS.map((p) => (
          <Button
            key={p.value}
            variant={period === p.value ? 'default' : 'outline'}
            size="sm"
            onClick={() => setPeriod(p.value as TimePeriod)}
          >
            {p.label}
          </Button>
        ))}
      </div>
      <div className="flex items-center gap-2 ml-auto">
        <Select value={typeFilter} onValueChange={(v) => setTypeFilter(v as TypeFilter)}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="income">Income</SelectItem>
            <SelectItem value="expense">Expense</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={categoryFilter}
          onValueChange={(v) => setCategoryFilter(v as CategoryFilter)}
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export { AnalyticsFilters };
