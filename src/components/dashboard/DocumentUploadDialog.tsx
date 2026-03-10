import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import type { TagifyInputProps } from "./TagifyInput";
import { useFileUpload } from "./useFileUpload";
import { formatBytes } from "@/lib/utils";

interface Folder {
    id: string;
    name: string;
    labels: string[];
}

interface DocumentUploadDialogProps {
    folders: Folder[];
    TagifyInput: React.ComponentType<TagifyInputProps>;
}

export function DocumentUploadDialog({ folders, TagifyInput }: DocumentUploadDialogProps) {
    const [open, setOpen] = useState(false);
    const [folderId, setFolderId] = useState("none");
    const [labels, setLabels] = useState<string[]>([]);
    const [description, setDescription] = useState("");
    const [confidential, setConfidential] = useState(false);

    const {
        files,
        uploading,
        hasValidFiles,
        allDone,
        handleFileSelect,
        removeFile,
        resetFiles,
        uploadAll,
    } = useFileUpload();

    const resetAll = useCallback(() => {
        resetFiles();
        setFolderId("none");
        setLabels([]);
        setDescription("");
        setConfidential(false);
    }, [resetFiles]);

    const handleUpload = useCallback(async () => {
        const ok = await uploadAll({ folderId, labels, description, confidential });
        if (ok) {
            setOpen(false);
            resetAll();
        }
    }, [uploadAll, folderId, labels, description, confidential, resetAll]);

    return (
        <Dialog
            open={open}
            onOpenChange={(v) => {
                if (!v) resetAll();
                setOpen(v);
            }}
        >
            <DialogTrigger asChild>
                <Button>
                    <Upload className="h-4 w-4 mr-2" /> Upload Files
                </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload Documents</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="fileInput">Files (max 10 MB each)</Label>
                        <Input id="fileInput" type="file" multiple onChange={handleFileSelect} />
                    </div>

                    {files.length > 0 && (
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                            {files.map((entry, i) => (
                                <div key={`${entry.file.name}-${i}`} className="flex items-center gap-2 text-xs">
                                    <span className="truncate flex-1 min-w-0">
                                        {entry.file.name} — {formatBytes(entry.file.size)}
                                    </span>
                                    {entry.error && <span className="text-destructive shrink-0">{entry.error}</span>}
                                    {entry.done && <span className="text-green-600 shrink-0">✓</span>}
                                    {entry.progress !== null && !entry.done && (
                                        <span className="text-muted-foreground shrink-0">{entry.progress}%</span>
                                    )}
                                    {!uploading && (
                                        <button type="button" className="p-0.5 hover:bg-muted rounded shrink-0" onClick={() => removeFile(i)}>
                                            <X className="h-3 w-3" />
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {uploading && files.some((f) => f.progress !== null && !f.done) && (
                        <Progress
                            value={files.reduce((s, f) => s + (f.progress ?? 0), 0) / Math.max(files.filter((f) => !f.error).length, 1)}
                            className="h-2"
                        />
                    )}

                    <div className="space-y-2">
                        <Label>Folder (optional)</Label>
                        <Select value={folderId} onValueChange={setFolderId}>
                            <SelectTrigger><SelectValue placeholder="No folder" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="none">No folder</SelectItem>
                                {folders.map((f) => (
                                    <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="uploadLabels">Labels</Label>
                        <TagifyInput id="uploadLabels" placeholder="Type and press Enter to add labels…" onChange={setLabels} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="uploadDesc">Description</Label>
                        <Input id="uploadDesc" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Optional description" />
                    </div>

                    <div className="flex items-center gap-2">
                        <Checkbox id="uploadConf" checked={confidential} onCheckedChange={(v) => setConfidential(!!v)} />
                        <Label htmlFor="uploadConf">Mark as confidential</Label>
                    </div>

                    <Button className="w-full" disabled={!hasValidFiles || uploading} onClick={handleUpload}>
                        {uploading ? "Uploading…" : allDone ? "All done" : `Upload ${files.filter((f) => !f.error).length} file(s)`}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
