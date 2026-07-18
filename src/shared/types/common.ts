import type { ForwardRefExoticComponent, RefAttributes } from 'react';
import type { LucideProps } from 'lucide-react';

export type IconType = ForwardRefExoticComponent<
  Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
>;

export interface NavItem {
  id: string;
  path: string;
  label: string;
  icon: IconType;
}

// TODO перенести
export type IUser = {
  id: string | number;
  name: string;
  email: string;
};
