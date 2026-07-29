import { useQuery } from '@tanstack/react-query';
import { budgetKeys } from '@/entities/budget/api/budget.keys.ts';
import { getBudget } from '@/entities/budget/api/budget.api.ts';

export function useBudget() {
  return useQuery({
    queryKey: budgetKeys.all,
    queryFn: getBudget,
  });
}
