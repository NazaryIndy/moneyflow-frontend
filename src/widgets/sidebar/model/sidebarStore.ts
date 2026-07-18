import { create } from 'zustand';

type SidebarState = {
  mode: 'expanded' | 'collapsed' | 'hidden';

  toggle: () => void;
  collapse: () => void;
  expand: () => void;
};

export const useSidebarStore = create<SidebarState>((set) => ({
  mode: 'expanded',

  toggle: () =>
    set((state) => {
      if (state.mode === 'expanded') {
        return { mode: 'collapsed' };
      }

      if (state.mode === 'collapsed') {
        return { mode: 'expanded' };
      }

      return { mode: 'expanded' };
    }),

  collapse: () =>
    set({
      mode: 'collapsed',
    }),

  expand: () =>
    set({
      mode: 'expanded',
    }),
}));
