import { createFileRoute } from '@tanstack/react-router'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useState, useMemo } from 'react'
import {
  getUserStorage,
  listFolders,
  listAllDocuments,
  deleteFolder,
  deleteDocument,
} from '@/server/documents'
import { Input } from '@/components/ui/input'
import { Search, Folder } from 'lucide-react'

import { DocumentsSkeleton } from '@/components/dashboard/DocumentsSkeleton'
import { DocumentUploadDialog } from '@/components/dashboard/DocumentUploadDialog'
import { FolderSidebar } from '@/components/dashboard/FolderSidebar'
import { DocumentGrid } from '@/components/dashboard/DocumentGrid'
import { DocumentFilterBar } from '@/components/dashboard/DocumentFilterBar'
import { TagifyInput } from '@/components/dashboard/TagifyInput'
import {
  CreateFolderDialog,
  EditFolderDialog,
} from '@/components/dashboard/FolderDialogs'

export const Route = createFileRoute('/_dashboard/dashboard/documents')({
  component: DocumentsPage,
})

interface EditingFolder {
  id: string
  name: string
  labels: string[]
}

function DocumentsPage() {
  const queryClient = useQueryClient()

  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null)
  const [activeLabels, setActiveLabels] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [editFolder, setEditFolder] = useState<EditingFolder | null>(null)

  const { data: storage } = useQuery({
    queryKey: ['userStorage'],
    queryFn: () => getUserStorage(),
    enabled: !import.meta.env.SSR,
    retry: false,
  })
  const { data: folders = [] } = useQuery({
    queryKey: ['folders'],
    queryFn: () => listFolders(),
    enabled: !import.meta.env.SSR,
    retry: false,
  })
  const { data: allDocuments = [], isLoading: docsLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => listAllDocuments(),
    enabled: !import.meta.env.SSR,
    retry: false,
  })

  const deleteFolderMutation = useMutation({
    mutationFn: deleteFolder,
    onSuccess: (_data, vars) => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      const id = (vars as { data: { id: string } })?.data?.id
      if (id && selectedFolderId === id) setSelectedFolderId(null)
    },
  })
  const deleteDocMutation = useMutation({
    mutationFn: deleteDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['userStorage'] })
    },
  })

  const allLabels = useMemo(
    () =>
      Array.from(
        new Set([
          ...folders.flatMap((f) => f.labels),
          ...allDocuments.flatMap((d) => d.labels),
        ]),
      ),
    [folders, allDocuments],
  )

  const docCountByFolder = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const d of allDocuments) {
      if (d.folderId) counts[d.folderId] = (counts[d.folderId] ?? 0) + 1
    }
    return counts
  }, [allDocuments])

  const filteredDocuments = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return allDocuments.filter((doc) => {
      if (selectedFolderId !== null && doc.folderId !== selectedFolderId)
        return false
      if (
        activeLabels.length > 0 &&
        !activeLabels.every((l) => doc.labels.includes(l))
      )
        return false
      if (q && !(doc.fileName.toLowerCase().includes(q) ||
          (doc.description ?? '').toLowerCase().includes(q)))
        return false
      return true
    })
  }, [allDocuments, selectedFolderId, activeLabels, searchQuery])

  if (docsLoading && allDocuments.length === 0) return <DocumentsSkeleton />

  const usedPercent = storage
    ? Math.min(Math.round((storage.usedBytes / storage.quotaBytes) * 100), 100)
    : 0

  return (
    <div className="space-y-5 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground text-sm">
            Manage your medical files and records
          </p>
        </div>
        <div className="flex gap-2">
          <CreateFolderDialog TagifyInput={TagifyInput} />
          <DocumentUploadDialog folders={folders} TagifyInput={TagifyInput} />
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          placeholder="Search by name or description…"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Mobile folder chips — hidden on md+ */}
      {folders.length > 0 && (
        <div className="flex md:hidden gap-2 overflow-x-auto pb-1 -mx-1 px-1">
          {folders.map((folder) => (
            <button
              key={folder.id}
              onClick={() =>
                setSelectedFolderId(
                  selectedFolderId === folder.id ? null : folder.id,
                )
              }
              className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs border transition-colors ${
                selectedFolderId === folder.id
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'border-border hover:bg-muted'
              }`}
            >
              <Folder className="h-3 w-3" />
              {folder.name}
              <span className="opacity-60">
                {docCountByFolder[folder.id] ?? 0}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {/* Sidebar — desktop only */}
        <div className="hidden md:block">
          <FolderSidebar
            folders={folders}
            docCountByFolder={docCountByFolder}
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
            onEditFolder={setEditFolder}
            onDeleteFolder={(id) =>
              deleteFolderMutation.mutate({ data: { id } })
            }
            storage={storage}
          />
        </div>

        {/* Main content */}
        <div className="flex-1 space-y-4 min-w-0">
          <DocumentFilterBar
            allLabels={allLabels}
            activeLabels={activeLabels}
            onToggle={(label) =>
              setActiveLabels((prev) =>
                prev.includes(label)
                  ? prev.filter((l) => l !== label)
                  : [...prev, label],
              )
            }
            onClear={() => setActiveLabels([])}
          />

          {(selectedFolderId !== null ||
            activeLabels.length > 0 ||
            searchQuery.trim()) && (
            <p className="text-xs text-muted-foreground">
              {filteredDocuments.length} result
              {filteredDocuments.length !== 1 ? 's' : ''}
              {selectedFolderId && (
                <>
                  {' '}
                  in{' '}
                  <span className="font-medium">
                    {folders.find((f) => f.id === selectedFolderId)?.name}
                  </span>
                </>
              )}
            </p>
          )}

          <DocumentGrid
            documents={filteredDocuments}
            allDocumentsCount={allDocuments.length}
            isLoading={docsLoading}
            onDelete={(id) => deleteDocMutation.mutate({ data: { id } })}
          />
        </div>
      </div>

      {/* Mobile storage bar */}
      {storage && (
        <div className="md:hidden flex items-center gap-3 rounded-lg border border-border/50 bg-card p-3">
          <span className="text-xs text-muted-foreground shrink-0">
            Storage
          </span>
          <div className="flex-1 bg-muted rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all"
              style={{ width: `${usedPercent}%` }}
            />
          </div>
          <span className="text-xs text-muted-foreground shrink-0">
            {usedPercent}%
          </span>
        </div>
      )}

      <EditFolderDialog
        TagifyInput={TagifyInput}
        editFolder={editFolder}
        onEditClose={() => setEditFolder(null)}
      />
    </div>
  )
}

