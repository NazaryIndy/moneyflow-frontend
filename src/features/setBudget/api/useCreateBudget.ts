import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createBudget } from '@/entities/budget/api/budget.api.ts';
import { budgetKeys } from '@/entities/budget/api/budget.keys.ts';

export function useCreateBudget() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBudget,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: budgetKeys.all,
      });
    },
  });
}
