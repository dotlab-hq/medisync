import type { KeyboardEvent } from "react";
import { useState, useRef } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
    onSend: ( text: string ) => void;
    onFileRef?: ( fileId: string ) => void;
    disabled?: boolean;
};

export default function ChatInput( { onSend, disabled }: ChatInputProps ) {
    const [input, setInput] = useState( "" );
    const textareaRef = useRef<HTMLTextAreaElement>( null );

    const handleSend = () => {
        const trimmed = input.trim();
        if ( !trimmed || disabled ) return;
        onSend( trimmed );
        setInput( "" );
        // Re-focus
        setTimeout( () => textareaRef.current?.focus(), 0 );
    };

    const handleKeyDown = ( e: KeyboardEvent<HTMLTextAreaElement> ) => {
        if ( e.key === "Enter" && !e.shiftKey ) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="border-t border-border/50 bg-background p-3">
            <div className="mx-auto flex max-w-3xl items-end gap-2">
                <Textarea
                    ref={textareaRef}
                    value={input}
                    onChange={( e ) => setInput( e.target.value )}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask MediSync AI anything..."
                    disabled={disabled}
                    className="min-h-11 max-h-50 resize-none"
                    rows={1}
                />
                <Button
                    size="icon"
                    onClick={handleSend}
                    disabled={!input.trim() || disabled}
                    className="shrink-0"
                >
                    <Send className="h-4 w-4" />
                </Button>
            </div>
            <p className="mx-auto mt-1.5 max-w-3xl text-[10px] text-muted-foreground">
                MediSync AI can make mistakes. Always consult a healthcare professional.
            </p>
        </div>
    );
}
