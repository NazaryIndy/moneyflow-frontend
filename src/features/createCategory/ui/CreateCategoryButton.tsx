import type { FC } from 'react';
import { Button } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';

type CreateCategoryButtonProps = {
  setOpen: (value: boolean) => void;
};

const CreateCategoryButton: FC<CreateCategoryButtonProps> = ({ setOpen }) => {
  return (
    <Button onClick={() => setOpen(true)}>
      <PlusIcon /> Add category
    </Button>
  );
};

export { CreateCategoryButton };
