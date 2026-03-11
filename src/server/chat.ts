import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod/v4'
import { db } from '@/db'
import { chatConversation, chatMessage } from '@/db/schema'
import { eq, and, desc, asc } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'

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

const renameSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
})

const saveMessagesSchema = z.object({
  conversationId: z.string().min(1),
  messages: z.array(
    z.object({
      role: z.string().min(1),
      content: z.string(),
      reasoning: z.string().nullish(),
      parts: z.array(z.record(z.string(), z.unknown())).optional(),
      attachments: z
        .array(
          z.object({
            documentId: z.string().min(1).optional(),
            name: z.string().min(1),
            type: z.string().min(1),
            size: z.number().int().nonnegative(),
            url: z.string().min(1),
          }),
        )
        .optional(),
      inputTokens: z.number().nullish(),
      outputTokens: z.number().nullish(),
      modelUsed: z.string().nullish(),
    }),
  ),
})

// ── List conversations ───────────────────────────────────────────────
export const listConversations = createServerFn({ method: 'GET' }).handler(
  async () => {
    const session = await getSession()
    return db.query.chatConversation.findMany({
      where: eq(chatConversation.userId, session.user.id),
      orderBy: desc(chatConversation.updatedAt),
    })
  },
)

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
    try {
      console.log('[getConversation] Fetching conversation:', data.id)
      const session = await getSession()
      console.log('[getConversation] Session user:', session.user.id)
      const conv = await verifyOwnership(data.id, session.user.id)
      console.log(
        '[getConversation] Conversation verified:',
        conv.id,
        conv.title,
      )
      const messages = await db.query.chatMessage.findMany({
        where: eq(chatMessage.conversationId, data.id),
        orderBy: asc(chatMessage.createdAt),
      })
      console.log('[getConversation] Found', messages.length, 'messages')
      const result = {
        id: conv.id,
        userId: conv.userId,
        title: conv.title,
        createdAt: conv.createdAt,
        updatedAt: conv.updatedAt,
        messages: messages as Array<{
          id: string
          role: string
          content: string
          parts: Array<Record<string, {}>>
          attachments?: Array<{
            documentId?: string
            name: string
            type: string
            size: number
            url: string
          }> | null
        }>,
      }
      console.log('[getConversation] Returning result:', result)
      return result
    } catch (err) {
      console.error('[getConversation] Error:', err)
      throw err
    }
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

// ── Save messages ────────────────────────────────────────────────────
export const saveMessages = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => saveMessagesSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    await verifyOwnership(data.conversationId, session.user.id)
    if (data.messages.length === 0) return { success: true }

    const rows = data.messages.map((m) => ({
      conversationId: data.conversationId,
      role: m.role,
      content: m.content,
      reasoning: m.reasoning ?? null,
      parts: m.parts ?? [],
      attachments: m.attachments,
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

// ── Set message feedback ─────────────────────────────────────────────
const feedbackSchema = z.object({
  messageId: z.string().min(1),
  feedback: z.enum(['LIKED', 'DISLIKED']).nullable(),
})

export const setMessageFeedback = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => feedbackSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    const msg = await db.query.chatMessage.findFirst({
      where: eq(chatMessage.id, data.messageId),
    })
    if (!msg) throw new Error('Message not found')
    await verifyOwnership(msg.conversationId, session.user.id)
    await db
      .update(chatMessage)
      .set({ userFeedback: data.feedback })
      .where(eq(chatMessage.id, data.messageId))
    return { success: true }
  })

// ── Create conversation + first user message (atomic) ────────────────
const createConversationAndSendSchema = z.object({
  content: z.string(),
  parts: z.array(z.record(z.string(), z.unknown())).default([]),
  attachments: z
    .array(
      z.object({
        documentId: z.string().min(1).optional(),
        name: z.string().min(1),
        type: z.string().min(1),
        size: z.number().int().nonnegative(),
        url: z.string().min(1),
      }),
    )
    .optional(),
})

export const createConversationAndSend = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) =>
    createConversationAndSendSchema.parse(data),
  )
  .handler(async ({ data }) => {
    const session = await getSession()
    const [conversation] = await db
      .insert(chatConversation)
      .values({ userId: session.user.id, title: 'New Chat' })
      .returning()
    const [message] = await db
      .insert(chatMessage)
      .values({
        conversationId: conversation.id,
        role: 'user',
        content: data.content,
        parts: data.parts,
        attachments: data.attachments,
      })
      .returning()
    return { conversation, message }
  })

// ── Rename conversation ──────────────────────────────────────────────
export const renameConversation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => renameSchema.parse(data))
  .handler(async ({ data }) => {
    const session = await getSession()
    const existingConversation = await verifyOwnership(data.id, session.user.id)
    const [updated] = await db
      .update(chatConversation)
      .set({
        title: data.title,
        updatedAt: existingConversation.updatedAt,
      })
      .where(
        and(
          eq(chatConversation.id, data.id),
          eq(chatConversation.userId, session.user.id),
        ),
      )
      .returning()
    return updated
  })
