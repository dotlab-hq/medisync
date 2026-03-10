CREATE TABLE "medisync"."notification_log" (
	"id" text PRIMARY KEY NOT NULL,
	"entity_type" text NOT NULL,
	"entity_id" text NOT NULL,
	"user_id" text NOT NULL,
	"channel" text NOT NULL,
	"status" text DEFAULT 'sent' NOT NULL,
	"body" text,
	"sent_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."user_notification_settings" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"email_enabled" boolean DEFAULT true NOT NULL,
	"sms_enabled" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_notification_settings_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
ALTER TABLE "medisync"."notification_log" ADD CONSTRAINT "notification_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."user_notification_settings" ADD CONSTRAINT "user_notification_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "notif_log_entity_idx" ON "medisync"."notification_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "notif_log_userId_idx" ON "medisync"."notification_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notif_log_sentAt_idx" ON "medisync"."notification_log" USING btree ("sent_at");--> statement-breakpoint
CREATE INDEX "notif_log_dedup_idx" ON "medisync"."notification_log" USING btree ("entity_type","entity_id","channel","status");--> statement-breakpoint
CREATE INDEX "notif_settings_userId_idx" ON "medisync"."user_notification_settings" USING btree ("user_id");