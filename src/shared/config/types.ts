import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';

export type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;
export type NavItemType = 'Dashboard' | 'Transactions' | 'Categories' | 'Analytics' | 'Settings';

export interface NavItem {
  id: string;
  path: string;
  label: NavItemType;
  icon: IconType;
}
