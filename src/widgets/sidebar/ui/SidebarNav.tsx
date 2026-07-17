import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/sidebar'; // предположим, что это из вашей UI-библиотеки
import { Link } from 'react-router-dom';
import type { NavItem } from '@/shared/config/sidebarItems.ts';

interface SidebarNavProps {
  items: NavItem[];
  activePath: string;
}

export const SidebarNav = ({ items, activePath }: SidebarNavProps) => {
  return (
    <>
      {items.map((item) => (
        <SidebarMenuItem key={item.id}>
          <SidebarMenuButton asChild isActive={activePath === item.path}>
            <Link to={item.path}>
              {item.icon}
              <span>{item.label}</span>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </>
  );
};
