import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

import { getContext } from './integrations/tanstack-query/root-provider'
import { Skeleton } from './components/ui/skeleton'

function RoutePending() {
  return (
    <main
      className="mx-auto w-full max-w-7xl animate-soft-reveal space-y-6 px-4 py-8 sm:px-6"
      aria-busy="true"
      aria-label="Loading page"
    >
      <div className="space-y-3">
        <Skeleton className="h-9 w-56 max-w-[70vw]" />
        <Skeleton className="h-4 w-80 max-w-[85vw]" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton key={index} className="h-44 w-full rounded-md" />
        ))}
      </div>
      <span className="sr-only">Loading…</span>
    </main>
  )
}

export function getRouter() {
  const router = createTanStackRouter({
    routeTree,

    context: getContext(),

    scrollRestoration: true,
    defaultPreload: 'intent',
    defaultPreloadStaleTime: 0,
    defaultPendingComponent: RoutePending,
    defaultPendingMs: 180,
    defaultPendingMinMs: 300,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
