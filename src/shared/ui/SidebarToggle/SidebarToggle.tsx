import { PanelLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useSidebarToggle } from '@/widgets/sidebar/model/sideBarStore/hooks.ts';

export function SidebarToggle() {
  const toggle = useSidebarToggle();

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      <PanelLeft />
    </Button>
  );
}
