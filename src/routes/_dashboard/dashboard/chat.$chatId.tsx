import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useCallback, useEffect, lazy, Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useChatStore } from "@/components/chat/chat-store";
import { ChatSidebarToggle } from "@/components/chat/ChatSidebar";
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

export const Route = createFileRoute( "/_dashboard/dashboard/chat/$chatId" )( {
    component: ChatDetailPage,
} );

function ChatDetailPage() {
    const { chatId } = Route.useParams();
    const navigate = useNavigate();
    const [conversations, setConversations] = useState<ConversationItem[]>( [] );
    const [loading, setLoading] = useState( true );
    const [loadingMore, setLoadingMore] = useState( false );
    const [hasMore, setHasMore] = useState( true );
    const [nextCursor, setNextCursor] = useState<string | null>( null );
    const { activeConversationId, setActiveConversation } = useChatStore();

    // Set active conversation from URL on mount
    useEffect( () => {
        if ( chatId && chatId !== activeConversationId ) {
            setActiveConversation( chatId );
        }
    }, [chatId, activeConversationId, setActiveConversation] );

    // Load conversations on mount
    useEffect( () => {
        listConversations( { data: { limit: 10 } } )
            .then( ( result ) => {
                setConversations( ( prev ) => {
                    const serverIds = new Set( result.items.map( ( c ) => c.id ) );
                    const optimistic = prev.filter( ( c ) => !serverIds.has( c.id ) );
                    return [...optimistic, ...result.items];
                } );
                setNextCursor( result.nextCursor );
                setHasMore( result.hasMore );
            } )
            .catch( () => { } )
            .finally( () => setLoading( false ) );
    }, [] );

    const loadMore = useCallback( async () => {
        if ( !hasMore || loadingMore || !nextCursor ) return;

        setLoadingMore( true );
        try {
            const result = await listConversations( { data: { cursor: nextCursor, limit: 10 } } );
            setConversations( ( prev ) => [...prev, ...result.items] );
            setNextCursor( result.nextCursor );
            setHasMore( result.hasMore );
        } catch ( err ) {
            console.error( "Failed to load more conversations:", err );
        } finally {
            setLoadingMore( false );
        }
    }, [hasMore, loadingMore, nextCursor] );

    const handleNew = useCallback( () => {
        setActiveConversation( null );
        navigate( { to: "/dashboard/chat" } );
    }, [setActiveConversation, navigate] );

    const handleSelect = useCallback(
        ( id: string ) => {
            setActiveConversation( id );
            navigate( { to: "/dashboard/chat/$chatId", params: { chatId: id } } );
        },
        [setActiveConversation, navigate],
    );

    const handleDelete = useCallback(
        async ( id: string ) => {
            await deleteConversation( { data: { id } } );
            setConversations( ( prev ) => prev.filter( ( c ) => c.id !== id ) );
            if ( activeConversationId === id ) {
                setActiveConversation( null );
                navigate( { to: "/dashboard/chat" } );
            }
        },
        [activeConversationId, setActiveConversation, navigate],
    );

    const handleConversationCreated = useCallback(
        ( conv: { id: string; title: string; updatedAt: Date } ) => {
            setConversations( ( prev ) => [
                conv,
                ...prev.filter( ( c ) => c.id !== conv.id ),
            ] );
            navigate( { to: "/dashboard/chat/$chatId", params: { chatId: conv.id } } );
        },
        [navigate],
    );

    const handleTitleUpdated = useCallback(
        ( id: string, title: string ) => {
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
                    onLoadMore={loadMore}
                    loadingMore={loadingMore}
                    hasMore={hasMore}
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
