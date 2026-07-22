import type { SidebarStore } from '@/widgets/sidebar/model/sideBarStore/types.ts';
import { useSidebarStore } from '@/widgets/sidebar/model/sideBarStore/sidebarStore.ts';
import {
  collapseSelector,
  expandSelector,
  sidebarModeSelector,
  toggleSelector,
} from '@/widgets/sidebar/model/sideBarStore/selectors.ts';

export const useSidebarMode = (): SidebarStore['mode'] => useSidebarStore(sidebarModeSelector);

export const useSidebarCollapse = (): SidebarStore['actions']['collapse'] =>
  useSidebarStore(collapseSelector);

export const useSidebarExpand = (): SidebarStore['actions']['expand'] =>
  useSidebarStore(expandSelector);

export const useSidebarToggle = (): SidebarStore['actions']['toggle'] =>
  useSidebarStore(toggleSelector);
