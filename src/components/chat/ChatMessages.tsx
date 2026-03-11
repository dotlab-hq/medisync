import { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Bot } from 'lucide-react'

type Attachment = {
  documentId?: string
  name: string
  type: string
  size: number
  url: string
}

type UIMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  parts: Array<{
    type: string
    content?: string
    text?: string
    source?: {
      type: string
      value: string
      mimeType?: string
    }
    metadata?: unknown
    name?: string
    input?: unknown
    output?: unknown
  }>
  reasoning?: string | null
  attachments?: Attachment[] | null
  inputTokens?: number | null
  outputTokens?: number | null
  modelUsed?: string | null
}

type ChatMessagesProps = {
  messages: UIMessage[]
  isLoading: boolean
  onToolApproval?: (response: {
    id: string
    approved: boolean
  }) => Promise<void>
  onOpenAttachment?: (attachment: Attachment) => Promise<void>
}

export default function ChatMessages({
  messages,
  isLoading,
  onToolApproval,
  onOpenAttachment,
}: ChatMessagesProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <ScrollArea className="flex-1">
      {messages.length === 0 && !isLoading && (
        <div className="flex h-full min-h-[40vh] flex-col items-center justify-center gap-3 text-muted-foreground">
          <Bot className="h-12 w-12 opacity-30" />
          <p className="text-sm">Start a conversation with MediSync AI</p>
        </div>
      )}

      {messages.map((msg, index) => {
        // Only hide actions for the last assistant message if still streaming
        const isLastAssistantMsg =
          msg.role === 'assistant' && index === messages.length - 1 && isLoading

        const attachments =
          'attachments' in msg
            ? ((msg as UIMessage & { attachments?: Attachment[] | null })
                .attachments ?? undefined)
            : undefined

        return (
          <MessageBubble
            key={msg.id}
            messageId={msg.id}
            role={msg.role}
            reasoning={msg.reasoning}
            attachments={attachments}
            inputTokens={msg.inputTokens}
            outputTokens={msg.outputTokens}
            modelUsed={msg.modelUsed}
            parts={msg.parts}
            isStreaming={isLastAssistantMsg}
            onToolApproval={onToolApproval}
            onOpenAttachment={onOpenAttachment}
          />
        )
      })}

      {isLoading && (
        <div className="flex gap-3 px-4 py-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
            <Bot className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </ScrollArea>
  )
}
