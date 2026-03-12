import { useRef, useEffect, useState } from 'react'
import {
  Plus,
  Trash2,
  MessageSquare,
  PanelLeftClose,
  PanelLeft,
  Loader2,
  RefreshCw,
  Pencil,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
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
  selectedConversationId?: string | null
  onNew: () => void
  onSelect: (id: string) => void
  onDelete: (id: string) => void
  onRename?: (id: string, title: string) => Promise<void>
  onRegenerateTitle?: (id: string) => void | Promise<void>
  onLoadMore?: () => void
  loadingMore?: boolean
  hasMore?: boolean
}

export default function ChatSidebar({
  conversations,
  isLoading,
  selectedConversationId,
  onNew,
  onSelect,
  onDelete,
  onRename,
  onRegenerateTitle,
  onLoadMore,
  loadingMore = false,
  hasMore = false,
}: ChatSidebarProps) {
  const { activeConversationId, sidebarOpen, toggleSidebar } = useChatStore()
  const effectiveSelectedId = selectedConversationId ?? activeConversationId
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editingTitle, setEditingTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (editingId && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [editingId])

  // Infinite scroll observer
  useEffect(() => {
    if (!onLoadMore || !hasMore || loadingMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore()
        }
      },
      { threshold: 0.1 },
    )

    if (loadMoreTriggerRef.current) {
      observer.observe(loadMoreTriggerRef.current)
    }

    return () => observer.disconnect()
  }, [onLoadMore, hasMore, loadingMore])

  const handleEditStart = (conv: Conversation) => {
    setEditingId(conv.id)
    setEditingTitle(conv.title)
  }

  const handleEditSave = async (id: string) => {
    if (
      !editingTitle.trim() ||
      editingTitle === conversations.find((c) => c.id === id)?.title
    ) {
      setEditingId(null)
      return
    }
    try {
      await onRename?.(id, editingTitle.trim())
      setEditingId(null)
    } catch (err) {
      console.error('Failed to rename conversation:', err)
      setEditingId(null)
    }
  }

  const handleEditCancel = () => {
    setEditingId(null)
  }

  return (
    <div
      className={cn(
        'absolute inset-y-0 left-0 z-20 flex w-72 flex-col overflow-hidden border-r border-border/50 bg-card/95 backdrop-blur transition-transform duration-200 md:relative md:inset-auto md:z-auto md:w-auto md:bg-card/50 md:backdrop-blur-none',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full',
        sidebarOpen ? 'md:w-64' : 'md:w-0',
        'md:translate-x-0',
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
            Array.from({ length: 5 }).map((_, i) => (
              <Skeleton key={i} className="h-9 w-full rounded-md" />
            ))
          ) : conversations.length === 0 ? (
            <p className="px-3 py-6 text-center text-xs text-muted-foreground">
              No conversations yet
            </p>
          ) : (
            <>
              <TooltipProvider>
                {conversations.map((c) => (
                  <ContextMenu key={c.id}>
                    <ContextMenuTrigger asChild>
                      <div
                        className={cn(
                          'group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors',
                          'hover:bg-primary/10',
                          effectiveSelectedId === c.id &&
                            'bg-primary/10 font-medium text-primary',
                        )}
                        onClick={() => !editingId && onSelect(c.id)}
                      >
                        <MessageSquare
                          className={cn(
                            'h-3.5 w-3.5 shrink-0',
                            effectiveSelectedId === c.id
                              ? 'text-primary'
                              : 'text-muted-foreground',
                          )}
                        />
                        {editingId === c.id ? (
                          <input
                            ref={inputRef}
                            type="text"
                            value={editingTitle}
                            onChange={(e) => setEditingTitle(e.target.value)}
                            onBlur={() => handleEditSave(c.id)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleEditSave(c.id)
                              if (e.key === 'Escape') handleEditCancel()
                            }}
                            className="flex-1 min-w-0 px-1 py-0.5 text-sm border border-primary rounded bg-background text-foreground focus:outline-none"
                            onClick={(e) => e.stopPropagation()}
                            placeholder="Chat title"
                          />
                        ) : (
                          <Tooltip delayDuration={3000}>
                            <TooltipTrigger asChild>
                              <span className="min-w-0 flex-1 max-w-[22ch] truncate select-none leading-snug sm:max-w-[18ch] md:max-w-[22ch] lg:max-w-[26ch]">
                                {c.title.length > 22
                                  ? c.title.slice(0, 22) + '...'
                                  : c.title}
                              </span>
                            </TooltipTrigger>
                            <TooltipContent
                              side="top"
                              className="max-w-xs wrap-break-word"
                            >
                              {c.title}
                            </TooltipContent>
                          </Tooltip>
                        )}
                        {editingId !== c.id && (
                          <div className="hidden group-hover:flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 hover:bg-primary/20 hover:text-primary"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleEditStart(c)
                              }}
                              title="Rename"
                            >
                              <Pencil className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-5 hover:bg-destructive/20 hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation()
                                onDelete(c.id)
                              }}
                              title="Delete"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent className="w-48">
                      <ContextMenuItem
                        onClick={() => onRegenerateTitle?.(c.id)}
                        className="gap-2 cursor-pointer"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        Regenerate Title
                      </ContextMenuItem>
                      <ContextMenuSeparator />
                      <ContextMenuItem
                        onClick={() => onDelete(c.id)}
                        className="gap-2 cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </ContextMenuItem>
                    </ContextMenuContent>
                  </ContextMenu>
                ))}
              </TooltipProvider>

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
  if (sidebarOpen) return null
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
