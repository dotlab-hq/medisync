import { createFileRoute } from "@tanstack/react-router";
import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { ChatSidebarToggle } from "@/components/chat/ChatSidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatStore } from "@/components/chat/chat-store";
import {
    listConversations,
    createConversation,
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

    // Load conversations on mount
    useEffect( () => {
        listConversations()
            .then( ( data ) => setConversations( data ) )
            .catch( () => { } )
            .finally( () => setLoading( false ) );
    }, [] );

    const handleNew = useCallback( async () => {
        const conv = await createConversation();
        setConversations( ( prev ) => [conv, ...prev] );
        setActiveConversation( conv.id );
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
        ( _id: string ) => {
            // Refresh list
            listConversations()
                .then( ( data ) => setConversations( data ) )
                .catch( () => { } );
        },
        [],
    );

    const handleTitleUpdated = useCallback(
        ( id: string, title: string ) => {
            setConversations( ( prev ) =>
                prev.map( ( c ) => ( c.id === id ? { ...c, title } : c ) ),
            );
        },
        [],
    );

    return (
        <div className="relative flex h-[calc(100vh-3.5rem)] lg:h-screen">
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
