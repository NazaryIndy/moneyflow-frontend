import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteCategory } from '@/entities/category/api/category.api.ts';
import { categoryKeys } from '@/entities/category/api/category.keys.ts';

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: categoryKeys.all,
      });
    },
  });
}
