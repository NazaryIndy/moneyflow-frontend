import { useMutation } from '@tanstack/react-query';
import { login } from './auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routePaths.tsx';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      navigate(RoutePath.dashboard);
    },
  });
}
