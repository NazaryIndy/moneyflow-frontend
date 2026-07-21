import { toast } from 'sonner';

export const toastSuccess = (message: string) => {
  toast.success(message, {
    position: 'top-center',
    action: {
      label: 'OK',
      onClick: () => console.log('OK'),
    },
  });
};

export const toastError = (message: string) =>
  toast.error(message, {
    position: 'top-center',
    action: {
      label: 'OK',
      onClick: () => console.log('OK'),
    },
  });
