import type { IUser } from '@/shared/types';

export interface AuthState {
  user: IUser | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (user: IUser) => void;
  logout: () => void;
}

export interface AuthStore extends AuthState {
  actions: AuthActions;
}
