import { toastError, toastSuccess } from '@/shared/lib';
import { ResponsiveDialog } from '@/shared/ui/ResponsiveDialog/ResponsiveDialog.tsx';
import type { FC } from 'react';
import { useCreateCategory } from '@/features/createCategory/api/useCreateCategory.ts';
import type { CategoryFormType } from '@/entities/category/model/category.schema.ts';
import { CategoryForm } from '@/entities/category/ui/CategoryForm.tsx';

type CreateCategoryDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const CreateCategoryDialog: FC<CreateCategoryDialogProps> = ({ open, setOpen }) => {
  const { mutateAsync: createCategory, isPending: isCreating } = useCreateCategory();

  const handleAddCategory = async (data: CategoryFormType) => {
    try {
      await createCategory(data);

      toastSuccess('Category created');

      setOpen(false);
    } catch {
      toastError('Failed to create category');
    }
  };

  return (
    <ResponsiveDialog title="Add Category" open={open} onOpenChange={setOpen}>
      <CategoryForm
        onSubmit={handleAddCategory}
        submitButtonText="Add Category"
        isLoading={isCreating}
      />
    </ResponsiveDialog>
  );
};

export { CreateCategoryDialog };
