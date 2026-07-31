import { Input } from '@/shared/ui';
import { Search, X } from 'lucide-react';
import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

type ToolbarSearchProps = {
  search: string;
  onSearchChange: (value: string) => void;
  resultsCount: number;
};

const ToolbarSearch: FC<ToolbarSearchProps> = ({ search, onSearchChange, resultsCount }) => {
  const { t } = useTranslation(['transactions']);
  const showResultsCount = search.trim() !== '';

  return (
    <div className="relative flex-1 min-w-[200px] sm:max-w-sm">
      <Input
        placeholder={t('SearchTransaction')}
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-9 pr-16"
      />
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center justify-end gap-1">
        {showResultsCount && (
          <span className="text-xs text-muted-foreground whitespace-nowrap">
            {resultsCount} results
          </span>
        )}
        {search && (
          <button
            type="button"
            className="text-muted-foreground hover:text-foreground"
            onClick={() => onSearchChange('')}
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export { ToolbarSearch };
