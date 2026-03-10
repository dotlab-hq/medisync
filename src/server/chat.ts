import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";
import { db } from "@/db";
import { chatConversation, chatMessage } from "@/db/schema";
import { eq, and, desc, asc } from "drizzle-orm";
import { auth } from "@/lib/auth";
import { getRequest } from "@tanstack/react-start/server";

// ── Helpers ──────────────────────────────────────────────────────────
const getSession = async () => {
    const request = getRequest();
    const session = await auth.api.getSession( { headers: request.headers } );
    if ( !session?.user.id ) throw new Error( "Unauthorized" );
    return session;
};

const verifyOwnership = async ( conversationId: string, userId: string ) => {
    const conv = await db.query.chatConversation.findFirst( {
        where: and(
            eq( chatConversation.id, conversationId ),
            eq( chatConversation.userId, userId ),
        ),
    } );
    if ( !conv ) throw new Error( "Conversation not found" );
    return conv;
};

// ── Schemas ──────────────────────────────────────────────────────────
const idSchema = z.object( { id: z.string().min( 1 ) } );

const renameSchema = z.object( {
    id: z.string().min( 1 ),
    title: z.string().min( 1 ),
} );

const saveMessagesSchema = z.object( {
    conversationId: z.string().min( 1 ),
    messages: z.array(
        z.object( {
            role: z.string().min( 1 ),
            content: z.string().min( 1 ),
        } ),
    ),
} );

// ── List conversations ───────────────────────────────────────────────
export const listConversations = createServerFn( { method: "GET" } ).handler(
    async () => {
        const session = await getSession();
        return db.query.chatConversation.findMany( {
            where: eq( chatConversation.userId, session.user.id ),
            orderBy: desc( chatConversation.updatedAt ),
        } );
    },
);

// ── Create conversation ──────────────────────────────────────────────
export const createConversation = createServerFn( { method: "POST" } ).handler(
    async () => {
        const session = await getSession();
        const [created] = await db
            .insert( chatConversation )
            .values( { userId: session.user.id, title: "New Chat" } )
            .returning();
        return created;
    },
);

// ── Get conversation with messages ───────────────────────────────────
export const getConversation = createServerFn( { method: "GET" } )
    .inputValidator( ( data: unknown ) => idSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const session = await getSession();
        const conv = await verifyOwnership( data.id, session.user.id );
        const messages = await db.query.chatMessage.findMany( {
            where: eq( chatMessage.conversationId, data.id ),
            orderBy: asc( chatMessage.createdAt ),
        } );
        return { ...conv, messages };
    } );

// ── Delete conversation ──────────────────────────────────────────────
export const deleteConversation = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => idSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const session = await getSession();
        await verifyOwnership( data.id, session.user.id );
        await db
            .delete( chatConversation )
            .where(
                and(
                    eq( chatConversation.id, data.id ),
                    eq( chatConversation.userId, session.user.id ),
                ),
            );
        return { success: true };
    } );

// ── Save messages ────────────────────────────────────────────────────
export const saveMessages = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => saveMessagesSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const session = await getSession();
        await verifyOwnership( data.conversationId, session.user.id );
        if ( data.messages.length === 0 ) return { success: true };

        const rows = data.messages.map( ( m ) => ( {
            conversationId: data.conversationId,
            role: m.role,
            content: m.content,
        } ) );
        await db.insert( chatMessage ).values( rows );

        // Touch updatedAt on the conversation
        await db
            .update( chatConversation )
            .set( { updatedAt: new Date() } )
            .where( eq( chatConversation.id, data.conversationId ) );

        return { success: true };
    } );

// ── Rename conversation ──────────────────────────────────────────────
export const renameConversation = createServerFn( { method: "POST" } )
    .inputValidator( ( data: unknown ) => renameSchema.parse( data ) )
    .handler( async ( { data } ) => {
        const session = await getSession();
        await verifyOwnership( data.id, session.user.id );
        const [updated] = await db
            .update( chatConversation )
            .set( { title: data.title } )
            .where(
                and(
                    eq( chatConversation.id, data.id ),
                    eq( chatConversation.userId, session.user.id ),
                ),
            )
            .returning();
        return updated;
    } );
