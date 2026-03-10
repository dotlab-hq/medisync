CREATE TABLE "medisync"."otp_verification" (
	"id" text PRIMARY KEY NOT NULL,
	"phone" text NOT NULL,
	"salted_hash" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "otp_phone_idx" ON "medisync"."otp_verification" USING btree ("phone");