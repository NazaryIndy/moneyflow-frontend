import { type FC, useState } from 'react';
import { Button } from '@/shared/ui/button.tsx';
import { Loader2 } from 'lucide-react';

type ConfirmDialogProps = {
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  actionButtonTitle: string;
};

const ConfirmDialog: FC<ConfirmDialogProps> = ({ onCancel, onConfirm, actionButtonTitle }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await onConfirm();

      onCancel();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6 sm:px-0 px-4">
      <p className="text-sm text-muted-foreground">Are you sure you want to continue?</p>
      <div className="flex justify-end gap-2">
        <Button variant="outline" disabled={isLoading} type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="button" disabled={isLoading} variant="destructive" onClick={handleDelete}>
          {isLoading && <Loader2 className="size-4 animate-spin" />}

          {actionButtonTitle}
        </Button>
      </div>
    </div>
  );
};

export { ConfirmDialog };
