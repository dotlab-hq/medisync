CREATE TABLE "medisync"."document_file" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"folder_id" text,
	"file_name" text NOT NULL,
	"file_type" text NOT NULL,
	"file_size" integer NOT NULL,
	"s3_key" text NOT NULL,
	"s3_url" text NOT NULL,
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
ALTER TABLE "medisync"."document_file" ADD CONSTRAINT "document_file_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."document_file" ADD CONSTRAINT "document_file_folder_id_document_folder_id_fk" FOREIGN KEY ("folder_id") REFERENCES "medisync"."document_folder"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."document_folder" ADD CONSTRAINT "document_folder_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."user_storage" ADD CONSTRAINT "user_storage_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "docfile_userId_idx" ON "medisync"."document_file" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "docfile_folderId_idx" ON "medisync"."document_file" USING btree ("folder_id");--> statement-breakpoint
CREATE INDEX "docfolder_userId_idx" ON "medisync"."document_folder" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "userstorage_userId_idx" ON "medisync"."user_storage" USING btree ("user_id");