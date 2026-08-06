import { createContext, useContext } from 'react';
import type { Theme } from '@/shared/types';
import { THEME } from '@/shared/constants';

type ThemeProviderState = {
  theme: Theme;
};

const initialState: ThemeProviderState = {
  theme: THEME.SYSTEM,
};

export const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
