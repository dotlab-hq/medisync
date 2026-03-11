import { ChevronRight, Brain, Wrench } from 'lucide-react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

type ToolCallPart = {
  name?: string
  input?: Record<string, unknown>
  output?: Record<string, unknown>
}

type ReasoningBlockProps = {
  reasoning?: string | null
  toolCalls?: ToolCallPart[]
  className?: string
}

export default function ReasoningBlock({
  reasoning,
  toolCalls,
  className,
}: ReasoningBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const hasToolCalls = toolCalls && toolCalls.length > 0
  const hasContent = reasoning || hasToolCalls

  // Generate a smart summary from the reasoning
  const summary = useMemo(() => {
    if (!reasoning) return ''
    const sentences = reasoning.split(/[.!?]\s+/)
    const firstSentence = sentences[0]?.trim() || ''
    if (firstSentence.length > 80) {
      return firstSentence.substring(0, 77) + '...'
    }
    return firstSentence + (sentences.length > 1 ? '...' : '')
  }, [reasoning])

  if (!hasContent) return null

  return (
    <div
      className={cn(
        'rounded-lg border border-purple-200/50 dark:border-purple-800/50 bg-purple-50/50 dark:bg-purple-950/30 overflow-hidden',
        className,
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={cn(
          'flex items-center gap-2 w-full px-3 py-2 text-left',
          'text-sm font-medium text-purple-700 dark:text-purple-300',
          'hover:bg-purple-100/50 dark:hover:bg-purple-900/30 transition-colors',
        )}
      >
        <ChevronRight
          className={cn(
            'h-4 w-4 transition-transform duration-200',
            isExpanded && 'rotate-90',
          )}
        />
        <Brain className="h-4 w-4" />
        <span className="font-semibold">Thinking</span>
        {hasToolCalls && !isExpanded && (
          <span className="inline-flex items-center gap-1 text-xs text-purple-600 dark:text-purple-400 ml-1">
            <Wrench className="h-3 w-3" />
            {toolCalls.length} tool{toolCalls.length > 1 ? 's' : ''}
          </span>
        )}
        {!isExpanded && summary && (
          <span className="text-xs text-purple-600/70 dark:text-purple-400/70 ml-2 truncate flex-1">
            {summary}
          </span>
        )}
      </button>

      <div
        className={cn(
          'grid transition-all duration-200 ease-in-out',
          isExpanded
            ? 'grid-rows-[1fr] opacity-100'
            : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="border-t border-purple-200/30 dark:border-purple-800/30">
            {/* Tool calls section */}
            {hasToolCalls && (
              <div className="px-3 pt-2 pb-1 flex flex-col gap-1.5">
                {toolCalls.map((tc, idx) => (
                  <div
                    key={idx}
                    className="rounded-md border border-purple-300/40 dark:border-purple-700/40 bg-purple-100/40 dark:bg-purple-900/20 px-2.5 py-1.5 text-xs"
                  >
                    <div className="flex items-center gap-1.5 font-mono text-purple-700 dark:text-purple-300 font-medium">
                      <Wrench className="h-3 w-3 shrink-0" />
                      {tc.name}
                    </div>
                    {tc.output && (
                      <div className="mt-1 text-purple-800/80 dark:text-purple-200/80">
                        <ToolOutput output={tc.output} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Thinking text */}
            {reasoning && (
              <div className="px-3 pb-3 pt-1 text-sm text-purple-900 dark:text-purple-100 whitespace-pre-wrap leading-relaxed">
                {reasoning}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

function ToolOutput({ output }: { output: Record<string, unknown> }) {
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
      <ul className="list-inside list-disc">
        {(output.files as Array<{ id: string; fileName: string }>).map((f) => (
          <li key={f.id}>{f.fileName}</li>
        ))}
      </ul>
    )
  }
  return (
    <pre className="whitespace-pre-wrap text-xs">
      {JSON.stringify(output, null, 2)}
    </pre>
  )
}
