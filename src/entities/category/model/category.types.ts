export interface Category {
  id: string;
  name: string;
  color: string;
  type: CategoryType;
}

export type CreateCategoryDto = Omit<Category, 'id'>;

export type CategoryType = 'income' | 'expense';

//TODO move
export interface CategoryTotal {
  categoryId: string;
  categoryName: string;
  amount: number;
  color: string;
}

export interface CategoryTotalsResult {
  income: CategoryTotal[];
  expense: CategoryTotal[];
}
