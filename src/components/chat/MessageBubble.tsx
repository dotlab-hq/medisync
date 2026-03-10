import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

type MessageBubbleProps = {
    role: "user" | "assistant" | "system";
    children: React.ReactNode;
};

export default function MessageBubble( { role, children }: MessageBubbleProps ) {
    const isUser = role === "user";
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

            {/* Content */}
            <div
                className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                    isUser
                        ? "bg-primary text-primary-foreground rounded-br-sm"
                        : "bg-muted rounded-bl-sm",
                )}
            >
                {children}
            </div>
        </div>
    );
}
