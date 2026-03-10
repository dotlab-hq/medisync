-- ────────────────────────────────────────────────────────────────────────────
-- MediSync: Add status/body to notification_log + create notification views
-- ────────────────────────────────────────────────────────────────────────────

-- 1) Add status and body columns to notification_log
ALTER TABLE "medisync"."notification_log"
    ADD COLUMN IF NOT EXISTS "status" text NOT NULL DEFAULT 'sent',
    ADD COLUMN IF NOT EXISTS "body" text;

--> statement-breakpoint

-- 2) Composite index for efficient view lookups
CREATE INDEX IF NOT EXISTS "notif_log_dedup_idx"
    ON "medisync"."notification_log" ("entity_type", "entity_id", "channel", "status");

--> statement-breakpoint

-- 3) View: due reminder notifications
--    Returns reminders due within a 5-minute backward window from NOW.
--    Only includes rows where at least one enabled channel has not been sent.
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
  AND (r.date || ' ' || r.time)::timestamp AT TIME ZONE r.timezone
      BETWEEN (NOW() - INTERVAL '5 minutes') AND NOW()
  -- at least one enabled channel that hasn't been sent yet
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

-- 4) View: due appointment notifications
--    Same 5-minute backward window, same channel dedup logic.
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
  AND (a.date || ' ' || a.time)::timestamp AT TIME ZONE a.timezone
      BETWEEN (NOW() - INTERVAL '5 minutes') AND NOW()
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