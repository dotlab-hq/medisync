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
-- Note: pg_net ≥ 0.8 requires body as text, not jsonb
SELECT cron.schedule(
    'medisync-notify-reminders',
    '* * * * *',
    $$SELECT net.http_post(
        url                  => '{{APP_URL}}/api/cron/notify-reminders',
        headers              => '{"Content-Type":"application/json","x-medisync-key":"{{PRIVATE_KEY}}"}'::jsonb,
        body                 => '{}'::jsonb,
        timeout_milliseconds => 60000
    )$$
);

-- Job 2: Process due appointment notifications — fires every minute
SELECT cron.schedule(
    'medisync-notify-appointments',
    '* * * * *',
    $$SELECT net.http_post(
        url                  => '{{APP_URL}}/api/cron/notify-appointments',
        headers              => '{"Content-Type":"application/json","x-medisync-key":"{{PRIVATE_KEY}}"}'::jsonb,
        body                 => '{}'::jsonb,
        timeout_milliseconds => 60000
    )$$
);