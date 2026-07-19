import type { User } from '@/entities/user';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface AuthActions {
  login: (user: User) => void;
  logout: () => void;
}

export interface AuthStore extends AuthState {
  actions: AuthActions;
}
