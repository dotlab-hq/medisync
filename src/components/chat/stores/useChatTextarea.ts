import { create } from "zustand";

interface ChatTextareaStore {
    text: string;
    setText: ( value: string ) => void;
}

export const useChatTextareaStore = create<ChatTextareaStore>()( ( set ) => ( {
    text: "",
    setText: ( value: string ) => set( { text: value } ),
} ) );
