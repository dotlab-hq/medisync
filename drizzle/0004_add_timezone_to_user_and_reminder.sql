UPDATE "medisync"."reminder" SET "time" = '00:00' WHERE "time" IS NULL;
--> statement-breakpoint
ALTER TABLE "medisync"."reminder" ALTER COLUMN "time" SET NOT NULL;
--> statement-breakpoint
ALTER TABLE "medisync"."user" ADD COLUMN "timezone" text DEFAULT 'UTC' NOT NULL;
--> statement-breakpoint
ALTER TABLE "medisync"."reminder" ADD COLUMN "timezone" text DEFAULT 'UTC' NOT NULL;