import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type ReasoningBlockProps = {
    reasoning: string;
    className?: string;
};

export default function ReasoningBlock( { reasoning, className }: ReasoningBlockProps ) {
    const [isExpanded, setIsExpanded] = useState( false );

    if ( !reasoning ) return null;

    return (
        <div
            className={cn(
                "rounded-lg border border-border/50 bg-muted/30 overflow-hidden",
                className,
            )}
        >
            <button
                onClick={() => setIsExpanded( !isExpanded )}
                className={cn(
                    "flex items-center gap-2 w-full px-3 py-2 text-left",
                    "text-sm font-medium text-muted-foreground",
                    "hover:bg-muted/50 transition-colors",
                )}
            >
                <ChevronRight
                    className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        isExpanded && "rotate-90",
                    )}
                />
                <span>Reasoning</span>
                {!isExpanded && (
                    <span className="text-xs text-muted-foreground/60 ml-2 truncate max-w-[200px]">
                        {reasoning.substring( 0, 80 )}…
                    </span>
                )}
            </button>

            <div
                className={cn(
                    "grid transition-all duration-200 ease-in-out",
                    isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                )}
            >
                <div className="overflow-hidden">
                    <div className="px-3 pb-3 pt-1 text-sm text-muted-foreground whitespace-pre-wrap border-t border-border/30">
                        {reasoning}
                    </div>
                </div>
            </div>
        </div>
    );
}
