import { toolDefinition } from '@tanstack/ai'
import { db } from '@/db'
import { reminder, appointment, emergencyContact, user } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { toUtcDate } from '@/lib/to-utc'
import { sendSms } from '@/lib/sms'

// ═══════════════════════════════════════════════════════════════════════
// REMINDER CRUD TOOLS
// ═══════════════════════════════════════════════════════════════════════

// ── list_reminders ────────────────────────────────────────────────────
export const listRemindersDef = toolDefinition({
  name: 'list_reminders',
  description:
    "List all of the user's reminders (medication, appointment, checkup, other). Returns them in newest-first order.",
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      reminders: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            title: { type: 'string' },
            description: { type: ['string', 'null'] },
            type: { type: 'string' },
            date: { type: 'string' },
            time: { type: 'string' },
            timezone: { type: 'string' },
            isCompleted: { type: 'boolean' },
            createdAt: { type: 'string' },
          },
          required: [
            'id',
            'title',
            'description',
            'type',
            'date',
            'time',
            'timezone',
            'isCompleted',
            'createdAt',
          ],
          additionalProperties: false,
        },
      },
    },
    required: ['reminders'],
    additionalProperties: false,
  },
})

export function createListRemindersTool(userId: string) {
  return listRemindersDef.server(async () => {
    const rows = await db.query.reminder.findMany({
      where: eq(reminder.userId, userId),
      orderBy: desc(reminder.createdAt),
    })
    return {
      reminders: rows.map((r) => ({
        id: r.id,
        title: r.title,
        description: r.description ?? null,
        type: r.type,
        date: r.date,
        time: r.time,
        timezone: r.timezone,
        isCompleted: r.isCompleted,
        createdAt: r.createdAt.toISOString(),
      })),
    }
  })
}

// ── create_reminder ───────────────────────────────────────────────────
export const createReminderDef = toolDefinition({
  name: 'create_reminder',
  description:
    'Create a new reminder for the user. Provide title, date (YYYY-MM-DD), time (HH:mm), and optionally type (medication | appointment | checkup | other), description, and timezone (IANA, e.g. Asia/Kolkata). Requires user approval.',
  inputSchema: {
    type: 'object',
    properties: {
      title: { type: 'string', description: 'What the reminder is for' },
      description: { type: 'string', description: 'Extra details (optional)' },
      type: {
        type: 'string',
        enum: ['medication', 'appointment', 'checkup', 'other'],
        description: "Category of reminder. Defaults to 'other'.",
      },
      date: { type: 'string', description: 'Date in YYYY-MM-DD format' },
      time: { type: 'string', description: 'Time in HH:mm (24-hour) format' },
      timezone: {
        type: 'string',
        description:
          "IANA timezone, e.g. Asia/Kolkata. If you have the user's location from get_user_location, derive it; otherwise omit and system default will be used.",
      },
    },
    required: ['title', 'date', 'time'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      date: { type: 'string' },
      time: { type: 'string' },
      timezone: { type: 'string' },
      type: { type: 'string' },
    },
    required: ['id', 'title', 'date', 'time', 'timezone', 'type'],
    additionalProperties: false,
  },
  needsApproval: true,
})

export function createCreateReminderTool(userId: string) {
  return createReminderDef.server(async (args: any) => {
    const { title, description, type = 'other', date, time, timezone } = args
    // Resolve timezone
    let tz = timezone
    if (!tz) {
      const u = await db.query.user.findFirst({
        where: eq(user.id, userId),
        columns: { timezone: true },
      })
      tz = u?.timezone ?? 'UTC'
    }

    const toBeSentAt = toUtcDate(date, time, tz)

    const [created] = await db
      .insert(reminder)
      .values({
        userId,
        title,
        description,
        type,
        date,
        time,
        timezone: tz,
        toBeSentAt,
      })
      .returning()

    return {
      id: created.id,
      title: created.title,
      date: created.date,
      time: created.time,
      timezone: created.timezone,
      type: created.type,
    }
  })
}

// ── update_reminder ───────────────────────────────────────────────────
export const updateReminderDef = toolDefinition({
  name: 'update_reminder',
  description:
    'Update an existing reminder. Pass the reminder id and any fields to change (title, description, type, date, time, isCompleted). Requires user approval.',
  inputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Reminder ID to update' },
      title: { type: 'string' },
      description: { type: 'string' },
      type: {
        type: 'string',
        enum: ['medication', 'appointment', 'checkup', 'other'],
      },
      date: { type: 'string', description: 'YYYY-MM-DD' },
      time: { type: 'string', description: 'HH:mm' },
      isCompleted: { type: 'boolean' },
    },
    required: ['id'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      title: { type: 'string' },
      date: { type: 'string' },
      time: { type: 'string' },
      isCompleted: { type: 'boolean' },
    },
    required: ['id', 'title', 'date', 'time', 'isCompleted'],
    additionalProperties: false,
  },
  needsApproval: true,
})

export function createUpdateReminderTool(userId: string) {
  return updateReminderDef.server(async (input: any) => {
    const { id, ...updates } = input

    const existing = await db.query.reminder.findFirst({
      where: and(eq(reminder.id, id), eq(reminder.userId, userId)),
    })
    if (!existing) throw new Error('Reminder not found')

    // Recompute toBeSentAt if date or time changed
    const setPayload: Record<string, unknown> = { ...updates }
    if (updates.date || updates.time) {
      const finalDate = updates.date ?? existing.date
      const finalTime = updates.time ?? existing.time
      setPayload.toBeSentAt = toUtcDate(finalDate, finalTime, existing.timezone)
    }

    const [updated] = await db
      .update(reminder)
      .set(setPayload)
      .where(and(eq(reminder.id, id), eq(reminder.userId, userId)))
      .returning()

    if (!updated) throw new Error('Reminder not found')

    return {
      id: updated.id,
      title: updated.title,
      date: updated.date,
      time: updated.time,
      isCompleted: updated.isCompleted,
    }
  })
}

// ── delete_reminder ───────────────────────────────────────────────────
export const deleteReminderDef = toolDefinition({
  name: 'delete_reminder',
  description:
    'Delete a reminder by ID. This is irreversible. Requires user approval.',
  inputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Reminder ID to delete' },
    },
    required: ['id'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      deletedId: { type: 'string' },
    },
    required: ['success', 'deletedId'],
    additionalProperties: false,
  },
  needsApproval: true,
})

export function createDeleteReminderTool(userId: string) {
  return deleteReminderDef.server(async (args: any) => {
    const { id } = args
    const existing = await db.query.reminder.findFirst({
      where: and(eq(reminder.id, id), eq(reminder.userId, userId)),
    })
    if (!existing) throw new Error('Reminder not found')

    await db
      .delete(reminder)
      .where(and(eq(reminder.id, id), eq(reminder.userId, userId)))

    return { success: true, deletedId: id }
  })
}

// ═══════════════════════════════════════════════════════════════════════
// APPOINTMENT CRUD TOOLS
// ═══════════════════════════════════════════════════════════════════════

// ── list_appointments ─────────────────────────────────────────────────
export const listAppointmentsDef = toolDefinition({
  name: 'list_appointments',
  description:
    "List all of the user's appointments with doctors. Returns them in newest-first order.",
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      appointments: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            doctorName: { type: 'string' },
            specialty: { type: ['string', 'null'] },
            hospital: { type: ['string', 'null'] },
            address: { type: ['string', 'null'] },
            date: { type: 'string' },
            time: { type: 'string' },
            timezone: { type: 'string' },
            status: { type: 'string' },
            notes: { type: ['string', 'null'] },
            contactNumber: { type: ['string', 'null'] },
            createdAt: { type: 'string' },
          },
          required: [
            'id',
            'doctorName',
            'specialty',
            'hospital',
            'address',
            'date',
            'time',
            'timezone',
            'status',
            'notes',
            'contactNumber',
            'createdAt',
          ],
          additionalProperties: false,
        },
      },
    },
    required: ['appointments'],
    additionalProperties: false,
  },
})

export function createListAppointmentsTool(userId: string) {
  return listAppointmentsDef.server(async () => {
    const rows = await db.query.appointment.findMany({
      where: eq(appointment.userId, userId),
      orderBy: desc(appointment.createdAt),
    })
    return {
      appointments: rows.map((a) => ({
        id: a.id,
        doctorName: a.doctorName,
        specialty: a.specialty ?? null,
        hospital: a.hospital ?? null,
        address: a.address ?? null,
        date: a.date,
        time: a.time,
        timezone: a.timezone,
        status: a.status,
        notes: a.notes ?? null,
        contactNumber: a.contactNumber ?? null,
        createdAt: a.createdAt.toISOString(),
      })),
    }
  })
}

// ── create_appointment ────────────────────────────────────────────────
export const createAppointmentDef = toolDefinition({
  name: 'create_appointment',
  description:
    'Create a new doctor appointment. Provide doctorName, date (YYYY-MM-DD), time (HH:mm). Optionally: specialty, hospital, address, notes, contactNumber, timezone. Requires user approval.',
  inputSchema: {
    type: 'object',
    properties: {
      doctorName: { type: 'string', description: 'Doctor name' },
      specialty: {
        type: 'string',
        description: 'Medical specialty (optional)',
      },
      hospital: {
        type: 'string',
        description: 'Hospital or clinic name (optional)',
      },
      address: {
        type: 'string',
        description: 'Address of the appointment (optional)',
      },
      date: { type: 'string', description: 'Date in YYYY-MM-DD format' },
      time: { type: 'string', description: 'Time in HH:mm (24-hour) format' },
      notes: { type: 'string', description: 'Additional notes (optional)' },
      contactNumber: {
        type: 'string',
        description: 'Contact number (optional)',
      },
      timezone: {
        type: 'string',
        description:
          'IANA timezone (optional, defaults to user profile timezone)',
      },
    },
    required: ['doctorName', 'date', 'time'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      doctorName: { type: 'string' },
      date: { type: 'string' },
      time: { type: 'string' },
      timezone: { type: 'string' },
      status: { type: 'string' },
    },
    required: ['id', 'doctorName', 'date', 'time', 'timezone', 'status'],
    additionalProperties: false,
  },
  needsApproval: true,
})

export function createCreateAppointmentTool(userId: string) {
  return createAppointmentDef.server(async (args: any) => {
    const {
      doctorName,
      specialty,
      hospital,
      address,
      date,
      time,
      notes,
      contactNumber,
      timezone,
    } = args
    let tz = timezone
    if (!tz) {
      const u = await db.query.user.findFirst({
        where: eq(user.id, userId),
        columns: { timezone: true },
      })
      tz = u?.timezone ?? 'UTC'
    }

    const toBeSentAt = toUtcDate(date, time, tz)

    const [created] = await db
      .insert(appointment)
      .values({
        userId,
        doctorName,
        specialty,
        hospital,
        address,
        date,
        time,
        timezone: tz,
        toBeSentAt,
        notes,
        contactNumber,
      })
      .returning()

    return {
      id: created.id,
      doctorName: created.doctorName,
      date: created.date,
      time: created.time,
      timezone: created.timezone,
      status: created.status,
    }
  })
}

// ── update_appointment ────────────────────────────────────────────────
export const updateAppointmentDef = toolDefinition({
  name: 'update_appointment',
  description:
    "Update an existing appointment. Pass the ID and any fields to change. Use status='cancelled' to cancel. Requires user approval.",
  inputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Appointment ID' },
      doctorName: { type: 'string' },
      specialty: { type: 'string' },
      hospital: { type: 'string' },
      address: { type: 'string' },
      date: { type: 'string', description: 'YYYY-MM-DD' },
      time: { type: 'string', description: 'HH:mm' },
      status: { type: 'string', enum: ['upcoming', 'completed', 'cancelled'] },
      notes: { type: 'string' },
      contactNumber: { type: 'string' },
    },
    required: ['id'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string' },
      doctorName: { type: 'string' },
      date: { type: 'string' },
      time: { type: 'string' },
      status: { type: 'string' },
    },
    required: ['id', 'doctorName', 'date', 'time', 'status'],
    additionalProperties: false,
  },
  needsApproval: true,
})

export function createUpdateAppointmentTool(userId: string) {
  return updateAppointmentDef.server(async (input: any) => {
    const { id, ...updates } = input

    const existing = await db.query.appointment.findFirst({
      where: and(eq(appointment.id, id), eq(appointment.userId, userId)),
    })
    if (!existing) throw new Error('Appointment not found')

    const setPayload: Record<string, unknown> = { ...updates }
    if (updates.date || updates.time) {
      const finalDate = updates.date ?? existing.date
      const finalTime = updates.time ?? existing.time
      const finalTz = existing.timezone ?? 'UTC'
      setPayload.toBeSentAt = toUtcDate(finalDate, finalTime, finalTz)
    }

    const [updated] = await db
      .update(appointment)
      .set(setPayload)
      .where(and(eq(appointment.id, id), eq(appointment.userId, userId)))
      .returning()

    if (!updated) throw new Error('Appointment not found')

    return {
      id: updated.id,
      doctorName: updated.doctorName,
      date: updated.date,
      time: updated.time,
      status: updated.status,
    }
  })
}

// ── delete_appointment ────────────────────────────────────────────────
export const deleteAppointmentDef = toolDefinition({
  name: 'delete_appointment',
  description:
    'Delete an appointment by ID. This is irreversible. Requires user approval.',
  inputSchema: {
    type: 'object',
    properties: {
      id: { type: 'string', description: 'Appointment ID to delete' },
    },
    required: ['id'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      success: { type: 'boolean' },
      deletedId: { type: 'string' },
    },
    required: ['success', 'deletedId'],
    additionalProperties: false,
  },
  needsApproval: true,
})

export function createDeleteAppointmentTool(userId: string) {
  return deleteAppointmentDef.server(async (args: any) => {
    const { id } = args
    const existing = await db.query.appointment.findFirst({
      where: and(eq(appointment.id, id), eq(appointment.userId, userId)),
    })
    if (!existing) throw new Error('Appointment not found')

    await db
      .delete(appointment)
      .where(and(eq(appointment.id, id), eq(appointment.userId, userId)))

    return { success: true, deletedId: id }
  })
}

// ═══════════════════════════════════════════════════════════════════════
// SOS EMERGENCY TOOL
// ═══════════════════════════════════════════════════════════════════════

export const sendSosEmergencyDef = toolDefinition({
  name: 'send_sos_emergency',
  description:
    "Send an SOS emergency message to ALL of the user's emergency contacts via SMS. Include the user's current location if available (obtained via get_user_location client tool). This is a critical action and ALWAYS requires user approval.",
  inputSchema: {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        description:
          'Custom emergency message. If not provided, a default SOS message is sent.',
      },
      latitude: {
        type: 'number',
        description: "User's latitude from get_user_location (optional)",
      },
      longitude: {
        type: 'number',
        description: "User's longitude from get_user_location (optional)",
      },
    },
    required: [],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      sent: {
        type: 'number',
        description: 'Number of contacts the SOS was sent to',
      },
      failed: { type: 'number', description: 'Number of failed sends' },
      contacts: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            phone: { type: 'string' },
            status: { type: 'string', enum: ['sent', 'failed'] },
          },
          required: ['name', 'phone', 'status'],
          additionalProperties: false,
        },
      },
    },
    required: ['sent', 'failed', 'contacts'],
    additionalProperties: false,
  },
  needsApproval: true,
})

export function createSendSosEmergencyTool(userId: string) {
  return sendSosEmergencyDef.server(async (args: any) => {
    const { message, latitude, longitude } = args
    // Fetch user info
    const userRecord = await db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: { name: true },
    })
    const userName = userRecord?.name ?? 'A MediSync user'

    // Fetch all emergency contacts
    const contacts = await db.query.emergencyContact.findMany({
      where: eq(emergencyContact.userId, userId),
    })

    if (contacts.length === 0) {
      throw new Error(
        'No emergency contacts found. Please add emergency contacts in your profile settings first.',
      )
    }

    // Build SOS body
    const locationPart =
      latitude != null && longitude != null
        ? `\nLocation: https://maps.google.com/?q=${latitude},${longitude}`
        : ''

    const body =
      message ??
      `🚨 SOS EMERGENCY from ${userName}! They need immediate help.${locationPart}\n\nThis is an automated alert from MediSync.`

    const bodyWithLocation = message
      ? `🚨 SOS: ${message}${locationPart}\n\n— Sent by ${userName} via MediSync`
      : body

    // Send to all contacts
    let sent = 0
    let failed = 0
    const results: Array<{
      name: string
      phone: string
      status: 'sent' | 'failed'
    }> = []

    for (const contact of contacts) {
      try {
        await sendSms(contact.phone, bodyWithLocation)
        results.push({
          name: contact.name,
          phone: contact.phone,
          status: 'sent',
        })
        sent++
      } catch {
        results.push({
          name: contact.name,
          phone: contact.phone,
          status: 'failed',
        })
        failed++
      }
    }

    return { sent, failed, contacts: results }
  })
}
