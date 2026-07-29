import type { FC } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select.tsx';
import { cn } from '@/shared/lib/utils.ts';
import type { FilterOption } from '@/shared/ui/FilterSelect/FilterSelect.types.ts';

type FilterSelectProps = {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  options: FilterOption[];
  className?: string;
};

const FilterSelect: FC<FilterSelectProps> = ({
  value,
  onValueChange,
  placeholder,
  options,
  className,
}) => {
  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={cn('shrink-0', className)}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((opt) => (
          <SelectItem key={opt.value} value={opt.value}>
            {opt.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { FilterSelect };
