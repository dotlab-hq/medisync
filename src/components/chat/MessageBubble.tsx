import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import ReasoningBlock from "./ReasoningBlock";

type Attachment = {
    name: string;
    type: string;
    size: number;
    url: string;
};

type MessageBubbleProps = {
    role: "user" | "assistant" | "system";
    reasoning?: string | null;
    attachments?: Attachment[] | null;
    inputTokens?: number | null;
    outputTokens?: number | null;
    modelUsed?: string | null;
    children: React.ReactNode;
};

function formatFileSize( bytes: number ): string {
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let idx = 0;
    while ( size >= 1024 && idx < units.length - 1 ) {
        size /= 1024;
        idx++;
    }
    return `${size.toFixed( 1 )} ${units[idx]}`;
}

export default function MessageBubble( {
    role,
    reasoning,
    attachments,
    inputTokens,
    outputTokens,
    modelUsed,
    children,
}: MessageBubbleProps ) {
    const isUser = role === "user";
    const isAssistant = role === "assistant";

    return (
        <div
            className={cn(
                "flex gap-3 px-4 py-3 animate-in fade-in slide-in-from-bottom-2 duration-300",
                isUser ? "flex-row-reverse" : "flex-row",
            )}
        >
            {/* Avatar */}
            <div
                className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    isUser
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground",
                )}
            >
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </div>

            {/* Content column */}
            <div className={cn( "flex flex-col gap-2 max-w-[75%]", isUser && "items-end" )}>
                {/* Reasoning block (assistant only) */}
                {isAssistant && reasoning && (
                    <ReasoningBlock reasoning={reasoning} />
                )}

                {/* Bubble */}
                <div
                    className={cn(
                        "rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                        isUser
                            ? "bg-primary text-primary-foreground rounded-br-sm"
                            : "bg-muted rounded-bl-sm",
                    )}
                >
                    {children}
                </div>

                {/* Attachments */}
                {attachments && attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-1">
                        {attachments.map( ( att, idx ) => {
                            const isImage = att.type.startsWith( "image/" );
                            if ( isImage ) {
                                return (
                                    <a key={idx} href={att.url} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={att.url}
                                            alt={att.name}
                                            className="max-w-50 max-h-50 rounded-lg border border-border object-cover"
                                        />
                                    </a>
                                );
                            }
                            return (
                                <a
                                    key={idx}
                                    href={att.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border hover:bg-accent/50 transition-colors w-44"
                                >
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs font-medium truncate text-foreground">{att.name}</p>
                                        <p className="text-xs text-muted-foreground">{formatFileSize( att.size )}</p>
                                    </div>
                                </a>
                            );
                        } )}
                    </div>
                )}

                {/* Token usage (subtle) */}
                {isAssistant && ( inputTokens || outputTokens ) && (
                    <div className="flex gap-3 text-[10px] text-muted-foreground/50 px-1">
                        {inputTokens && <span>{inputTokens} in</span>}
                        {outputTokens && <span>{outputTokens} out</span>}
                        {modelUsed && <span>{modelUsed}</span>}
                    </div>
                )}
            </div>
        </div>
    );
}
