import type { TransactionType } from '@/entities/transaction/model/transaction.types.ts';

export interface Category {
  id: string;
  name: string;
  color: string;
  type: TransactionType;
}

export type CreateCategoryDto = Omit<Category, 'id'>;
