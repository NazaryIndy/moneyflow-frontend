export interface SidebarState {
  mode: 'expanded' | 'collapsed' | 'hidden';
}

export interface SidebarActions {
  toggle: () => void;
  collapse: () => void;
  expand: () => void;
}

export interface SidebarStore extends SidebarState {
  actions: SidebarActions;
}
