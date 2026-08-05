import type { FC } from 'react';
import {
  type TransactionFormInput,
  type TransactionFormOutput,
  createTransactionSchema,
} from '@/entities/transaction/model/transaction.schema.ts';
import { useForm } from 'react-hook-form';
import {
  Field,
  Input,
  Select,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  Calendar,
} from '@/shared/ui';
import { FieldContent, FieldError, FieldLabel } from '@/shared/ui/shadcn/field.tsx';
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/shadcn/select.tsx';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns/format';
import { cn } from '@/shared/lib/utils.ts';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategories } from '@/entities/category/api';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { formatDate } from '@/shared/lib';
import { useTranslation } from 'react-i18next';

type TransactionFormProps = {
  onSubmit: (data: TransactionFormOutput) => Promise<void> | void;
  submitButtonText: string;
  settings: UserSettings;
  isLoading?: boolean;
  defaultValues?: Partial<TransactionFormOutput>;
};

export const TransactionForm: FC<TransactionFormProps> = ({
  onSubmit,
  submitButtonText,
  settings,
  isLoading = false,
  defaultValues,
}) => {
  const { t } = useTranslation(['common', 'transactions']);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<TransactionFormInput, unknown, TransactionFormOutput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: 'expense',
      date: format(new Date(), settings.dateFormat || 'yyyy-MM-dd'),
      ...defaultValues,
    },
  });
  const { data: categories } = useCategories();

  const dateValue = watch('date');

  const onSubmitHandler = handleSubmit(async (data: TransactionFormOutput) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <Field data-invalid={!!errors.title}>
        <FieldLabel htmlFor="title">{t('Title')}</FieldLabel>
        <FieldContent>
          <Input
            id="title"
            placeholder={t('transactions:PlaceholderGroceries')}
            aria-invalid={!!errors.title}
            {...register('title')}
          />
          {errors.title && <FieldError>{errors.title.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.categoryId}>
        <FieldLabel htmlFor="categoryId">{t('Category')}</FieldLabel>
        <FieldContent>
          <Select
            onValueChange={(value) => setValue('categoryId', value)}
            defaultValue={watch('categoryId')}
          >
            <SelectTrigger id="category" aria-invalid={!!errors.categoryId}>
              <SelectValue placeholder={t('transactions:SelectCategory')} />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.categoryId && <FieldError>{errors.categoryId.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.amount}>
        <FieldLabel htmlFor="amount">{t('Amount')}</FieldLabel>
        <FieldContent>
          <Input
            id="amount"
            type="number"
            step="0.01"
            placeholder="0.00"
            aria-invalid={!!errors.amount}
            {...register('amount')}
          />
          {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.type}>
        <FieldLabel htmlFor="type">{t('Type')}</FieldLabel>
        <FieldContent>
          <Select
            onValueChange={(value) => setValue('type', value as 'income' | 'expense')}
            defaultValue={watch('type')}
          >
            <SelectTrigger id="type" aria-invalid={!!errors.type}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">{t('transactions:Income')}</SelectItem>
              <SelectItem value="expense">{t('transactions:Expense')}</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <FieldError>{errors.type.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.date}>
        <FieldLabel>{t('Date')}</FieldLabel>
        <FieldContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !dateValue && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {dateValue ? (
                  formatDate(new Date(dateValue), settings.dateFormat)
                ) : (
                  <span>{t('transactions:PickDate')}</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={dateValue ? new Date(dateValue) : undefined}
                onSelect={(date) =>
                  setValue('date', date ? formatDate(date, settings.dateFormat) : '')
                }
                autoFocus={true}
              />
            </PopoverContent>
          </Popover>
          {errors.date && <FieldError>{errors.date.message}</FieldError>}
        </FieldContent>
      </Field>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {submitButtonText}
      </Button>
    </form>
  );
};
