import { ResponsiveDialog } from '@/shared/ui';
import type { FC } from 'react';
import { toastError, toastSuccess } from '@/shared/lib';
import type { Category } from '@/entities/category/model/category.types.ts';
import { useUpdateCategory } from '@/features/editCategory/api/useUpdateCategory.ts';
import type { CategoryFormType } from '@/entities/category/model/category.schema.ts';
import { CategoryForm } from '@/entities/category/ui/CategoryForm.tsx';

type EditTransactionDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  category: Category;
};

const EditCategoryDialog: FC<EditTransactionDialogProps> = ({ open, onOpenChange, category }) => {
  const { mutateAsync: updateCategory, isPending } = useUpdateCategory();

  const handleEdit = async (data: CategoryFormType) => {
    try {
      await updateCategory({
        id: category.id,
        ...data,
      });

      toastSuccess('Category updated');

      onOpenChange(false);
    } catch {
      toastError('Failed to update category');
    }
  };

  return (
    <ResponsiveDialog title="Edit Category" open={open} onOpenChange={onOpenChange}>
      <CategoryForm
        onSubmit={handleEdit}
        submitButtonText="Save Changes"
        isLoading={isPending}
        defaultValues={category}
      />
    </ResponsiveDialog>
  );
};

export { EditCategoryDialog };
