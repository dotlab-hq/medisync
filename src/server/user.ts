import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import { db } from "@/db";
import {
    user,
    addressDetails,
    aadhaarDetails,
    medicalInformation,
    emergencyContact,
} from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getRequest } from "@tanstack/react-start/server";

// ── Get current user profile ─────────────────────────────────────────
export const getUserProfile = createServerFn( { method: "GET" } ).handler(
    async () => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const result = await db.query.user.findFirst( {
            where: eq( user.id, userId ),
            with: {
                addressDetails: true,
                aadhaarDetails: true,
                medicalInformation: true,
                emergencyContacts: true,
                qrCode: true,
            },
        } );

        if ( !result ) throw new Error( "User not found" );
        return result;
    },
);

// ── Update user basic info ───────────────────────────────────────────
// NOTE: phone is intentionally excluded — use the dedicated changePhone flow
const updateUserSchema = z.object( {
    name: z.string().min( 1 ).optional(),
    gender: z.enum( ["MALE", "FEMALE", "OTHER"] ).optional(),
    dateOfBirth: z.string().optional(),
    bloodGroup: z
        .enum( ["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"] )
        .optional(),
    timezone: z.string().optional(),
    image: z.string().optional(),
} );

export const updateUser = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => updateUserSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const updateData: Record<string, unknown> = {};
        if ( data.name !== undefined ) updateData.name = data.name;
        // phone is never updated here — use verifyAndUpdatePhone server fn instead
        if ( data.gender !== undefined ) updateData.gender = data.gender;
        if ( data.dateOfBirth !== undefined ) updateData.dateOfBirth = new Date( data.dateOfBirth );
        if ( data.bloodGroup !== undefined ) updateData.bloodGroup = data.bloodGroup;
        if ( data.timezone !== undefined ) updateData.timezone = data.timezone;
        if ( data.image !== undefined ) updateData.image = data.image;

        const [updated] = await db
            .update( user )
            .set( updateData )
            .where( eq( user.id, userId ) )
            .returning();

        return updated;
    } );

// ── Upsert address details ──────────────────────────────────────────
const addressSchema = z.object( {
    address: z.string().min( 1 ),
    city: z.string().min( 1 ),
    state: z.string().min( 1 ),
    pinCode: z.string().min( 1 ),
} );

export const upsertAddress = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => addressSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const existing = await db.query.addressDetails.findFirst( {
            where: eq( addressDetails.userId, userId ),
        } );

        if ( existing ) {
            const [updated] = await db
                .update( addressDetails )
                .set( data )
                .where( eq( addressDetails.userId, userId ) )
                .returning();
            return updated;
        }

        const [created] = await db
            .insert( addressDetails )
            .values( { ...data, userId } )
            .returning();
        return created;
    } );

// ── Upsert aadhaar  ─────────────────────────────────────────────────
const aadhaarSchema = z.object( {
    aadhaarHash: z.string().min( 1 ),
} );

export const upsertAadhaar = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => aadhaarSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const existing = await db.query.aadhaarDetails.findFirst( {
            where: eq( aadhaarDetails.userId, userId ),
        } );

        if ( existing ) {
            const [updated] = await db
                .update( aadhaarDetails )
                .set( data )
                .where( eq( aadhaarDetails.userId, userId ) )
                .returning();
            return updated;
        }

        const [created] = await db
            .insert( aadhaarDetails )
            .values( { ...data, userId } )
            .returning();
        return created;
    } );

// ── Upsert medical information ──────────────────────────────────────
const medInfoSchema = z.object( {
    allergies: z.string().optional(),
    chronicConditions: z.string().optional(),
    currentMedications: z.string().optional(),
} );

export const upsertMedicalInfo = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => medInfoSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const existing = await db.query.medicalInformation.findFirst( {
            where: eq( medicalInformation.userId, userId ),
        } );

        if ( existing ) {
            const [updated] = await db
                .update( medicalInformation )
                .set( data )
                .where( eq( medicalInformation.userId, userId ) )
                .returning();
            return updated;
        }

        const [created] = await db
            .insert( medicalInformation )
            .values( { ...data, userId } )
            .returning();
        return created;
    } );

// ── Emergency contacts ──────────────────────────────────────────────
const emergencyContactSchema = z.object( {
    name: z.string().min( 1 ),
    relationship: z.string().optional(),
    phone: z.string().min( 1 ),
    email: z.string().email().optional(),
    isNotificationEnabled: z.boolean().optional(),
} );

export const addEmergencyContact = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => emergencyContactSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );
        const userId = sessionData.user.id;

        const [created] = await db
            .insert( emergencyContact )
            .values( { ...data, userId } )
            .returning();
        return created;
    } );

export const deleteEmergencyContact = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => z.object( { id: z.string() } ).parse( data ) )
    .handler( async ( { data } ) => {
        const request = getRequest();
        const sessionData = await auth.api.getSession( { headers: request.headers } );
        if ( !sessionData?.user?.id ) throw new Error( "Unauthorized" );

        await db
            .delete( emergencyContact )
            .where( eq( emergencyContact.id, data.id ) );
        return { success: true };
    } );
