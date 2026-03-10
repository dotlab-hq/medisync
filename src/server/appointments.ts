import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import { db } from "@/db";
import { appointment, user } from "@/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getRequest } from "@tanstack/react-start/server";

// ── List appointments ────────────────────────────────────────────────
export const listAppointments = createServerFn( { method: "GET" } ).handler(
    async () => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        return db.query.appointment.findMany( {
            where: eq( appointment.userId, userId ),
            orderBy: desc( appointment.createdAt ),
        } );
    },
);

// ── Create appointment ───────────────────────────────────────────────
const createAppointmentSchema = z.object( {
    doctorName: z.string().min( 1 ),
    specialty: z.string().optional(),
    hospital: z.string().optional(),
    address: z.string().optional(),
    date: z.string().min( 1 ),
    time: z.string().min( 1 ),
    notes: z.string().optional(),
    contactNumber: z.string().optional(),
} );

export const createAppointment = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => createAppointmentSchema.parse( data ) )
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
            .insert( appointment )
            .values( { ...data, userId, timezone } )
            .returning();
        return created;
    } );

// ── Update appointment ───────────────────────────────────────────────
const updateAppointmentSchema = z.object( {
    id: z.string(),
    doctorName: z.string().min( 1 ).optional(),
    specialty: z.string().optional(),
    hospital: z.string().optional(),
    address: z.string().optional(),
    date: z.string().optional(),
    time: z.string().optional(),
    status: z.enum( ["upcoming", "completed", "cancelled"] ).optional(),
    notes: z.string().optional(),
    contactNumber: z.string().optional(),
} );

export const updateAppointment = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => updateAppointmentSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const { id, ...updateData } = data;
        const [updated] = await db
            .update( appointment )
            .set( updateData )
            .where(
                and(
                    eq( appointment.id, id ),
                    eq( appointment.userId, userId ),
                ),
            )
            .returning();

        if ( !updated ) throw new Error( "Appointment not found" );
        return updated;
    } );

// ── Delete appointment ───────────────────────────────────────────────
export const deleteAppointment = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => z.object( { id: z.string() } ).parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        await db
            .delete( appointment )
            .where(
                and(
                    eq( appointment.id, data.id ),
                    eq( appointment.userId, userId ),
                ),
            );
        return { success: true };
    } );
