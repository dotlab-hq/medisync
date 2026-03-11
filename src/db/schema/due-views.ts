import { boolean, text } from 'drizzle-orm/pg-core'
import { schema } from './schema'

export const dueReminderNotifications = schema
    .view( 'due_reminder_notifications', {
        entityId: text( 'entity_id' ).notNull(),
        userId: text( 'user_id' ).notNull(),
        title: text( 'title' ).notNull(),
        body: text( 'body' ),
        reminderType: text( 'reminder_type' ).notNull(),
        date: text( 'date' ).notNull(),
        time: text( 'time' ).notNull(),
        timezone: text( 'timezone' ).notNull(),
        userEmail: text( 'user_email' ),
        userName: text( 'user_name' ).notNull(),
        userPhone: text( 'user_phone' ),
        emailEnabled: boolean( 'email_enabled' ).notNull(),
        smsEnabled: boolean( 'sms_enabled' ).notNull(),
        emailSent: boolean( 'email_sent' ).notNull(),
        smsSent: boolean( 'sms_sent' ).notNull(),
    } )
    .existing()


export const dueAppointmentNotifications = schema
    .view( 'due_appointment_notifications', {
        entityId: text( 'entity_id' ).notNull(),
        userId: text( 'user_id' ).notNull(),
        doctorName: text( 'doctor_name' ).notNull(),
        specialty: text( 'specialty' ),
        hospital: text( 'hospital' ),
        address: text( 'address' ),
        body: text( 'body' ),
        date: text( 'date' ).notNull(),
        time: text( 'time' ).notNull(),
        timezone: text( 'timezone' ).notNull(),
        contactNumber: text( 'contact_number' ),
        userEmail: text( 'user_email' ),
        userName: text( 'user_name' ).notNull(),
        userPhone: text( 'user_phone' ),
        emailEnabled: boolean( 'email_enabled' ).notNull(),
        smsEnabled: boolean( 'sms_enabled' ).notNull(),
        emailSent: boolean( 'email_sent' ).notNull(),
        smsSent: boolean( 'sms_sent' ).notNull(),
    } )
    .existing()
