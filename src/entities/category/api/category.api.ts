import { api } from '@/shared/api';
import type { Category, CreateCategoryDto } from '@/entities/category/model/category.types.ts';

export async function getCategories(): Promise<Category[]> {
  const response = await api.get('/categories');

  return response.data;
}

export async function createCategory(data: CreateCategoryDto) {
  const response = await api.post('/categories', data);

  return response.data;
}

export async function updateCategory(data: Category) {
  const response = await api.put(`/categories/${data.id}`, data);

  return response.data;
}

export async function deleteCategory(id: string) {
  const response = await api.delete(`/categories/${id}`);

  return response.data;
}
