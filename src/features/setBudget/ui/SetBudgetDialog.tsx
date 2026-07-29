import { toastError, toastSuccess } from '@/shared/lib';
import { ResponsiveDialog } from '@/shared/ui';
import type { FC } from 'react';
import { useCreateBudget } from '@/features/setBudget/api/useCreateBudget.ts';
import type { MonthBudgetFormOutput } from '@/entities/budget/model/budget.schema.ts';
import { BudgetForm } from '@/entities/budget/ui/BudgetForm.tsx';

type SetBudgetDialogProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

const SetBudgetDialog: FC<SetBudgetDialogProps> = ({ open, setOpen }) => {
  const { mutateAsync: createBudget, isPending: isCreating } = useCreateBudget();

  const handleAddBudget = async (data: MonthBudgetFormOutput) => {
    try {
      await createBudget(data);

      toastSuccess('Budget set');

      setOpen(false);
    } catch {
      toastError('Failed to set budget');
    }
  };

  return (
    <ResponsiveDialog title="Set Budget" open={open} onOpenChange={setOpen}>
      <BudgetForm onSubmit={handleAddBudget} submitButtonText="Set Budget" isLoading={isCreating} />
    </ResponsiveDialog>
  );
};

export { SetBudgetDialog };
