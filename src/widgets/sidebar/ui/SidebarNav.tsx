import { SidebarMenuButton, SidebarMenuItem } from '@/shared/ui/shadcn/sidebar.tsx'; // предположим, что это из вашей UI-библиотеки
import { Link } from 'react-router-dom';
import type { NavItem } from '@/shared/config/types.ts';
import { useTranslation } from 'react-i18next';

interface SidebarNavProps {
  items: NavItem[];
  activePath: string;
  collapsed: boolean;
}

export const SidebarNav = ({ items, activePath, collapsed }: SidebarNavProps) => {
  const { t } = useTranslation('common');

  return (
    <>
      {items.map(({ id, icon, path, label }) => {
        const Icon = icon;

        return (
          <SidebarMenuItem key={id}>
            <SidebarMenuButton
              asChild
              isActive={activePath === path}
              tooltip={collapsed ? label : undefined}
            >
              <Link to={path}>
                <Icon />

                {!collapsed && <span>{t(label)}</span>}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        );
      })}
    </>
  );
};
