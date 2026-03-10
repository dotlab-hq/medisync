import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import { db } from "@/db";
import { reminder, user } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getRequest } from "@tanstack/react-start/server";

// ── List reminders ───────────────────────────────────────────────────
export const listReminders = createServerFn( { method: "GET" } ).handler(
    async () => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        return db.query.reminder.findMany( {
            where: eq( reminder.userId, userId ),
            orderBy: desc( reminder.createdAt ),
        } );
    },
);

// ── Create reminder ──────────────────────────────────────────────────
const createReminderSchema = z.object( {
    title: z.string().min( 1 ),
    description: z.string().optional(),
    type: z.enum( ["medication", "appointment", "checkup", "other"] ).optional(),
    date: z.string().min( 1 ),
    time: z.string().min( 1, "Time is required" ),
} );

export const createReminder = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => createReminderSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const userRecord = await db.query.user.findFirst( {
            where: eq( user.id, userId ),
            columns: { timezone: true },
        } );
        const timezone = userRecord?.timezone ?? "UTC";

        const [created] = await db
            .insert( reminder )
            .values( { ...data, userId, timezone } )
            .returning();
        return created;
    } );

// ── Toggle reminder completed ────────────────────────────────────────
export const toggleReminder = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) =>
        z.object( { id: z.string(), isCompleted: z.boolean() } ).parse( data ),
    )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const [updated] = await db
            .update( reminder )
            .set( { isCompleted: data.isCompleted } )
            .where(
                and( eq( reminder.id, data.id ), eq( reminder.userId, userId ) ),
            )
            .returning();

        if ( !updated ) throw new Error( "Reminder not found" );
        return updated;
    } );

// ── Delete reminder ──────────────────────────────────────────────────
export const deleteReminder = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => z.object( { id: z.string() } ).parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        await db
            .delete( reminder )
            .where(
                and( eq( reminder.id, data.id ), eq( reminder.userId, userId ) ),
            );
        return { success: true };
    } );
