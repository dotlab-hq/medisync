import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { ChatSidebarToggle } from "@/components/chat/ChatSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatStore } from "@/components/chat/chat-store";
import {
    listConversations,
    deleteConversation,
} from "@/server/chat";

const ChatSidebar = lazy( () => import( "@/components/chat/ChatSidebar" ) );
const ChatContainer = lazy( () => import( "@/components/chat/ChatContainer" ) );

type ConversationItem = {
    id: string;
    title: string;
    updatedAt: Date | string;
};

export const Route = createFileRoute( "/_dashboard/dashboard/chat" )( {
    component: ChatPage,
} );

function ChatPage() {
    const [conversations, setConversations] = useState<ConversationItem[]>( [] );
    const [loading, setLoading] = useState( true );
    const { activeConversationId, setActiveConversation } = useChatStore();

    // Load conversations on mount — use functional update so any optimistic additions
    // made before the fetch resolves are preserved at the top of the list.
    useEffect( () => {
        listConversations()
            .then( ( data ) => {
                setConversations( ( prev ) => {
                    const serverIds = new Set( data.map( ( c ) => c.id ) );
                    // Keep any optimistically-added items not yet returned by the server
                    const optimistic = prev.filter( ( c ) => !serverIds.has( c.id ) );
                    return [...optimistic, ...data];
                } );
            } )
            .catch( () => { } )
            .finally( () => setLoading( false ) );
    }, [] );

    const handleNew = useCallback( () => {
        // Just clear active conversation — navigates to empty chat.
        // Conversation is created atomically on first message send (in ChatContainer).
        setActiveConversation( null );
    }, [setActiveConversation] );

    const handleSelect = useCallback(
        ( id: string ) => {
            setActiveConversation( id );
        },
        [setActiveConversation],
    );

    const handleDelete = useCallback(
        async ( id: string ) => {
            await deleteConversation( { data: { id } } );
            setConversations( ( prev ) => prev.filter( ( c ) => c.id !== id ) );
            if ( activeConversationId === id ) {
                setActiveConversation( null );
            }
        },
        [activeConversationId, setActiveConversation],
    );

    const handleConversationCreated = useCallback(
        ( conv: { id: string; title: string; updatedAt: Date } ) => {
            // Optimistically prepend at top — no async refresh needed
            setConversations( ( prev ) => [
                conv,
                ...prev.filter( ( c ) => c.id !== conv.id ),
            ] );
        },
        [],
    );

    const handleTitleUpdated = useCallback(
        ( id: string, title: string ) => {
            // Promote the updated conversation to the top of the list
            setConversations( ( prev ) => {
                const conv = prev.find( ( c ) => c.id === id );
                if ( !conv ) return prev;
                return [
                    { ...conv, title, updatedAt: new Date() },
                    ...prev.filter( ( c ) => c.id !== id ),
                ];
            } );
        },
        [],
    );

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
                        onConversationCreated={handleConversationCreated}
                        onTitleUpdated={handleTitleUpdated}
                    />
                </Suspense>
            </div>
        </div>
    );
}
