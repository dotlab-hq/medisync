import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from '@tanstack/react-router'
import { lazy, Suspense, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'
import { getSession, getOnboardingStatus } from '@/server/auth'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Separator } from '@/components/ui/separator'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { useDashboardBreadcrumbStore } from '@/components/dashboard/stores/useDashboardBreadcrumbStore'
import { useChatStore } from '@/components/chat/chat-store'

const DashboardSidebar = lazy(() => import('@/components/DashboardSidebar'))

const DASHBOARD_SEGMENT_LABELS: Record<string, string> = {
  dashboard: 'Dashboard',
  appointments: 'Appointments',
  chat: 'Chat',
  developer: 'Developer',
  documents: 'Documents',
  health: 'Health',
  profile: 'Profile',
  'qr-code': 'QR Code',
  reminders: 'Reminders',
  settings: 'Settings',
}

function getSecondBreadcrumb(pathname: string) {
  const segments = pathname.split('/').filter(Boolean)
  const dashboardIndex = segments.indexOf('dashboard')
  const pageSegment =
    dashboardIndex >= 0 ? segments[dashboardIndex + 1] : undefined
  if (!pageSegment) return 'Dashboard'
  return DASHBOARD_SEGMENT_LABELS[pageSegment] ?? 'Dashboard'
}

export const Route = createFileRoute('/_dashboard')({
  beforeLoad: async () => {
    const session = await getSession().catch(() => null)
    if (!session?.user) {
      throw redirect({ to: '/auth/login' })
    }
    const onboarding = await getOnboardingStatus().catch(() => ({
      onboardingCompleted: false,
    }))
    const onboardingCompleted = onboarding.onboardingCompleted
    if (!onboardingCompleted) {
      throw redirect({ to: '/onboarding' })
    }
    return { session }
  },
  component: DashboardLayout,
  notFoundComponent: DashboardNotFound,
  errorComponent: DashboardErrorBoundary,
})

function DashboardLayout() {
  const pathname = useLocation({ select: (location) => location.pathname })
  const breadcrumbs = useDashboardBreadcrumbStore((state) => state.breadcrumbs)
  const setBreadcrumbs = useDashboardBreadcrumbStore(
    (state) => state.setBreadcrumbs,
  )
  const chatSidebarOpen = useChatStore((state) => state.sidebarOpen)
  const setChatSidebarOpen = useChatStore((state) => state.setSidebarOpen)
  const isChatRoute = pathname.startsWith('/dashboard/chat')

  useEffect(() => {
    setBreadcrumbs(['Dashboard', getSecondBreadcrumb(pathname)])
  }, [pathname, setBreadcrumbs])

  return (
    <SidebarProvider>
      <Suspense fallback={<SidebarSkeleton />}>
        <DashboardSidebar />
      </Suspense>
      <SidebarInset>
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border/50 px-4 lg:px-6">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {/* <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">{breadcrumbs[0] ?? 'Dashboard'}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem> */}
              {/* <BreadcrumbSeparator /> */}
              <BreadcrumbItem>
                <BreadcrumbPage>{breadcrumbs[1] ?? 'Dashboard'}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {isChatRoute ? (
            <Button
              variant="outline"
              size="sm"
              className="ml-auto"
              onClick={() => setChatSidebarOpen(!chatSidebarOpen)}
            >
              <MessageSquare className="h-4 w-4" />
              Chats
            </Button>
          ) : null}
        </header>
        <div
          className={
            isChatRoute
              ? 'w-full h-[calc(100svh-3.5rem)] overflow-hidden'
              : 'w-full h-full overflow-y-auto py-6 px-4 lg:px-8'
          }
          id="dashboard-main"
        >
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

function SidebarSkeleton() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/50 md:block">
      <div className="flex h-14 items-center border-b px-4">
        <Skeleton className="h-6 w-28" />
      </div>
      <div className="space-y-2 p-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-lg" />
        ))}
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

function getErrorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message
  if (typeof error === 'string' && error.trim().length > 0) return error
  if (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    typeof (error as { message?: unknown }).message === 'string'
  ) {
    const message = (error as { message: string }).message
    if (message.trim().length > 0) return message
  }
  return 'Unexpected dashboard error.'
}

function DashboardErrorBoundary({ error }: { error: unknown }) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-xl rounded-lg border border-border/50 bg-card p-6 text-center">
        <p className="text-lg font-semibold text-foreground">
          Something went wrong
        </p>
        <p className="mt-2 text-sm text-muted-foreground">
          {getErrorMessage(error)}
        </p>
      </div>
    </div>
  )
}
