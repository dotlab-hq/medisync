import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "@/db";
import { user } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getRequest } from "@tanstack/start-server-core";
import { generateOtp, verifyOtp } from "@/lib/otp";

// ── Step 1: Send OTP to a new phone number ────────────────────────────
export const sendPhoneChangeOtp = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) =>
        z.object( { newPhone: z.string().min( 10, "Enter a valid phone number" ) } ).parse( data ),
    )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );

        // Check the new number is not already in use by another account
        const existing = await db.query.user.findFirst( {
            where: eq( user.phone, data.newPhone ),
        } );
        if ( existing && existing.id !== sessionData.user.id ) {
            throw new Error( "This phone number is already registered with another account." );
        }

        return generateOtp( data.newPhone );
    } );

// ── Step 2: Verify OTP and update phone ───────────────────────────────
export const verifyAndUpdatePhone = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) =>
        z
            .object( {
                newPhone: z.string().min( 10, "Enter a valid phone number" ),
                code: z.string().length( 6, "OTP must be 6 digits" ),
            } )
            .parse( data ),
    )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );

        const result = await verifyOtp( data.newPhone, data.code );
        if ( !result.valid ) throw new Error( result.message );

        const [updated] = await db
            .update( user )
            .set( { phone: data.newPhone } )
            .where( eq( user.id, sessionData.user.id ) )
            .returning( { phone: user.phone } );

        return { success: true, phone: updated.phone };
    } );
