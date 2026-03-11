import { useCallback, useEffect, useRef, useState } from 'react'
import { useChat, fetchServerSentEvents } from '@tanstack/ai-react'
import type { StreamChunk } from '@tanstack/ai'
import { clientTools } from '@tanstack/ai-client'
import ChatMessages from './ChatMessages'
import ChatInput from './ChatInput'
import TTSButton from './TTSButton'
import { useChatStore } from './chat-store'
import { getUserLocationTool } from './client-tools'
import {
  saveMessages,
  renameConversation,
  createConversationAndSend,
  getConversation,
} from '@/server/chat'

// Pure helper — defined outside to avoid stale-closure issues in deps
function extractText(
  parts: { type: string; content?: string; text?: string }[],
): string {
  return parts
    .filter( ( p ) => p.type === 'text' )
    .map( ( p ) => p.content || p.text || '' )
    .join( '' )
}

type TokenUsageInfo = {
  promptTokens?: number
  completionTokens?: number
  model?: string
}

type NewConv = { id: string; title: string; updatedAt: Date }

type ChatContainerProps = {
  onConversationCreated?: ( conv: NewConv ) => void
  onTitleUpdated?: ( id: string, title: string ) => void
  /** If provided, this chatId is loaded immediately on mount (direct URL navigation) */
  initialChatId?: string
}

export default function ChatContainer( {
  onConversationCreated,
  onTitleUpdated,
  initialChatId,
}: ChatContainerProps ) {
  const { setActiveConversation } = useChatStore()

  // URL is the single source of truth for which conversation is active.
  // Store state is only used for sidebar highlighting.
  const [conversationId, setConversationId] = useState<string | null>( initialChatId ?? null )

  // Track the assistant message ID we last saved — prevents double-saves
  const savedMsgIdRef = useRef<string | null>( null )
  const retitledRef = useRef<Set<string>>( new Set() )

  // Capture token usage + model from the stream's RUN_FINISHED event
  const lastUsageRef = useRef<TokenUsageInfo>( {} )

  // Client-side tools for browser-based functionality
  const chatTools = clientTools( getUserLocationTool )

  const { messages, sendMessage, isLoading, setMessages, stop, addToolApprovalResponse } = useChat( {
    connection: fetchServerSentEvents( '/api/chat' ),
    tools: chatTools,
    onChunk( chunk: StreamChunk ) {
      // Capture model from any event that carries it
      if ( 'model' in chunk && chunk.model ) {
        lastUsageRef.current.model = chunk.model
      }
      // RUN_FINISHED carries final token usage
      if ( chunk.type === 'RUN_FINISHED' && chunk.usage ) {
        lastUsageRef.current.promptTokens = chunk.usage.promptTokens
        lastUsageRef.current.completionTokens = chunk.usage.completionTokens
      }
    },
  } )

  // Helper: fetch a conversation from DB and push its messages into useChat state
  const loadConversation = useCallback(
    ( convId: string ) => {
      getConversation( { data: { id: convId } } )
        .then( ( conv ) => {
          const uiMessages = conv.messages.map( ( msg ) => ( {
            id: msg.id,
            role: msg.role,
            parts:
              msg.parts.length > 0
                ? msg.parts
                : [{ type: 'text', text: msg.content }],
          } ) )
          setMessages( uiMessages as any )
          savedMsgIdRef.current = null
        } )
        .catch( ( err ) => {
          console.error( 'Failed to load conversation:', err )
        } )
    },
    [setMessages],
  )

  // Load conversation from DB when initialChatId is provided (URL-based navigation).
  // Component is keyed by chatId, so this fires exactly once per chat on mount.
  useEffect( () => {
    if ( !initialChatId ) return
    setActiveConversation( initialChatId )
    loadConversation( initialChatId )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialChatId] )

  // ── Auto-retitle (separate Groq call, best-effort) ─────────────────
  const autoRetitle = useCallback(
    async ( convId: string, msgs: typeof messages ) => {
      if ( retitledRef.current.has( convId ) ) return
      retitledRef.current.add( convId )
      try {
        const plainMessages = msgs.map( ( m ) => ( {
          role: m.role,
          content: extractText( m.parts ),
        } ) )
        const res = await fetch( '/api/chat/retitle', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify( { messages: plainMessages } ),
        } )
        const { title } = ( await res.json() ) as { title?: string }
        if ( title && title !== 'New Chat' ) {
          await renameConversation( { data: { id: convId, title } } )
          onTitleUpdated?.( convId, title )
        }
      } catch {
        // best-effort — swallow errors
      }
    },
    [onTitleUpdated],
  )

  // ── Save messages when the stream completes ───────────────────────
  useEffect( () => {
    if ( isLoading ) return // still streaming
    if ( !conversationId ) return
    if ( messages.length === 0 ) return

    const lastMsg = messages[messages.length - 1]
    if ( lastMsg.role !== 'assistant' ) return

    // De-duplicate: skip if we already persisted this assistant turn
    if ( savedMsgIdRef.current === lastMsg.id ) return
    savedMsgIdRef.current = lastMsg.id

    // Collect the user message immediately before this assistant turn
    const toSave: Array<{
      role: string
      content: string
      reasoning?: string | null
      parts?: Array<Record<string, unknown>>
      inputTokens?: number | null
      outputTokens?: number | null
      modelUsed?: string | null
    }> = []

    for ( let i = messages.length - 2; i >= 0; i-- ) {
      if ( messages[i].role === 'user' ) {
        toSave.push( {
          role: 'user',
          content: extractText( messages[i].parts ),
          parts: messages[i].parts as Array<Record<string, unknown>>,
        } )
        break
      }
    }

    // Extract reasoning from the assistant message parts
    const reasoningParts = lastMsg.parts.filter( ( p ) => p.type === 'thinking' )
    const reasoningText =
      reasoningParts.length > 0
        ? reasoningParts.map( ( p ) => p.content || '' ).join( '\n' )
        : null

    // Grab captured token usage from the stream
    const usage = lastUsageRef.current

    toSave.push( {
      role: 'assistant',
      content: extractText( lastMsg.parts ),
      reasoning: reasoningText,
      parts: lastMsg.parts as Array<Record<string, unknown>>,
      inputTokens: usage.promptTokens ?? null,
      outputTokens: usage.completionTokens ?? null,
      modelUsed: usage.model ?? null,
    } )

    // Reset usage for next turn
    lastUsageRef.current = {}

    // Keep messages that have text content OR tool-call parts (so tool calls get saved)
    const rows = toSave.filter( ( m ) => {
      if ( m.content.trim().length > 0 ) return true
      // Also keep if parts contain tool-call data
      if ( m.parts && m.parts.some( ( p ) => p.type === 'tool-call' || p.type === 'tool-result' ) ) return true
      return false
    } )
    if ( rows.length > 0 ) {
      saveMessages( {
        data: { conversationId: conversationId, messages: rows },
      } )
        .then( ( result ) => {
          const insertedAssistant = result.inserted?.find(
            ( m ) => m.role === 'assistant',
          )
          if ( !insertedAssistant?.id ) return

          // Replace client-side streamed ID with DB ID so feedback actions use a valid message ID.
          setMessages(
            messages.map( ( m ) =>
              m.id === lastMsg.id ? { ...m, id: insertedAssistant.id } : m,
            ),
          )
        } )
        .catch( () => { } )
    }

    // Trigger retitle after the very first assistant reply
    if ( messages.filter( ( m ) => m.role === 'assistant' ).length === 1 ) {
      autoRetitle( conversationId, messages )
    }
  }, [isLoading, messages, conversationId, autoRetitle, setMessages] )

  // ── Send (auto-creates conversation if none selected) ────────────
  const handleSend = useCallback(
    async ( text: string, _files?: File[] ) => {
      let convId = conversationId

      if ( !convId ) {
        // Create conversation + first message atomically — NO separate create call
        const result = ( await createConversationAndSend( {
          data: {
            content: text,
            parts: [{ type: 'text', text }],
          },
        } ) ) as { conversation: { id: string; title: string }; message: unknown }
        convId = result.conversation.id

        // Update local state + sidebar highlight (URL will change via onConversationCreated)
        setConversationId( convId )
        setActiveConversation( convId )

        // Pass full object so parent can optimistically prepend at top
        onConversationCreated?.( {
          id: result.conversation.id,
          title: result.conversation.title,
          updatedAt: new Date(),
        } )
      }

      sendMessage( text )
    },
    [
      conversationId,
      setActiveConversation,
      sendMessage,
      onConversationCreated,
    ],
  )

  const lastAssistantMessage = messages
    .filter( ( m ) => m.role === 'assistant' )
    .at( -1 )

  const lastAssistantText =
    lastAssistantMessage?.parts
      .filter( ( p ) => p.type === 'text' )
      .map( ( p ) => p.content || '' )
      .join( '' ) ?? ''

  return (
    <div className="flex h-full flex-col">
      <ChatMessages messages={messages as any} isLoading={isLoading} onToolApproval={addToolApprovalResponse} />

      {lastAssistantText && lastAssistantMessage?.id && !isLoading && (
        <div className="flex justify-end px-4 pb-1">
          <TTSButton
            messageId={lastAssistantMessage.id}
            text={lastAssistantText}
          />
        </div>
      )}

      <ChatInput onSend={handleSend} onStop={stop} disabled={isLoading} />
    </div>
  )
}
