import { useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
    generatePresignedUploadUrl,
    createDocument,
} from "@/server/documents";
import { MAX_FILE_BYTES } from "@/lib/utils";

export interface FileUploadEntry {
    file: File;
    progress: number | null;
    error: string | null;
    done: boolean;
}

interface UploadOptions {
    folderId: string;
    labels: string[];
    description: string;
    confidential: boolean;
}

export function useFileUpload() {
    const queryClient = useQueryClient();
    const [files, setFiles] = useState<FileUploadEntry[]>([]);
    const [uploading, setUploading] = useState(false);

    const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files;
        if (!selected) return;
        setFiles(
            Array.from(selected).map((file) => ({
                file,
                progress: null,
                error: file.size > MAX_FILE_BYTES ? "File exceeds the 10 MB limit." : null,
                done: false,
            })),
        );
    }, []);

    const removeFile = useCallback((index: number) => {
        setFiles((prev) => prev.filter((_, i) => i !== index));
    }, []);

    const resetFiles = useCallback(() => {
        setFiles([]);
        setUploading(false);
    }, []);

    const uploadAll = useCallback(
        async (opts: UploadOptions) => {
            const valid = files.filter((f) => !f.error && !f.done);
            if (valid.length === 0) return true;
            setUploading(true);

            for (let idx = 0; idx < files.length; idx++) {
                const entry = files[idx];
                if (entry.error || entry.done) continue;

                try {
                    const { uploadUrl, s3Key } = await generatePresignedUploadUrl({
                        data: {
                            fileName: entry.file.name,
                            fileType: entry.file.type || "application/octet-stream",
                            fileSize: entry.file.size,
                        },
                    });

                    await new Promise<void>((resolve, reject) => {
                        const xhr = new XMLHttpRequest();
                        xhr.open("PUT", uploadUrl);
                        xhr.setRequestHeader(
                            "Content-Type",
                            entry.file.type || "application/octet-stream",
                        );
                        xhr.upload.onprogress = (e) => {
                            if (e.lengthComputable) {
                                const pct = Math.round((e.loaded / e.total) * 100);
                                setFiles((prev) =>
                                    prev.map((f, i) => (i === idx ? { ...f, progress: pct } : f)),
                                );
                            }
                        };
                        xhr.onload = () =>
                            xhr.status >= 200 && xhr.status < 300
                                ? resolve()
                                : reject(new Error(`S3 ${xhr.status}`));
                        xhr.onerror = () => reject(new Error("Network error"));
                        xhr.send(entry.file);
                    });

                    await createDocument({
                        data: {
                            folderId: opts.folderId === "none" ? null : opts.folderId,
                            fileName: entry.file.name,
                            fileType: entry.file.type || "application/octet-stream",
                            fileSize: entry.file.size,
                            s3Key,
                            labels: opts.labels,
                            description: opts.description || undefined,
                            isConfidential: opts.confidential,
                        },
                    });

                    setFiles((prev) =>
                        prev.map((f, i) =>
                            i === idx ? { ...f, done: true, progress: 100 } : f,
                        ),
                    );
                } catch (err) {
                    const msg = err instanceof Error ? err.message : "Upload failed";
                    setFiles((prev) =>
                        prev.map((f, i) =>
                            i === idx ? { ...f, error: msg, progress: null } : f,
                        ),
                    );
                }
            }

            queryClient.invalidateQueries({ queryKey: ["documents"] });
            queryClient.invalidateQueries({ queryKey: ["userStorage"] });
            setUploading(false);
            return !files.some((f) => f.error);
        },
        [files, queryClient],
    );

    const hasValidFiles = files.some((f) => !f.error && !f.done);
    const allDone = files.length > 0 && files.every((f) => f.done || f.error);

    return {
        files,
        uploading,
        hasValidFiles,
        allDone,
        handleFileSelect,
        removeFile,
        resetFiles,
        uploadAll,
    };
}
