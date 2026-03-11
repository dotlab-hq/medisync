import { cn } from '@/lib/utils'

interface ChatTextareaProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>
  value: string
  lineHeight: number
  onInput: (e: React.FormEvent<HTMLTextAreaElement>) => void
  disabled?: boolean
  placeholder?: string
}

export function ChatTextarea({
  textareaRef,
  value,
  lineHeight,
  onInput,
  disabled,
  placeholder = 'Send a message...',
}: ChatTextareaProps) {
  return (
    <textarea
      ref={textareaRef}
      value={value}
      placeholder={placeholder}
      onInput={onInput}
      disabled={disabled}
      className={cn(
        'w-full bg-transparent resize-none',
        'text-foreground placeholder:text-muted-foreground',
        'focus:outline-none',
        'transition-[height] duration-200 ease-in-out',
        'p-0',
      )}
      data-line-height={lineHeight}
    />
  )
}
