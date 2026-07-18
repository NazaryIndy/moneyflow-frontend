import { create } from 'zustand';
import { devtools, type DevtoolsOptions, persist, type PersistOptions } from 'zustand/middleware';
import type { SidebarState, SidebarStore } from '@/widgets/sidebar/model/sideBarStore/types.ts';
import { immer } from 'zustand/middleware/immer';

const devToolsOptions: DevtoolsOptions = {
  store: 'useSidebarStore',
  enabled: true, // TODO process.env.NODE_ENV === 'development
};

const persistOptions: PersistOptions<SidebarStore, Omit<SidebarStore, 'actions'>> = {
  name: 'useSidebarStore',
  partialize: (state) => ({
    mode: state.mode,
  }),
  version: 1.0,
};

const defaultSidebarState: SidebarState = {
  mode: 'expanded',
};

export const useSidebarStore = create<SidebarStore>()(
  persist(
    devtools(
      immer((set) => ({
        ...defaultSidebarState,
        actions: {
          toggle: () =>
            set(
              (state) => {
                if (state.mode === 'expanded') {
                  return { mode: 'collapsed' };
                }

                if (state.mode === 'collapsed') {
                  return { mode: 'expanded' };
                }

                return { mode: 'expanded' };
              },
              false,
              'toggle',
            ),

          collapse: () =>
            set(
              {
                mode: 'collapsed',
              },
              false,
              'collapse',
            ),

          expand: () =>
            set(
              {
                mode: 'expanded',
              },
              false,
              'expand',
            ),
        },
      })),
      devToolsOptions,
    ),
    persistOptions,
  ),
);
