import type { KeyboardEvent, ChangeEvent } from "react";
import { useState, useRef, useCallback } from "react";
import { ArrowUp, Paperclip, Square, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

type ChatInputProps = {
    onSend: ( text: string, files?: File[] ) => void;
    disabled?: boolean;
    placeholder?: string;
};

export default function ChatInput( { onSend, disabled, placeholder }: ChatInputProps ) {
    const [input, setInput] = useState( "" );
    const [files, setFiles] = useState<File[]>( [] );
    const textareaRef = useRef<HTMLTextAreaElement>( null );
    const fileInputRef = useRef<HTMLInputElement>( null );

    const handleSend = useCallback( () => {
        const trimmed = input.trim();
        if ( ( !trimmed && files.length === 0 ) || disabled ) return;
        onSend( trimmed, files.length > 0 ? files : undefined );
        setInput( "" );
        setFiles( [] );
        setTimeout( () => textareaRef.current?.focus(), 0 );
    }, [input, files, disabled, onSend] );

    const handleKeyDown = ( e: KeyboardEvent<HTMLTextAreaElement> ) => {
        if ( e.key === "Enter" && !e.shiftKey ) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = () => fileInputRef.current?.click();

    const handleFileChange = ( e: ChangeEvent<HTMLInputElement> ) => {
        const selected = Array.from( e.target.files || [] );
        setFiles( ( prev ) => [...prev, ...selected] );
        if ( fileInputRef.current ) fileInputRef.current.value = "";
    };

    const removeFile = ( index: number ) => {
        setFiles( ( prev ) => prev.filter( ( _, i ) => i !== index ) );
    };

    return (
        <div className="border-t border-border/50 bg-background p-3">
            <div className="mx-auto max-w-3xl">
                {/* Hidden file input */}
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    className="hidden"
                    onChange={handleFileChange}
                    aria-label="Attach files"
                />

                {/* Attached files preview */}
                {files.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-2">
                        {files.map( ( file, idx ) => (
                            <div
                                key={`${file.name}-${idx}`}
                                className="flex items-center gap-1.5 rounded-lg bg-muted px-2.5 py-1 text-xs"
                            >
                                <span className="truncate max-w-37.5">{file.name}</span>
                                <button
                                    onClick={() => removeFile( idx )}
                                    className="shrink-0 rounded-full p-0.5 hover:bg-background/80"
                                    title="Remove file"
                                >
                                    <X className="h-3 w-3" />
                                </button>
                            </div>
                        ) )}
                    </div>
                )}

                {/* Input area */}
                <div
                    className={cn(
                        "flex items-end gap-2 rounded-2xl border border-border bg-card px-3 py-2",
                        "focus-within:ring-1 focus-within:ring-ring",
                    )}
                >
                    {/* Attach button */}
                    <button
                        onClick={handleFileSelect}
                        className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                            "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                        title="Attach files"
                    >
                        <Paperclip className="h-4 w-4" />
                    </button>

                    {/* Textarea */}
                    <Textarea
                        ref={textareaRef}
                        value={input}
                        onChange={( e ) => setInput( e.target.value )}
                        onKeyDown={handleKeyDown}
                        placeholder={placeholder || "Ask MediSync AI anything..."}
                        disabled={disabled}
                        className="min-h-10 max-h-40 flex-1 resize-none border-0 bg-transparent p-0 text-sm shadow-none focus-visible:ring-0"
                        rows={1}
                    />

                    {/* Send / Stop button */}
                    <button
                        onClick={handleSend}
                        disabled={( !input.trim() && files.length === 0 ) || disabled}
                        className={cn(
                            "flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors",
                            ( input.trim() || files.length > 0 ) && !disabled
                                ? "bg-primary text-primary-foreground hover:opacity-90"
                                : "bg-muted text-muted-foreground cursor-not-allowed",
                        )}
                        title={disabled ? "Stop" : "Send message"}
                    >
                        {disabled ? (
                            <Square className="h-3 w-3 fill-current" />
                        ) : (
                            <ArrowUp className="h-4 w-4" />
                        )}
                    </button>
                </div>

                <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
                    MediSync AI can make mistakes. Always consult a healthcare professional.
                </p>
            </div>
        </div>
    );
}
