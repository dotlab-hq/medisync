import { useEffect, useRef, useState } from 'react'
import { useChatTextareaStore } from '../stores/useChatTextarea'

export interface UseChatTextareaConfig {
  lineHeight: number
  maxLines: number
}

export function useChatTextarea({
  lineHeight,
  maxLines,
}: UseChatTextareaConfig) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const { text, setText } = useChatTextareaStore()
  const [value, setValue] = useState(text)
  const [isMultiline, setIsMultiline] = useState(false)

  const maxHeight = lineHeight * maxLines
  const prevIsMultiline = useRef(isMultiline)

  function handleInput(e: React.FormEvent<HTMLTextAreaElement>) {
    const textarea = textareaRef.current
    if (!textarea) return

    const nextValue = (e.target as HTMLTextAreaElement).value
    setValue(nextValue)
    setText(nextValue)

    // Reset height to auto to get accurate scrollHeight
    textarea.style.height = 'auto'

    const scrollHeight = textarea.scrollHeight
    const hasContent = nextValue.length > 0
    const hasNewline = nextValue.includes('\n')
    const wrappedToNextLine = scrollHeight > lineHeight

    // Should be multiline if there's content AND (newline OR wrapped text)
    const shouldBeMultiline = hasContent && (hasNewline || wrappedToNextLine)
    setIsMultiline(shouldBeMultiline)

    // Calculate next height
    const nextHeight = shouldBeMultiline
      ? Math.min(scrollHeight, maxHeight)
      : lineHeight

    textarea.style.height = `${nextHeight}px`
  }

  // Reset when value is cleared
  useEffect(() => {
    if (value === '' && textareaRef.current) {
      textareaRef.current.style.height = `${lineHeight}px`
      setIsMultiline(false)
    }
  }, [value, lineHeight])

  // Refocus and move cursor to end when switching to multiline
  useEffect(() => {
    if (isMultiline && !prevIsMultiline.current && textareaRef.current) {
      const el = textareaRef.current
      el.focus()
      el.selectionStart = el.selectionEnd = el.value.length
    }
    prevIsMultiline.current = isMultiline
  }, [isMultiline])

  return {
    textareaRef,
    value,
    isMultiline,
    lineHeight,
    maxHeight,
    handleInput,
  }
}
