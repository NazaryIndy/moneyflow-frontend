import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/shared/ui/sidebar.tsx';
import { Link } from 'react-router';
import { RoutePath } from '@/shared/routePaths.tsx';

export function AppSidebar() {
  return (
    <Sidebar
      variant="inset" // убирает фиксированное позиционирование
      collapsible="offcanvas"
      className="absolute top-0 left-0 h-full z-10"
    >
      <SidebarHeader />
      <SidebarContent>
        <Link to={RoutePath.dashboard}>Dashboard</Link>
        <Link to={RoutePath.transactions}>Transactions</Link>
        <Link to={RoutePath.categories}>Categories</Link>
        <Link to={RoutePath.analytics}>Analytics</Link>
        <Link to={RoutePath.settings}>Settings</Link>

        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
      {/*<SidebarRail />*/}
    </Sidebar>
  );
}
