import { useState } from 'react'
import { ThumbsUp, ThumbsDown, Volume2, Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { setMessageFeedback } from '@/server/chat'

type MessageActionsProps = {
  messageId?: string
  content: string
}

export default function MessageActions({
  messageId,
  content,
}: MessageActionsProps) {
  const [liked, setLiked] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const handleLike = async () => {
    if (!messageId) return
    const next = liked === true ? null : true
    setLiked(next)
    try {
      await setMessageFeedback({
        data: { messageId, feedback: next ? 'LIKED' : null },
      })
    } catch (err) {
      setLiked(liked)
      console.error('Failed to save like feedback:', err)
    }
  }

  const handleDislike = async () => {
    if (!messageId) return
    const next = liked === false ? null : false
    setLiked(next)
    try {
      await setMessageFeedback({
        data: { messageId, feedback: next === false ? 'DISLIKED' : null },
      })
    } catch (err) {
      setLiked(liked)
      console.error('Failed to save dislike feedback:', err)
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  const handleReadAloud = () => {
    // Stop any ongoing speech
    if (isSpeaking) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
      return
    }

    // Create and speak the utterance
    const utterance = new SpeechSynthesisUtterance(content)
    utterance.rate = 0.9
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  return (
    <div className="flex items-center gap-1 mt-2">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-7 w-7 p-0',
          liked === true && 'text-primary bg-primary/10',
        )}
        onClick={handleLike}
        title="Like response"
      >
        <ThumbsUp className="h-3.5 w-3.5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-7 w-7 p-0',
          liked === false && 'text-destructive bg-destructive/10',
        )}
        onClick={handleDislike}
        title="Dislike response"
      >
        <ThumbsDown className="h-3.5 w-3.5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'h-7 w-7 p-0',
          isSpeaking && 'text-primary bg-primary/10',
        )}
        onClick={handleReadAloud}
        title={isSpeaking ? 'Stop reading' : 'Read aloud'}
      >
        <Volume2 className="h-3.5 w-3.5" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7 p-0"
        onClick={handleCopy}
        title="Copy response"
      >
        {copied ? (
          <Check className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Copy className="h-3.5 w-3.5" />
        )}
      </Button>
    </div>
  )
}
