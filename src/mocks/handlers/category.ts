import { http, HttpResponse } from 'msw';

import { categories } from '@/shared/mock/categories.ts';
import type { Category, CreateCategoryDto } from '@/entities/category/model/category.types.ts';

export const categoryHandlers = [
  http.get('api/categories', () => {
    return HttpResponse.json(categories);
  }),

  http.post('api/categories', async ({ request }) => {
    const data = (await request.json()) as CreateCategoryDto;

    const newCategory = {
      id: crypto.randomUUID(),
      ...data,
    };

    categories.push(newCategory);

    return HttpResponse.json(newCategory, {
      status: 201,
    });
  }),

  http.put('api/categories/:id', async ({ request, params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;

    if (!id || typeof id !== 'string') {
      return HttpResponse.json({ error: 'Invalid category id' }, { status: 400 });
    }

    const data = (await request.json()) as Partial<Category>;

    const index = categories.findIndex((t) => t.id === id);
    if (index === -1) {
      return HttpResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const updatedCategory = { ...categories[index], ...data, id };
    categories[index] = updatedCategory;

    return HttpResponse.json(updatedCategory, { status: 200 });
  }),

  http.delete('api/categories/:id', async ({ params }) => {
    const { id } = params;

    const index = categories.findIndex((t) => t.id === id);

    if (index === -1) {
      return HttpResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    categories.splice(index, 1);

    return new HttpResponse(null, {
      status: 204,
    });
  }),
];
