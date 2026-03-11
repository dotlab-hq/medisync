import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { userNotificationSettings } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'

// ── Get or create settings ───────────────────────────────────────────
export const getNotificationSettings = createServerFn({
  method: 'GET',
}).handler(async () => {
  const request = getRequest()
  const sessionData = await auth.api.getSession({ headers: request.headers })
  if (!sessionData?.user?.id) throw new Error('Unauthorized')
  const userId = sessionData.user.id

  const existing = await db.query.userNotificationSettings.findFirst({
    where: eq(userNotificationSettings.userId, userId),
  })

  if (existing) return existing

  // Auto-create defaults on first access
  const [created] = await db
    .insert(userNotificationSettings)
    .values({ userId, emailEnabled: true, smsEnabled: false })
    .returning()
  return created
})

// ── Update settings ──────────────────────────────────────────────────
const updateSchema = z.object({
  emailEnabled: z.boolean().optional(),
  smsEnabled: z.boolean().optional(),
})

export const updateNotificationSettings = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const sessionData = await auth.api.getSession({ headers: request.headers })
    if (!sessionData?.user?.id) throw new Error('Unauthorized')
    const userId = sessionData.user.id

    const existing = await db.query.userNotificationSettings.findFirst({
      where: eq(userNotificationSettings.userId, userId),
    })

    if (existing) {
      const [updated] = await db
        .update(userNotificationSettings)
        .set({ ...data })
        .where(eq(userNotificationSettings.userId, userId))
        .returning()
      return updated
    }

    const [created] = await db
      .insert(userNotificationSettings)
      .values({ userId, emailEnabled: true, smsEnabled: false, ...data })
      .returning()
    return created
  })
