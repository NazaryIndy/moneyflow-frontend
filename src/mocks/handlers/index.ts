import { authHandlers } from '@/mocks/handlers/auth.ts';
import { transactionHandlers } from '@/mocks/handlers/transaction.ts';
import { categoryHandlers } from '@/mocks/handlers/category.ts';
import { budgetHandlers } from '@/mocks/handlers/budget.ts';

export const handlers = [
  ...authHandlers,
  ...transactionHandlers,
  ...categoryHandlers,
  ...budgetHandlers,
];
