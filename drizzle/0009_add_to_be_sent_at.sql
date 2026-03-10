-- Add to_be_sent_at (pre-computed UTC timestamp) to reminder and appointment tables.
-- Also backfill existing rows from their date/time/timezone columns.

ALTER TABLE "medisync"."reminder"
    ADD COLUMN IF NOT EXISTS "to_be_sent_at" timestamp;

--> statement-breakpoint

ALTER TABLE "medisync"."appointment"
    ADD COLUMN IF NOT EXISTS "to_be_sent_at" timestamp;

--> statement-breakpoint

-- Backfill existing reminders: convert date + time in their timezone to UTC
UPDATE "medisync"."reminder"
SET "to_be_sent_at" = (date || ' ' || time)::timestamp AT TIME ZONE timezone
WHERE "to_be_sent_at" IS NULL
  AND date IS NOT NULL
  AND time IS NOT NULL;

--> statement-breakpoint

-- Backfill existing appointments: convert date + time in their timezone to UTC
UPDATE "medisync"."appointment"
SET "to_be_sent_at" = (date || ' ' || time)::timestamp AT TIME ZONE timezone
WHERE "to_be_sent_at" IS NULL
  AND date IS NOT NULL
  AND time IS NOT NULL;

--> statement-breakpoint

-- Recreate views to use to_be_sent_at instead of AT TIME ZONE conversion
CREATE OR REPLACE VIEW "medisync"."due_reminder_notifications" AS
SELECT
    r.id                AS entity_id,
    r.user_id,
    r.title,
    r.description       AS body,
    r.type              AS reminder_type,
    r.date,
    r.time,
    r.timezone,
    u.email             AS user_email,
    u.name              AS user_name,
    u.phone             AS user_phone,
    COALESCE(ns.email_enabled, true)  AS email_enabled,
    COALESCE(ns.sms_enabled, false)   AS sms_enabled,
    EXISTS (
        SELECT 1 FROM "medisync"."notification_log" nl
        WHERE nl.entity_type = 'reminder'
          AND nl.entity_id   = r.id
          AND nl.channel     = 'email'
          AND nl.status      = 'sent'
    ) AS email_sent,
    EXISTS (
        SELECT 1 FROM "medisync"."notification_log" nl
        WHERE nl.entity_type = 'reminder'
          AND nl.entity_id   = r.id
          AND nl.channel     = 'sms'
          AND nl.status      = 'sent'
    ) AS sms_sent
FROM "medisync"."reminder" r
INNER JOIN "medisync"."user" u
    ON r.user_id = u.id
LEFT JOIN "medisync"."user_notification_settings" ns
    ON ns.user_id = r.user_id
WHERE r.is_completed = false
  AND r.to_be_sent_at IS NOT NULL
  AND r.to_be_sent_at BETWEEN (NOW() - INTERVAL '5 minutes') AND (NOW() + INTERVAL '1 minute')
  AND (
      (
          COALESCE(ns.email_enabled, true) = true
          AND NOT EXISTS (
              SELECT 1 FROM "medisync"."notification_log" nl
              WHERE nl.entity_type = 'reminder'
                AND nl.entity_id   = r.id
                AND nl.channel     = 'email'
                AND nl.status      = 'sent'
          )
      )
      OR
      (
          COALESCE(ns.sms_enabled, false) = true
          AND NOT EXISTS (
              SELECT 1 FROM "medisync"."notification_log" nl
              WHERE nl.entity_type = 'reminder'
                AND nl.entity_id   = r.id
                AND nl.channel     = 'sms'
                AND nl.status      = 'sent'
          )
      )
  );

--> statement-breakpoint

CREATE OR REPLACE VIEW "medisync"."due_appointment_notifications" AS
SELECT
    a.id                AS entity_id,
    a.user_id,
    a.doctor_name,
    a.specialty,
    a.hospital,
    a.address,
    a.notes             AS body,
    a.date,
    a.time,
    a.timezone,
    a.contact_number,
    u.email             AS user_email,
    u.name              AS user_name,
    u.phone             AS user_phone,
    COALESCE(ns.email_enabled, true)  AS email_enabled,
    COALESCE(ns.sms_enabled, false)   AS sms_enabled,
    EXISTS (
        SELECT 1 FROM "medisync"."notification_log" nl
        WHERE nl.entity_type = 'appointment'
          AND nl.entity_id   = a.id
          AND nl.channel     = 'email'
          AND nl.status      = 'sent'
    ) AS email_sent,
    EXISTS (
        SELECT 1 FROM "medisync"."notification_log" nl
        WHERE nl.entity_type = 'appointment'
          AND nl.entity_id   = a.id
          AND nl.channel     = 'sms'
          AND nl.status      = 'sent'
    ) AS sms_sent
FROM "medisync"."appointment" a
INNER JOIN "medisync"."user" u
    ON a.user_id = u.id
LEFT JOIN "medisync"."user_notification_settings" ns
    ON ns.user_id = a.user_id
WHERE a.status = 'upcoming'
  AND a.to_be_sent_at IS NOT NULL
  AND a.to_be_sent_at BETWEEN (NOW() - INTERVAL '5 minutes') AND (NOW() + INTERVAL '1 minute')
  AND (
      (
          COALESCE(ns.email_enabled, true) = true
          AND NOT EXISTS (
              SELECT 1 FROM "medisync"."notification_log" nl
              WHERE nl.entity_type = 'appointment'
                AND nl.entity_id   = a.id
                AND nl.channel     = 'email'
                AND nl.status      = 'sent'
          )
      )
      OR
      (
          COALESCE(ns.sms_enabled, false) = true
          AND NOT EXISTS (
              SELECT 1 FROM "medisync"."notification_log" nl
              WHERE nl.entity_type = 'appointment'
                AND nl.entity_id   = a.id
                AND nl.channel     = 'sms'
                AND nl.status      = 'sent'
          )
      )
  );