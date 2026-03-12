import { create } from 'zustand'

interface DashboardBreadcrumbStore {
  breadcrumbs: string[]
  setBreadcrumbs: (breadcrumbs: string[]) => void
}

export const useDashboardBreadcrumbStore = create<DashboardBreadcrumbStore>()(
  (set) => ({
    breadcrumbs: ['Dashboard', 'Dashboard'],
    setBreadcrumbs: (breadcrumbs: string[]) => set({ breadcrumbs }),
  }),
)
