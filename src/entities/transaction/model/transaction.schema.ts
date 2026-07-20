import { z } from 'zod';

export const transactionSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  amount: z.coerce.number().positive('Amount must be greater than 0'),
  type: z.enum(['income', 'expense']),
  date: z.string().min(1, 'Date is required'),
});

export type CreateTransactionFormInput = z.input<typeof transactionSchema>;
export type CreateTransactionFormOutput = z.output<typeof transactionSchema>;
