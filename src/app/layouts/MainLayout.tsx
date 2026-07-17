import { Outlet } from 'react-router';
import { Toaster } from '@/shared/ui/sonner.tsx';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { Footer, Header, AppSidebar } from '@/widgets';
import { AppSidebar2 } from '@/widgets/sidebar/ui/Sidebar2.tsx';

export function MainLayout() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen w-full flex-col">
        <Header />

        <div className="relative flex flex-1 overflow-hidden">
          <AppSidebar2 />

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
