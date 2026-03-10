import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { FileText, Folder, Lock, Trash2 } from "lucide-react";
import { getPresignedViewUrl } from "@/server/documents";
import { formatBytes } from "@/lib/utils";

interface DocumentItem {
    id: string;
    fileName: string;
    fileType: string;
    fileSize: number;
    isConfidential: boolean;
    description: string | null;
    labels: string[];
    folderId: string | null;
    folder: { id: string; name: string } | null;
}

interface DocumentGridProps {
    documents: DocumentItem[];
    allDocumentsCount: number;
    isLoading: boolean;
    onDelete: (id: string) => void;
}

export function DocumentGrid({
    documents,
    allDocumentsCount,
    isLoading,
    onDelete,
}: DocumentGridProps) {
    if (isLoading) {
        return (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" />
                ))}
            </div>
        );
    }

    if (documents.length === 0) {
        return (
            <Card className="border-border/50">
                <CardContent className="flex flex-col items-center justify-center py-16">
                    <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                    <p className="text-muted-foreground text-sm">
                        {allDocumentsCount === 0
                            ? "No documents uploaded yet"
                            : "No documents match the current filter"}
                    </p>
                </CardContent>
            </Card>
        );
    }

    return (
        <TooltipProvider>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {documents.map((doc) => (
                    <Card key={doc.id} className="group border-border/50">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between gap-2">
                                <div className="flex items-center gap-2 min-w-0">
                                    <FileText className="h-4 w-4 shrink-0 text-primary" />
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <span className="font-medium text-sm line-clamp-1">
                                                {doc.fileName}
                                            </span>
                                        </TooltipTrigger>
                                        <TooltipContent>{doc.fileName}</TooltipContent>
                                    </Tooltip>
                                </div>
                                <div className="flex items-center gap-1 shrink-0">
                                    {doc.isConfidential && (
                                        <Lock className="h-3.5 w-3.5 text-destructive" />
                                    )}
                                    <button
                                        className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-destructive/10 rounded"
                                        onClick={() => onDelete(doc.id)}
                                        title="Delete"
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                                <span>{formatBytes(doc.fileSize)}</span>
                                <span>
                                    {doc.fileType.split("/")[1]?.toUpperCase() ?? doc.fileType}
                                </span>
                            </div>
                            {doc.folder && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Folder className="h-3 w-3" />
                                    {doc.folder.name}
                                </div>
                            )}
                            {doc.description && (
                                <p className="text-xs text-muted-foreground truncate">
                                    {doc.description}
                                </p>
                            )}
                            {doc.labels.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {doc.labels.map((label) => (
                                        <Badge key={label} variant="secondary" className="text-xs">
                                            {label}
                                        </Badge>
                                    ))}
                                </div>
                            )}
                            <button
                                type="button"
                                className="block text-xs text-primary hover:underline mt-1 text-left cursor-pointer"
                                onClick={async () => {
                                    try {
                                        const { url } = await getPresignedViewUrl({
                                            data: { id: doc.id },
                                        });
                                        window.open(url, "_blank", "noopener,noreferrer");
                                    } catch {
                                        alert("Could not generate view link. Please try again.");
                                    }
                                }}
                            >
                                View file ↗
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </TooltipProvider>
    );
}
