import { createServerFn } from "@tanstack/react-start";
import { auth } from "@/lib/auth";
import { getRequest } from "@tanstack/start-server-core";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";

/**
 * Get the current authenticated session.
 * Use this in route loaders to check auth state.
 */
export const getSession = createServerFn( { method: "GET" } ).handler(
    async () => {
        const request = getRequest();
        const session = await auth.api.getSession( { headers: request.headers } );
        return session;
    },
);

/**
 * Returns whether the current user has completed onboarding.
 * Queries the DB directly because the session type doesn't expose custom columns.
 */
export const getOnboardingStatus = createServerFn( { method: "GET" } ).handler(
    async () => {
        const request = getRequest();
        const session = await auth.api.getSession( { headers: request.headers } );
        if ( !session?.user.id ) return { onboardingCompleted: false };
        const row = await db.query.user.findFirst( {
            where: eq( user.id, session.user.id ),
            columns: { onboardingCompleted: true },
        } );
        return { onboardingCompleted: row?.onboardingCompleted ?? false };
    },
);
