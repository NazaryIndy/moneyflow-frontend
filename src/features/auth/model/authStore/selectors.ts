import type { AuthStore } from '@/features/auth/model/authStore/types.ts';

export const isAuthSelector = (state: AuthStore) => state.isAuthenticated;

export const userSelector = (state: AuthStore) => state.user;

export const loginSelector = (state: AuthStore) => {
  console.log(state);
  return state.actions.login;
};

export const logoutSelector = (state: AuthStore) => state.actions.logout;
