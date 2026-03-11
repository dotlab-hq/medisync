import { cn } from '@/lib/utils'
import {
  Bot,
  User,
  Check,
  X,
  Pill,
  Calendar,
  AlertTriangle,
} from 'lucide-react'
import ReasoningBlock from './ReasoningBlock'
import MarkdownRenderer from './MarkdownRenderer'
import MessageActions from './MessageActions'

type Attachment = {
  documentId?: string
  name: string
  type: string
  size: number
  url: string
}

type MessagePart = {
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
  state?: string
  approval?: {
    id: string
    needsApproval: boolean
    approved?: boolean
  }
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
  onToolApproval?: (response: {
    id: string
    approved: boolean
  }) => Promise<void>
  onOpenAttachment?: (attachment: Attachment) => Promise<void>
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

function extractAttachmentsFromParts(parts: MessagePart[]): Attachment[] {
  const attachments: Attachment[] = []

  for (const part of parts) {
    if (part.type !== 'document' && part.type !== 'image') continue
    if (!part.source || part.source.type !== 'url' || !part.source.value)
      continue

    const metadata =
      typeof part.metadata === 'object' && part.metadata !== null
        ? (part.metadata as Record<string, unknown>)
        : null

    const name =
      metadata && typeof metadata.name === 'string'
        ? metadata.name
        : part.type === 'image'
          ? 'Image attachment'
          : 'Document attachment'

    const size =
      metadata && typeof metadata.size === 'number' ? metadata.size : 0

    const documentId =
      metadata && typeof metadata.documentId === 'string'
        ? metadata.documentId
        : undefined

    attachments.push({
      documentId,
      name,
      type: part.source.mimeType ?? 'application/octet-stream',
      size,
      url: part.source.value,
    })
  }

  return attachments
}

function asRecord(value: unknown): Record<string, unknown> | undefined {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) {
    return undefined
  }
  return value as Record<string, unknown>
}

// Maps tool names to friendly labels + icons
const TOOL_DISPLAY: Record<
  string,
  { label: string; icon: typeof Pill; color: string }
> = {
  create_reminder: {
    label: 'Create Reminder',
    icon: Pill,
    color: 'text-blue-500',
  },
  update_reminder: {
    label: 'Update Reminder',
    icon: Pill,
    color: 'text-blue-500',
  },
  delete_reminder: {
    label: 'Delete Reminder',
    icon: Pill,
    color: 'text-red-500',
  },
  create_appointment: {
    label: 'Create Appointment',
    icon: Calendar,
    color: 'text-green-500',
  },
  update_appointment: {
    label: 'Update Appointment',
    icon: Calendar,
    color: 'text-green-500',
  },
  delete_appointment: {
    label: 'Delete Appointment',
    icon: Calendar,
    color: 'text-red-500',
  },
  send_sos_emergency: {
    label: 'SOS Emergency',
    icon: AlertTriangle,
    color: 'text-red-600',
  },
}

function ToolApprovalCard({
  toolName,
  input,
  approvalId,
  onApproval,
}: {
  toolName: string
  input?: Record<string, unknown>
  approvalId: string
  onApproval: (response: { id: string; approved: boolean }) => Promise<void>
}) {
  const display = TOOL_DISPLAY[toolName] ?? {
    label: toolName,
    icon: Pill,
    color: 'text-muted-foreground',
  }
  const Icon = display.icon
  const isSos = toolName === 'send_sos_emergency'

  return (
    <div
      className={cn(
        'rounded-xl border px-4 py-3 text-sm animate-in fade-in slide-in-from-bottom-1 duration-200',
        isSos ? 'border-red-500/40 bg-red-500/5' : 'border-border bg-card',
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        <Icon className={cn('h-4 w-4', display.color)} />
        <span className="font-medium">{display.label}</span>
        <span className="ml-auto rounded-full bg-amber-500/15 px-2 py-0.5 text-[10px] font-medium text-amber-600">
          Needs approval
        </span>
      </div>

      {/* Show key input fields */}
      {input && Object.keys(input).length > 0 && (
        <div className="mb-3 space-y-0.5 text-xs text-muted-foreground">
          {Object.entries(input)
            .filter(([, v]) => v != null && v !== '')
            .slice(0, 6)
            .map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="font-medium capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}:
                </span>
                <span className="truncate">{String(value)}</span>
              </div>
            ))}
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => onApproval({ id: approvalId, approved: true })}
          className={cn(
            'flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
            isSos
              ? 'bg-red-600 text-white hover:bg-red-700'
              : 'bg-primary text-primary-foreground hover:bg-primary/90',
          )}
        >
          <Check className="h-3.5 w-3.5" />
          {isSos ? 'Send SOS' : 'Approve'}
        </button>
        <button
          type="button"
          onClick={() => onApproval({ id: approvalId, approved: false })}
          className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent"
        >
          <X className="h-3.5 w-3.5" />
          Deny
        </button>
      </div>
    </div>
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
  onToolApproval,
  onOpenAttachment,
}: MessageBubbleProps) {
  const isUser = role === 'user'
  const isAssistant = role === 'assistant'

  // Extract text content from parts for markdown rendering
  const textContent = extractTextFromParts(parts)

  // Resolve reasoning: prefer explicit prop (from DB), fall back to thinking parts (streaming)
  const resolvedReasoning =
    reasoning ||
    parts
      .filter((p) => p.type === 'thinking')
      .map((p) => p.content || p.text || '')
      .join('\n') ||
    null

  // Collect tool-call parts
  const toolCallParts = parts
    .filter((p) => p.type === 'tool-call')
    .map((part) => ({
      ...part,
      input: asRecord(part.input),
      output: asRecord(part.output),
    }))

  // Collect tool-call parts awaiting approval
  const approvalParts = parts.filter(
    (p) =>
      p.type === 'tool-call' &&
      p.state === 'approval-requested' &&
      p.approval?.id,
  )

  const mergedAttachments = [
    ...(attachments ?? []),
    ...extractAttachmentsFromParts(parts),
  ]

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
        {/* Reasoning + tool calls block (assistant only) */}
        {isAssistant && (resolvedReasoning || toolCallParts.length > 0) && (
          <ReasoningBlock
            reasoning={resolvedReasoning}
            toolCalls={toolCallParts}
          />
        )}

        {/* Tool approval cards */}
        {isAssistant && approvalParts.length > 0 && onToolApproval && (
          <div className="flex flex-col gap-2">
            {approvalParts.map((part) => (
              <ToolApprovalCard
                key={part.approval!.id}
                toolName={part.name ?? 'Unknown tool'}
                input={asRecord(part.input)}
                approvalId={part.approval!.id}
                onApproval={onToolApproval}
              />
            ))}
          </div>
        )}

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

        {/* Attachments */}
        {mergedAttachments.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {mergedAttachments.map((att, idx) => {
              return (
                <button
                  type="button"
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors w-44"
                  onClick={() => {
                    if (onOpenAttachment) {
                      void onOpenAttachment(att)
                      return
                    }
                    window.open(att.url, '_blank', 'noopener,noreferrer')
                  }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium truncate text-foreground">
                      {att.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatFileSize(att.size)}
                    </p>
                  </div>
                </button>
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
