import type { AuthStore } from '@/features/auth/model/authStore/types.ts';
import { useAuthStore } from '@/features/auth/model/authStore/authStore.ts';
import {
  isAuthSelector,
  loginSelector,
  logoutSelector,
  userSelector,
} from '@/features/auth/model/authStore/selectors.ts';

export const useIsAuth = (): AuthStore['isAuthenticated'] => useAuthStore(isAuthSelector);

export const useUser = (): AuthStore['user'] => useAuthStore(userSelector);

export const useLogin = (): AuthStore['actions']['login'] => useAuthStore(loginSelector);

export const useLogout = (): AuthStore['actions']['logout'] => useAuthStore(logoutSelector);
