import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Folder, Pencil, Trash2, HardDrive } from "lucide-react";

function formatBytes(bytes: number): string {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}

interface FolderItem {
    id: string;
    name: string;
    labels: string[];
}

interface StorageInfo {
    usedBytes: number;
    quotaBytes: number;
}

interface FolderSidebarProps {
    folders: FolderItem[];
    totalDocCount: number;
    docCountByFolder: Record<string, number>;
    selectedFolderId: string | null;
    onSelectFolder: (id: string | null) => void;
    onEditFolder: (folder: FolderItem) => void;
    onDeleteFolder: (id: string) => void;
    storage: StorageInfo | undefined;
}

export function FolderSidebar({
    folders,
    totalDocCount,
    docCountByFolder,
    selectedFolderId,
    onSelectFolder,
    onEditFolder,
    onDeleteFolder,
    storage,
}: FolderSidebarProps) {
    return (
        <div className="w-56 shrink-0 flex flex-col">
            <div className="space-y-1 flex-1">
                <p className="text-xs font-semibold uppercase text-muted-foreground px-2 mb-2">
                    Folders
                </p>
                <button
                    onClick={() => onSelectFolder(null)}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedFolderId === null
                            ? "bg-primary text-primary-foreground"
                            : "hover:bg-muted"
                    }`}
                >
                    <Folder className="h-4 w-4" />
                    All Files
                    <span className="ml-auto text-xs opacity-60">{totalDocCount}</span>
                </button>

                {folders.map((folder) => {
                    const count = docCountByFolder[folder.id] ?? 0;
                    return (
                        <div
                            key={folder.id}
                            className={`group w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${
                                selectedFolderId === folder.id
                                    ? "bg-primary text-primary-foreground"
                                    : "hover:bg-muted"
                            }`}
                            onClick={() => onSelectFolder(folder.id)}
                        >
                            <Folder className="h-4 w-4 shrink-0" />
                            <span className="truncate flex-1">{folder.name}</span>
                            <span className="text-xs opacity-60 mr-1">{count}</span>
                            <div
                                className="hidden group-hover:flex gap-0.5"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button
                                    className="p-0.5 rounded hover:bg-white/20"
                                    title="Edit"
                                    onClick={() => onEditFolder(folder)}
                                >
                                    <Pencil className="h-3 w-3" />
                                </button>
                                <button
                                    className="p-0.5 rounded hover:bg-destructive/20"
                                    title="Delete"
                                    onClick={() => onDeleteFolder(folder.id)}
                                >
                                    <Trash2 className="h-3 w-3 text-destructive" />
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Storage usage at bottom of sidebar */}
            {storage && (
                <Card className="mt-4 border-border/50">
                    <CardContent className="pt-3 pb-3 px-3">
                        <div className="flex items-center gap-2">
                            <HardDrive className="h-4 w-4 text-muted-foreground shrink-0" />
                            <div className="flex-1 space-y-1 min-w-0">
                                <div className="flex justify-between text-xs">
                                    <span className="font-medium">Storage</span>
                                    <span className="text-muted-foreground">
                                        {formatBytes(storage.usedBytes)} / {formatBytes(storage.quotaBytes)}
                                    </span>
                                </div>
                                <Progress
                                    value={(storage.usedBytes / storage.quotaBytes) * 100}
                                    className="h-1.5"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
