import { type FC, useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import { toastError, toastSuccess } from '@/shared/lib';
import { useDeleteCategory } from '@/features/deleteCategory/api/useDeleteCategory.ts';
import { ResponsiveDialog } from '@/shared/ui/ResponsiveDialog/ResponsiveDialog.tsx';
import { ConfirmDialog } from '@/shared/ui/ConfirmDialog/ConfirmDialog.tsx';
import { Button } from '@/shared/ui/shadcn/button.tsx';

type DeleteCategoryActionProps = {
  categoryId: string;
};

const DeleteCategoryAction: FC<DeleteCategoryActionProps> = ({ categoryId }) => {
  const [open, setOpen] = useState(false);

  const { mutateAsync: deleteCategory, isPending } = useDeleteCategory();

  const handleDelete = async () => {
    try {
      await deleteCategory(categoryId);

      toastSuccess('Category deleted');

      setOpen(false);
    } catch {
      toastError('Failed to delete category');
    }
  };

  return (
    <>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete category"
        description="This action cannot be undone."
      >
        <ConfirmDialog
          onConfirm={handleDelete}
          onCancel={() => setOpen(false)}
          actionButtonTitle="Delete"
        />
      </ResponsiveDialog>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-destructive"
        onClick={() => setOpen(true)}
      >
        {isPending ? <Loader2 className="h-4 w-4" /> : <Trash2 className="h-4 w-4" />}
      </Button>
    </>
  );
};

export { DeleteCategoryAction };
