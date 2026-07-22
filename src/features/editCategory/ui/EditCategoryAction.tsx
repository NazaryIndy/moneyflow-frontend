import { type FC, useState } from 'react';
import { EditCategoryDialog } from '@/features/editCategory/ui/EditCategoryDialog.tsx';
import type { Category } from '@/entities/category/model/category.types.ts';
import { Button } from '@/shared/ui';
import { Pencil } from 'lucide-react';

type EditCategoryActionProps = {
  category: Category;
};

const EditCategoryAction: FC<EditCategoryActionProps> = ({ category }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <EditCategoryDialog category={category} onOpenChange={setOpen} open={open} />
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

export { EditCategoryAction };
