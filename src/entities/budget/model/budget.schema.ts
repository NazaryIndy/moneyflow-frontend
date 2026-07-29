import { z } from 'zod';

export const createMonthBudgetSchema = z.object({
  month: z.coerce.number(),
  year: z.coerce.number(),
  amount: z.coerce.number(),
});

export type MonthBudgetFormInput = z.input<typeof createMonthBudgetSchema>;
export type MonthBudgetFormOutput = z.output<typeof createMonthBudgetSchema>;
