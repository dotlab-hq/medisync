/**
 * Notification email helpers for reminders and appointments.
 * Keeps notification templates separate from auth email templates.
 */
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM = process.env.EMAIL_FROM ?? 'MediSync <noreply@medisync.app>'

function layout(body: string): string {
  return `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/></head>
<body style="margin:0;padding:0;background:#f4f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f9;padding:40px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">
<tr><td style="background:linear-gradient(135deg,#56c6be 0%,#3aa89f 100%);padding:28px 40px;text-align:center;">
<h1 style="margin:0;font-size:24px;font-weight:700;color:#fff;">🏥 MediSync</h1>
</td></tr>
<tr><td style="padding:36px 40px;">${body}</td></tr>
<tr><td style="padding:20px 40px;background:#f8fafb;border-top:1px solid #e8ecef;text-align:center;">
<p style="margin:0;font-size:12px;color:#9ca3af;">© ${new Date().getFullYear()} MediSync · All rights reserved</p>
</td></tr>
</table></td></tr></table></body></html>`
}

export async function sendReminderEmail(opts: {
  to: string
  name: string
  title: string
  description?: string | null
  type: string
  date: string
  time: string
  timezone: string
}): Promise<void> {
  const body = layout(`
        <h2 style="margin:0 0 12px;font-size:20px;color:#111;">⏰ Reminder: ${opts.title}</h2>
        <p style="margin:0 0 8px;color:#374151;">Hi ${opts.name},</p>
        <p style="margin:0 0 16px;color:#374151;">
            Your <strong>${opts.type}</strong> reminder is scheduled for
            <strong>${opts.date}</strong> at <strong>${opts.time}</strong> (${opts.timezone}).
        </p>
        ${opts.description ? `<p style="margin:0 0 16px;color:#6b7280;">${opts.description}</p>` : ''}
        <p style="margin:0;color:#9ca3af;font-size:13px;">
            Log in to MediSync to mark this reminder as complete.
        </p>
    `)

  const { error } = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: `⏰ Reminder: ${opts.title}`,
    html: body,
  })
  if (error)
    console.error('[notification-email] sendReminderEmail failed:', error)
}

export async function sendAppointmentEmail(opts: {
  to: string
  name: string
  doctorName: string
  specialty?: string | null
  hospital?: string | null
  date: string
  time: string
  timezone: string
}): Promise<void> {
  const where = opts.hospital ? ` at ${opts.hospital}` : ''
  const specialty = opts.specialty ? ` (${opts.specialty})` : ''

  const body = layout(`
        <h2 style="margin:0 0 12px;font-size:20px;color:#111;">🩺 Appointment Reminder</h2>
        <p style="margin:0 0 8px;color:#374151;">Hi ${opts.name},</p>
        <p style="margin:0 0 16px;color:#374151;">
            You have an upcoming appointment with
            <strong>Dr. ${opts.doctorName}${specialty}</strong>${where} scheduled for
            <strong>${opts.date}</strong> at <strong>${opts.time}</strong> (${opts.timezone}).
        </p>
        <p style="margin:0;color:#9ca3af;font-size:13px;">
            Log in to MediSync to view or manage your appointment.
        </p>
    `)

  const { error } = await resend.emails.send({
    from: FROM,
    to: opts.to,
    subject: `🩺 Appointment: Dr. ${opts.doctorName} on ${opts.date}`,
    html: body,
  })
  if (error)
    console.error('[notification-email] sendAppointmentEmail failed:', error)
}
