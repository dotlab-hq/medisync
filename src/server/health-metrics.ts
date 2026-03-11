import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { healthMetric } from '@/db/schema'
import { eq, and, desc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'

// ── List health metrics ──────────────────────────────────────────────
export const listHealthMetrics = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user?.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    return db.query.healthMetric.findMany({
      where: eq(healthMetric.userId, userId),
      orderBy: desc(healthMetric.measuredAt),
    })
  },
)

// ── Create health metric ─────────────────────────────────────────────
const createMetricSchema = z.object({
  metricType: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().optional(),
  notes: z.string().optional(),
  measuredAt: z.string().optional(),
})

export const createHealthMetric = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createMetricSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user?.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    const [created] = await db
      .insert(healthMetric)
      .values({
        ...data,
        measuredAt: data.measuredAt ? new Date(data.measuredAt) : new Date(),
        userId,
      })
      .returning()
    return created
  })

// ── Delete health metric ─────────────────────────────────────────────
export const deleteHealthMetric = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user?.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    await db
      .delete(healthMetric)
      .where(and(eq(healthMetric.id, data.id), eq(healthMetric.userId, userId)))
    return { success: true }
  })
