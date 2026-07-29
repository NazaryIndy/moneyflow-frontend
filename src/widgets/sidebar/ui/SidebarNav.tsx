import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/shadcn/sidebar.tsx'; // предположим, что это из вашей UI-библиотеки
import { Link } from 'react-router-dom';
import type { NavItem } from '@/shared/config/types.ts';
import { List } from '@/shared/ui';

interface SidebarNavProps {
  items: NavItem[];
  activePath: string;
  collapsed: boolean;
}

export const SidebarNav = ({ items, activePath, collapsed }: SidebarNavProps) => {
  return (
    <List
      data={items}
      renderData={({ icon, path, label }) => {
        const Icon = icon;

        return (
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={activePath === path}
              tooltip={collapsed ? label : undefined}
            >
              <Link to={path}>
                <Icon />

                {!collapsed && <span>{label}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      }}
    />
  );
};
