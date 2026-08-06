import { Outlet } from 'react-router';
import { Toaster } from '@/shared/ui/shadcn/sonner.tsx';

export function AuthLayout() {
  return (
    <>
      <main className="flex w-full flex-col items-center mt-20">
        <Outlet />
      </main>
      <Toaster />
    </>
  );
}
