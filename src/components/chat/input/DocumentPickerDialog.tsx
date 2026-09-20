import { useEffect, useState } from 'react'
import { Check, FileText, Search } from 'lucide-react'
import { listAllDocuments } from '@/server/documents'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { formatBytes } from '@/lib/utils'

export type SelectableDocument = {
  id: string
  fileName: string
  fileType: string
  fileSize: number
}

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelect: (documents: SelectableDocument[]) => void
}

export function DocumentPickerDialog({ open, onOpenChange, onSelect }: Props) {
  const [documents, setDocuments] = useState<SelectableDocument[]>([])
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!open) return
    setLoading(true)
    listAllDocuments()
      .then((items) => setDocuments(items))
      .finally(() => setLoading(false))
  }, [open])

  const filtered = documents.filter((document) =>
    document.fileName.toLowerCase().includes(query.trim().toLowerCase()),
  )

  const toggle = (id: string) => {
    setSelectedIds((current) => {
      const next = new Set(current)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const confirm = () => {
    onSelect(documents.filter((document) => selectedIds.has(document.id)))
    setSelectedIds(new Set())
    setQuery('')
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Choose from Documents</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search documents…"
            className="pl-9"
          />
        </div>
        <div className="max-h-80 space-y-1 overflow-y-auto border p-1">
          {loading ? (
            Array.from({ length: 4 }, (_, index) => (
              <Skeleton key={index} className="h-14 w-full" />
            ))
          ) : filtered.length === 0 ? (
            <p className="p-8 text-center text-sm text-muted-foreground">
              No documents found.
            </p>
          ) : (
            filtered.map((document) => {
              const selected = selectedIds.has(document.id)
              return (
                <button
                  key={document.id}
                  type="button"
                  onClick={() => toggle(document.id)}
                  className={cn(
                    'flex w-full items-center gap-3 border border-transparent p-3 text-left transition-colors hover:bg-muted',
                    selected && 'border-foreground/20 bg-muted',
                  )}
                >
                  <FileText className="h-5 w-5 shrink-0 text-muted-foreground" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {document.fileName}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {formatBytes(document.fileSize)}
                    </span>
                  </span>
                  <span className="flex h-5 w-5 items-center justify-center border">
                    {selected ? <Check className="h-3.5 w-3.5" /> : null}
                  </span>
                </button>
              )
            })
          )}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button disabled={selectedIds.size === 0} onClick={confirm}>
            Attach {selectedIds.size > 0 ? selectedIds.size : ''}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
