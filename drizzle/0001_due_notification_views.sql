CREATE OR REPLACE VIEW "medisync"."due_reminder_notifications" AS
SELECT
	r.id AS entity_id,
	r.user_id,
	r.title,
	r.description AS body,
	r.type AS reminder_type,
	r.date,
	r.time,
	r.timezone,
	u.email AS user_email,
	u.name AS user_name,
	u.phone AS user_phone,
	COALESCE(ns.email_enabled, true) AS email_enabled,
	COALESCE(ns.sms_enabled, false) AS sms_enabled,
	EXISTS(
		SELECT 1
		FROM "medisync"."notification_log" nl
		WHERE nl.entity_type = 'reminder'
			AND nl.entity_id = r.id
			AND nl.channel = 'email'
			AND nl.status = 'sent'
	) AS email_sent,
	EXISTS(
		SELECT 1
		FROM "medisync"."notification_log" nl
		WHERE nl.entity_type = 'reminder'
			AND nl.entity_id = r.id
			AND nl.channel = 'sms'
			AND nl.status = 'sent'
	) AS sms_sent
FROM "medisync"."reminder" r
JOIN "medisync"."user" u ON u.id = r.user_id
LEFT JOIN "medisync"."user_notification_settings" ns ON ns.user_id = r.user_id
WHERE r.to_be_sent_at IS NOT NULL
	AND r.to_be_sent_at BETWEEN NOW() - INTERVAL '5 minutes' AND NOW()
	AND r.is_completed = false
	AND (
		(
			COALESCE(ns.email_enabled, true) = true
			AND u.email IS NOT NULL
			AND NOT EXISTS(
				SELECT 1
				FROM "medisync"."notification_log" nl
				WHERE nl.entity_type = 'reminder'
					AND nl.entity_id = r.id
					AND nl.channel = 'email'
					AND nl.status = 'sent'
			)
		)
		OR (
			COALESCE(ns.sms_enabled, false) = true
			AND u.phone IS NOT NULL
			AND NOT EXISTS(
				SELECT 1
				FROM "medisync"."notification_log" nl
				WHERE nl.entity_type = 'reminder'
					AND nl.entity_id = r.id
					AND nl.channel = 'sms'
					AND nl.status = 'sent'
			)
		)
	);

--> statement-breakpoint
CREATE OR REPLACE VIEW "medisync"."due_appointment_notifications" AS
SELECT
	a.id AS entity_id,
	a.user_id,
	a.doctor_name,
	a.specialty,
	a.hospital,
	a.address,
	a.notes AS body,
	a.date,
	a.time,
	a.timezone,
	a.contact_number,
	u.email AS user_email,
	u.name AS user_name,
	u.phone AS user_phone,
	COALESCE(ns.email_enabled, true) AS email_enabled,
	COALESCE(ns.sms_enabled, false) AS sms_enabled,
	EXISTS(
		SELECT 1
		FROM "medisync"."notification_log" nl
		WHERE nl.entity_type = 'appointment'
			AND nl.entity_id = a.id
			AND nl.channel = 'email'
			AND nl.status = 'sent'
	) AS email_sent,
	EXISTS(
		SELECT 1
		FROM "medisync"."notification_log" nl
		WHERE nl.entity_type = 'appointment'
			AND nl.entity_id = a.id
			AND nl.channel = 'sms'
			AND nl.status = 'sent'
	) AS sms_sent
FROM "medisync"."appointment" a
JOIN "medisync"."user" u ON u.id = a.user_id
LEFT JOIN "medisync"."user_notification_settings" ns ON ns.user_id = a.user_id
WHERE a.to_be_sent_at IS NOT NULL
	AND a.to_be_sent_at BETWEEN NOW() - INTERVAL '5 minutes' AND NOW()
	AND a.status = 'upcoming'
	AND (
		(
			COALESCE(ns.email_enabled, true) = true
			AND u.email IS NOT NULL
			AND NOT EXISTS(
				SELECT 1
				FROM "medisync"."notification_log" nl
				WHERE nl.entity_type = 'appointment'
					AND nl.entity_id = a.id
					AND nl.channel = 'email'
					AND nl.status = 'sent'
			)
		)
		OR (
			COALESCE(ns.sms_enabled, false) = true
			AND u.phone IS NOT NULL
			AND NOT EXISTS(
				SELECT 1
				FROM "medisync"."notification_log" nl
				WHERE nl.entity_type = 'appointment'
					AND nl.entity_id = a.id
					AND nl.channel = 'sms'
					AND nl.status = 'sent'
			)
		)
	);