import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTransaction } from '@/entities/transaction/api/transaction.api.ts';
import { transactionKeys } from '@/entities/transaction/api/transaction.keys.ts';

export function useDeleteTransaction() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.all,
      });
    },
  });
}
