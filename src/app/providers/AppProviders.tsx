import type { ReactNode } from 'react';
import { TooltipProvider } from '@/shared/ui/shadcn/tooltip.tsx';
import { ThemeProvider } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

type AppProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <TooltipProvider>{children}</TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
