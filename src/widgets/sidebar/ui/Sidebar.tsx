import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  useSidebar,
} from '@/shared/ui/shadcn/sidebar.tsx';
import { SidebarNav } from '@/widgets/sidebar/ui/SidebarNav.tsx';
import { navigation } from '@/shared/config/navigation.ts';
import { useActivePath } from '@/widgets/sidebar/model/useActivePath.ts';
import { cn } from '@/shared/lib/utils.ts';
import { useIsMobile } from '@/shared/hooks/use-mobile.ts';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/shared/ui/shadcn/sheet.tsx';
import { useSidebarMode } from '@/widgets/sidebar/model/sideBarStore/hooks.ts';

export function AppSidebar() {
  const activePath = useActivePath();
  const { openMobile, setOpenMobile } = useSidebar();
  const isMobile = useIsMobile();
  const mode = useSidebarMode();

  const sidebarContent = (
    <>
      <SidebarHeader />

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarNav
              items={navigation}
              activePath={activePath}
              collapsed={!isMobile && mode === 'collapsed'}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter />
    </>
  );
  if (isMobile) {
    return (
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-54 p-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Navigation</SheetTitle>
          </SheetHeader>

          <div className="flex h-full flex-col">{sidebarContent}</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside
      className={cn(
        'h-full shrink-0 overflow-hidden border-r transition-all duration-400',
        mode === 'expanded' && 'w-54',
        mode === 'collapsed' && 'w-16',
        mode === 'hidden' && 'w-0',
      )}
    >
      <div className="flex h-full w-full flex-col">{sidebarContent}</div>
    </aside>
  );
}
