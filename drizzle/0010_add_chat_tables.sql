-- Chat conversation table
CREATE TABLE IF NOT EXISTS "medisync"."chat_conversation" (
    "id" text PRIMARY KEY NOT NULL,
    "user_id" text NOT NULL REFERENCES "medisync"."user"("id") ON DELETE CASCADE,
    "title" text NOT NULL DEFAULT 'New Chat',
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "chat_conv_userId_idx" ON "medisync"."chat_conversation" ("user_id");

-- Chat message table
CREATE TABLE IF NOT EXISTS "medisync"."chat_message" (
    "id" text PRIMARY KEY NOT NULL,
    "conversation_id" text NOT NULL REFERENCES "medisync"."chat_conversation"("id") ON DELETE CASCADE,
    "role" text NOT NULL,
    "content" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS "chat_msg_convId_idx" ON "medisync"."chat_message" ("conversation_id");