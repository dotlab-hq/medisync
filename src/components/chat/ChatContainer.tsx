import { useCallback, useEffect, useRef } from "react";
import { useChat, fetchServerSentEvents } from "@tanstack/ai-react";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import TTSButton from "./TTSButton";
import { useChatStore } from "./chat-store";
import {
    saveMessages,
    renameConversation,
    createConversation,
} from "@/server/chat";

type ChatContainerProps = {
    onConversationCreated?: ( id: string ) => void;
    onTitleUpdated?: ( id: string, title: string ) => void;
};

export default function ChatContainer( {
    onConversationCreated,
    onTitleUpdated,
}: ChatContainerProps ) {
    const { activeConversationId, setActiveConversation } = useChatStore();
    const retitledRef = useRef<Set<string>>( new Set() );
    const messageCountRef = useRef( 0 );

    const { messages, sendMessage, isLoading, setMessages } = useChat( {
        connection: fetchServerSentEvents( "/api/chat" ),
    } );

    // Reset messages when switching conversations
    useEffect( () => {
        setMessages( [] );
        messageCountRef.current = 0;
    }, [activeConversationId, setMessages] );

    const extractTextContent = ( parts: { type: string; content?: string }[] ) =>
        parts
            .filter( ( p ) => p.type === "text" )
            .map( ( p ) => p.content || "" )
            .join( "" );

    // Auto-retitle after the first assistant reply
    const autoRetitle = useCallback(
        async ( convId: string, msgs: typeof messages ) => {
            if ( retitledRef.current.has( convId ) ) return;
            retitledRef.current.add( convId );

            try {
                const plainMessages = msgs.map( ( m ) => ( {
                    role: m.role,
                    content: extractTextContent( m.parts ),
                } ) );

                const res = await fetch( "/api/chat/retitle", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify( { messages: plainMessages } ),
                } );
                const { title } = await res.json();
                if ( title && title !== "New Chat" ) {
                    await renameConversation( { data: { id: convId, title } } );
                    onTitleUpdated?.( convId, title );
                }
            } catch {
                // Best-effort retitle
            }
        },
        [onTitleUpdated],
    );

    // Persist messages & trigger retitle
    useEffect( () => {
        if ( messages.length <= messageCountRef.current ) return;
        messageCountRef.current = messages.length;

        const lastMsg = messages[messages.length - 1];
        if ( lastMsg.role !== "assistant" || isLoading ) return;
        if ( !activeConversationId ) return;

        // Save the latest user + assistant pair
        const toSave = messages.slice( -2 ).map( ( m ) => ( {
            role: m.role,
            content: extractTextContent( m.parts ),
        } ) );

        saveMessages( {
            data: {
                conversationId: activeConversationId,
                messages: toSave,
            },
        } ).catch( () => { } );

        // Auto-retitle once
        if ( messages.filter( ( m ) => m.role === "assistant" ).length === 1 ) {
            autoRetitle( activeConversationId, messages );
        }
    }, [messages, isLoading, activeConversationId, autoRetitle] );

    const handleSend = useCallback(
        async ( text: string ) => {
            let convId = activeConversationId;
            // Auto-create conversation if none selected
            if ( !convId ) {
                const conv = await createConversation();
                convId = conv.id;
                setActiveConversation( convId );
                onConversationCreated?.( convId );
            }
            sendMessage( text );
        },
        [activeConversationId, setActiveConversation, sendMessage, onConversationCreated],
    );

    // Extract text from last assistant message for TTS
    const lastAssistantText = messages
        .filter( ( m ) => m.role === "assistant" )
        .at( -1 )
        ?.parts.filter( ( p ) => p.type === "text" )
        .map( ( p ) => p.content || "" )
        .join( "" ) ?? "";

    return (
        <div className="flex h-full flex-col">
            <ChatMessages messages={messages} isLoading={isLoading} />

            {/* TTS for the last assistant message */}
            {lastAssistantText && !isLoading && (
                <div className="flex justify-end px-4 pb-1">
                    <TTSButton text={lastAssistantText} />
                </div>
            )}

            <ChatInput onSend={handleSend} disabled={isLoading} />
        </div>
    );
}
