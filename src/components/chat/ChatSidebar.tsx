import { useRef, useEffect } from 'react'
import {
  Plus,
  Trash2,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  Loader2,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import { useChatStore } from './chat-store'

type Conversation = {
  id: string
  title: string
  updatedAt: Date | string
}

type ChatSidebarProps = {
  conversations: Conversation[]
  isLoading: boolean
  onNew: () => void
  onSelect: ( id: string ) => void
  onDelete: ( id: string ) => void
  onLoadMore?: () => void
  loadingMore?: boolean
  hasMore?: boolean
}

export default function ChatSidebar( {
  conversations,
  isLoading,
  onNew,
  onSelect,
  onDelete,
  onLoadMore,
  loadingMore = false,
  hasMore = false,
}: ChatSidebarProps ) {
  const { activeConversationId, sidebarOpen, toggleSidebar } = useChatStore()
  const scrollContainerRef = useRef<HTMLDivElement>( null )
  const loadMoreTriggerRef = useRef<HTMLDivElement>( null )

  // Infinite scroll observer
  useEffect( () => {
    if ( !onLoadMore || !hasMore || loadingMore ) return

    const observer = new IntersectionObserver(
      ( entries ) => {
        if ( entries[0].isIntersecting ) {
          onLoadMore()
        }
      },
      { threshold: 0.1 },
    )

    if ( loadMoreTriggerRef.current ) {
      observer.observe( loadMoreTriggerRef.current )
    }

    return () => observer.disconnect()
  }, [onLoadMore, hasMore, loadingMore] )

  return (
    <div
      className={cn(
        'flex flex-col border-r border-border/50 bg-card/50 transition-all duration-200 overflow-hidden',
        sidebarOpen ? 'w-64' : 'w-0',
      )}
    >
      {/* Header */}
      <div className="flex h-12 items-center justify-between border-b border-border/50 px-3">
        <span className="text-sm font-semibold">Chats</span>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onNew}
            title="New Chat"
          >
            <Plus className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={toggleSidebar}
          >
            <PanelLeftClose className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* List */}
      <ScrollArea className="flex-1">
        <div ref={scrollContainerRef} className="px-2 py-2 space-y-0.5">
          {isLoading ? (
            Array.from( { length: 5 } ).map( ( _, i ) => (
              <Skeleton key={i} className="h-9 w-full rounded-md" />
            ) )
          ) : conversations.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">
              No conversations yet
            </p>
          ) : (
            <>
              {conversations.map( ( c ) => (
                <div
                  key={c.id}
                  className={cn(
                    'group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm cursor-pointer transition-colors',
                    'hover:bg-primary/10',
                    activeConversationId === c.id &&
                    'bg-primary/10 font-medium text-primary',
                  )}
                  onClick={() => onSelect( c.id )}
                >
                  <MessageSquare
                    className={cn(
                      'h-3.5 w-3.5 shrink-0',
                      activeConversationId === c.id
                        ? 'text-primary'
                        : 'text-muted-foreground',
                    )}
                  />
                  {/* min-w-0 is critical: allows flex child to shrink below its content size and truncate */}
                  <span className="flex-1 truncate select-none min-w-0 leading-snug">
                    {c.title}
                  </span>
                  {/* Trash: always occupies space; dim at rest, full on hover */}
                  <button
                    className={cn(
                      'shrink-0 flex items-center justify-center rounded p-0.5',
                      'opacity-30 group-hover:opacity-100 transition-opacity',
                      'hover:bg-destructive/10 hover:text-destructive text-muted-foreground',
                    )}
                    onClick={( e ) => {
                      e.stopPropagation()
                      onDelete( c.id )
                    }}
                    title="Delete chat"
                    tabIndex={-1}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ) )}

              {/* Load More Trigger */}
              {hasMore && (
                <div ref={loadMoreTriggerRef} className="py-2 text-center">
                  {loadingMore ? (
                    <Loader2 className="h-4 w-4 animate-spin mx-auto text-muted-foreground" />
                  ) : null}
                </div>
              )}

              {/* End of List */}
              {!hasMore && conversations.length > 0 && (
                <p className="px-3 py-2 text-center text-xs text-muted-foreground">
                  No more chats
                </p>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  )
}

/** Collapsed toggle to reopen the sidebar */
export function ChatSidebarToggle() {
  const { sidebarOpen, toggleSidebar } = useChatStore()
  if ( sidebarOpen ) return null
  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute left-2 top-2 z-10 h-8 w-8"
      onClick={toggleSidebar}
    >
      <PanelLeft className="h-4 w-4" />
    </Button>
  )
}
