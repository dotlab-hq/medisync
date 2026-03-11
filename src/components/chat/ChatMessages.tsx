import { useRef, useEffect } from 'react'
import MessageBubble from './MessageBubble'
import { Skeleton } from '@/components/ui/skeleton'
import { Bot } from 'lucide-react'

type Attachment = {
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
    name?: string
    input?: Record<string, unknown>
    output?: Record<string, unknown>
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
  onToolApproval?: ( response: { id: string; approved: boolean } ) => Promise<void>
}

export default function ChatMessages( {
  messages,
  isLoading,
  onToolApproval,
}: ChatMessagesProps ) {
  const bottomRef = useRef<HTMLDivElement>( null )

  useEffect( () => {
    bottomRef.current?.scrollIntoView( { behavior: 'smooth' } )
  }, [messages, isLoading] )

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.length === 0 && !isLoading && (
        <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
          <Bot className="h-12 w-12 opacity-30" />
          <p className="text-sm">Start a conversation with MediSync AI</p>
        </div>
      )}

      {messages.map( ( msg, index ) => {
        // Only hide actions for the last assistant message if still streaming
        const isLastAssistantMsg =
          msg.role === 'assistant' && index === messages.length - 1 && isLoading

        return (
          <MessageBubble
            key={msg.id}
            messageId={msg.id}
            role={msg.role}
            reasoning={msg.reasoning}
            attachments={msg.attachments}
            inputTokens={msg.inputTokens}
            outputTokens={msg.outputTokens}
            modelUsed={msg.modelUsed}
            parts={msg.parts}
            isStreaming={isLastAssistantMsg} onToolApproval={onToolApproval} />
        )
      } )}

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
    </div>
  )
}
