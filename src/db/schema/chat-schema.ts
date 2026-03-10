import { relations } from "drizzle-orm";
import { text, timestamp, index } from "drizzle-orm/pg-core";
import { schema } from "./schema";
import { user } from "./auth-schema";

// ── Chat Conversation ────────────────────────────────────────────────
export const chatConversation = schema.table(
    "chat_conversation",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        title: text( "title" ).notNull().default( "New Chat" ),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [
        index( "chat_conv_userId_idx" ).on( table.userId ),
    ],
);

// ── Chat Message ─────────────────────────────────────────────────────
export const chatMessage = schema.table(
    "chat_message",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        conversationId: text( "conversation_id" )
            .notNull()
            .references( () => chatConversation.id, { onDelete: "cascade" } ),
        role: text( "role" ).notNull(), // "user" | "assistant" | "system"
        content: text( "content" ).notNull(),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
    },
    ( table ) => [
        index( "chat_msg_convId_idx" ).on( table.conversationId ),
    ],
);

// ── Relations ────────────────────────────────────────────────────────
export const chatConversationRelations = relations( chatConversation, ( { one, many } ) => ( {
    user: one( user, { fields: [chatConversation.userId], references: [user.id] } ),
    messages: many( chatMessage ),
} ) );

export const chatMessageRelations = relations( chatMessage, ( { one } ) => ( {
    conversation: one( chatConversation, {
        fields: [chatMessage.conversationId],
        references: [chatConversation.id],
    } ),
} ) );
