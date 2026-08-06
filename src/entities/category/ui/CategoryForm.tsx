import type { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  type CategoryFormType,
  createCategorySchema,
} from '@/entities/category/model/category.schema.ts';
import { FormInputField, FormSelectField } from '@/shared/ui/form';
import { Button } from '@/shared/ui/shadcn/button.tsx';

type CategoryFormProps = {
  onSubmit: (data: CategoryFormType) => Promise<void> | void;
  submitButtonText: string;
  isLoading?: boolean;
  defaultValues?: Partial<CategoryFormType>;
};

export const CategoryForm: FC<CategoryFormProps> = ({
  onSubmit,
  submitButtonText,
  isLoading = false,
  defaultValues,
}) => {
  const { handleSubmit, control } = useForm<CategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      type: 'expense',
      ...defaultValues,
    },
  });

  const onSubmitHandler = handleSubmit(async (data) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <FormInputField control={control} name="name" label="Name" placeholder="e.g. Groceries" />

      <FormInputField control={control} name="color" label="Color" placeholder="e.g. #ffffff" />

      <FormSelectField
        control={control}
        name="type"
        label="Type"
        placeholder="Select type"
        options={[
          { value: 'income', label: 'Income' },
          { value: 'expense', label: 'Expense' },
        ]}
      />

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {submitButtonText}
      </Button>
    </form>
  );
};
