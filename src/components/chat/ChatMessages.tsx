import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from "lucide-react";

type MessagePart = {
    type: string;
    content?: string;
    text?: string;
    name?: string;
    input?: Record<string, unknown>;
    output?: Record<string, unknown>;
};

type Attachment = {
    name: string;
    type: string;
    size: number;
    url: string;
};

type UIMessage = {
    id: string;
    role: "user" | "assistant" | "system";
    parts: MessagePart[];
    reasoning?: string | null;
    attachments?: Attachment[] | null;
    inputTokens?: number | null;
    outputTokens?: number | null;
    modelUsed?: string | null;
};

type ChatMessagesProps = {
    messages: UIMessage[];
    isLoading: boolean;
};

function renderParts( parts: MessagePart[] ) {
    return parts.map( ( part, idx ) => {
        if ( part.type === "thinking" ) {
            return (
                <div key={idx} className="text-xs italic text-muted-foreground mb-1">
                    💭 {part.content}
                </div>
            );
        }
        if ( part.type === "text" ) {
            return <span key={idx}>{part.content ?? part.text}</span>;
        }
        if ( part.type === "tool-call" ) {
            return (
                <div
                    key={idx}
                    className="my-1 rounded-md border border-border/50 bg-background/50 px-3 py-2 text-xs"
                >
                    <span className="font-mono text-muted-foreground">
                        🔧 {part.name}
                    </span>
                    {part.output && (
                        <div className="mt-1">
                            {renderToolOutput( part.output )}
                        </div>
                    )}
                </div>
            );
        }
        return null;
    } );
}

function renderToolOutput( output: Record<string, unknown> ) {
    if ( "url" in output && "fileName" in output ) {
        return (
            <a
                href={output.url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary underline"
            >
                📎 {output.fileName as string}
            </a>
        );
    }
    if ( "files" in output && Array.isArray( output.files ) ) {
        return (
            <ul className="list-inside list-disc space-y-0.5">
                {( output.files as Array<{ id: string; fileName: string }> ).map( ( f ) => (
                    <li key={f.id}>{f.fileName}</li>
                ) )}
            </ul>
        );
    }
    return <pre className="whitespace-pre-wrap">{JSON.stringify( output, null, 2 )}</pre>;
}

export default function ChatMessages( { messages, isLoading }: ChatMessagesProps ) {
    const bottomRef = useRef<HTMLDivElement>( null );

    useEffect( () => {
        bottomRef.current?.scrollIntoView( { behavior: "smooth" } );
    }, [messages, isLoading] );

    return (
        <div className="flex-1 overflow-y-auto">
            {messages.length === 0 && !isLoading && (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-muted-foreground">
                    <Bot className="h-12 w-12 opacity-30" />
                    <p className="text-sm">Start a conversation with MediSync AI</p>
                </div>
            )}

            {messages.map( ( msg ) => (
                <MessageBubble
                    key={msg.id}
                    role={msg.role}
                    reasoning={msg.reasoning}
                    attachments={msg.attachments}
                    inputTokens={msg.inputTokens}
                    outputTokens={msg.outputTokens}
                    modelUsed={msg.modelUsed}
                >
                    {renderParts( msg.parts )}
                </MessageBubble>
            ) )}

            {isLoading && (
                <div className="flex gap-3 px-4 py-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted">
                        <Bot className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-4 w-32" />
                    </div>
                </div>
            )}

            <div ref={bottomRef} />
        </div>
    );
}
