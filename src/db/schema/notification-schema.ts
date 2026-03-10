import { relations } from "drizzle-orm";
import { text, timestamp, boolean, index } from "drizzle-orm/pg-core";
import { schema } from "./schema";
import { user } from "./auth-schema";

// ── User Notification Settings ───────────────────────────────────────
export const userNotificationSettings = schema.table(
    "user_notification_settings",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        userId: text( "user_id" )
            .notNull()
            .unique()
            .references( () => user.id, { onDelete: "cascade" } ),
        emailEnabled: boolean( "email_enabled" ).notNull().default( true ),
        smsEnabled: boolean( "sms_enabled" ).notNull().default( false ),
        createdAt: timestamp( "created_at" ).defaultNow().notNull(),
        updatedAt: timestamp( "updated_at" )
            .defaultNow()
            .$onUpdate( () => new Date() )
            .notNull(),
    },
    ( table ) => [index( "notif_settings_userId_idx" ).on( table.userId )],
);

// ── Notification Log ─────────────────────────────────────────────────
// Records every sent notification to prevent duplicate delivery per minute.
export const notificationLog = schema.table(
    "notification_log",
    {
        id: text( "id" ).primaryKey().$defaultFn( () => crypto.randomUUID() ),
        // 'reminder' | 'appointment'
        entityType: text( "entity_type" ).notNull(),
        entityId: text( "entity_id" ).notNull(),
        userId: text( "user_id" )
            .notNull()
            .references( () => user.id, { onDelete: "cascade" } ),
        // 'email' | 'sms'
        channel: text( "channel" ).notNull(),
        // 'sent' | 'failed'
        status: text( "status" ).notNull().default( "sent" ),
        // notification body / reason that was delivered
        body: text( "body" ),
        sentAt: timestamp( "sent_at" ).defaultNow().notNull(),
    },
    ( table ) => [
        index( "notif_log_entity_idx" ).on( table.entityType, table.entityId ),
        index( "notif_log_userId_idx" ).on( table.userId ),
        index( "notif_log_sentAt_idx" ).on( table.sentAt ),
        index( "notif_log_dedup_idx" ).on( table.entityType, table.entityId, table.channel, table.status ),
    ],
);

// ── Relations ────────────────────────────────────────────────────────
export const notifSettingsRelations = relations( userNotificationSettings, ( { one } ) => ( {
    user: one( user, {
        fields: [userNotificationSettings.userId],
        references: [user.id],
    } ),
} ) );

export const notifLogRelations = relations( notificationLog, ( { one } ) => ( {
    user: one( user, { fields: [notificationLog.userId], references: [user.id] } ),
} ) );
