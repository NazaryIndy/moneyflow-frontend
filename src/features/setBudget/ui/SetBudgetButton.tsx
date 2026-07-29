import type { FC } from 'react';
import { Button } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';

type SetBudgetButtonProps = {
  setOpen: (value: boolean) => void;
};

const SetBudgetButton: FC<SetBudgetButtonProps> = ({ setOpen }) => {
  return (
    <Button onClick={() => setOpen(true)}>
      <PlusIcon /> Set budget
    </Button>
  );
};

export { SetBudgetButton };
