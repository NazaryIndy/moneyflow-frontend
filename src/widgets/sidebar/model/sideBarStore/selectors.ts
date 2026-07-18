import type { SidebarStore } from '@/widgets/sidebar/model/sideBarStore/types.ts';

export const sidebarModeSelector = (state: SidebarStore) => state.mode;

export const collapseSelector = (state: SidebarStore) => state.actions.collapse;

export const expandSelector = (state: SidebarStore) => state.actions.expand;

export const toggleSelector = (state: SidebarStore) => state.actions.toggle;
