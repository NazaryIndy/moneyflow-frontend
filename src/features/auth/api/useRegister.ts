import { useMutation } from '@tanstack/react-query';
import { register } from './auth.api.ts';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/shared/config/routePaths.tsx';

export function useRegister() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: register,
    onSuccess: () => {
      navigate(RoutePath.login);
    },
  });
}
