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
  type CategoryFormType,
  createCategorySchema,
} from '@/entities/category/model/category.schema.ts';
import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    control,
  } = useForm<CategoryFormType>({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      type: 'expense',
      ...defaultValues,
    },
  });

  const onSubmitHandler = handleSubmit(async (data: CategoryFormType) => {
    await onSubmit(data);
  });

  return (
    <form onSubmit={onSubmitHandler} className="space-y-4">
      <Field data-invalid={!!errors.name}>
        <FieldLabel htmlFor="name">Name</FieldLabel>
        <FieldContent>
          <Input
            id="name"
            placeholder="e.g. Groceries"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && <FieldError>{errors.name.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.color}>
        <FieldLabel htmlFor="color">Color</FieldLabel>
        <FieldContent>
          <Input
            id="color"
            placeholder="e.g. #ffffff"
            aria-invalid={!!errors.color}
            {...register('color')}
          />
          {errors.color && <FieldError>{errors.color.message}</FieldError>}
        </FieldContent>
      </Field>

      <Field data-invalid={!!errors.type}>
        <FieldLabel htmlFor="type">Type</FieldLabel>
        <FieldContent>
          <Select
            onValueChange={(value) => setValue('type', value as TransactionType)}
            defaultValue={useWatch({
              control,
              name: 'type',
            })}
          >
            <SelectTrigger id="type" aria-invalid={!!errors.type}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="income">Income</SelectItem>
              <SelectItem value="expense">Expense</SelectItem>
            </SelectContent>
          </Select>
          {errors.type && <FieldError>{errors.type.message}</FieldError>}
        </FieldContent>
      </Field>

      <Button type="submit" disabled={isLoading} className="w-full">
        {isLoading && <Loader2 className="size-4 animate-spin" />}
        {submitButtonText}
      </Button>
    </form>
  );
};
