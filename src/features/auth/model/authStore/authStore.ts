import { create } from 'zustand';
import { devtools, type DevtoolsOptions, persist, type PersistOptions } from 'zustand/middleware';
import type { AuthState, AuthStore } from '@/features/auth/model/authStore/types.ts';
import { immer } from 'zustand/middleware/immer';

const devToolsOptions: DevtoolsOptions = {
  store: 'useAuthStore',
  enabled: import.meta.env.DEV,
};
// TODO remove user from auth store
const persistOptions: PersistOptions<AuthStore, Omit<AuthStore, 'actions'>> = {
  name: 'useAuthStore',
  partialize: (state) => ({
    user: state.user,
    isAuthenticated: state.isAuthenticated,
  }),
  version: 1.0,
};

const defaultAuth: AuthState = {
  user: null,
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    devtools(
      immer((set) => ({
        ...defaultAuth,
        actions: {
          login: (user) => {
            set({ user, isAuthenticated: true }, false, { type: 'login', payload: user });
          },
          logout: () => {
            set({ user: null, isAuthenticated: false }, false, 'logout');
          },
        },
      })),
      devToolsOptions,
    ),
    persistOptions,
  ),
);
