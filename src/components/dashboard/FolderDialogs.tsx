import { useState, useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createFolder, updateFolder } from '@/server/documents'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { FolderPlus } from 'lucide-react'
import type { TagifyInputProps } from './TagifyInput'

interface FolderItem {
  id: string
  name: string
  labels: string[]
}

interface FolderDialogsProps {
  TagifyInput: React.ComponentType<TagifyInputProps>
  editFolder: FolderItem | null
  onEditClose: () => void
}

export function CreateFolderDialog({
  TagifyInput,
}: {
  TagifyInput: React.ComponentType<TagifyInputProps>
}) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState('')
  const [labels, setLabels] = useState<string[]>([])

  const mutation = useMutation({
    mutationFn: createFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      setOpen(false)
      setName('')
      setLabels([])
    },
  })

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <FolderPlus className="h-4 w-4 mr-2" /> New Folder
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="folderName">Folder Name</Label>
            <Input
              id="folderName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Blood Tests"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="folderLabels">Labels</Label>
            <TagifyInput
              id="folderLabels"
              placeholder="Type and press Enter to add labels…"
              onChange={setLabels}
            />
          </div>
          <Button
            className="w-full"
            disabled={!name.trim() || mutation.isPending}
            onClick={() =>
              mutation.mutate({ data: { name: name.trim(), labels } })
            }
          >
            {mutation.isPending ? 'Creating…' : 'Create Folder'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function EditFolderDialog({
  TagifyInput,
  editFolder,
  onEditClose,
}: FolderDialogsProps) {
  const queryClient = useQueryClient()
  const [name, setName] = useState(editFolder?.name ?? '')
  const [labels, setLabels] = useState<string[]>(editFolder?.labels ?? [])

  useEffect(() => {
    setName(editFolder?.name ?? '')
    setLabels(editFolder?.labels ?? [])
  }, [editFolder])

  const mutation = useMutation({
    mutationFn: updateFolder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['folders'] })
      onEditClose()
    },
  })

  const folderId = editFolder?.id ?? null

  return (
    <Dialog open={folderId !== null} onOpenChange={(v) => !v && onEditClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Folder</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="editFolderName">Folder Name</Label>
            <Input
              id="editFolderName"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label>Labels</Label>
            <TagifyInput
              key={folderId ?? 'none'}
              placeholder="Type and press Enter to add labels…"
              defaultValue={labels}
              onChange={setLabels}
            />
          </div>
          <Button
            className="w-full"
            disabled={!name.trim() || mutation.isPending}
            onClick={() => {
              if (!folderId) return
              mutation.mutate({
                data: { id: folderId, name: name.trim(), labels },
              })
            }}
          >
            {mutation.isPending ? 'Saving…' : 'Save Changes'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
