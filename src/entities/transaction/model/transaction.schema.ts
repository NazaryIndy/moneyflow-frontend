import { z } from 'zod';

export const createTransactionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  categoryId: z.string().min(1, 'Category is required'),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  type: z.enum(['income', 'expense']),
  date: z.string().min(1, 'Date is required'),
});

export type TransactionFormInput = z.input<typeof createTransactionSchema>;
export type TransactionFormOutput = z.output<typeof createTransactionSchema>;
