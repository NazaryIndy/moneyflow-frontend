import { useMutation } from '@tanstack/react-query';
import { logout } from './auth.api.ts';

export function useLogout() {
  return useMutation({
    mutationFn: logout,
  });
}
