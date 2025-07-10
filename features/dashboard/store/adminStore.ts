import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AdminStoreState {
  isSidebarExpanded: boolean;
  expandSidebar: () => void;
  collapseSidebar: () => void;
  toggleSidebar: () => void;
}

export const useAdminStore = create<AdminStoreState>()(
  persist(
    (set) => ({
      isSidebarExpanded: true,
      expandSidebar: () => set({ isSidebarExpanded: true }),
      collapseSidebar: () => set({ isSidebarExpanded: false }),
      toggleSidebar: () =>
        set((state) => ({
          isSidebarExpanded: !state.isSidebarExpanded,
        })),
    }),
    {
      name: 'admin-store',
    }
  )
);
