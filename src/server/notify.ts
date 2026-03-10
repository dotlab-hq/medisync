/**
 * Core notification processor — queries DB views and dispatches SMS / email.
 * Called by the cron API endpoints every minute.
 *
 * Two PostgreSQL views provide pre-joined, pre-filtered rows:
 *   • medisync.due_reminder_notifications
 *   • medisync.due_appointment_notifications
 *
 * Each view uses a 5-minute backward window (NOW - 5 min → NOW) so that
 * every item gets up to 5 cron invocations for delivery.  Once a channel
 * is marked "sent" in notification_log the view filters it out.
 */
import { db } from "@/db";
import { sql } from "drizzle-orm";
import { sendReminderEmail, sendAppointmentEmail } from "@/lib/notification-email";
import { sendSms } from "@/lib/sms";
import { logNotification } from "./notify-log";
import type { DueReminderRow, DueAppointmentRow, NotifyResult } from "./notify-types";

// ── Reminder processor ────────────────────────────────────────────────
export async function processDueReminders(): Promise<NotifyResult> {
    const result = await db.execute<DueReminderRow>(
        sql`SELECT * FROM "medisync"."due_reminder_notifications"`,
    );
    const rows = result.rows;

    let sent = 0;
    let failed = 0;

    for ( const row of rows ) {
        const emailBody = `Reminder: ${row.title} – ${row.date} at ${row.time} (${row.timezone})${row.body ? `\n${row.body}` : ""}`;
        const smsBody = `[MediSync] ${emailBody}`;

        // ── Email channel ────────────────────────────────────────
        if ( row.email_enabled && !row.email_sent && row.user_email ) {
            try {
                await sendReminderEmail( {
                    to: row.user_email,
                    name: row.user_name,
                    title: row.title,
                    description: row.body,
                    type: row.reminder_type,
                    date: row.date,
                    time: row.time,
                    timezone: row.timezone,
                } );
                await logNotification( "reminder", row.entity_id, row.user_id, "email", "sent", emailBody );
                sent++;
            } catch ( err ) {
                const msg = err instanceof Error ? err.message : "Unknown error";
                console.error( `[notify] reminder email failed id=${row.entity_id}:`, msg );
                await logNotification( "reminder", row.entity_id, row.user_id, "email", "failed", emailBody );
                failed++;
            }
        }

        // ── SMS channel ──────────────────────────────────────────
        if ( row.sms_enabled && !row.sms_sent && row.user_phone ) {
            try {
                await sendSms( row.user_phone, smsBody );
                await logNotification( "reminder", row.entity_id, row.user_id, "sms", "sent", smsBody );
                sent++;
            } catch ( err ) {
                const msg = err instanceof Error ? err.message : "Unknown error";
                console.error( `[notify] reminder sms failed id=${row.entity_id}:`, msg );
                await logNotification( "reminder", row.entity_id, row.user_id, "sms", "failed", smsBody );
                failed++;
            }
        }
    }

    return { sent, failed };
}

// ── Appointment processor ─────────────────────────────────────────────
export async function processDueAppointments(): Promise<NotifyResult> {
    const result = await db.execute<DueAppointmentRow>(
        sql`SELECT * FROM "medisync"."due_appointment_notifications"`,
    );
    const rows = result.rows;

    let sent = 0;
    let failed = 0;

    for ( const row of rows ) {
        const where = row.hospital ? ` at ${row.hospital}` : "";
        const spec = row.specialty ? ` (${row.specialty})` : "";
        const emailBody = `Appointment: Dr. ${row.doctor_name}${spec}${where} – ${row.date} at ${row.time} (${row.timezone})${row.body ? `\n${row.body}` : ""}`;
        const smsBody = `[MediSync] ${emailBody}`;

        // ── Email channel ────────────────────────────────────────
        if ( row.email_enabled && !row.email_sent && row.user_email ) {
            try {
                await sendAppointmentEmail( {
                    to: row.user_email,
                    name: row.user_name,
                    doctorName: row.doctor_name,
                    specialty: row.specialty,
                    hospital: row.hospital,
                    date: row.date,
                    time: row.time,
                    timezone: row.timezone,
                } );
                await logNotification( "appointment", row.entity_id, row.user_id, "email", "sent", emailBody );
                sent++;
            } catch ( err ) {
                const msg = err instanceof Error ? err.message : "Unknown error";
                console.error( `[notify] appointment email failed id=${row.entity_id}:`, msg );
                await logNotification( "appointment", row.entity_id, row.user_id, "email", "failed", emailBody );
                failed++;
            }
        }

        // ── SMS channel ──────────────────────────────────────────
        if ( row.sms_enabled && !row.sms_sent && row.user_phone ) {
            try {
                await sendSms( row.user_phone, smsBody );
                await logNotification( "appointment", row.entity_id, row.user_id, "sms", "sent", smsBody );
                sent++;
            } catch ( err ) {
                const msg = err instanceof Error ? err.message : "Unknown error";
                console.error( `[notify] appointment sms failed id=${row.entity_id}:`, msg );
                await logNotification( "appointment", row.entity_id, row.user_id, "sms", "failed", smsBody );
                failed++;
            }
        }
    }

    return { sent, failed };
}
