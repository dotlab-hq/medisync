import { cn } from '@/lib/utils'
import { Bot, User } from 'lucide-react'
import ReasoningBlock from './ReasoningBlock'
import MarkdownRenderer from './MarkdownRenderer'
import MessageActions from './MessageActions'

type Attachment = {
  name: string
  type: string
  size: number
  url: string
}

type MessagePart = {
  type: string
  content?: string
  text?: string
  name?: string
  input?: Record<string, unknown>
  output?: Record<string, unknown>
}

type MessageBubbleProps = {
  messageId?: string
  role: 'user' | 'assistant' | 'system'
  reasoning?: string | null
  attachments?: Attachment[] | null
  inputTokens?: number | null
  outputTokens?: number | null
  modelUsed?: string | null
  parts: MessagePart[]
  isStreaming?: boolean
}

function formatFileSize(bytes: number): string {
  const units = ['B', 'KB', 'MB', 'GB']
  let size = bytes
  let idx = 0
  while (size >= 1024 && idx < units.length - 1) {
    size /= 1024
    idx++
  }
  return `${size.toFixed(1)} ${units[idx]}`
}

// Helper function to extract text from parts
function extractTextFromParts(parts: MessagePart[]): string {
  return parts
    .filter((p) => p.type === 'text')
    .map((p) => p.content || p.text || '')
    .join('')
}

// Helper to render tool outputs
function renderToolOutput(output: Record<string, unknown>) {
  if ('url' in output && 'fileName' in output) {
    return (
      <a
        href={output.url as string}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline"
      >
        📎 {output.fileName as string}
      </a>
    )
  }
  if ('files' in output && Array.isArray(output.files)) {
    return (
      <ul className="list-inside list-disc space-y-0.5">
        {(output.files as Array<{ id: string; fileName: string }>).map((f) => (
          <li key={f.id}>{f.fileName}</li>
        ))}
      </ul>
    )
  }
  return (
    <pre className="whitespace-pre-wrap">{JSON.stringify(output, null, 2)}</pre>
  )
}

export default function MessageBubble({
  messageId,
  role,
  reasoning,
  attachments,
  inputTokens,
  outputTokens,
  modelUsed,
  parts,
  isStreaming = false,
}: MessageBubbleProps) {
  const isUser = role === 'user'
  const isAssistant = role === 'assistant'

  // Extract text content from parts for markdown rendering
  const textContent = extractTextFromParts(parts)

  return (
    <div
      className={cn(
        'flex gap-3 px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300',
        isUser ? 'flex-row-reverse' : 'flex-row',
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full',
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-linear-to-br from-purple-500 to-pink-500 text-white',
        )}
      >
        {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
      </div>

      {/* Content column */}
      <div
        className={cn('flex flex-col gap-2 max-w-[75%]', isUser && 'items-end')}
      >
        {/* Reasoning block (assistant only) */}
        {isAssistant && reasoning && <ReasoningBlock reasoning={reasoning} />}

        {/* Bubble */}
        <div
          className={cn(
            'rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
            isUser
              ? 'bg-primary text-primary-foreground rounded-br-sm'
              : 'bg-card border border-border rounded-bl-sm',
          )}
        >
          {isAssistant ? (
            <MarkdownRenderer content={textContent} />
          ) : (
            <div className="whitespace-pre-wrap">{textContent}</div>
          )}
        </div>

        {/* Tool calls (assistant only) */}
        {isAssistant && parts.some((p) => p.type === 'tool-call') && (
          <div className="flex flex-col gap-2">
            {parts
              .filter((p) => p.type === 'tool-call')
              .map((part, idx) => (
                <div
                  key={idx}
                  className="rounded-md border border-border/50 bg-background/50 px-3 py-2 text-xs"
                >
                  <span className="font-mono text-muted-foreground">
                    🔧 {part.name}
                  </span>
                  {part.output && (
                    <div className="mt-1">{renderToolOutput(part.output)}</div>
                  )}
                </div>
              ))}
          </div>
        )}

        {/* Attachments */}
        {attachments && attachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {attachments.map((att, idx) => {
              const isImage = att.type.startsWith('image/')
              if (isImage) {
                return (
                  <a
                    key={idx}
                    href={att.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={att.url}
                      alt={att.name}
                      className="max-w-50 max-h-50 rounded-lg border border-border object-cover"
                    />
                  </a>
                )
              }
              return (
                <a
                  key={idx}
                  href={att.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors w-44"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate text-foreground">
                      {att.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(att.size)}
                    </p>
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* Token usage (subtle) */}
        {isAssistant && (inputTokens || outputTokens) && (
          <div className="flex gap-3 text-[10px] text-muted-foreground/50 px-1">
            {inputTokens && <span>{inputTokens} in</span>}
            {outputTokens && <span>{outputTokens} out</span>}
            {modelUsed && <span>{modelUsed}</span>}
          </div>
        )}

        {/* Message actions for assistant messages */}
        {isAssistant && messageId && !isStreaming && (
          <MessageActions messageId={messageId} content={textContent} />
        )}
      </div>
    </div>
  )
}
