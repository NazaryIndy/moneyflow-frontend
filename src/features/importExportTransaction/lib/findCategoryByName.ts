import type { Category } from '@/entities/category/model/category.types.ts';

export const findCategoryByName = (
  categories: Category[],
  categoryName: string,
): Category | undefined => {
  const normalizedName = categoryName.trim().toLowerCase();

  return categories.find((category) => category.name.trim().toLowerCase() === normalizedName);
};
