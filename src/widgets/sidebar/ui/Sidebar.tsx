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
    <Sidebar variant="inset" collapsible="offcanvas" className="absolute top-0 left-0 h-full z-10">
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
