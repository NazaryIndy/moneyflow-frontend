import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/shadcn/sidebar.tsx'; // предположим, что это из вашей UI-библиотеки
import { Link } from 'react-router-dom';
import type { NavItem } from '@/shared/config/types.ts';

interface SidebarNavProps {
  items: NavItem[];
  activePath: string;
  collapsed: boolean;
}

export const SidebarNav = ({ items, activePath, collapsed }: SidebarNavProps) => {
  return (
    <>
      {items.map((item) => {
        const Icon = item.icon;

        return (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              asChild
              isActive={activePath === item.path}
              tooltip={collapsed ? item.label : undefined}
            >
              <Link to={item.path}>
                <Icon />

                {!collapsed && <span>{item.label}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};
