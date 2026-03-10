import { create } from "zustand";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

type ChatState = {
    activeConversationId: string | null;
    setActiveConversation: ( id: string | null ) => void;
    sidebarOpen: boolean;
    toggleSidebar: () => void;
    setSidebarOpen: ( open: boolean ) => void;
    pendingMessages: ChatMessage[];
    addPendingMessage: ( msg: ChatMessage ) => void;
    clearPendingMessages: () => void;
};

export const useChatStore = create<ChatState>( ( set ) => ( {
    activeConversationId: null,
    setActiveConversation: ( id ) => set( { activeConversationId: id } ),
    sidebarOpen: true,
    toggleSidebar: () => set( ( s ) => ( { sidebarOpen: !s.sidebarOpen } ) ),
    setSidebarOpen: ( open ) => set( { sidebarOpen: open } ),
    pendingMessages: [],
    addPendingMessage: ( msg ) =>
        set( ( s ) => ( { pendingMessages: [...s.pendingMessages, msg] } ) ),
    clearPendingMessages: () => set( { pendingMessages: [] } ),
} ) );
