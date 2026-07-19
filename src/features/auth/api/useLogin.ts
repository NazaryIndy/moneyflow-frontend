import { useMutation } from '@tanstack/react-query';
import { login } from './auth.api.ts';

export function useLogin() {
  return useMutation({
    mutationFn: login,
  });
}
