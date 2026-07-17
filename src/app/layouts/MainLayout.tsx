import { Outlet } from 'react-router';
import { Toaster } from '@/shared/ui/sonner.tsx';
import { SidebarInset, SidebarProvider } from '@/shared/ui/sidebar';
import { Footer, Header, AppSidebar } from '@/widgets';

export function MainLayout() {
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen grid grid-rows-[auto_1fr_auto] w-full">
        <Header />

        <div className="relative overflow-hidden ">
          <AppSidebar />

          <SidebarInset
            style={{ paddingLeft: 0 }}
            className="h-full overflow-auto"
            // className="h-full overflow-auto  m-0! ml-0! md:m-0! md:ml-0!"
          >
            <Outlet />
          </SidebarInset>
        </div>

        <Footer />
        <Toaster />
      </div>
    </SidebarProvider>
  );
}
