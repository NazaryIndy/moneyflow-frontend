import { Outlet } from 'react-router';
import { Toaster } from '@/shared/ui/sonner.tsx';
import { SidebarProvider } from '@/shared/ui/sidebar';
import { Header } from '@/widgets/header';
import { AppSidebar } from '@/widgets/sidebar';
import { Footer } from '@/widgets/footer';

export function MainLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full flex-col">
        <Header />

        <div className="relative flex flex-1 overflow-hidden">
          <AppSidebar />

          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>

        <Footer />

        <Toaster />
      </div>
    </SidebarProvider>
  );
}
