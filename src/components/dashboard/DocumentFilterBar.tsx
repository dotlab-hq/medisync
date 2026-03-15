import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Filter, X } from 'lucide-react'

interface DocumentFilterBarProps {
  allLabels: string[]
  activeLabels: string[]
  onToggle: (label: string) => void
  onClear: () => void
}

export function DocumentFilterBar({
  allLabels,
  activeLabels,
  onToggle,
  onClear,
}: DocumentFilterBarProps) {
  if (allLabels.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-xs text-muted-foreground">Filter by label:</span>
      {allLabels.map((label) => (
        <Badge
          key={label}
          variant={activeLabels.includes(label) ? 'default' : 'outline'}
          className="cursor-pointer select-none"
          onClick={() => onToggle(label)}
        >
          {label}
        </Badge>
      ))}
      {activeLabels.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs px-2"
          aria-label="Clear all active label filters"
          onClick={onClear}
        >
          <X className="h-3 w-3 mr-1" /> Clear filters
        </Button>
      )}
    </div>
  )
}
