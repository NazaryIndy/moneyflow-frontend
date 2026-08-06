import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { CalendarIcon } from 'lucide-react';
import { cn } from '@/shared/lib/utils.ts';
import { formatDate } from '@/shared/lib';
import type { FormFieldProps } from '@/shared/ui/form/form.types.ts';
import type { DateFormatType } from '@/shared/types';
import { Field, FieldContent, FieldError, FieldLabel } from '@/shared/ui/shadcn/field.tsx';
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/shadcn/popover.tsx';
import { Button } from '@/shared/ui/shadcn/button.tsx';
import { Calendar } from '@/shared/ui/shadcn/calendar.tsx';

type FormDatePickerFieldProps<TFieldValues extends FieldValues> = FormFieldProps<TFieldValues> & {
  dateFormat: DateFormatType;
  placeholder?: string;
};

export function FormDatePickerField<TFieldValues extends FieldValues>({
  control,
  name,
  label,
  dateFormat,
  placeholder = 'Pick a date',
}: FormDatePickerFieldProps<TFieldValues>) {
  const {
    field,
    fieldState: { error },
  } = useController({ control, name });

  const dateValue = field.value as string | undefined;

  return (
    <Field data-invalid={!!error}>
      <FieldLabel>{label}</FieldLabel>
      <FieldContent>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              variant="outline"
              className={cn(
                'w-full justify-start text-left font-normal',
                !dateValue && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateValue ? formatDate(new Date(dateValue), dateFormat) : <span>{placeholder}</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={dateValue ? new Date(dateValue) : undefined}
              onSelect={(date) => field.onChange(date ? formatDate(date, dateFormat) : '')}
              autoFocus
            />
          </PopoverContent>
        </Popover>
        {error && <FieldError>{error.message}</FieldError>}
      </FieldContent>
    </Field>
  );
}
