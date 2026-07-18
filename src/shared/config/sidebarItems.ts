import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import {
  ChartLine,
  LayoutDashboard,
  type LucideProps,
  Settings,
  SquareStack,
  Wallet,
} from 'lucide-react'; // или любые ваши иконки

export type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: IconType;
}

export const sidebarItems: NavItem[] = [
  {
    id: 'dashboard',
    path: '/dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
  },
  {
    id: 'transactions',
    path: '/transactions',
    label: 'Transactions',
    icon: Wallet,
  },
  {
    id: 'categories',
    path: '/categories',
    label: 'Categories',
    icon: SquareStack,
  },
  {
    id: 'analytics',
    path: '/analytics',
    label: 'Analytics',
    icon: ChartLine,
  },
  {
    id: 'settings',
    path: '/settings',
    label: 'Settings',
    icon: Settings,
  },
];
