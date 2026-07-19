import { useQuery } from '@tanstack/react-query';
import { getTransactions } from './transaction.api.ts';

export function useTransactions() {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: getTransactions,
  });
}
