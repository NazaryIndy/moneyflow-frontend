import { authHandlers } from '@/mocks/handlers/auth.ts';
import { transactionHandlers } from '@/mocks/handlers/transaction.ts';

export const handlers = [...authHandlers, ...transactionHandlers];
