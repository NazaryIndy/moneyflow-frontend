import { useState } from 'react';
import { SidebarTrigger } from '@/shared/ui/sidebar';
import logo from '@/assets/logo.png';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '@/app/router/routePaths.tsx';
import { useLogout, useUser } from '@/features/auth/model/authStore/hooks.ts';
import { useIsMobile } from '@/shared/hooks';
import { Button, ModeToggle, SidebarToggle } from '@/shared/ui';
import { MobileMenuButton } from '@/widgets/header/ui/MobileMenuButton.tsx';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const user = useUser();
  const logout = useLogout();

  const logoutUser = () => {
    logout();
    navigate(RoutePath.login);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border-subtle bg-surface/80 backdrop-blur-md text-text-primary">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center">
            {isMobile ? <SidebarTrigger /> : <SidebarToggle />}
          </div>

          {/* Logo */}
          <div className="flex flex-1 justify-center">
            <a href="/" className="block py-1" aria-label="Home">
              <img src={logo} alt="MoneyFlow Logo" className="h-16 w-auto object-contain" />
            </a>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <ModeToggle />

            {user && (
              <>
                <div className="hidden sm:block text-sm font-medium">👤 {user.name}</div>

                <div className="hidden md:flex">
                  <Button onClick={logoutUser}>Log out</Button>
                </div>
              </>
            )}

            <MobileMenuButton isOpen={isOpen} setIsOpen={setIsOpen} />
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border-subtle bg-surface" id="mobile-menu">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            <div className="border-t border-border-subtle pt-4">
              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
