import { useQuery } from '@tanstack/react-query';
import { getTransactions } from './transaction.api.ts';
import { transactionKeys } from '@/entities/transaction/api/transaction.keys.ts';

export function useTransactions() {
  return useQuery({
    queryKey: transactionKeys.all,
    queryFn: getTransactions,
  });
}
