import type { ReactNode } from 'react';
import { TooltipProvider } from '@/shared/ui/tooltip.tsx';
import { ThemeProvider } from './theme/ThemeProvider.tsx';

type AppProvidersProps = {
  children: ReactNode;
};

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>{children}</TooltipProvider>
    </ThemeProvider>
  );
}
