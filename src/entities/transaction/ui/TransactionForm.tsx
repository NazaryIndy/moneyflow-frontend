import type { FC } from 'react';
import {
  createTransactionSchema,
  type TransactionFormInput,
  type TransactionFormOutput,
} from '@/entities/transaction/model/transaction.schema.ts';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCategories } from '@/entities/category/api';
import type { UserSettings } from '@/entities/settings/model/settings.types.ts';
import { useTranslation } from 'react-i18next';
import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants.ts';
import { formatDate } from '@/shared/lib';
import { FormDatePickerField, FormInputField, FormSelectField } from '@/shared/ui/form';
import { Button } from '@/shared/ui/shadcn/button.tsx';

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
  const { handleSubmit, control } = useForm<TransactionFormInput, unknown, TransactionFormOutput>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: {
      type: TRANSACTION_TYPE.EXPENSE,
      date: formatDate(new Date(), settings.dateFormat || 'yyyy-MM-dd'),
      ...defaultValues,
    },
  });
  const { data: categories } = useCategories();

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <FormInputField
        control={control}
        name="title"
        label={t('Title')}
        placeholder={t('transactions:PlaceholderGroceries')}
      />

      <FormSelectField
        control={control}
        name="categoryId"
        label={t('Category')}
        placeholder={t('transactions:SelectCategory')}
        options={(categories ?? []).map((category) => ({
          value: category.id,
          label: category.name,
        }))}
      />

      <FormInputField
        control={control}
        name="amount"
        label={t('Amount')}
        type="number"
        step="0.01"
        placeholder="0.00"
      />

      <FormSelectField
        control={control}
        name="type"
        label={t('Type')}
        placeholder="Select type"
        options={[
          { value: 'income', label: t('transactions:Income') },
          { value: 'expense', label: t('transactions:Expense') },
        ]}
      />

      <FormDatePickerField
        control={control}
        name="date"
        label={t('Date')}
        dateFormat={settings.dateFormat}
        placeholder={t('transactions:PickDate')}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {submitButtonText}
      </Button>
    </form>
  );
};
