import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { user, qrCode, medicalInformation, emergencyContact } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'

// ── Get or create QR code ────────────────────────────────────────────
export const getOrCreateQrCode = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user?.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    const existing = await db.query.qrCode.findFirst({
      where: eq(qrCode.userId, userId),
    })

    if (existing) return existing

    // Use the QR record's own id as the unique token so each regeneration differs
    const newId = crypto.randomUUID()
    const qrData = `/emergency/${newId}`

    const [created] = await db
      .insert(qrCode)
      .values({
        id: newId,
        userId,
        qrCodeData: qrData,
        qrCodeUrl: qrData,
      })
      .returning()

    return created
  },
)

// ── Regenerate QR code ───────────────────────────────────────────────
export const regenerateQrCode = createServerFn({ method: 'POST' }).handler(
  async () => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user?.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    // Delete old QR code so old URLs become invalid
    await db.delete(qrCode).where(eq(qrCode.userId, userId))

    // New unique id = new unique QR token
    const newId = crypto.randomUUID()
    const qrData = `/emergency/${newId}`

    const [created] = await db
      .insert(qrCode)
      .values({
        id: newId,
        userId,
        qrCodeData: qrData,
        qrCodeUrl: qrData,
      })
      .returning()

    return created
  },
)

// ── Public emergency profile (no auth needed) ────────────────────────
const emergencyProfileSchema = z.object({
  token: z.string().min(1),
})

export const getEmergencyProfile = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => emergencyProfileSchema.parse(data))
  .handler(async ({ data }) => {
    // Try to find by QR token (qrCode.id) first; fall back to userId for old-format URLs
    const qrRecord = await db.query.qrCode.findFirst({
      where: eq(qrCode.id, data.token),
    })

    const userId = qrRecord?.userId ?? data.token

    const profile = await db.query.user.findFirst({
      where: eq(user.id, userId),
      columns: {
        id: true,
        name: true,
        gender: true,
        dateOfBirth: true,
        bloodGroup: true,
        image: true,
      },
      with: {
        medicalInformation: true,
        emergencyContacts: true,
      },
    })

    if (!profile) throw new Error('Profile not found')
    return profile
  })
