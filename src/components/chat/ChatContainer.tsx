import { useCallback, useEffect, useRef } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import TTSButton from "./TTSButton";
import { useChatStore } from "./chat-store";
import {
    saveMessages,
    renameConversation,
    createConversationAndSend,
} from "@/server/chat";

// Pure helper — defined outside to avoid stale-closure issues in deps
function extractText( parts: { type: string; content?: string; text?: string }[] ): string {
    return parts
        .filter( ( p ) => p.type === "text" )
        .map( ( p ) => p.content || p.text || "" )
        .join( "" );
}

type NewConv = { id: string; title: string; updatedAt: Date };

type ChatContainerProps = {
    onConversationCreated?: ( conv: NewConv ) => void;
    onTitleUpdated?: ( id: string, title: string ) => void;
};

export default function ChatContainer( {
    onConversationCreated,
    onTitleUpdated,
}: ChatContainerProps ) {
    const { activeConversationId, setActiveConversation } = useChatStore();

    // Track the assistant message ID we last saved — prevents double-saves
    const savedMsgIdRef = useRef<string | null>( null );
    const retitledRef = useRef<Set<string>>( new Set() );
    // When handleSend auto-creates a new conversation, setting activeConversationId
    // would normally trigger the reset effect and wipe messages mid-stream.
    // This flag tells the effect to skip exactly one reset in that case.
    const skipNextResetRef = useRef( false );

    const { messages, sendMessage, isLoading, setMessages } = useChat( {
        connection: fetchServerSentEvents( "/api/chat" ),
    } );

    // Reset state when switching conversations (but NOT when we just auto-created one)
    useEffect( () => {
        if ( skipNextResetRef.current ) {
            skipNextResetRef.current = false;
            return;
        }
        setMessages( [] );
        savedMsgIdRef.current = null;
    }, [activeConversationId, setMessages] );

    // ── Auto-retitle (separate Groq call, best-effort) ─────────────────
    const autoRetitle = useCallback(
        async ( convId: string, msgs: typeof messages ) => {
            if ( retitledRef.current.has( convId ) ) return;
            retitledRef.current.add( convId );
            try {
                const plainMessages = msgs.map( ( m ) => ( {
                    role: m.role,
                    content: extractText( m.parts ),
                } ) );
                const res = await fetch( "/api/chat/retitle", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify( { messages: plainMessages } ),
                } );
                const { title } = ( await res.json() ) as { title?: string };
                if ( title && title !== "New Chat" ) {
                    await renameConversation( { data: { id: convId, title } } );
                    onTitleUpdated?.( convId, title );
                }
            } catch {
                // best-effort — swallow errors
            }
        },
        [onTitleUpdated],
    );

    // ── Save messages when the stream completes ───────────────────────
    useEffect( () => {
        if ( isLoading ) return;           // still streaming
        if ( !activeConversationId ) return;
        if ( messages.length === 0 ) return;

        const lastMsg = messages[messages.length - 1];
        if ( !lastMsg || lastMsg.role !== "assistant" ) return;

        // De-duplicate: skip if we already persisted this assistant turn
        if ( savedMsgIdRef.current === lastMsg.id ) return;
        savedMsgIdRef.current = lastMsg.id;

        // Collect the user message immediately before this assistant turn
        const toSave: Array<{
            role: string;
            content: string;
            reasoning?: string | null;
            parts?: Array<Record<string, unknown>>;
        }> = [];

        for ( let i = messages.length - 2; i >= 0; i-- ) {
            if ( messages[i].role === "user" ) {
                toSave.push( {
                    role: "user",
                    content: extractText( messages[i].parts ),
                    parts: messages[i].parts as Array<Record<string, unknown>>,
                } );
                break;
            }
        }

        // Extract reasoning from the assistant message parts
        const reasoningParts = lastMsg.parts.filter( ( p ) => p.type === "thinking" );
        const reasoningText = reasoningParts.length > 0
            ? reasoningParts.map( ( p ) => p.content || "" ).join( "\n" )
            : null;

        toSave.push( {
            role: "assistant",
            content: extractText( lastMsg.parts ),
            reasoning: reasoningText,
            parts: lastMsg.parts as Array<Record<string, unknown>>,
        } );

        const rows = toSave.filter( ( m ) => m.content.trim().length > 0 );
        if ( rows.length > 0 ) {
            saveMessages( {
                data: { conversationId: activeConversationId, messages: rows },
            } ).catch( () => { } );
        }

        // Trigger retitle after the very first assistant reply
        if ( messages.filter( ( m ) => m.role === "assistant" ).length === 1 ) {
            autoRetitle( activeConversationId, messages );
        }
    }, [isLoading, messages, activeConversationId, autoRetitle] );

    // ── Send (auto-creates conversation if none selected) ────────────
    const handleSend = useCallback(
        async ( text: string, _files?: File[] ) => {
            let convId = activeConversationId;

            if ( !convId ) {
                // Create conversation + first message atomically — NO separate create call
                const result = await createConversationAndSend( {
                    data: {
                        content: text,
                        parts: [{ type: "text", text }],
                    },
                } );
                convId = result.conversation.id;

                // Mark: skip the next reset triggered by activeConversationId change
                skipNextResetRef.current = true;
                setActiveConversation( convId );

                // Pass full object so parent can optimistically prepend at top
                onConversationCreated?.( {
                    id: result.conversation.id,
                    title: result.conversation.title,
                    updatedAt: new Date(),
                } );
            }

            sendMessage( text );
        },
        [activeConversationId, setActiveConversation, sendMessage, onConversationCreated],
    );

    const lastAssistantText =
        messages
            .filter( ( m ) => m.role === "assistant" )
            .at( -1 )
            ?.parts.filter( ( p ) => p.type === "text" )
            .map( ( p ) => p.content || "" )
            .join( "" ) ?? "";

    return (
        <div className="flex h-full flex-col">
            <ChatMessages messages={messages} isLoading={isLoading} />

            {lastAssistantText && !isLoading && (
                <div className="flex justify-end px-4 pb-1">
                    <TTSButton text={lastAssistantText} />
                </div>
            )}

            <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
    );
}

