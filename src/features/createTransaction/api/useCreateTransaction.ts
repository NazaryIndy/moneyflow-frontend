import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTransaction } from '@/entities/transaction/api/transaction.api.ts';
import { transactionKeys } from '@/entities/transaction/api/transaction.keys.ts';

export function useCreateTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.all,
      });
    },
  });
}
