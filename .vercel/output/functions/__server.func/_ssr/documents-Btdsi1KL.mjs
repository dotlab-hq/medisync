import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createSsrRpc } from "./router-CHZxjIga.mjs";
import { e as createServerFn } from "./index.mjs";
import { B as Button } from "./button-BjPlzk1J.mjs";
import { I as Input } from "./input-BMB51kx9.mjs";
import { L as Label } from "./label-DIGbqCUN.mjs";
import { C as Card, d as CardContent, a as CardHeader } from "./card-BPoG-cgC.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-DglpjyKJ.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DdVZeUE9.mjs";
import { B as Badge } from "./badge-CT5ZN08I.mjs";
import { P as Progress } from "./progress-Bx83hked.mjs";
import { C as Checkbox } from "./checkbox-BEMRFibQ.mjs";
import { Y } from "../_libs/yaireo__tagify.mjs";
import { v as FolderPlus, w as Upload, x as HardDrive, y as Folder, z as Pencil, t as Trash2, E as Funnel, X, F as FileText, J as Lock } from "../_libs/lucide-react.mjs";
import { o as object, s as string, n as number, b as boolean, c as array } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/next-themes.mjs";
import "../_libs/sonner.mjs";
import "./server-Cw4QVuYO.mjs";
import "./index-Dc8WRQC8.mjs";
import "../_libs/drizzle-orm.mjs";
import "../_libs/pg.mjs";
import "events";
import "../_libs/pg-types.mjs";
import "../_libs/postgres-array.mjs";
import "../_libs/postgres-date.mjs";
import "../_libs/postgres-interval.mjs";
import "../_libs/xtend.mjs";
import "../_libs/postgres-bytea.mjs";
import "../_libs/pg-int8.mjs";
import "util";
import "crypto";
import "dns";
import "../_libs/pg-connection-string.mjs";
import "fs";
import "../_libs/pg-protocol.mjs";
import "net";
import "tls";
import "../_libs/pg-cloudflare.mjs";
import "../_libs/pgpass.mjs";
import "path";
import "stream";
import "../_libs/split2.mjs";
import "string_decoder";
import "../_libs/pg-pool.mjs";
import "../_libs/resend.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/svix.mjs";
import "../_libs/uuid.mjs";
import "node:crypto";
import "../_libs/standardwebhooks.mjs";
import "../_libs/stablelib__base64.mjs";
import "../_libs/fast-sha256.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "node:async_hooks";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/radix-ui__react-checkbox.mjs";
const getUserStorage = createServerFn({
  method: "GET"
}).handler(createSsrRpc("cc9745db8fad86a735493935d9eeb57ee4eecdb832268b59a0c3c501063de8af"));
const listFolders = createServerFn({
  method: "GET"
}).handler(createSsrRpc("4c117e8d0079052f62a87287f23c2e49c13bd6e1e565eccb194cac6870099604"));
const createFolderSchema = object({
  name: string().min(1),
  labels: array(string()).optional().default([])
});
const createFolder = createServerFn({
  method: "POST"
}).inputValidator((data) => createFolderSchema.parse(data)).handler(createSsrRpc("cf3f572910cb5308e8bc4ad9ac3633a8114ecc754fe243243bf2c94bf18b3c0d"));
const updateFolderSchema = object({
  id: string(),
  name: string().min(1).optional(),
  labels: array(string()).optional()
});
const updateFolder = createServerFn({
  method: "POST"
}).inputValidator((data) => updateFolderSchema.parse(data)).handler(createSsrRpc("66521140a12ab3fd4280474daf49832bb5fb4c39d5bca921681160a2ffbcceda"));
const deleteFolder = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(createSsrRpc("3a97580e0a14fdde4264beadaf32cc2eb61b31a2ff1f6f27ed22c0ccd6de7cea"));
const listDocsSchema = object({
  folderId: string().nullable().optional(),
  labels: array(string()).optional()
});
createServerFn({
  method: "GET"
}).inputValidator((data) => listDocsSchema.parse(data)).handler(createSsrRpc("5320c8c2a3f8f4e9577aad6c4fb7c3b7fcc52be8e5d6fa67753d418790eefba4"));
const listAllDocuments = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a82808e548225ade1e4f43fa3a381e37aee2d02de030aaca853fdc34bd8fbf2b"));
const presignSchema = object({
  fileName: string().min(1),
  fileType: string().min(1),
  // mime type
  fileSize: number().int().positive()
});
const generatePresignedUploadUrl = createServerFn({
  method: "POST"
}).inputValidator((data) => presignSchema.parse(data)).handler(createSsrRpc("88546af1900b2b535512a6fc0e468921ce2e929c6b9d9559b037cc3e94ec3903"));
const createDocSchema = object({
  folderId: string().nullable().optional(),
  fileName: string().min(1),
  fileType: string().min(1),
  fileSize: number().int().positive(),
  s3Key: string().min(1),
  labels: array(string()).optional().default([]),
  description: string().optional(),
  isConfidential: boolean().optional().default(false)
});
const createDocument = createServerFn({
  method: "POST"
}).inputValidator((data) => createDocSchema.parse(data)).handler(createSsrRpc("e3a4e9b021e590329d1b394019faf012fa72e29ff651b775ef33585bc43d8a02"));
const deleteDocument = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(createSsrRpc("621b39c91dd810bf4185c91556da3ce67188c1e774320245ab1d0c7801eb3f1c"));
const getPresignedViewUrl = createServerFn({
  method: "GET"
}).inputValidator((data) => object({
  id: string().min(1)
}).parse(data)).handler(createSsrRpc("a48e9bd63a10a2126eca9b568a948ae37dcab4d15aaa13315a11217ba562c120"));
const MAX_FILE_BYTES = 10 * 1024 * 1024;
function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(1)} ${sizes[i]}`;
}
function TagifyInput({
  placeholder,
  defaultValue,
  onChange,
  id
}) {
  const inputRef = reactExports.useRef(null);
  const tagifyRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (!inputRef.current) return;
    const instance = new Y(inputRef.current, {
      placeholder: placeholder ?? "Add labels…",
      maxTags: 20
    });
    instance.on("change", () => {
      onChange(instance.value.map((t) => t.value));
    });
    if (defaultValue && defaultValue.length > 0) instance.addTags(defaultValue);
    tagifyRef.current = instance;
    return () => {
      instance.destroy();
      tagifyRef.current = null;
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("input", { ref: inputRef, id, "aria-label": placeholder ?? "Add labels", className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm" });
}
function DocumentsPage() {
  const queryClient = useQueryClient();
  const [selectedFolderId, setSelectedFolderId] = reactExports.useState(null);
  const [activeLabels, setActiveLabels] = reactExports.useState([]);
  const [uploadOpen, setUploadOpen] = reactExports.useState(false);
  const [folderOpen, setFolderOpen] = reactExports.useState(false);
  const [editFolderOpen, setEditFolderOpen] = reactExports.useState(null);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const [uploadProgress, setUploadProgress] = reactExports.useState(null);
  const [uploadFolderId, setUploadFolderId] = reactExports.useState("none");
  const [uploadLabels, setUploadLabels] = reactExports.useState([]);
  const [uploadDescription, setUploadDescription] = reactExports.useState("");
  const [uploadConfidential, setUploadConfidential] = reactExports.useState(false);
  const [fileError, setFileError] = reactExports.useState(null);
  const [folderName, setFolderName] = reactExports.useState("");
  const [folderLabels, setFolderLabels] = reactExports.useState([]);
  const [editFolderName, setEditFolderName] = reactExports.useState("");
  const [editFolderLabels, setEditFolderLabels] = reactExports.useState([]);
  const {
    data: storage
  } = useQuery({
    queryKey: ["userStorage"],
    queryFn: () => getUserStorage()
  });
  const {
    data: folders = []
  } = useQuery({
    queryKey: ["folders"],
    queryFn: () => listFolders()
  });
  const {
    data: allDocuments = [],
    isLoading: docsLoading
  } = useQuery({
    queryKey: ["documents"],
    queryFn: () => listAllDocuments()
  });
  const createFolderMutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"]
      });
      setFolderOpen(false);
      setFolderName("");
      setFolderLabels([]);
    }
  });
  const updateFolderMutation = useMutation({
    mutationFn: updateFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["folders"]
      });
      setEditFolderOpen(null);
    }
  });
  const deleteFolderMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({
        queryKey: ["folders"]
      });
      queryClient.invalidateQueries({
        queryKey: ["documents"]
      });
      const id = vars?.data?.id;
      if (id && selectedFolderId === id) setSelectedFolderId(null);
    }
  });
  const deleteDocMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["documents"]
      });
      queryClient.invalidateQueries({
        queryKey: ["userStorage"]
      });
    }
  });
  const allLabels = Array.from(/* @__PURE__ */ new Set([...folders.flatMap((f) => f.labels), ...allDocuments.flatMap((d) => d.labels)]));
  const filteredDocuments = allDocuments.filter((doc) => {
    if (selectedFolderId !== null && doc.folderId !== selectedFolderId) return false;
    if (activeLabels.length > 0 && !activeLabels.every((l) => doc.labels.includes(l))) return false;
    return true;
  });
  const handleUpload = reactExports.useCallback(async () => {
    if (!selectedFile) return;
    setFileError(null);
    if (selectedFile.size > MAX_FILE_BYTES) {
      setFileError("File exceeds the 10 MB limit.");
      return;
    }
    try {
      const {
        uploadUrl,
        s3Key
      } = await generatePresignedUploadUrl({
        data: {
          fileName: selectedFile.name,
          fileType: selectedFile.type || "application/octet-stream",
          fileSize: selectedFile.size
        }
      });
      await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", uploadUrl);
        xhr.setRequestHeader("Content-Type", selectedFile.type || "application/octet-stream");
        xhr.upload.onprogress = (e) => {
          if (e.lengthComputable) setUploadProgress(Math.round(e.loaded / e.total * 100));
        };
        xhr.onload = () => xhr.status >= 200 && xhr.status < 300 ? resolve() : reject(new Error(`S3 ${xhr.status}`));
        xhr.onerror = () => reject(new Error("Network error"));
        xhr.send(selectedFile);
      });
      await createDocument({
        data: {
          folderId: uploadFolderId === "none" ? null : uploadFolderId,
          fileName: selectedFile.name,
          fileType: selectedFile.type || "application/octet-stream",
          fileSize: selectedFile.size,
          s3Key,
          labels: uploadLabels,
          description: uploadDescription || void 0,
          isConfidential: uploadConfidential
        }
      });
      queryClient.invalidateQueries({
        queryKey: ["documents"]
      });
      queryClient.invalidateQueries({
        queryKey: ["userStorage"]
      });
      setUploadOpen(false);
      setSelectedFile(null);
      setUploadProgress(null);
      setUploadLabels([]);
      setUploadDescription("");
      setUploadConfidential(false);
      setUploadFolderId("none");
    } catch (err) {
      setFileError(err instanceof Error ? err.message : "Upload failed");
      setUploadProgress(null);
    }
  }, [selectedFile, uploadFolderId, uploadLabels, uploadDescription, uploadConfidential, queryClient]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between flex-wrap gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Documents" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your medical files and records" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: folderOpen, onOpenChange: setFolderOpen, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FolderPlus, { className: "h-4 w-4 mr-2" }),
            " New Folder"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Create Folder" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "folderName", children: "Folder Name" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "folderName", value: folderName, onChange: (e) => setFolderName(e.target.value), placeholder: "e.g. Blood Tests" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "folderLabels", children: "Labels" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TagifyInput, { id: "folderLabels", placeholder: "Type and press Enter to add labels…", onChange: setFolderLabels })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: !folderName.trim() || createFolderMutation.isPending, onClick: () => createFolderMutation.mutate({
                data: {
                  name: folderName.trim(),
                  labels: folderLabels
                }
              }), children: createFolderMutation.isPending ? "Creating…" : "Create Folder" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open: uploadOpen, onOpenChange: (v) => {
          if (!v) {
            setSelectedFile(null);
            setUploadProgress(null);
            setFileError(null);
          }
          setUploadOpen(v);
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "h-4 w-4 mr-2" }),
            " Upload File"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Upload Document" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "fileInput", children: "File (max 10 MB)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "fileInput", type: "file", onChange: (e) => {
                  const file = e.target.files?.[0] ?? null;
                  setSelectedFile(file);
                  setFileError(null);
                  if (file && file.size > MAX_FILE_BYTES) setFileError("File exceeds the 10 MB limit.");
                } }),
                selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
                  selectedFile.name,
                  " — ",
                  formatBytes(selectedFile.size)
                ] }),
                fileError && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive", children: fileError })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Folder (optional)" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { value: uploadFolderId, onValueChange: setUploadFolderId, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "No folder" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectContent, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: "none", children: "No folder" }),
                    folders.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: f.id, children: f.name }, f.id))
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "uploadLabels", children: "Labels" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TagifyInput, { id: "uploadLabels", placeholder: "Type and press Enter to add labels…", onChange: setUploadLabels })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "uploadDesc", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "uploadDesc", value: uploadDescription, onChange: (e) => setUploadDescription(e.target.value), placeholder: "Optional description" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { id: "uploadConf", checked: uploadConfidential, onCheckedChange: (v) => setUploadConfidential(!!v) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "uploadConf", children: "Mark as confidential" })
              ] }),
              uploadProgress !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Uploading to S3…" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    uploadProgress,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: uploadProgress, className: "h-2" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: !selectedFile || !!fileError || uploadProgress !== null, onClick: handleUpload, children: uploadProgress !== null ? `Uploading… ${uploadProgress}%` : "Upload" })
            ] })
          ] })
        ] })
      ] })
    ] }),
    storage && /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "pt-4 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HardDrive, { className: "h-5 w-5 text-muted-foreground shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: "Storage Used" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
            formatBytes(storage.usedBytes),
            " / ",
            formatBytes(storage.quotaBytes)
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: storage.usedBytes / storage.quotaBytes * 100, className: "h-2" })
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-56 shrink-0 space-y-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase text-muted-foreground px-2 mb-2", children: "Folders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelectedFolderId(null), className: `w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${selectedFolderId === null ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-4 w-4" }),
          "All Files",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs opacity-60", children: allDocuments.length })
        ] }),
        folders.map((folder) => {
          const count = allDocuments.filter((d) => d.folderId === folder.id).length;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `group w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors cursor-pointer ${selectedFolderId === folder.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"}`, onClick: () => setSelectedFolderId(folder.id), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-4 w-4 shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate flex-1", children: folder.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs opacity-60 mr-1", children: count }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden group-hover:flex gap-0.5", onClick: (e) => e.stopPropagation(), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-0.5 rounded hover:bg-white/20", title: "Edit", onClick: () => {
                setEditFolderName(folder.name);
                setEditFolderLabels(folder.labels);
                setEditFolderOpen(folder.id);
              }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "h-3 w-3" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "p-0.5 rounded hover:bg-destructive/20", title: "Delete", onClick: () => deleteFolderMutation.mutate({
                data: {
                  id: folder.id
                }
              }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-3 w-3 text-destructive" }) })
            ] })
          ] }, folder.id);
        })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-4 min-w-0", children: [
        allLabels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "h-4 w-4 text-muted-foreground shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Filter by label:" }),
          allLabels.map((label) => {
            const active = activeLabels.includes(label);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: active ? "default" : "outline", className: "cursor-pointer select-none", onClick: () => setActiveLabels((prev) => active ? prev.filter((l) => l !== label) : [...prev, label]), children: label }, label);
          }),
          activeLabels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "ghost", size: "sm", className: "h-6 text-xs px-2", onClick: () => setActiveLabels([]), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-3 w-3 mr-1" }),
            " Clear filters"
          ] })
        ] }),
        (selectedFolderId !== null || activeLabels.length > 0) && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
          "Showing ",
          filteredDocuments.length,
          " file(s)",
          selectedFolderId && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            " in ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: folders.find((f) => f.id === selectedFolderId)?.name })
          ] })
        ] }),
        docsLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: [...Array(3)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 rounded-lg bg-muted animate-pulse" }, i)) }) : filteredDocuments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-12 w-12 text-muted-foreground mb-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: allDocuments.length === 0 ? "No documents uploaded yet" : "No documents match the current filter" })
        ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3", children: filteredDocuments.map((doc) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-4 w-4 shrink-0 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm truncate", children: doc.fileName })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
              doc.isConfidential && /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "h-3.5 w-3.5 text-destructive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-destructive/10 rounded", onClick: () => deleteDocMutation.mutate({
                data: {
                  id: doc.id
                }
              }), title: "Delete", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: formatBytes(doc.fileSize) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: doc.fileType.split("/")[1]?.toUpperCase() ?? doc.fileType })
            ] }),
            doc.folder && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "h-3 w-3" }),
              doc.folder.name
            ] }),
            doc.description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: doc.description }),
            doc.labels.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: doc.labels.map((label) => /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "text-xs", children: label }, label)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", className: "block text-xs text-primary hover:underline mt-1 text-left cursor-pointer", onClick: async () => {
              try {
                const {
                  url
                } = await getPresignedViewUrl({
                  data: {
                    id: doc.id
                  }
                });
                window.open(url, "_blank", "noopener,noreferrer");
              } catch {
                alert("Could not generate view link. Please try again.");
              }
            }, children: "View file ↗" })
          ] })
        ] }, doc.id)) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open: editFolderOpen !== null, onOpenChange: (v) => !v && setEditFolderOpen(null), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "Edit Folder" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "editFolderName", children: "Folder Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "editFolderName", value: editFolderName, onChange: (e) => setEditFolderName(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { children: "Labels" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TagifyInput, { placeholder: "Type and press Enter to add labels…", defaultValue: editFolderLabels, onChange: setEditFolderLabels }, editFolderOpen ?? "none")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: !editFolderName.trim() || updateFolderMutation.isPending, onClick: () => {
          if (!editFolderOpen) return;
          updateFolderMutation.mutate({
            data: {
              id: editFolderOpen,
              name: editFolderName.trim(),
              labels: editFolderLabels
            }
          });
        }, children: updateFolderMutation.isPending ? "Saving…" : "Save Changes" })
      ] })
    ] }) }),
    "        "
  ] });
}
export {
  DocumentsPage as component
};
