/**
 * Types for due-notification view rows.
 * Shared between reminder and appointment processors.
 */

/** Row shape returned by medisync.due_reminder_notifications view */
export type DueReminderRow = {
  entity_id: string
  user_id: string
  title: string
  body: string | null
  reminder_type: string
  date: string
  time: string
  timezone: string
  user_email: string | null
  user_name: string
  user_phone: string | null
  email_enabled: boolean
  sms_enabled: boolean
  email_sent: boolean
  sms_sent: boolean
}

/** Row shape returned by medisync.due_appointment_notifications view */
export type DueAppointmentRow = {
  entity_id: string
  user_id: string
  doctor_name: string
  specialty: string | null
  hospital: string | null
  address: string | null
  body: string | null
  date: string
  time: string
  timezone: string
  contact_number: string | null
  user_email: string | null
  user_name: string
  user_phone: string | null
  email_enabled: boolean
  sms_enabled: boolean
  email_sent: boolean
  sms_sent: boolean
}

/** Result returned after processing a batch of notifications */
export type NotifyResult = {
  sent: number
  failed: number
}
