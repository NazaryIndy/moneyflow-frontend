import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateCategory } from '@/entities/category/api/category.api.ts';
import { categoryKeys } from '@/entities/category/api/category.keys.ts';

export function useUpdateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
}
