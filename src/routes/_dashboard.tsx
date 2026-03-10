import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import DashboardSidebar from "@/components/DashboardSidebar";
import { getSession, getOnboardingStatus } from "@/server/auth";

export const Route = createFileRoute( "/_dashboard" )( {
    beforeLoad: async () => {
        const session = await getSession();
        if ( !session?.user ) {
            throw redirect( { to: "/auth/login" } );
        }
        const { onboardingCompleted } = await getOnboardingStatus();
        if ( !onboardingCompleted ) {
            throw redirect( { to: "/onboarding" } );
        }
        return { session };
    },
    component: DashboardLayout,
} );

function DashboardLayout() {
    return (
        <div className="flex min-h-screen">
            <DashboardSidebar />
            <main className="flex-1">
                <div className="container mx-auto py-6 px-4 lg:px-8">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
