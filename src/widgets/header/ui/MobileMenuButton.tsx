import type { FC } from 'react';

type MobileMenuButtonProps = {
  setIsOpen: (value: boolean) => void;
  isOpen: boolean;
};
const MobileMenuButton: FC<MobileMenuButtonProps> = ({ setIsOpen, isOpen }) => {
  return (
    <div className="flex md:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        type="button"
        className="
                inline-flex
                items-center
                justify-center
                rounded-md
                p-2
                text-text-secondary
                transition-colors
                hover:bg-surface-hover
                hover:text-text-primary
              "
        aria-controls="mobile-menu"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>

        {isOpen ? (
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
  );
};

export { MobileMenuButton };
