import { Skeleton } from '@/components/ui/skeleton'

export function DocumentsSkeleton() {
  return (
    <div className="space-y-5">
      {/* Header skeleton */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Search bar skeleton */}
      <Skeleton className="h-10 w-full rounded-md" />

      <div className="flex gap-6">
        {/* Sidebar skeleton — desktop only */}
        <div className="hidden md:block w-56 shrink-0 space-y-2">
          <Skeleton className="h-4 w-16 mb-3" />
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-9 w-full rounded-md" />
          ))}
          <div className="pt-4">
            <Skeleton className="h-16 w-full rounded-lg" />
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1 space-y-4 min-w-0">
          <Skeleton className="h-6 w-48" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

