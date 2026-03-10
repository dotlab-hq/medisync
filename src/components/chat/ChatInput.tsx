import { ArrowUp, Paperclip, Square } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { useMicDictateStore } from "./stores/useMicDictate";
import { useFileStore } from "./stores/useFileStore";
import { ChatTextarea } from "./input/ChatTextarea";
import { InputUploadFiles } from "./input/InputUploadFiles";
import { RecordingInterface } from "./input/RecordingInterface";
import { MicButton } from "./input/MicButton"; import { useChatTextarea } from "./hooks/useChatTextarea"; import { useChatTextareaStore } from "./stores/useChatTextarea";

type ChatInputProps = {
    onSend: ( text: string, files?: File[] ) => void;
    onStop?: () => void;
    disabled?: boolean;
    placeholder?: string;
};

export default function ChatInput( { onSend, onStop, disabled, placeholder }: ChatInputProps ) {
    const {
        textareaRef,
        value,
        lineHeight,
        handleInput,
    } = useChatTextarea( {
        lineHeight: 24,
        maxLines: 7,
    } );

    const { setText } = useChatTextareaStore();
    const fileInputRef = useRef<HTMLInputElement>( null );

    useEffect( () => {
        if ( textareaRef.current ) {
            textareaRef.current.focus();
        }
    }, [] );

    const { isRecording } = useMicDictateStore();
    const { files, hasFiles, addFiles, clearFiles } = useFileStore();

    const handleSend = useCallback( () => {
        const text = value.trim();
        if ( ( !text && !hasFiles ) || disabled ) return;

        onSend( text, hasFiles ? files : undefined );

        // Reset textarea
        if ( textareaRef.current ) {
            textareaRef.current.value = "";
            textareaRef.current.style.height = `${lineHeight}px`;
            setText( "" );
        }
        clearFiles();
    }, [value, files, hasFiles, disabled, onSend, textareaRef, lineHeight, setText, clearFiles] );

    const handleKeyDown = useCallback(
        ( e: KeyboardEvent ) => {
            if ( e.key === "Enter" && !e.shiftKey ) {
                e.preventDefault();
                handleSend();
            }
        },
        [handleSend]
    );

    // Attach keydown to textarea
    useEffect( () => {
        const textarea = textareaRef.current;
        if ( !textarea ) return;
        textarea.addEventListener( "keydown", handleKeyDown );
        return () => textarea.removeEventListener( "keydown", handleKeyDown );
    }, [textareaRef, handleKeyDown] );

    const handleFileSelect = useCallback( () => {
        fileInputRef.current?.click();
    }, [] );

    const handleFileChange = useCallback(
        ( e: React.ChangeEvent<HTMLInputElement> ) => {
            const selectedFiles = Array.from( e.target.files || [] );
            addFiles( selectedFiles );
            if ( fileInputRef.current ) fileInputRef.current.value = "";
        },
        [addFiles]
    );

    const handleTranscribed = useCallback(
        ( text: string ) => {
            if ( textareaRef.current ) {
                const newValue = value ? `${value} ${text}` : text;
                textareaRef.current.value = newValue;
                setText( newValue );

                // Manually trigger height adjustment
                textareaRef.current.style.height = "auto";
                const scrollHeight = textareaRef.current.scrollHeight;
                const maxHeight = lineHeight * 7; // maxLines
                textareaRef.current.style.height = `${Math.min( scrollHeight, maxHeight )}px`;
            }
        },
        [value, textareaRef, setText, lineHeight]
    );

    return (
        <div className="border-t border-border/50 bg-background p-3">
            <div className="mx-auto max-w-3xl">
                <div
                    className={cn(
                        "flex flex-col",
                        "border border-border bg-card",
                        "rounded-2xl px-2",
                        "w-full"
                    )}
                >
                    {/* Hidden file input */}
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        onChange={handleFileChange}
                        aria-label="Upload files"
                    />

                    {/* Uploaded files preview */}
                    {!isRecording && <InputUploadFiles />}

                    <div
                        className={cn(
                            "w-full transition-all duration-200",
                            "py-3 flex flex-col gap-3 px-4"
                        )}
                    >
                        {/* Recording UI */}
                        {isRecording ? (
                            <RecordingInterface onTranscribed={handleTranscribed} />
                        ) : (
                            <>
                                {/* Textarea */}
                                <ChatTextarea
                                    textareaRef={textareaRef}
                                    value={value}
                                    lineHeight={lineHeight}
                                    onInput={handleInput}
                                    disabled={disabled}
                                    placeholder={placeholder || "Ask MediSync AI anything..."}
                                />

                                {/* Action bar */}
                                <div className="flex items-center justify-between w-full">
                                    {/* Left: file attach */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={handleFileSelect}
                                            className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                                                "text-muted-foreground hover:text-foreground hover:bg-muted"
                                            )}
                                            title="Attach files"
                                            disabled={disabled}
                                        >
                                            <Paperclip className="h-4 w-4" />
                                        </button>
                                    </div>

                                    {/* Right: mic + send */}
                                    <div className="flex items-center gap-2">
                                        <button
                                            className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                                                "text-muted-foreground hover:text-foreground"
                                            )}
                                            title="Voice input"
                                            disabled={disabled}
                                        >
                                            <MicButton />
                                        </button>

                                        <button
                                            onClick={disabled ? onStop : handleSend}
                                            disabled={!disabled && !value.trim() && !hasFiles}
                                            className={cn(
                                                "flex h-8 w-8 items-center justify-center rounded-full transition-colors",
                                                disabled
                                                    ? "bg-destructive text-destructive-foreground hover:opacity-90"
                                                    : ( value.trim() || hasFiles )
                                                        ? "bg-primary text-primary-foreground hover:opacity-90"
                                                        : "bg-muted text-muted-foreground cursor-not-allowed"
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
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <p className="mt-1.5 text-center text-[10px] text-muted-foreground">
                    MediSync AI can make mistakes. Always consult a healthcare professional.
                </p>
            </div>
        </div>
    );
}
