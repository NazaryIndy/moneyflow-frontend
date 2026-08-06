import { type ReactNode, useEffect } from 'react';
import { ThemeProviderContext } from './useTheme.ts';
import { useSettings } from '@/entities/settings';
import { THEME } from '@/shared/constants';

type ThemeProviderProps = {
  children: ReactNode;
};

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { data: settings } = useSettings();
  const theme = settings?.theme ?? THEME.SYSTEM;

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === THEME.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? THEME.DARK
        : THEME.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}
