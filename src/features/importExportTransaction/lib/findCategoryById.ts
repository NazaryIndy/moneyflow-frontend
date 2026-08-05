import type { Category } from '@/entities/category/model/category.types.ts';

export const findCategoryById = (
  categories: Category[],
  categoryId: string,
): Category | undefined => {
  return categories.find((category) => category.id === categoryId);
};
