import type { FC } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import {
  Button,
  Field,
  Input,
  Select,
  FieldContent,
  FieldError,
  FieldLabel,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui';

import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  createMonthBudgetSchema,
  type MonthBudgetFormInput,
  type MonthBudgetFormOutput,
} from '@/entities/budget/model/budget.schema.ts';
import { MONTHS } from '@/entities/budget/model/constants.ts';

type BudgetFormProps = {
  onSubmit: (data: MonthBudgetFormOutput) => Promise<void> | void;
  submitButtonText: string;
  isLoading?: boolean;
  defaultValues?: Partial<MonthBudgetFormOutput>;
};

export const BudgetForm: FC<BudgetFormProps> = ({
  onSubmit,
  submitButtonText,
  isLoading = false,
  defaultValues,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<MonthBudgetFormInput, unknown, MonthBudgetFormOutput>({
    resolver: zodResolver(createMonthBudgetSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmitHandler = handleSubmit(async (data: MonthBudgetFormOutput) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <Field data-invalid={!!errors.amount}>
        <FieldLabel htmlFor="amount">Amount</FieldLabel>
        <FieldContent>
          <Input
            id="amount"
            type="number"
            placeholder="e.g. 10000"
            aria-invalid={!!errors.amount}
            {...register('amount')}
          />
          {errors.amount && <FieldError>{errors.amount.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.year}>
        <FieldLabel htmlFor="year">Year</FieldLabel>
        <FieldContent>
          <Input
            id="year"
            type="number"
            placeholder="e.g. 2026"
            aria-invalid={!!errors.year}
            {...register('year')}
          />
          {errors.year && <FieldError>{errors.year.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.month}>
        <FieldLabel htmlFor="month">Month</FieldLabel>
        <FieldContent>
          <Select
            onValueChange={(value) => setValue('month', parseInt(value, 10))}
            defaultValue={useWatch({
              control,
              name: 'month',
            })?.toString()}
          >
            <SelectTrigger id="month" aria-invalid={!!errors.month}>
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((month) => (
                <SelectItem key={month.value} value={String(month.value)}>
                  {month.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.month && <FieldError>{errors.month.message}</FieldError>}
        </FieldContent>
      </Field>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {submitButtonText}
      </Button>
    </form>
  );
};
