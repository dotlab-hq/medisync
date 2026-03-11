import { X } from 'lucide-react'
import { useFileStore } from '../stores/useFileStore'
import { cn } from '@/lib/utils'

export function InputUploadFiles() {
  const files = useFileStore((state) => state.files)
  const removeFile = useFileStore((state) => state.removeFile)

  if (files.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 pt-3 px-4">
      {files.map((file, idx) => (
        <div
          key={`${file.name}-${idx}`}
          className={cn(
            'flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs',
            'border border-border/50',
          )}
        >
          <span className="truncate max-w-[150px]">{file.name}</span>
          <button
            onClick={() => removeFile(file)}
            className="shrink-0 rounded-full p-0.5 hover:bg-background/80 transition-colors"
            title="Remove file"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
    </div>
  )
}
