import { useCallback, useEffect, useRef, useState } from 'react'
import { useChat, fetchServerSentEvents } from '@tanstack/ai-react'
import type { StreamChunk } from '@tanstack/ai'
import { clientTools } from '@tanstack/ai-client'
import { getUserLocationTool } from '@/components/chat/client-tools'
import {
  createConversationAndSend,
  getConversation,
  renameConversation,
  saveMessages,
} from '@/server/chat'
import { retitleConversation } from '@/server/chat-retitle'
import type { DbMessage } from '@/components/chat/v2/types'

type TokenUsage = {
  promptTokens?: number
  completionTokens?: number
  model?: string
}

type NewConversation = { id: string; title: string; updatedAt: Date }

type Props = {
  initialChatId?: string
  resetSignal?: number
  onConversationCreated?: (conversation: NewConversation) => void
  onTitleUpdated?: (id: string, title: string) => void
}

function textFromParts(
  parts: Array<{ type: string; content?: string; text?: string }>,
): string {
  return parts
    .filter((part) => part.type === 'text')
    .map((part) => part.content || part.text || '')
    .join('')
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

export function useChatRuntime({
  initialChatId,
  resetSignal = 0,
  onConversationCreated,
  onTitleUpdated,
}: Props) {
  const [conversationId, setConversationId] = useState<string | null>(
    initialChatId ?? null,
  )
  const savedAssistantRef = useRef<string | null>(null)
  const loadedIdRef = useRef<string | null>(null)
  const requestRef = useRef(0)
  const retitledRef = useRef<Set<string>>(new Set())
  const usageRef = useRef<TokenUsage>({})

  const { messages, setMessages, sendMessage, isLoading, stop } = useChat({
    connection: fetchServerSentEvents('/api/chat'),
    tools: clientTools(getUserLocationTool),
    onChunk(chunk: StreamChunk) {
      if ('model' in chunk && chunk.model) usageRef.current.model = chunk.model
      if (chunk.type === 'RUN_FINISHED' && chunk.usage) {
        usageRef.current.promptTokens = chunk.usage.promptTokens
        usageRef.current.completionTokens = chunk.usage.completionTokens
      }
    },
  })

  const loadConversation = useCallback(
    async (id: string) => {
      const requestId = ++requestRef.current
      try {
        const payload = await getConversation({ data: { id } })
        if (requestRef.current !== requestId) return

        const dbMessages = payload.messages as DbMessage[]
        const next = dbMessages.map((message) => {
          const parts =
            message.parts.length > 0
              ? message.parts.map(normalizeTextPart)
              : [
                  {
                    type: 'text',
                    content: message.content,
                    text: message.content,
                  },
                ]
          return {
            id: message.id,
            role: message.role,
            content:
              textFromParts(
                parts as Array<{
                  type: string
                  content?: string
                  text?: string
                }>,
              ) || message.content,
            parts,
          }
        })
        setMessages(next as unknown as Parameters<typeof setMessages>[0])
        savedAssistantRef.current = null
      } catch {
        if (requestRef.current !== requestId) return
        setMessages([])
      }
    },
    [setMessages],
  )

  useEffect(() => {
    setConversationId(initialChatId ?? null)
    if (!initialChatId) {
      loadedIdRef.current = null
      setMessages([])
      return
    }
    if (loadedIdRef.current === initialChatId) return
    loadedIdRef.current = initialChatId
    void loadConversation(initialChatId)
  }, [initialChatId, loadConversation, setMessages])

  useEffect(() => {
    if (resetSignal === 0) return
    setConversationId(null)
    loadedIdRef.current = null
    setMessages([])
  }, [resetSignal, setMessages])

  useEffect(() => {
    if (isLoading || !conversationId || messages.length === 0) return
    const last = messages[messages.length - 1]
    if (last.role !== 'assistant' || savedAssistantRef.current === last.id)
      return
    savedAssistantRef.current = last.id

    const usage = usageRef.current
    usageRef.current = {}

    void saveMessages({
      data: {
        conversationId,
        messages: [
          {
            role: 'assistant',
            content: textFromParts(last.parts),
            parts: last.parts as Array<Record<string, unknown>>,
            inputTokens: usage.promptTokens ?? null,
            outputTokens: usage.completionTokens ?? null,
            modelUsed: usage.model ?? null,
          },
        ],
      },
    })

    const assistantTurns = messages.filter(
      (message) => message.role === 'assistant',
    ).length
    if (assistantTurns === 1 && !retitledRef.current.has(conversationId)) {
      retitledRef.current.add(conversationId)
      const plain = messages.map((message) => ({
        role: message.role,
        content: textFromParts(message.parts),
      }))
      void retitleConversation({ data: { messages: plain } }).then(
        async ({ title }) => {
          if (title && title !== 'New Chat') {
            await renameConversation({ data: { id: conversationId, title } })
            onTitleUpdated?.(conversationId, title)
          }
        },
      )
    }
  }, [conversationId, isLoading, messages, onTitleUpdated])

  const send = useCallback(
    async (text: string) => {
      const trimmed = text.trim()
      if (!trimmed) return

      let nextConversationId = conversationId
      if (!nextConversationId) {
        const result = await createConversationAndSend({
          data: {
            content: trimmed,
            parts: [{ type: 'text', content: trimmed }],
          },
        })
        nextConversationId = result.conversation.id
        setConversationId(nextConversationId)
        onConversationCreated?.({
          id: result.conversation.id,
          title: result.conversation.title,
          updatedAt: new Date(),
        })
      } else {
        await saveMessages({
          data: {
            conversationId: nextConversationId,
            messages: [
              {
                role: 'user',
                content: trimmed,
                parts: [{ type: 'text', content: trimmed }],
              },
            ],
          },
        })
      }

      await sendMessage(trimmed)
    },
    [conversationId, onConversationCreated, sendMessage],
  )

  return { messages, isLoading, stop, send }
}
