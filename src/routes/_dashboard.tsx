import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import { getSession, getOnboardingStatus } from "@/server/auth";
import { Skeleton } from "@/components/ui/skeleton";

const DashboardSidebar = lazy(() => import("@/components/DashboardSidebar"));

export const Route = createFileRoute("/_dashboard")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session?.user) {
      throw redirect({ to: "/auth/login" });
    }
    const { onboardingCompleted } = await getOnboardingStatus();
    if (!onboardingCompleted) {
      throw redirect({ to: "/onboarding" });
    }
    return { session };
  },
  component: DashboardLayout,
});

function DashboardLayout() {
  return (
    <div className="flex min-h-screen bg-background">
      <Suspense fallback={<SidebarSkeleton />}>
        <DashboardSidebar />
      </Suspense>
      <main className="flex-1 overflow-x-hidden">
        <div className="container mx-auto py-6 px-4 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

function SidebarSkeleton() {
  return (
    <aside className="hidden w-64 shrink-0 border-r border-border/50 lg:block">
      <div className="flex h-14 items-center border-b px-4">
        <Skeleton className="h-6 w-28" />
      </div>
      <div className="space-y-2 p-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-full rounded-lg" />
        ))}
      </div>
    </aside>
  );
}
