import type { ReactNode } from 'react'; // или любые ваши иконки

export interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: ReactNode;
}

export const sidebarItems: NavItem[] = [
  {
    id: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    icon: '',
  },
  {
    id: 'transactions',
    path: '/transactions',
    label: 'Transactions',
    icon: '',
  },
  {
    id: 'categories',
    path: '/categories',
    label: 'Categories',
    icon: '',
  },
  {
    id: 'analytics',
    path: '/analytics',
    label: 'Analytics',
    icon: '',
  },
  {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
    icon: '',
  },
];
