import { useState } from 'react';
import { SidebarTrigger } from '@/shared/ui/sidebar.tsx';
import logo from '@/assets/logo.png';
import { ModeToggle } from '@/shared/ui/mode-toggle.tsx';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md text-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <SidebarTrigger className="mr-2" />
          <div className="flex-shrink-0 flex items-center">
            <a href="/" className="block py-1" aria-label="Home">
              <img src={logo} alt="Company Name Logo" className="h-16 w-auto object-contain" />
            </a>
          </div>

          {/* Action Button (Desktop) */}
          <div>
            <ModeToggle />
          </div>

          <div>👤 Galina</div>

          <div className="hidden md:flex items-center">
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors">
              Log out
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                // Close Icon (X)
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                // Hamburger Menu Icon
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Navigation Panel */}
      {isOpen && (
        <div className="md:hidden border-b border-gray-200 bg-white" id="mobile-menu">
          <div className="space-y-1 px-4 py-3 sm:px-6">
            <div className="pt-4 border-t border-gray-100">
              <button className="w-full rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-blue-500">
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
