import { ArrowUp, Paperclip, Square } from 'lucide-react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import { useMicDictateStore } from './stores/useMicDictate'
import { ChatTextarea } from './input/ChatTextarea'
import { InputUploadFiles } from './input/InputUploadFiles'
import { RecordingInterface } from './input/RecordingInterface'
import { MicButton } from './input/MicButton'
import { useChatTextarea } from './hooks/useChatTextarea'
import { useChatTextareaStore } from './stores/useChatTextarea'
import { useAttachmentUpload } from './input/useAttachmentUpload'
import type { UploadedAttachment } from './input/attachment-types'

type ChatInputProps = {
  onSend: (
    text: string,
    attachments?: UploadedAttachment[],
  ) => Promise<void> | void
  onStop?: () => void
  disabled?: boolean
  placeholder?: string
}

export default function ChatInput({
  onSend,
  onStop,
  disabled,
  placeholder,
}: ChatInputProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const { textareaRef, value, lineHeight, handleInput, clear } =
    useChatTextarea({
      lineHeight: 24,
      maxLines: 7,
    })
  const { setText } = useChatTextareaStore()
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const { isRecording } = useMicDictateStore()
  const {
    items,
    hasFiles,
    isUploading,
    addFilesAndUpload,
    removeFile,
    clearFiles,
    getUploadedAttachments,
  } = useAttachmentUpload()

  const hasUploadedAttachments = useMemo(
    () => items.some((item) => item.status === 'uploaded'),
    [items],
  )
  const canSubmit = value.trim().length > 0 || hasUploadedAttachments
  const isSendDisabled = Boolean(disabled) || isUploading || !canSubmit

  const handleSend = useCallback(async () => {
    const text = value.trim()
    if ((!text && !hasFiles) || disabled || isUploading) return

    const uploadedAttachments = getUploadedAttachments()
    if (!text && uploadedAttachments.length === 0) return

    await onSend(
      text,
      uploadedAttachments.length > 0 ? uploadedAttachments : undefined,
    )

    clear()
    clearFiles()
  }, [
    value,
    hasFiles,
    disabled,
    isUploading,
    getUploadedAttachments,
    onSend,
    clear,
    clearFiles,
  ])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        if (disabled || isUploading) return
        e.preventDefault()
        void handleSend()
      }
    },
    [disabled, isUploading, handleSend],
  )

  // Attach keydown to textarea
  useEffect(() => {
    const textarea = textareaRef.current
    if (!textarea) return
    textarea.addEventListener('keydown', handleKeyDown)
    return () => textarea.removeEventListener('keydown', handleKeyDown)
  }, [textareaRef, handleKeyDown])

  const handleFileSelect = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = Array.from(e.target.files || [])
      void addFilesAndUpload(selectedFiles)
      if (fileInputRef.current) fileInputRef.current.value = ''
    },
    [addFilesAndUpload],
  )

  const handleDragOver = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      if (event.dataTransfer.items.length > 0) {
        setIsDragOver(true)
      }
    },
    [],
  )

  const handleDragLeave = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragOver(false)
    },
    [],
  )

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault()
      event.stopPropagation()
      setIsDragOver(false)
      const droppedFiles = Array.from(event.dataTransfer.files)
      if (droppedFiles.length > 0) {
        void addFilesAndUpload(droppedFiles)
      }
    },
    [addFilesAndUpload],
  )

  const handleTranscribed = useCallback(
    (transcribedText: string) => {
      // Read latest store value directly — this callback fires while textarea
      // is unmounted (recording still active), so React hook state may be stale
      const current = useChatTextareaStore.getState().text
      const newValue = current
        ? `${current} ${transcribedText}`
        : transcribedText
      // Update store — textarea will pick up the new value via useChatTextarea hook
      // when it re-renders after recording interface closes (isRecording → false)
      setText(newValue)
    },
    [setText],
  )

  return (
    <div className="border-t border-border/50 bg-background p-3">
      <div className="mx-auto w-full max-w-3xl">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            'flex flex-col',
            'border bg-card',
            'rounded-2xl px-2',
            'w-full',
            isDragOver ? 'border-primary bg-primary/5' : 'border-border',
          )}
        >
          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
            aria-label="Upload files"
          />

          {/* Uploaded files preview */}
          {!isRecording && (
            <InputUploadFiles items={items} onRemove={removeFile} />
          )}

          <div
            className={cn(
              'w-full transition-all duration-200',
              'py-3 flex flex-col gap-3 px-4',
            )}
          >
            {/* Recording UI */}
            {isRecording ? (
              <RecordingInterface onTranscribed={handleTranscribed} />
            ) : (
              <>
                {/* Textarea */}
                <ChatTextarea
                  textareaRef={textareaRef}
                  value={value}
                  lineHeight={lineHeight}
                  onInput={handleInput}
                  disabled={disabled}
                  placeholder={placeholder || 'Ask MediSync AI anything...'}
                />

                {/* Action bar */}
                <div className="flex items-center justify-between w-full">
                  {/* Left: file attach */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleFileSelect}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                        'text-muted-foreground hover:text-foreground hover:bg-muted',
                      )}
                      title="Attach files"
                      disabled={disabled || isUploading}
                    >
                      <Paperclip className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Right: mic + send */}
                  <div className="flex items-center gap-2">
                    <button
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                        'text-muted-foreground hover:text-foreground',
                      )}
                      title="Voice input"
                      disabled={disabled}
                    >
                      <MicButton />
                    </button>

                    <button
                      onClick={disabled ? onStop : () => void handleSend()}
                      disabled={isSendDisabled}
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full transition-colors',
                        disabled
                          ? 'bg-destructive text-destructive-foreground hover:opacity-90'
                          : canSubmit
                            ? 'bg-primary text-primary-foreground hover:opacity-90'
                            : 'bg-muted text-muted-foreground cursor-not-allowed',
                      )}
                      title={disabled ? 'Stop' : 'Send message'}
                    >
                      {disabled ? (
                        <Square className="h-3 w-3 fill-current" />
                      ) : (
                        <ArrowUp className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
          MediSync AI can make mistakes. Always consult a healthcare
          professional.
        </p>
      </div>
    </div>
  )
}
