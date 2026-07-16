import { Outlet } from 'react-router';
import { Toaster } from '@/shared/ui/sonner.tsx';

export function AuthLayout() {
  return (
    <>
      <main>
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
