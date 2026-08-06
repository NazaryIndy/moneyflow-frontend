import { ResponsiveDialog } from '@/shared/ui/ResponsiveDialog/ResponsiveDialog.tsx';
import type { FC } from 'react';
import { toastError, toastSuccess } from '@/shared/lib';
import { BudgetForm } from '@/entities/budget/ui/BudgetForm.tsx';
import type { MonthBudgetFormOutput } from '@/entities/budget/model/budget.schema.ts';
import { useUpdateBudget } from '@/features/editBudget/api/useUpdateBudget.ts';
import type { MonthBudget } from '@/entities/budget/model/budget.types.ts';

type EditBudgetDialogProps = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  budget: MonthBudget;
};

const EditBudgetDialog: FC<EditBudgetDialogProps> = ({ open, onOpenChange, budget }) => {
  const { mutateAsync: updateCategory, isPending } = useUpdateBudget();

  const handleEdit = async (data: MonthBudgetFormOutput) => {
    try {
      await updateCategory({
        id: budget.id,
        ...data,
      });

      toastSuccess('Budget updated');

      onOpenChange(false);
    } catch {
      toastError('Failed to update budget');
    }
  };

  return (
    <ResponsiveDialog title="Edit Budget" open={open} onOpenChange={onOpenChange}>
      <BudgetForm
        onSubmit={handleEdit}
        submitButtonText="Save Changes"
        isLoading={isPending}
        defaultValues={budget}
      />
    </ResponsiveDialog>
  );
};

export { EditBudgetDialog };
