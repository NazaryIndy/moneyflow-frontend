import { useMutation } from '@tanstack/react-query';
import { logout } from './auth.api.ts';
import { RoutePath } from '@/app/router/routePaths.tsx';
import { useNavigate } from 'react-router-dom';

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      navigate(RoutePath.home);
    },
  });
}
