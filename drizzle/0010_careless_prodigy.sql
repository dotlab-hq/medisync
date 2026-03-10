CREATE TYPE "medisync"."feedback_type" AS ENUM('LIKED', 'DISLIKED');--> statement-breakpoint
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
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "medisync"."appointment" ADD COLUMN "to_be_sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "medisync"."reminder" ADD COLUMN "to_be_sent_at" timestamp;--> statement-breakpoint
ALTER TABLE "medisync"."chat_conversation" ADD CONSTRAINT "chat_conversation_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "medisync"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "medisync"."chat_message" ADD CONSTRAINT "chat_message_conversation_id_chat_conversation_id_fk" FOREIGN KEY ("conversation_id") REFERENCES "medisync"."chat_conversation"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "chat_conv_userId_idx" ON "medisync"."chat_conversation" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "chat_msg_convId_idx" ON "medisync"."chat_message" USING btree ("conversation_id");