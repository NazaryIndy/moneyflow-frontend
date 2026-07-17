import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
} from '@/shared/ui/sidebar.tsx';
import { SidebarNav } from '@/widgets/sidebar/ui/SidebarNav.tsx';
import { sidebarItems } from '@/shared/config/sidebarItems.ts';
import { useActivePath } from '@/widgets/sidebar/model/useActivePath.ts';

export function AppSidebar() {
  const activePath = useActivePath();

  return (
    <Sidebar variant="sidebar" collapsible="offcanvas">
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarNav items={sidebarItems} activePath={activePath} />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
      {/*<SidebarRail />*/}
    </Sidebar>
  );
}
