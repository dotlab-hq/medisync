-- MediSync: Add user notification settings and notification log tables
-- Generated migration for notification schema

CREATE TABLE IF NOT EXISTS "medisync"."user_notification_settings" (
    "id" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL UNIQUE,
    "email_enabled" boolean NOT NULL DEFAULT true,
    "sms_enabled" boolean NOT NULL DEFAULT false,
    "created_at" timestamp NOT NULL DEFAULT now(),
    "updated_at" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "user_notification_settings_user_id_fk"
        FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_settings_userId_idx"
    ON "medisync"."user_notification_settings" ("user_id");
--> statement-breakpoint

CREATE TABLE IF NOT EXISTS "medisync"."notification_log" (
    "id" text PRIMARY KEY NOT NULL,
    "entity_type" text NOT NULL,
    "entity_id" text NOT NULL,
    "user_id" text NOT NULL,
    "channel" text NOT NULL,
    "sent_at" timestamp NOT NULL DEFAULT now(),
    CONSTRAINT "notification_log_user_id_fk"
        FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE CASCADE
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_log_entity_idx"
    ON "medisync"."notification_log" ("entity_type", "entity_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_log_userId_idx"
    ON "medisync"."notification_log" ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "notif_log_sentAt_idx"
    ON "medisync"."notification_log" ("sent_at");