import { Check, FileText, Loader2, TriangleAlert, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import type { AttachmentQueueItem } from './attachment-types'

type InputUploadFilesProps = {
  items: AttachmentQueueItem[]
  onRemove: (id: string) => void
}

function ProgressCircle({
  progress,
  status,
}: {
  progress: number
  status: AttachmentQueueItem['status']
}) {
  if (status === 'uploaded') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/15 text-primary">
        <Check className="h-4 w-4" />
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-destructive/15 text-destructive">
        <TriangleAlert className="h-4 w-4" />
      </div>
    )
  }

  const safeProgress = Math.max(0, Math.min(progress, 100))
  const radius = 13
  const circumference = 2 * Math.PI * radius
  const strokeOffset = circumference - (safeProgress / 100) * circumference

  return (
    <div className="relative h-8 w-8" aria-label={`${safeProgress}% uploaded`}>
      <svg className="h-8 w-8 -rotate-90" viewBox="0 0 32 32" aria-hidden>
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="3"
        />
        <circle
          cx="16"
          cy="16"
          r={radius}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={strokeOffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0.75 flex items-center justify-center rounded-full bg-card">
        {status === 'uploading' ? (
          <Loader2 className="h-3.5 w-3.5 animate-spin text-primary" />
        ) : (
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
        )}
      </div>
    </div>
  )
}

function getSubtitle(item: AttachmentQueueItem): string {
  if (item.status === 'uploaded') return 'Uploaded'
  if (item.status === 'uploading') return `${item.progress}%`
  if (item.status === 'error') return item.error ?? 'Upload failed'
  return 'Uploading...'
}

export function InputUploadFiles({ items, onRemove }: InputUploadFilesProps) {
  const files = items

  if (files.length === 0) return null

  return (
    <ScrollArea className="w-full px-4 pt-3" type="always">
      <div className="flex min-w-max gap-2 pb-2">
        {files.map((item) => (
          <div
            key={item.id}
            className={cn(
              'flex min-w-55 items-center gap-2 rounded-xl border px-3 py-2',
              item.status === 'error'
                ? 'border-destructive/40 bg-destructive/5'
                : 'border-border/50 bg-muted/40',
            )}
          >
            <ProgressCircle progress={item.progress} status={item.status} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{item.file.name}</p>
              <p className="truncate text-xs text-muted-foreground">
                {getSubtitle(item)}
              </p>
            </div>
            <button
              onClick={() => onRemove(item.id)}
              className="shrink-0 rounded-full p-1 transition-colors hover:bg-background/80"
              title="Remove file"
              disabled={item.status === 'uploading'}
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
