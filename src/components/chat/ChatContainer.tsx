import { useCallback, useEffect, useRef, useState } from 'react'
import { useChat, fetchServerSentEvents } from '@tanstack/ai-react'
import type { ContentPart, StreamChunk } from '@tanstack/ai'
import type { MultimodalContent } from '@tanstack/ai-client'
import { clientTools } from '@tanstack/ai-client'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import TTSButton from './TTSButton'
import { useChatStore } from './chat-store'
import { getUserLocationTool } from './client-tools'
import {
  saveMessages,
  renameConversation,
  createConversationAndSend,
  getConversation,
} from '@/server/chat'
import { retitleConversation } from '@/server/chat-retitle'
import { getPresignedViewUrl } from '@/server/documents'
import type { UploadedAttachment } from './input/attachment-types'

// Pure helper — defined outside to avoid stale-closure issues in deps
function extractText(
  parts: { type: string; content?: string; text?: string }[],
): string {
  return parts
    .filter((p) => p.type === 'text')
    .map((p) => p.content || p.text || '')
    .join('')
}

/** A message should be saved if it has text content OR tool-call/tool-result parts */
function shouldSaveMessage(m: {
  content: string
  parts?: Array<Record<string, unknown>>
}): boolean {
  if (m.content.trim().length > 0) return true
  if (m.parts?.some((p) => p.type === 'tool-call' || p.type === 'tool-result'))
    return true
  return false
}

type TokenUsageInfo = {
  promptTokens?: number
  completionTokens?: number
  model?: string
}

type NewConv = { id: string; title: string; updatedAt: Date }

type StoredAttachment = {
  documentId?: string
  name: string
  type: string
  size: number
  url: string
}

type DbMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  parts: Array<Record<string, unknown>>
  attachments?: StoredAttachment[] | null
}

type ConversationPayload = {
  messages: DbMessage[]
}

function normalizeTextPart(
  part: Record<string, unknown>,
): Record<string, unknown> {
  if (part.type !== 'text') return part
  const content =
    typeof part.content === 'string'
      ? part.content
      : typeof part.text === 'string'
        ? part.text
        : ''
  return {
    ...part,
    content,
    text: content,
  }
}

type ChatMultimodalPart =
  | { type: 'text'; content: string }
  | {
      type: 'image' | 'document'
      source: { type: 'url'; value: string; mimeType?: string }
      metadata: { documentId?: string; name: string; size: number }
    }

type ChatContainerProps = {
  onConversationCreated?: (conv: NewConv) => void
  onTitleUpdated?: (id: string, title: string) => void
  /** If provided, this chatId is loaded immediately on mount (direct URL navigation) */
  initialChatId?: string
}

export default function ChatContainer({
  onConversationCreated,
  onTitleUpdated,
  initialChatId,
}: ChatContainerProps) {
  const { setActiveConversation } = useChatStore()

  // URL is the single source of truth for which conversation is active.
  // Store state is only used for sidebar highlighting.
  const [conversationId, setConversationId] = useState<string | null>(
    initialChatId ?? null,
  )
  const [isConversationLoading, setIsConversationLoading] = useState(false)

  // Track the assistant message ID we last saved — prevents double-saves
  const savedMsgIdRef = useRef<string | null>(null)
  const wasLoadingRef = useRef(false)
  const retitledRef = useRef<Set<string>>(new Set())
  const loadedConversationRef = useRef<string | null>(null)
  const loadRequestRef = useRef(0)

  // Capture token usage + model from the stream's RUN_FINISHED event
  const lastUsageRef = useRef<TokenUsageInfo>({})

  // Client-side tools for browser-based functionality
  const chatTools = clientTools(getUserLocationTool)

  const {
    messages,
    sendMessage,
    isLoading,
    setMessages,
    stop,
    addToolApprovalResponse,
  } = useChat({
    connection: fetchServerSentEvents('/api/chat'),
    tools: chatTools,
    onChunk(chunk: StreamChunk) {
      // Capture model from any event that carries it
      if ('model' in chunk && chunk.model) {
        lastUsageRef.current.model = chunk.model
      }
      // RUN_FINISHED carries final token usage
      if (chunk.type === 'RUN_FINISHED' && chunk.usage) {
        lastUsageRef.current.promptTokens = chunk.usage.promptTokens
        lastUsageRef.current.completionTokens = chunk.usage.completionTokens
      }
    },
  })

  const clearMessages = useCallback(() => {
    setMessages([])
  }, [setMessages])

  // Helper: fetch a conversation from DB and push its messages into useChat state
  const loadConversation = useCallback(
    (convId: string) => {
      const requestId = ++loadRequestRef.current
      setIsConversationLoading(true)
      getConversation({ data: { id: convId } })
        .then((conv) => {
          if (loadRequestRef.current !== requestId) return
          try {
            const payload = conv as unknown as ConversationPayload
            if (!Array.isArray(payload.messages)) {
              throw new Error(
                `Expected messages to be an array, got ${typeof payload.messages}: ${JSON.stringify(payload.messages)}`,
              )
            }
            const dbMessages = payload.messages
            const uiMessages = dbMessages.map((msg) => {
              const baseParts = Array.isArray(msg.parts)
                ? msg.parts.map(normalizeTextPart)
                : []
              const hasFileParts = baseParts.some(
                (part) => part.type === 'document' || part.type === 'image',
              )
              const normalizedParts = hasFileParts
                ? baseParts
                : [
                    ...baseParts,
                    ...(msg.attachments ?? []).map((attachment) => ({
                      type: attachment.type.startsWith('image/')
                        ? 'image'
                        : 'document',
                      source: {
                        type: 'url',
                        value: attachment.url,
                        mimeType: attachment.type,
                      },
                      metadata: {
                        documentId: attachment.documentId,
                        name: attachment.name,
                        size: attachment.size,
                      },
                    })),
                  ]

              const parts =
                normalizedParts.length > 0
                  ? normalizedParts
                  : [{ type: 'text', content: msg.content, text: msg.content }]

              const content =
                extractText(
                  parts as Array<{
                    type: string
                    content?: string
                    text?: string
                  }>,
                ) || msg.content

              return {
                id: msg.id,
                role: msg.role,
                content,
                parts,
              }
            })
            setMessages(
              uiMessages as unknown as Parameters<typeof setMessages>[0],
            )
            const lastAssistant = [...dbMessages]
              .reverse()
              .find((msg) => msg.role === 'assistant')
            savedMsgIdRef.current = lastAssistant?.id ?? null
          } catch (err) {
            console.error('Error processing conversation data:', err)
            setMessages([])
            savedMsgIdRef.current = null
          } finally {
            setIsConversationLoading(false)
          }
        })
        .catch((err) => {
          if (loadRequestRef.current !== requestId) return
          console.error('Failed to load conversation:', err)
          setMessages([])
          savedMsgIdRef.current = null
          setIsConversationLoading(false)
        })
    },
    [setMessages],
  )

  useEffect(() => {
    setConversationId(initialChatId ?? null)
  }, [initialChatId])

  // Load conversation from DB when URL chatId changes.
  useEffect(() => {
    if (!initialChatId) {
      loadedConversationRef.current = null
      setActiveConversation(null)
      setIsConversationLoading(false)
      clearMessages()
      return
    }
    if (loadedConversationRef.current === initialChatId) {
      return
    }
    loadedConversationRef.current = initialChatId
    setActiveConversation(initialChatId)
    setMessages([])
    loadConversation(initialChatId)
  }, [
    initialChatId,
    clearMessages,
    loadConversation,
    setActiveConversation,
    setMessages,
  ])

  // ── Auto-retitle (separate Groq call, best-effort) ─────────────────
  const autoRetitle = useCallback(
    async (convId: string, msgs: typeof messages) => {
      if (retitledRef.current.has(convId)) return
      if (!Array.isArray(msgs) || msgs.length === 0) return
      retitledRef.current.add(convId)
      try {
        const plainMessages = msgs.map((m) => ({
          role: m.role,
          content: extractText(m.parts),
        }))
        const { title } = await retitleConversation({
          data: { messages: plainMessages },
        })
        if (title && title !== 'New Chat') {
          await renameConversation({ data: { id: convId, title } })
          onTitleUpdated?.(convId, title)
        }
      } catch {
        // best-effort — swallow errors
      }
    },
    [onTitleUpdated],
  )

  // ── Save messages when the stream completes ───────────────────────
  useEffect(() => {
    const streamJustFinished = wasLoadingRef.current && !isLoading
    wasLoadingRef.current = isLoading

    if (!streamJustFinished) return
    if (!conversationId) return

    const currentMessages = messages
    if (currentMessages.length === 0) return

    const lastMsg = currentMessages[currentMessages.length - 1]
    if (lastMsg.role !== 'assistant') return

    // De-duplicate: skip if we already persisted this assistant turn
    if (savedMsgIdRef.current === lastMsg.id) return
    savedMsgIdRef.current = lastMsg.id

    // Extract reasoning from the assistant message parts
    const parts = lastMsg.parts
    const reasoningParts = parts.filter((p) => p.type === 'thinking')
    const reasoningText =
      reasoningParts.length > 0
        ? reasoningParts.map((p) => p.content || '').join('\n')
        : null

    // Grab captured token usage from the stream
    const usage = lastUsageRef.current

    const row = {
      role: 'assistant',
      content: extractText(lastMsg.parts),
      reasoning: reasoningText,
      parts: lastMsg.parts as unknown as Array<Record<string, unknown>>,
      inputTokens: usage.promptTokens ?? null,
      outputTokens: usage.completionTokens ?? null,
      modelUsed: usage.model ?? null,
    }

    // Reset usage for next turn
    lastUsageRef.current = {}

    const rows = shouldSaveMessage({ content: row.content, parts: row.parts })
      ? [row]
      : []
    if (rows.length > 0) {
      saveMessages({
        data: { conversationId: conversationId, messages: rows },
      })
        .then((result) => {
          const insertedAssistant = result.inserted?.find(
            (m) => m.role === 'assistant',
          )
          if (!insertedAssistant?.id) return

          // Replace client-side streamed ID with DB ID so feedback actions use a valid message ID.
          setMessages(
            currentMessages.map((m) =>
              m.id === lastMsg.id ? { ...m, id: insertedAssistant.id } : m,
            ),
          )
          savedMsgIdRef.current = insertedAssistant.id
        })
        .catch(() => {})
    }

    // Trigger retitle after the very first assistant reply
    if (currentMessages.filter((m) => m.role === 'assistant').length === 1) {
      autoRetitle(conversationId, currentMessages)
    }
  }, [isLoading, conversationId, messages, autoRetitle, setMessages])

  // ── Send (auto-creates conversation if none selected) ────────────
  const handleSend = useCallback(
    async (text: string, uploadedAttachments?: UploadedAttachment[]) => {
      let convId = conversationId
      const trimmedText = text.trim()
      const attachments = uploadedAttachments ?? []

      const multimodalParts: ChatMultimodalPart[] = []
      if (trimmedText) {
        multimodalParts.push({ type: 'text', content: trimmedText })
      }
      for (const attachment of attachments) {
        multimodalParts.push({
          type: attachment.type.startsWith('image/') ? 'image' : 'document',
          source: {
            type: 'url',
            value: attachment.inlineUrl,
            mimeType: attachment.type,
          },
          metadata: {
            documentId: attachment.documentId,
            name: attachment.name,
            size: attachment.size,
          },
        })
      }

      const storedAttachments: StoredAttachment[] = attachments.map(
        (attachment) => ({
          documentId: attachment.documentId,
          name: attachment.name,
          type: attachment.type,
          size: attachment.size,
          url: attachment.url,
        }),
      )

      const contentToPersist = trimmedText || 'Attachment message'
      const partsToPersist: Array<Record<string, unknown>> =
        multimodalParts.length > 0
          ? multimodalParts.map(
              (part) => part as unknown as Record<string, unknown>,
            )
          : [{ type: 'text', content: contentToPersist }]

      if (!convId) {
        // Create conversation + first user message atomically.
        const result = (await createConversationAndSend({
          data: {
            content: contentToPersist,
            parts: partsToPersist,
            attachments: storedAttachments,
          },
        })) as { conversation: { id: string; title: string }; message: unknown }
        convId = result.conversation.id

        // Update local state + sidebar highlight (URL will change via onConversationCreated)
        setConversationId(convId)
        setActiveConversation(convId)

        // Pass full object so parent can optimistically prepend at top
        onConversationCreated?.({
          id: result.conversation.id,
          title: result.conversation.title,
          updatedAt: new Date(),
        })
      } else {
        await saveMessages({
          data: {
            conversationId: convId,
            messages: [
              {
                role: 'user',
                content: contentToPersist,
                parts: partsToPersist,
                attachments: storedAttachments,
              },
            ],
          },
        })
      }

      const contentForModel: string | MultimodalContent =
        multimodalParts.length <= 1 && trimmedText
          ? trimmedText
          : { content: multimodalParts as unknown as ContentPart[] }

      await sendMessage(contentForModel)
    },
    [conversationId, setActiveConversation, sendMessage, onConversationCreated],
  )

  const handleOpenAttachment = useCallback(
    async (attachment: StoredAttachment) => {
      const documentId =
        attachment.documentId ||
        (attachment.url.startsWith('document:')
          ? attachment.url.replace('document:', '')
          : null)

      if (documentId) {
        const { url } = await getPresignedViewUrl({ data: { id: documentId } })
        window.open(url, '_blank', 'noopener,noreferrer')
        return
      }

      if (attachment.url) {
        window.open(attachment.url, '_blank', 'noopener,noreferrer')
      }
    },
    [],
  )

  const lastAssistantMessage = messages
    .filter((m) => m.role === 'assistant')
    .at(-1)

  const lastAssistantText =
    lastAssistantMessage?.parts
      .filter((p) => p.type === 'text')
      .map((p) => p.content || '')
      .join('') ?? ''

  return (
    <div className="flex h-full w-full min-w-0 flex-1 flex-col">
      <ChatMessages
        messages={
          messages as unknown as Parameters<typeof ChatMessages>[0]['messages']
        }
        isLoading={isLoading || isConversationLoading}
        onToolApproval={addToolApprovalResponse}
        onOpenAttachment={handleOpenAttachment}
      />

      {/* {lastAssistantText &&
        lastAssistantMessage?.id &&
        !( isLoading || isConversationLoading ) && (
          <div className="flex justify-end px-4 pb-1">
            <TTSButton
              messageId={lastAssistantMessage.id}
              text={lastAssistantText}
            />
          </div>
        )} */}

      <ChatInput
        onSend={handleSend}
        onStop={stop}
        disabled={isLoading || isConversationLoading}
      />
    </div>
  )
}
