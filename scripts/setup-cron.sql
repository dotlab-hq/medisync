-- ────────────────────────────────────────────────────────────────────────────
-- MediSync: pg_cron notification job setup
-- ────────────────────────────────────────────────────────────────────────────
-- Prerequisites:
--   • pg_cron extension   (CREATE EXTENSION IF NOT EXISTS pg_cron;)
--   • pg_net  extension   (CREATE EXTENSION IF NOT EXISTS pg_net;)
--
-- This file is a TEMPLATE — placeholders are substituted by setup-cron.ts.
-- Do NOT execute this file directly; use: pnpm db:setup-cron
--
-- Placeholders:
--   {{APP_URL}}      → value of BETTER_AUTH_URL env var
--   {{PRIVATE_KEY}}  → value of MEDISYNC_PRIVATE_KEY env var
-- ────────────────────────────────────────────────────────────────────────────

-- Ensure pg_cron and pg_net extensions exist
CREATE EXTENSION IF NOT EXISTS pg_cron;

CREATE EXTENSION IF NOT EXISTS pg_net;

-- Remove any existing medisync cron jobs (idempotent)
SELECT cron.unschedule (jobid)
FROM cron.job
WHERE
    jobname LIKE 'medisync-%';

-- Job 1: Process due reminders — fires every minute
-- Guard: CASE WHEN EXISTS short-circuits; net.http_post is only called when rows are due.
SELECT cron.schedule(
    'medisync-notify-reminders',
    '* * * * *',
    $$SELECT CASE WHEN EXISTS (SELECT 1 FROM medisync.reminder WHERE to_be_sent_at IS NOT NULL AND to_be_sent_at <= now() AND is_completed = false LIMIT 1)
    THEN net.http_post(
      url => '{{APP_URL}}/api/cron/notify-reminders',
      headers => '{"Content-Type":"application/json","x-medisync-key":"{{PRIVATE_KEY}}"}'::jsonb,
      body => '{}'::jsonb,
      timeout_milliseconds => 60000
    ) ELSE NULL END$$
);

-- Job 2: Process due appointment notifications — fires every minute
-- Guard: CASE WHEN EXISTS short-circuits; net.http_post is only called when rows are due.
SELECT cron.schedule(
    'medisync-notify-appointments',
    '* * * * *',
    $$SELECT CASE WHEN EXISTS (SELECT 1 FROM medisync.appointment WHERE to_be_sent_at IS NOT NULL AND to_be_sent_at <= now() AND status = 'upcoming' LIMIT 1)
    THEN net.http_post(
      url => '{{APP_URL}}/api/cron/notify-appointments',
      headers => '{"Content-Type":"application/json","x-medisync-key":"{{PRIVATE_KEY}}"}'::jsonb,
      body => '{}'::jsonb,
      timeout_milliseconds => 60000
    ) ELSE NULL END$$
);