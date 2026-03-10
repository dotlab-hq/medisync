CREATE SCHEMA "medisync";
--> statement-breakpoint
CREATE TYPE "medisync"."feedback_type" AS ENUM('LIKED', 'DISLIKED');--> statement-breakpoint
CREATE TABLE "medisync"."account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "medisync"."user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"phone" text,
	"gender" text,
	"date_of_birth" timestamp,
	"blood_group" text,
	"onboarding_completed" boolean DEFAULT false NOT NULL,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "medisync"."verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."chat_conversation" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text DEFAULT 'New Chat' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."chat_message" (
	"id" text PRIMARY KEY NOT NULL,
	"conversation_id" text NOT NULL,
	"role" text NOT NULL,
	"content" text NOT NULL,
	"reasoning" text,
	"parts" json DEFAULT '[]'::json NOT NULL,
	"attachments" json,
	"annotations" json,
	"input_tokens" integer,
	"output_tokens" integer,
	"model_used" text,
	"user_feedback" "medisync"."feedback_type",
	"audio_url" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."aadhaar_details" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"aadhaar_hash" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "aadhaar_details_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "medisync"."address_details" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"address" text NOT NULL,
	"city" text NOT NULL,
	"state" text NOT NULL,
	"pin_code" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "address_details_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "medisync"."appointment" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"doctor_name" text NOT NULL,
	"specialty" text,
	"hospital" text,
	"address" text,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"to_be_sent_at" timestamp,
	"status" text DEFAULT 'upcoming' NOT NULL,
	"notes" text,
	"contact_number" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."document_file" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"folder_id" text,
	"file_name" text NOT NULL,
	"file_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"s3_key" text NOT NULL,
	"labels" text[] DEFAULT '{}' NOT NULL,
	"description" text,
	"is_confidential" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."document_folder" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"labels" text[] DEFAULT '{}' NOT NULL,
	"parent_folder_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."emergency_contact" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"relationship" text,
	"phone" text NOT NULL,
	"email" text,
	"is_notification_enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."health_metric" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"metric_type" text NOT NULL,
	"value" text NOT NULL,
	"unit" text,
	"notes" text,
	"measured_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."medical_information" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"allergies" text DEFAULT '',
	"chronic_conditions" text DEFAULT '',
	"current_medications" text DEFAULT '',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "medical_information_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "medisync"."medical_record" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"file_name" text NOT NULL,
	"file_type" text NOT NULL,
	"test_type" text,
	"hospital_name" text,
	"visit_date" timestamp DEFAULT now() NOT NULL,
	"file_url" text NOT NULL,
	"description" text,
	"is_confidential" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."otp_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"phone" text NOT NULL,
	"salted_hash" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."qr_code" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"qr_code_data" text NOT NULL,
	"qr_code_url" text NOT NULL,
	"expires_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "qr_code_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE "medisync"."reminder" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"type" text DEFAULT 'medication' NOT NULL,
	"date" text NOT NULL,
	"time" text NOT NULL,
	"timezone" text DEFAULT 'UTC' NOT NULL,
	"to_be_sent_at" timestamp,
	"is_completed" boolean DEFAULT false NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "medisync"."user_storage" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"used_bytes" integer DEFAULT 0 NOT NULL,
	"quota_bytes" integer DEFAULT 104857600 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_storage_user_id_unique" UNIQUE("user_id")
);
--> statement-breakpoint
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
ALTER TABLE "medisync"."account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."chat_conversation" ADD CONSTRAINT "chat_conversation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."chat_message" ADD CONSTRAINT "chat_message_conversation_id_chat_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "medisync"."chat_conversation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."aadhaar_details" ADD CONSTRAINT "aadhaar_details_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."address_details" ADD CONSTRAINT "address_details_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."appointment" ADD CONSTRAINT "appointment_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."document_file" ADD CONSTRAINT "document_file_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."document_file" ADD CONSTRAINT "document_file_folder_id_document_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "medisync"."document_folder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."document_folder" ADD CONSTRAINT "document_folder_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."emergency_contact" ADD CONSTRAINT "emergency_contact_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."health_metric" ADD CONSTRAINT "health_metric_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."medical_information" ADD CONSTRAINT "medical_information_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."medical_record" ADD CONSTRAINT "medical_record_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."qr_code" ADD CONSTRAINT "qr_code_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."reminder" ADD CONSTRAINT "reminder_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."user_storage" ADD CONSTRAINT "user_storage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."notification_log" ADD CONSTRAINT "notification_log_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."user_notification_settings" ADD CONSTRAINT "user_notification_settings_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "medisync"."account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "medisync"."session" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "medisync"."verification" USING btree ("identifier");--> statement-breakpoint
CREATE INDEX "chat_conv_userId_idx" ON "medisync"."chat_conversation" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "chat_msg_convId_idx" ON "medisync"."chat_message" USING btree ("conversation_id");--> statement-breakpoint
CREATE INDEX "aadhaar_userId_idx" ON "medisync"."aadhaar_details" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "address_userId_idx" ON "medisync"."address_details" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "appt_userId_idx" ON "medisync"."appointment" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "docfile_userId_idx" ON "medisync"."document_file" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "docfile_folderId_idx" ON "medisync"."document_file" USING btree ("folder_id");--> statement-breakpoint
CREATE INDEX "docfolder_userId_idx" ON "medisync"."document_folder" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "emergency_userId_idx" ON "medisync"."emergency_contact" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "healthmetric_userId_idx" ON "medisync"."health_metric" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "medinfo_userId_idx" ON "medisync"."medical_information" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "medrec_userId_idx" ON "medisync"."medical_record" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "otp_phone_idx" ON "medisync"."otp_verification" USING btree ("phone");--> statement-breakpoint
CREATE INDEX "qr_userId_idx" ON "medisync"."qr_code" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "reminder_userId_idx" ON "medisync"."reminder" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "userstorage_userId_idx" ON "medisync"."user_storage" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notif_log_entity_idx" ON "medisync"."notification_log" USING btree ("entity_type","entity_id");--> statement-breakpoint
CREATE INDEX "notif_log_userId_idx" ON "medisync"."notification_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "notif_log_sentAt_idx" ON "medisync"."notification_log" USING btree ("sent_at");--> statement-breakpoint
CREATE INDEX "notif_log_dedup_idx" ON "medisync"."notification_log" USING btree ("entity_type","entity_id","channel","status");--> statement-breakpoint
CREATE INDEX "notif_settings_userId_idx" ON "medisync"."user_notification_settings" USING btree ("user_id");