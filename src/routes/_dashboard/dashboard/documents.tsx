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
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Filter, X } from 'lucide-react'

import { DocumentsSkeleton } from '@/components/dashboard/DocumentsSkeleton'
import { DocumentUploadDialog } from '@/components/dashboard/DocumentUploadDialog'
import { FolderSidebar } from '@/components/dashboard/FolderSidebar'
import { DocumentGrid } from '@/components/dashboard/DocumentGrid'
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
  const [editFolder, setEditFolder] = useState<EditingFolder | null>(null)

  // Queries
  const { data: storage } = useQuery({
    queryKey: ['userStorage'],
    queryFn: () => getUserStorage(),
  })
  const { data: folders = [] } = useQuery({
    queryKey: ['folders'],
    queryFn: () => listFolders(),
  })
  const { data: allDocuments = [], isLoading: docsLoading } = useQuery({
    queryKey: ['documents'],
    queryFn: () => listAllDocuments(),
  })

  // Mutations
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

  // Derived data
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

  const filteredDocuments = useMemo(
    () =>
      allDocuments.filter((doc) => {
        if (selectedFolderId !== null && doc.folderId !== selectedFolderId)
          return false
        if (
          activeLabels.length > 0 &&
          !activeLabels.every((l) => doc.labels.includes(l))
        )
          return false
        return true
      }),
    [allDocuments, selectedFolderId, activeLabels],
  )

  if (docsLoading && allDocuments.length === 0) return <DocumentsSkeleton />

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold">Documents</h1>
          <p className="text-muted-foreground">
            Manage your medical files and records
          </p>
        </div>
        <div className="flex gap-2">
          <CreateFolderDialog TagifyInput={TagifyInput} />
          <DocumentUploadDialog folders={folders} TagifyInput={TagifyInput} />
        </div>
      </div>

      <div className="flex gap-6">
        <FolderSidebar
          folders={folders}
          totalDocCount={allDocuments.length}
          docCountByFolder={docCountByFolder}
          selectedFolderId={selectedFolderId}
          onSelectFolder={setSelectedFolderId}
          onEditFolder={setEditFolder}
          onDeleteFolder={(id) => deleteFolderMutation.mutate({ data: { id } })}
          storage={storage}
        />

        {/* Main content */}
        <div className="flex-1 space-y-4 min-w-0">
          <LabelFilterBar
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

          {(selectedFolderId !== null || activeLabels.length > 0) && (
            <p className="text-xs text-muted-foreground">
              Showing {filteredDocuments.length} file(s)
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

      <EditFolderDialog
        TagifyInput={TagifyInput}
        editFolder={editFolder}
        onEditClose={() => setEditFolder(null)}
      />
    </div>
  )
}

// Inline sub-component to keep the main function lean
function LabelFilterBar({
  allLabels,
  activeLabels,
  onToggle,
  onClear,
}: {
  allLabels: string[]
  activeLabels: string[]
  onToggle: (label: string) => void
  onClear: () => void
}) {
  if (allLabels.length === 0) return null
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
      <span className="text-xs text-muted-foreground">Filter by label:</span>
      {allLabels.map((label) => (
        <Badge
          key={label}
          variant={activeLabels.includes(label) ? 'default' : 'outline'}
          className="cursor-pointer select-none"
          onClick={() => onToggle(label)}
        >
          {label}
        </Badge>
      ))}
      {activeLabels.length > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="h-6 text-xs px-2"
          onClick={onClear}
        >
          <X className="h-3 w-3 mr-1" /> Clear filters
        </Button>
      )}
    </div>
  )
}
