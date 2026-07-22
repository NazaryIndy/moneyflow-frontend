import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCategory } from '@/entities/category/api/category.api.ts';
import { categoryKeys } from '@/entities/category/api/category.keys.ts';

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
}
