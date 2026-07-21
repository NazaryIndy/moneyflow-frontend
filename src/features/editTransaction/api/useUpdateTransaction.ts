import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTransaction } from '@/entities/transaction/api/transaction.api.ts';
import { transactionKeys } from '@/entities/transaction/api/transaction.keys.ts';

export function useUpdateTransactions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: transactionKeys.all,
      });
    },
  });
}
