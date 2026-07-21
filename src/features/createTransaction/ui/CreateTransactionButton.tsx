import type { FC } from 'react';
import { Button } from '@/shared/ui';
import { PlusIcon } from 'lucide-react';

type CreateTransactionButtonProps = {
  setOpen: (value: boolean) => void;
};

const CreateTransactionButton: FC<CreateTransactionButtonProps> = ({ setOpen }) => {
  return (
    <Button onClick={() => setOpen(true)}>
      <PlusIcon /> Add transaction
    </Button>
  );
};

export { CreateTransactionButton };
