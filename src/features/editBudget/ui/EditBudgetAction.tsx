import { type FC, useState } from 'react';
import { Button } from '@/shared/ui';
import { Pencil } from 'lucide-react';
import type { MonthBudget } from '@/entities/budget/model/budget.types.ts';
import { EditBudgetDialog } from '@/features/editBudget/ui/EditBudgetDialog.tsx';

type EditBudgetActionProps = {
  budget: MonthBudget;
};

const EditBudgetAction: FC<EditBudgetActionProps> = ({ budget }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditBudgetDialog budget={budget} onOpenChange={setOpen} open={open} />
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 text-muted-foreground hover:text-accent"
        onClick={() => setOpen(true)}
      >
        <Pencil className="h-4 w-4" />
      </Button>
    </>
  );
};

export { EditBudgetAction };
