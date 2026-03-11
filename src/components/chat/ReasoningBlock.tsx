import { ChevronRight, Brain } from 'lucide-react'
import { useState, useMemo } from 'react'
import { cn } from '@/lib/utils'

type ReasoningBlockProps = {
  reasoning: string
  className?: string
}

export default function ReasoningBlock({
  reasoning,
  className,
}: ReasoningBlockProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  // Generate a smart summary from the reasoning
  const summary = useMemo(() => {
    if (!reasoning) return ''

    // Extract first meaningful sentence or first 80 chars
    const sentences = reasoning.split(/[.!?]\s+/)
    const firstSentence = sentences[0]?.trim() || ''

    if (firstSentence.length > 80) {
      return firstSentence.substring(0, 77) + '...'
    }

    return firstSentence + (sentences.length > 1 ? '...' : '')
  }, [reasoning])

  if (!reasoning) return null

  return (
    <div
      className={cn(
        'rounded-lg border border-purple-200/50 dark:border-purple-800/50 bg-purple-50/30 dark:bg-purple-950/20 overflow-hidden',
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
        <span className="font-semibold">AI Reasoning</span>
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
          <div className="px-3 pb-3 pt-1 text-sm text-purple-900/80 dark:text-purple-100/80 whitespace-pre-wrap border-t border-purple-200/30 dark:border-purple-800/30">
            {reasoning}
          </div>
        </div>
      </div>
    </div>
  )
}
