import { useQuery } from '@tanstack/react-query';
import { getCategories } from './category.api.ts';
import { categoryKeys } from '@/entities/category/api/category.keys.ts';

export function useCategories() {
  return useQuery({
    queryKey: categoryKeys.all,
    queryFn: getCategories,
  });
}
