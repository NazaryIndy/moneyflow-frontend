import { ChartLine, LayoutDashboard, Settings, SquareStack, Wallet } from 'lucide-react';
import type { NavItem } from './types.ts';

export const navigation: NavItem[] = [
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
