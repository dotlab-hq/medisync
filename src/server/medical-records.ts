import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { medicalRecord } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'

// ── List medical records ─────────────────────────────────────────────
export const listMedicalRecords = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    return db.query.medicalRecord.findMany({
      where: eq(medicalRecord.userId, userId),
      orderBy: desc(medicalRecord.visitDate),
    })
  },
)

// ── Get single record ────────────────────────────────────────────────
export const getMedicalRecord = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    const record = await db.query.medicalRecord.findFirst({
      where: and(
        eq(medicalRecord.id, data.id),
        eq(medicalRecord.userId, userId),
      ),
    })

    if (!record) throw new Error('Record not found')
    return record
  })

// ── Create medical record ────────────────────────────────────────────
const createRecordSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  testType: z.string().optional(),
  hospitalName: z.string().optional(),
  visitDate: z.string().optional(),
  fileUrl: z.string().min(1),
  description: z.string().optional(),
  isConfidential: z.boolean().optional(),
})

export const createMedicalRecord = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createRecordSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    const [created] = await db
      .insert(medicalRecord)
      .values({
        ...data,
        visitDate: data.visitDate ? new Date(data.visitDate) : new Date(),
        userId,
      })
      .returning()
    return created
  })

// ── Update medical record ────────────────────────────────────────────
const updateRecordSchema = z.object({
  id: z.string(),
  fileName: z.string().min(1).optional(),
  fileType: z.string().min(1).optional(),
  testType: z.string().optional(),
  hospitalName: z.string().optional(),
  visitDate: z.string().optional(),
  fileUrl: z.string().optional(),
  description: z.string().optional(),
  isConfidential: z.boolean().optional(),
})

export const updateMedicalRecord = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateRecordSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    const { id, ...updateData } = data
    const [updated] = await db
      .update(medicalRecord)
      .set({
        ...updateData,
        visitDate: updateData.visitDate
          ? new Date(updateData.visitDate)
          : undefined,
      })
      .where(and(eq(medicalRecord.id, id), eq(medicalRecord.userId, userId)))
      .returning()

    if (!updated) throw new Error('Record not found')
    return updated
  })

// ── Delete medical record ────────────────────────────────────────────
export const deleteMedicalRecord = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    await db
      .delete(medicalRecord)
      .where(
        and(eq(medicalRecord.id, data.id), eq(medicalRecord.userId, userId)),
      )
    return { success: true }
  })
