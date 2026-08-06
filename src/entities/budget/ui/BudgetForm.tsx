import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Button, FormInputField, FormSelectField } from '@/shared/ui';

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
  const { handleSubmit, control } = useForm<MonthBudgetFormInput, unknown, MonthBudgetFormOutput>({
    resolver: zodResolver(createMonthBudgetSchema),
    defaultValues: {
      ...defaultValues,
    },
  });

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <FormInputField
        control={control}
        name="amount"
        label="Amount"
        type="number"
        placeholder="e.g. 10000"
      />

      <FormInputField
        control={control}
        name="year"
        label="Year"
        type="number"
        placeholder="e.g. 2026"
      />

      <FormSelectField
        control={control}
        name="month"
        label="Month"
        placeholder="Select month"
        valueType="number"
        options={MONTHS.map((month) => ({ value: String(month.value), label: month.label }))}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {submitButtonText}
      </Button>
    </form>
  );
};
