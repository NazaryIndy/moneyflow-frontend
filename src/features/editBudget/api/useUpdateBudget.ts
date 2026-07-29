import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateBudget } from '@/entities/budget/api/budget.api.ts';
import { budgetKeys } from '@/entities/budget/api/budget.keys.ts';

export function useUpdateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: budgetKeys.all,
      });
    },
  });
}
