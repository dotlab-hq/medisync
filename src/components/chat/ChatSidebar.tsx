import { useState } from "react";
import { Plus, Trash2, MessageSquare, PanelLeftClose, PanelLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useChatStore } from "./chat-store";

type Conversation = {
    id: string;
    title: string;
    updatedAt: Date | string;
};

type ChatSidebarProps = {
    conversations: Conversation[];
    isLoading: boolean;
    onNew: () => void;
    onSelect: ( id: string ) => void;
    onDelete: ( id: string ) => void;
};

export default function ChatSidebar( {
    conversations,
    isLoading,
    onNew,
    onSelect,
    onDelete,
}: ChatSidebarProps ) {
    const { activeConversationId, sidebarOpen, toggleSidebar } = useChatStore();
    const [hoveredId, setHoveredId] = useState<string | null>( null );

    return (
        <div
            className={cn(
                "flex flex-col border-r border-border/50 bg-card/50 transition-all duration-200",
                sidebarOpen ? "w-64" : "w-0 overflow-hidden",
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
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
                {isLoading ? (
                    Array.from( { length: 5 } ).map( ( _, i ) => (
                        <Skeleton key={i} className="h-9 w-full rounded-md" />
                    ) )
                ) : conversations.length === 0 ? (
                    <p className="px-3 py-6 text-center text-xs text-muted-foreground">
                        No conversations yet
                    </p>
                ) : (
                    conversations.map( ( c ) => (
                        <div
                            key={c.id}
                            className={cn(
                                "group flex items-center gap-2 rounded-md px-2 py-1.5 text-sm cursor-pointer transition-colors",
                                "hover:bg-primary/10",
                                activeConversationId === c.id &&
                                "bg-primary/10 font-medium text-primary",
                            )}
                            onClick={() => onSelect( c.id )}
                            onMouseEnter={() => setHoveredId( c.id )}
                            onMouseLeave={() => setHoveredId( null )}
                        >
                            <MessageSquare className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                            <span className="flex-1 truncate">{c.title}</span>
                            {hoveredId === c.id && (
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 shrink-0 opacity-0 group-hover:opacity-100"
                                    onClick={( e ) => {
                                        e.stopPropagation();
                                        onDelete( c.id );
                                    }}
                                >
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                </Button>
                            )}
                        </div>
                    ) )
                )}
            </div>
        </div>
    );
}

/** Collapsed toggle to reopen the sidebar */
export function ChatSidebarToggle() {
    const { sidebarOpen, toggleSidebar } = useChatStore();
    if ( sidebarOpen ) return null;
    return (
        <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-2 z-10 h-8 w-8"
            onClick={toggleSidebar}
        >
            <PanelLeft className="h-4 w-4" />
        </Button>
    );
}
