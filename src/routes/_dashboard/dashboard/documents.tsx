import { createFileRoute } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState, useRef, useEffect, useCallback } from "react";
import {
    getUserStorage,
    listFolders,
    listAllDocuments,
    createFolder,
    deleteFolder,
    updateFolder,
    generatePresignedUploadUrl,
    createDocument,
    deleteDocument,
    getPresignedViewUrl,
} from "@/server/documents";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Card,
    CardContent,
    CardHeader,
} from "@/components/ui/card";
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
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Folder,
    FolderPlus,
    FileText,
    Trash2,
    Upload,
    X,
    Lock,
    HardDrive,
    Filter,
    Pencil,
} from "lucide-react";
import "@yaireo/tagify/dist/tagify.css";
import Tagify from "@yaireo/tagify";

// ── Constants ────────────────────────────────────────────────────────
const MAX_FILE_BYTES = 10 * 1024 * 1024; // 10 MB

function formatBytes( bytes: number ): string {
    if ( bytes === 0 ) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor( Math.log( bytes ) / Math.log( k ) );
    return `${( bytes / Math.pow( k, i ) ).toFixed( 1 )} ${sizes[i]}`;
}

// ── Tagify wrapper ────────────────────────────────────────────────────
interface TagifyInputProps {
    placeholder?: string;
    defaultValue?: string[];
    onChange: ( tags: string[] ) => void;
    id?: string;
}

function TagifyInput( { placeholder, defaultValue, onChange, id }: TagifyInputProps ) {
    const inputRef = useRef<HTMLInputElement>( null );
    const tagifyRef = useRef<Tagify | null>( null );

    useEffect( () => {
        if ( !inputRef.current ) return;
        const instance = new Tagify( inputRef.current, {
            placeholder: placeholder ?? "Add labels…",
            maxTags: 20,
        } );
        instance.on( "change", () => {
            onChange( instance.value.map( ( t ) => t.value ) );
        } );
        if ( defaultValue && defaultValue.length > 0 ) instance.addTags( defaultValue );
        tagifyRef.current = instance;
        return () => { instance.destroy(); tagifyRef.current = null; };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [] );

    return (
        <input
            ref={inputRef}
            id={id}
            aria-label={placeholder ?? "Add labels"}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
        />
    );
}

export const Route = createFileRoute( "/_dashboard/dashboard/documents" )( {
    component: DocumentsPage,
} );

function DocumentsPage() {
    const queryClient = useQueryClient();

    // Filters
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>( null );
    const [activeLabels, setActiveLabels] = useState<string[]>( [] );

    // Dialogs
    const [uploadOpen, setUploadOpen] = useState( false );
    const [folderOpen, setFolderOpen] = useState( false );
    const [editFolderOpen, setEditFolderOpen] = useState<string | null>( null );

    // Upload state
    const [selectedFile, setSelectedFile] = useState<File | null>( null );
    const [uploadProgress, setUploadProgress] = useState<number | null>( null );
    const [uploadFolderId, setUploadFolderId] = useState<string>( "none" );
    const [uploadLabels, setUploadLabels] = useState<string[]>( [] );
    const [uploadDescription, setUploadDescription] = useState( "" );
    const [uploadConfidential, setUploadConfidential] = useState( false );
    const [fileError, setFileError] = useState<string | null>( null );

    // Folder form state
    const [folderName, setFolderName] = useState( "" );
    const [folderLabels, setFolderLabels] = useState<string[]>( [] );
    const [editFolderName, setEditFolderName] = useState( "" );
    const [editFolderLabels, setEditFolderLabels] = useState<string[]>( [] );

    // Queries
    const { data: storage } = useQuery( {
        queryKey: ["userStorage"],
        queryFn: () => getUserStorage(),
    } );

    const { data: folders = [] } = useQuery( {
        queryKey: ["folders"],
        queryFn: () => listFolders(),
    } );

    const { data: allDocuments = [], isLoading: docsLoading } = useQuery( {
        queryKey: ["documents"],
        queryFn: () => listAllDocuments(),
    } );

    // Mutations
    const createFolderMutation = useMutation( {
        mutationFn: createFolder,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ["folders"] } );
            setFolderOpen( false );
            setFolderName( "" );
            setFolderLabels( [] );
        },
    } );

    const updateFolderMutation = useMutation( {
        mutationFn: updateFolder,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ["folders"] } );
            setEditFolderOpen( null );
        },
    } );

    const deleteFolderMutation = useMutation( {
        mutationFn: deleteFolder,
        onSuccess: ( _data, vars ) => {
            queryClient.invalidateQueries( { queryKey: ["folders"] } );
            queryClient.invalidateQueries( { queryKey: ["documents"] } );
            const id = ( vars as { data: { id: string } } )?.data?.id;
            if ( id && selectedFolderId === id ) setSelectedFolderId( null );
        },
    } );

    const deleteDocMutation = useMutation( {
        mutationFn: deleteDocument,
        onSuccess: () => {
            queryClient.invalidateQueries( { queryKey: ["documents"] } );
            queryClient.invalidateQueries( { queryKey: ["userStorage"] } );
        },
    } );

    // Derived
    const allLabels = Array.from(
        new Set( [
            ...folders.flatMap( ( f ) => f.labels ),
            ...allDocuments.flatMap( ( d ) => d.labels ),
        ] ),
    );

    const filteredDocuments = allDocuments.filter( ( doc ) => {
        if ( selectedFolderId !== null && doc.folderId !== selectedFolderId ) return false;
        if ( activeLabels.length > 0 && !activeLabels.every( ( l ) => doc.labels.includes( l ) ) )
            return false;
        return true;
    } );

    // Upload handler – direct-to-S3 with progress
    const handleUpload = useCallback( async () => {
        if ( !selectedFile ) return;
        setFileError( null );
        if ( selectedFile.size > MAX_FILE_BYTES ) {
            setFileError( "File exceeds the 10 MB limit." );
            return;
        }
        try {
            const { uploadUrl, s3Key } = await generatePresignedUploadUrl( {
                data: {
                    fileName: selectedFile.name,
                    fileType: selectedFile.type || "application/octet-stream",
                    fileSize: selectedFile.size,
                },
            } );

            await new Promise<void>( ( resolve, reject ) => {
                const xhr = new XMLHttpRequest();
                xhr.open( "PUT", uploadUrl );
                xhr.setRequestHeader( "Content-Type", selectedFile.type || "application/octet-stream" );
                xhr.upload.onprogress = ( e ) => {
                    if ( e.lengthComputable ) setUploadProgress( Math.round( ( e.loaded / e.total ) * 100 ) );
                };
                xhr.onload = () => ( xhr.status >= 200 && xhr.status < 300 ? resolve() : reject( new Error( `S3 ${xhr.status}` ) ) );
                xhr.onerror = () => reject( new Error( "Network error" ) );
                xhr.send( selectedFile );
            } );

            await createDocument( {
                data: {
                    folderId: uploadFolderId === "none" ? null : uploadFolderId,
                    fileName: selectedFile.name,
                    fileType: selectedFile.type || "application/octet-stream",
                    fileSize: selectedFile.size,
                    s3Key,
                    labels: uploadLabels,
                    description: uploadDescription || undefined,
                    isConfidential: uploadConfidential,
                },
            } );

            queryClient.invalidateQueries( { queryKey: ["documents"] } );
            queryClient.invalidateQueries( { queryKey: ["userStorage"] } );
            setUploadOpen( false );
            setSelectedFile( null );
            setUploadProgress( null );
            setUploadLabels( [] );
            setUploadDescription( "" );
            setUploadConfidential( false );
            setUploadFolderId( "none" );
        } catch ( err ) {
            setFileError( err instanceof Error ? err.message : "Upload failed" );
            setUploadProgress( null );
        }
    }, [selectedFile, uploadFolderId, uploadLabels, uploadDescription, uploadConfidential, queryClient] );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-3">
                <div>
                    <h1 className="text-2xl font-bold">Documents</h1>
                    <p className="text-muted-foreground">Manage your medical files and records</p>
                </div>
                <div className="flex gap-2">
                    {/* Create folder dialog */}
                    <Dialog open={folderOpen} onOpenChange={setFolderOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline">
                                <FolderPlus className="h-4 w-4 mr-2" /> New Folder
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Create Folder</DialogTitle></DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="folderName">Folder Name</Label>
                                    <Input
                                        id="folderName"
                                        value={folderName}
                                        onChange={( e ) => setFolderName( e.target.value )}
                                        placeholder="e.g. Blood Tests"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="folderLabels">Labels</Label>
                                    <TagifyInput
                                        id="folderLabels"
                                        placeholder="Type and press Enter to add labels…"
                                        onChange={setFolderLabels}
                                    />
                                </div>
                                <Button
                                    className="w-full"
                                    disabled={!folderName.trim() || createFolderMutation.isPending}
                                    onClick={() =>
                                        createFolderMutation.mutate( { data: { name: folderName.trim(), labels: folderLabels } } )
                                    }
                                >
                                    {createFolderMutation.isPending ? "Creating…" : "Create Folder"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    {/* Upload dialog */}
                    <Dialog
                        open={uploadOpen}
                        onOpenChange={( v ) => {
                            if ( !v ) { setSelectedFile( null ); setUploadProgress( null ); setFileError( null ); }
                            setUploadOpen( v );
                        }}
                    >
                        <DialogTrigger asChild>
                            <Button><Upload className="h-4 w-4 mr-2" /> Upload File</Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Upload Document</DialogTitle></DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="fileInput">File (max 10 MB)</Label>
                                    <Input
                                        id="fileInput"
                                        type="file"
                                        onChange={( e ) => {
                                            const file = e.target.files?.[0] ?? null;
                                            setSelectedFile( file );
                                            setFileError( null );
                                            if ( file && file.size > MAX_FILE_BYTES )
                                                setFileError( "File exceeds the 10 MB limit." );
                                        }}
                                    />
                                    {selectedFile && (
                                        <p className="text-xs text-muted-foreground">
                                            {selectedFile.name} — {formatBytes( selectedFile.size )}
                                        </p>
                                    )}
                                    {fileError && <p className="text-xs text-destructive">{fileError}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Folder (optional)</Label>
                                    <Select value={uploadFolderId} onValueChange={setUploadFolderId}>
                                        <SelectTrigger><SelectValue placeholder="No folder" /></SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="none">No folder</SelectItem>
                                            {folders.map( ( f ) => (
                                                <SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>
                                            ) )}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="uploadLabels">Labels</Label>
                                    <TagifyInput
                                        id="uploadLabels"
                                        placeholder="Type and press Enter to add labels…"
                                        onChange={setUploadLabels}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="uploadDesc">Description</Label>
                                    <Input
                                        id="uploadDesc"
                                        value={uploadDescription}
                                        onChange={( e ) => setUploadDescription( e.target.value )}
                                        placeholder="Optional description"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        id="uploadConf"
                                        checked={uploadConfidential}
                                        onCheckedChange={( v ) => setUploadConfidential( !!v )}
                                    />
                                    <Label htmlFor="uploadConf">Mark as confidential</Label>
                                </div>

                                {uploadProgress !== null && (
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-xs text-muted-foreground">
                                            <span>Uploading to S3…</span>
                                            <span>{uploadProgress}%</span>
                                        </div>
                                        <Progress value={uploadProgress} className="h-2" />
                                    </div>
                                )}

                                <Button
                                    className="w-full"
                                    disabled={!selectedFile || !!fileError || uploadProgress !== null}
                                    onClick={handleUpload}
                                >
                                    {uploadProgress !== null ? `Uploading… ${uploadProgress}%` : "Upload"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Storage bar */}
            {storage && (
                <Card>
                    <CardContent className="pt-4 pb-4">
                        <div className="flex items-center gap-3">
                            <HardDrive className="h-5 w-5 text-muted-foreground shrink-0" />
                            <div className="flex-1 space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">Storage Used</span>
                                    <span className="text-muted-foreground">
                                        {formatBytes( storage.usedBytes )} / {formatBytes( storage.quotaBytes )}
                                    </span>
                                </div>
                                <Progress value={( storage.usedBytes / storage.quotaBytes ) * 100} className="h-2" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            <div className="flex gap-6">
                {/* Folder sidebar */}
                <div className="w-56 shrink-0 space-y-1">
                    <p className="text-xs font-semibold uppercase text-muted-foreground px-2 mb-2">Folders</p>
                    <button
                        onClick={() => setSelectedFolderId( null )}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${selectedFolderId === null ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                    >
                        <Folder className="h-4 w-4" />
                        All Files
                        <span className="ml-auto text-xs opacity-60">{allDocuments.length}</span>
                    </button>
                    {folders.map( ( folder ) => {
                        const count = allDocuments.filter( ( d ) => d.folderId === folder.id ).length;
                        return (
                            <div
                                key={folder.id}
                                className={`group w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${selectedFolderId === folder.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`}
                                onClick={() => setSelectedFolderId( folder.id )}
                            >
                                <Folder className="h-4 w-4 shrink-0" />
                                <span className="truncate flex-1">{folder.name}</span>
                                <span className="text-xs opacity-60 mr-1">{count}</span>
                                <div className="hidden group-hover:flex gap-0.5" onClick={( e ) => e.stopPropagation()}>
                                    <button
                                        className="p-0.5 rounded hover:bg-white/20"
                                        title="Edit"
                                        onClick={() => {
                                            setEditFolderName( folder.name );
                                            setEditFolderLabels( folder.labels );
                                            setEditFolderOpen( folder.id );
                                        }}
                                    >
                                        <Pencil className="h-3 w-3" />
                                    </button>
                                    <button
                                        className="p-0.5 rounded hover:bg-destructive/20"
                                        title="Delete"
                                        onClick={() => deleteFolderMutation.mutate( { data: { id: folder.id } } )}
                                    >
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                    </button>
                                </div>
                            </div>
                        );
                    } )}
                </div>

                {/* Main content */}
                <div className="flex-1 space-y-4 min-w-0">
                    {/* Label filter bar */}
                    {allLabels.length > 0 && (
                        <div className="flex flex-wrap items-center gap-2">
                            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
                            <span className="text-xs text-muted-foreground">Filter by label:</span>
                            {allLabels.map( ( label ) => {
                                const active = activeLabels.includes( label );
                                return (
                                    <Badge
                                        key={label}
                                        variant={active ? "default" : "outline"}
                                        className="cursor-pointer select-none"
                                        onClick={() =>
                                            setActiveLabels( ( prev ) =>
                                                active ? prev.filter( ( l ) => l !== label ) : [...prev, label],
                                            )
                                        }
                                    >
                                        {label}
                                    </Badge>
                                );
                            } )}
                            {activeLabels.length > 0 && (
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="h-6 text-xs px-2"
                                    onClick={() => setActiveLabels( [] )}
                                >
                                    <X className="h-3 w-3 mr-1" /> Clear filters
                                </Button>
                            )}
                        </div>
                    )}

                    {( selectedFolderId !== null || activeLabels.length > 0 ) && (
                        <p className="text-xs text-muted-foreground">
                            Showing {filteredDocuments.length} file(s)
                            {selectedFolderId && (
                                <> in <span className="font-medium">{folders.find( ( f ) => f.id === selectedFolderId )?.name}</span></>
                            )}
                        </p>
                    )}

                    {/* Document grid */}
                    {docsLoading ? (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {[...Array( 3 )].map( ( _, i ) => <div key={i} className="h-32 rounded-lg bg-muted animate-pulse" /> )}
                        </div>
                    ) : filteredDocuments.length === 0 ? (
                        <Card>
                            <CardContent className="flex flex-col items-center justify-center py-16">
                                <FileText className="h-12 w-12 text-muted-foreground mb-3" />
                                <p className="text-muted-foreground text-sm">
                                    {allDocuments.length === 0 ? "No documents uploaded yet" : "No documents match the current filter"}
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {filteredDocuments.map( ( doc ) => (
                                <Card key={doc.id} className="group">
                                    <CardHeader className="pb-2">
                                        <div className="flex items-start justify-between gap-2">
                                            <div className="flex items-center gap-2 min-w-0">
                                                <FileText className="h-4 w-4 shrink-0 text-primary" />
                                                <span className="font-medium text-sm truncate">{doc.fileName}</span>
                                            </div>
                                            <div className="flex items-center gap-1 shrink-0">
                                                {doc.isConfidential && <Lock className="h-3.5 w-3.5 text-destructive" />}
                                                <button
                                                    className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-destructive/10 rounded"
                                                    onClick={() => deleteDocMutation.mutate( { data: { id: doc.id } } )}
                                                    title="Delete"
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </button>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="space-y-2">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{formatBytes( doc.fileSize )}</span>
                                            <span>{doc.fileType.split( "/" )[1]?.toUpperCase() ?? doc.fileType}</span>
                                        </div>
                                        {doc.folder && (
                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Folder className="h-3 w-3" />{doc.folder.name}
                                            </div>
                                        )}
                                        {doc.description && (
                                            <p className="text-xs text-muted-foreground truncate">{doc.description}</p>
                                        )}
                                        {doc.labels.length > 0 && (
                                            <div className="flex flex-wrap gap-1">
                                                {doc.labels.map( ( label ) => (
                                                    <Badge key={label} variant="secondary" className="text-xs">{label}</Badge>
                                                ) )}
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            className="block text-xs text-primary hover:underline mt-1 text-left cursor-pointer"
                                            onClick={async () => {
                                                try {
                                                    const { url } = await getPresignedViewUrl( { data: { id: doc.id } } );
                                                    window.open( url, "_blank", "noopener,noreferrer" );
                                                } catch {
                                                    alert( "Could not generate view link. Please try again." );
                                                }
                                            }}
                                        >
                                            View file ↗
                                        </button>
                                    </CardContent>
                                </Card>
                            ) )}
                        </div>
                    )}
                </div>
            </div>

            {/* Edit folder dialog */}
            <Dialog open={editFolderOpen !== null} onOpenChange={( v ) => !v && setEditFolderOpen( null )}>
                <DialogContent>
                    <DialogHeader><DialogTitle>Edit Folder</DialogTitle></DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="editFolderName">Folder Name</Label>
                            <Input
                                id="editFolderName"
                                value={editFolderName}
                                onChange={( e ) => setEditFolderName( e.target.value )}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Labels</Label>
                            <TagifyInput
                                key={editFolderOpen ?? "none"}
                                placeholder="Type and press Enter to add labels…"
                                defaultValue={editFolderLabels}
                                onChange={setEditFolderLabels}
                            />
                        </div>
                        <Button
                            className="w-full"
                            disabled={!editFolderName.trim() || updateFolderMutation.isPending}
                            onClick={() => {
                                if ( !editFolderOpen ) return;
                                updateFolderMutation.mutate( {
                                    data: { id: editFolderOpen, name: editFolderName.trim(), labels: editFolderLabels },
                                } );
                            }}
                        >
                            {updateFolderMutation.isPending ? "Saving…" : "Save Changes"}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>        </div>
    );
}