import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { chatConversation, chatMessage } from '@/db/schema'
import { eq, and, desc, asc, lt } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/start-server-core'

// ── Helpers ──────────────────────────────────────────────────────────
const getSession = async () => {
  const request = getRequest()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user.id) throw new Error('Unauthorized')
  return session
}

const verifyOwnership = async (conversationId: string, userId: string) => {
  const conv = await db.query.chatConversation.findFirst({
    where: and(
      eq(chatConversation.id, conversationId),
      eq(chatConversation.userId, userId),
    ),
  })
  if (!conv) throw new Error('Conversation not found')
  return conv
}

// ── Schemas ──────────────────────────────────────────────────────────
const idSchema = z.object({ id: z.string().min(1) })

const listConversationsSchema = z.object({
  limit: z.number().int().positive().optional().default(10),
  cursor: z.string().optional(),
})

const renameSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
})

const setMessageFeedbackSchema = z.object({
  messageId: z.string().min(1),
  feedback: z.enum(['LIKED', 'DISLIKED']).nullable(),
})

const messageSchema = z.object({
  role: z.string().min(1),
  content: z.string(),
  reasoning: z.string().nullish(),
  parts: z.array(z.record(z.unknown())).optional(),
  attachments: z.array(z.record(z.unknown())).nullish(),
  annotations: z.array(z.record(z.unknown())).nullish(),
  inputTokens: z.number().nullish(),
  outputTokens: z.number().nullish(),
  modelUsed: z.string().nullish(),
})

const saveMessagesSchema = z.object({
  conversationId: z.string().min(1),
  messages: z.array(messageSchema),
})

const createAndSendSchema = z.object({
  content: z.string().min(1),
  parts: z.array(z.record(z.unknown())).optional(),
  attachments: z.array(z.record(z.unknown())).nullish(),
})

// ── List conversations (with pagination) ─────────────────────────────
export const listConversations = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => listConversationsSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    const limit = data.limit || 10

    const whereConditions = [eq(chatConversation.userId, session.user.id)]
    if (data.cursor) {
      whereConditions.push(lt(chatConversation.id, data.cursor))
    }

    const conversations = await db.query.chatConversation.findMany({
      where: and(...whereConditions),
      orderBy: desc(chatConversation.updatedAt),
      limit: limit + 1, // Fetch one extra to determine if there are more
    })

    const hasMore = conversations.length > limit
    const items = hasMore ? conversations.slice(0, limit) : conversations
    const nextCursor = hasMore ? items[items.length - 1].id : null

    return { items, nextCursor, hasMore }
  })

// ── Create conversation ──────────────────────────────────────────────
export const createConversation = createServerFn({ method: 'POST' }).handler(
  async () => {
    const session = await getSession()
    const [created] = await db
      .insert(chatConversation)
      .values({ userId: session.user.id, title: 'New Chat' })
      .returning()
    return created
  },
)

// ── Get conversation with messages ───────────────────────────────────
export const getConversation = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    const conv = await verifyOwnership(data.id, session.user.id)
    const messages = await db.query.chatMessage.findMany({
      where: eq(chatMessage.conversationId, data.id),
      orderBy: asc(chatMessage.createdAt),
    })
    return { ...conv, messages }
  })

// ── Delete conversation ──────────────────────────────────────────────
export const deleteConversation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => idSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    await verifyOwnership(data.id, session.user.id)
    await db
      .delete(chatConversation)
      .where(
        and(
          eq(chatConversation.id, data.id),
          eq(chatConversation.userId, session.user.id),
        ),
      )
    return { success: true }
  })

// ── Save messages (with full metadata) ───────────────────────────────
export const saveMessages = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => saveMessagesSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    await verifyOwnership(data.conversationId, session.user.id)
    if (data.messages.length === 0) return { success: true, inserted: [] as any[] }

    const rows = data.messages.map((m) => ({
      conversationId: data.conversationId,
      role: m.role,
      content: m.content,
      reasoning: m.reasoning ?? null,
      parts: (m.parts as Array<{ type: string; [key: string]: unknown }>) ?? [],
      attachments:
        (m.attachments as Array<{
          name: string
          type: string
          size: number
          url: string
        }>) ?? null,
      annotations: m.annotations ?? null,
      inputTokens: m.inputTokens ?? null,
      outputTokens: m.outputTokens ?? null,
      modelUsed: m.modelUsed ?? null,
    }))
    const inserted = await db.insert(chatMessage).values(rows).returning()

    // Touch updatedAt on the conversation
    await db
      .update(chatConversation)
      .set({ updatedAt: new Date() })
      .where(eq(chatConversation.id, data.conversationId))

    return { success: true, inserted }
  })

// ── Create conversation AND send first message (atomic) ──────────────
export const createConversationAndSend = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createAndSendSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()

    // Auto-title from first message (truncated)
    const title = data.content.substring(0, 100) || 'New Chat'

    const [conv] = await db
      .insert(chatConversation)
      .values({ userId: session.user.id, title })
      .returning()

    const [msg] = await db
      .insert(chatMessage)
      .values({
        conversationId: conv.id,
        role: 'user',
        content: data.content,
        parts: (data.parts as Array<{
          type: string
          [key: string]: unknown
        }>) ?? [{ type: 'text', text: data.content }],
        attachments:
          (data.attachments as Array<{
            name: string
            type: string
            size: number
            url: string
          }>) ?? null,
      })
      .returning()

    return { conversation: conv, message: msg }
  })

// ── Rename conversation ──────────────────────────────────────────────
export const renameConversation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => renameSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    await verifyOwnership(data.id, session.user.id)
    const [updated] = await db
      .update(chatConversation)
      .set({ title: data.title })
      .where(
        and(
          eq(chatConversation.id, data.id),
          eq(chatConversation.userId, session.user.id),
        ),
      )
      .returning()
    return updated
  })

// Set feedback on an assistant message
export const setMessageFeedback = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => setMessageFeedbackSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()

    const message = await db.query.chatMessage.findFirst({
      where: eq(chatMessage.id, data.messageId),
      with: { conversation: true },
    })

    if (!message || message.conversation.userId !== session.user.id) {
      throw new Error('Message not found')
    }

    const [updated] = await db
      .update(chatMessage)
      .set({ userFeedback: data.feedback })
      .where(eq(chatMessage.id, data.messageId))
      .returning()

    return updated
  })
