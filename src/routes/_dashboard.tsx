import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { lazy, Suspense } from 'react'
import { getSession, getOnboardingStatus } from '@/server/auth'
import { Skeleton } from '@/components/ui/skeleton'

const DashboardSidebar = lazy( () => import( '@/components/DashboardSidebar' ) )

export const Route = createFileRoute( '/_dashboard' )( {
  beforeLoad: async () => {
    const session = await getSession().catch( () => null )
    if ( !session?.user ) {
      throw redirect( { to: '/auth/login' } )
    }
    const onboarding = await getOnboardingStatus().catch( () => ( {
      onboardingCompleted: false,
    } ) )
    const onboardingCompleted = onboarding?.onboardingCompleted ?? false
    if ( !onboardingCompleted ) {
      throw redirect( { to: '/onboarding' } )
    }
    return { session }
  },
  component: DashboardLayout,
  notFoundComponent: DashboardNotFound,
  errorComponent: DashboardErrorBoundary,
} )

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Suspense fallback={<SidebarSkeleton />}>
        <DashboardSidebar />
      </Suspense>
      <main className="flex-1 overflow-hidden">
        <div
          className="w-full h-full overflow-y-auto py-6 px-4 lg:px-8"
          id="dashboard-main"
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}

function SidebarSkeleton() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/50 lg:block">
      <div className="flex h-14 items-center border-b px-4">
        <Skeleton className="h-6 w-28" />
      </div>
      <div className="space-y-2 p-4">
        {Array.from( { length: 7 } ).map( ( _, i ) => (
          <Skeleton key={i} className="h-9 w-full rounded-lg" />
        ) )}
      </div>
    </aside>
  )
}

function DashboardNotFound() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="text-center">
        <p className="text-4xl font-bold text-foreground">404</p>
        <p className="mt-2 text-sm text-muted-foreground">
          Page not found in dashboard.
        </p>
      </div>
    </div>
  )
}

function getErrorMessage( error: unknown ) {
  if ( error instanceof Error && error.message ) return error.message
  if ( typeof error === 'string' && error.trim().length > 0 ) return error
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof ( error as { message?: unknown } ).message === 'string'
  ) {
    const message = ( error as { message: string } ).message
    if ( message.trim().length > 0 ) return message
  }
  return 'Unexpected dashboard error.'
}

function DashboardErrorBoundary( { error }: { error: unknown } ) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-lg border border-border/50 bg-card p-6 text-center">
        <p className="text-lg font-semibold text-foreground">
          Something went wrong
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {getErrorMessage( error )}
        </p>
      </div>
    </div>
  )
}
