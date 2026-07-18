import { PanelLeft } from 'lucide-react';
import { Button } from '@/shared/ui/button';
import { useSidebarStore } from '@/widgets/sidebar/model/sidebarStore.ts';

export function SidebarToggle() {
  const toggle = useSidebarStore((state) => state.toggle);

  return (
    <Button variant="ghost" size="icon" onClick={toggle}>
      <PanelLeft />
    </Button>
  );
}
