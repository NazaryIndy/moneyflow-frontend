import { TRANSACTION_TYPE } from '@/entities/transaction/model/transaction.constants';
import { z } from 'zod';

export const createCategorySchema = z.object({
  name: z.string().min(1, 'Name is required'),
  color: z.string().min(1, 'Color is required'),
  type: z.enum([TRANSACTION_TYPE.INCOME, TRANSACTION_TYPE.EXPENSE]),
});

export type CategoryFormType = z.infer<typeof createCategorySchema>;
