import type { ReactNode } from 'react';
import { TooltipProvider } from '@/shared/ui/shadcn/tooltip.tsx';
import { ThemeProvider } from './theme';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { I18nProvider } from '@/app/providers/i18n/I18nProvider.tsx';

type AppProvidersProps = {
  children: ReactNode;
};

const queryClient = new QueryClient();

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <ThemeProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </I18nProvider>
    </QueryClientProvider>
  );
}
