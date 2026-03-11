import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'
import { useChatStore } from '@/components/chat/chat-store'
import { ChatSidebarToggle } from '@/components/chat/ChatSidebar'
import { listConversations, deleteConversation, getConversation, renameConversation } from '@/server/chat'

const ChatSidebar = lazy( () => import( '@/components/chat/ChatSidebar' ) )
const ChatContainer = lazy( () => import( '@/components/chat/ChatContainer' ) )

type ConversationItem = {
  id: string
  title: string
  updatedAt: Date | string
}

export const Route = createFileRoute( '/_dashboard/dashboard/chat/$chatId' )( {
  component: ChatDetailPage,
} )

function ChatDetailPage() {
  const { chatId: paramChatId } = Route.useParams()
  const navigate = useNavigate()

  // Fallback: try to extract from pathname if params don't work
  const location = window.location.pathname
  const pathMatch = location.match( /\/chat\/([^/]+)$/ )
  const chatId = paramChatId || pathMatch?.[1] || null

  console.log( '[ChatDetailPage] Route params:', { paramChatId, pathMatch, final: chatId } )
  const [conversations, setConversations] = useState<ConversationItem[]>( [] )
  const [loading, setLoading] = useState( true )
  const { activeConversationId, setActiveConversation } = useChatStore()

  // Always sync URL chatId into store — fire on mount and whenever chatId changes
  useEffect( () => {
    setActiveConversation( chatId )
  }, [chatId, setActiveConversation] )

  // Load conversations on mount
  useEffect( () => {
    listConversations()
      .then( ( result ) => {
        const items = Array.isArray( result ) ? result : []
        setConversations( items )
      } )
      .catch( () => { } )
      .finally( () => setLoading( false ) )
  }, [] )

  const loadMore = useCallback( async () => {
    return // pagination not implemented yet
  }, [] )

  const handleNew = useCallback( () => {
    setActiveConversation( null )
    navigate( { to: '/dashboard/chat' } )
  }, [setActiveConversation, navigate] )

  const handleSelect = useCallback(
    ( id: string ) => {
      setActiveConversation( id )
      navigate( { to: '/dashboard/chat/$chatId', params: { chatId: id } } )
    },
    [setActiveConversation, navigate],
  )

  const handleDelete = useCallback(
    async ( id: string ) => {
      await deleteConversation( { data: { id } } )
      setConversations( ( prev ) => prev.filter( ( c ) => c.id !== id ) )
      if ( activeConversationId === id ) {
        setActiveConversation( null )
        navigate( { to: '/dashboard/chat' } )
      }
    },
    [activeConversationId, setActiveConversation, navigate],
  )

  const handleConversationCreated = useCallback(
    ( conv: { id: string; title: string; updatedAt: Date } ) => {
      setConversations( ( prev ) => [
        conv,
        ...prev.filter( ( c ) => c.id !== conv.id ),
      ] )
      navigate( { to: '/dashboard/chat/$chatId', params: { chatId: conv.id } } )
    },
    [navigate],
  )

  const handleTitleUpdated = useCallback( ( id: string, title: string ) => {
    setConversations( ( prev ) => {
      const conv = prev.find( ( c ) => c.id === id )
      if ( !conv ) return prev
      return [
        { ...conv, title, updatedAt: new Date() },
        ...prev.filter( ( c ) => c.id !== id ),
      ]
    } )
  }, [] )

  const handleRename = useCallback(
    async ( id: string, title: string ) => {
      try {
        await renameConversation( { data: { id, title } } )
        handleTitleUpdated( id, title )
      } catch ( err ) {
        console.error( 'Failed to rename conversation:', err )
      }
    },
    [handleTitleUpdated],
  )

  const handleRegenerateTitle = useCallback(
    async ( id: string ) => {
      try {
        const conv = await getConversation( { data: { id } } )
        if ( !Array.isArray( ( conv as any )?.messages ) ) {
          console.error( 'Invalid conversation data - messages is not an array:', conv )
          return
        }
        const plainMessages = ( conv as any ).messages.map( ( m: { role: string; content: string } ) => ( {
          role: m.role,
          content: m.content,
        } ) )
        const res = await fetch( '/api/chat/retitle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( { messages: plainMessages } ),
        } )
        const { title } = ( await res.json() ) as { title?: string }
        if ( title && title !== 'New Chat' ) {
          await renameConversation( { data: { id, title } } )
          handleTitleUpdated( id, title )
        }
      } catch ( err ) {
        console.error( 'Failed to regenerate title:', err )
      }
    },
    [handleTitleUpdated],
  )

  return (
    <div className="-mx-4 lg:-mx-8 -my-6 relative flex h-screen overflow-hidden">
      <Suspense
        fallback={
          <div className="w-64 space-y-2 border-r border-border/50 p-3">
            {Array.from( { length: 6 } ).map( ( _, i ) => (
              <Skeleton key={i} className="h-8 w-full rounded-md" />
            ) )}
          </div>
        }
      >
        <ChatSidebar
          conversations={conversations}
          isLoading={loading}
          onNew={handleNew}
          onSelect={handleSelect}
          onDelete={handleDelete}
          onRename={handleRename}
          onRegenerateTitle={handleRegenerateTitle}
          onLoadMore={loadMore}
        />
      </Suspense>

      <ChatSidebarToggle />

      <div className="flex-1">
        <Suspense
          fallback={
            <div className="flex h-full items-center justify-center">
              <Skeleton className="h-8 w-48" />
            </div>
          }
        >
          <ChatContainer
            key={chatId} initialChatId={chatId} onConversationCreated={handleConversationCreated}
            onTitleUpdated={handleTitleUpdated}
          />
        </Suspense>
      </div>
    </div>
  )
}
