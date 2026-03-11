import { useCallback, useMemo, useRef, useState } from 'react'
import {
  createDocument,
  createFolder,
  generatePresignedUploadUrl,
  getPresignedViewUrl,
  listFolders,
} from '@/server/documents'
import type {
  AttachmentQueueItem,
  UploadedAttachment,
} from './attachment-types'

function createUploadId(): string {
  if (
    typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
  ) {
    return crypto.randomUUID()
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

export function useAttachmentUpload() {
  const [items, setItems] = useState<AttachmentQueueItem[]>([])
  const aiFolderIdRef = useRef<string | null>(null)

  const hasFiles = items.length > 0
  const isUploading = useMemo(
    () => items.some((item) => item.status === 'uploading'),
    [items],
  )

  const updateItem = useCallback(
    (id: string, patch: Partial<AttachmentQueueItem>) => {
      setItems((prev) =>
        prev.map((item) => (item.id === id ? { ...item, ...patch } : item)),
      )
    },
    [],
  )

  const ensureAiFolderId = useCallback(async (): Promise<string> => {
    if (aiFolderIdRef.current) return aiFolderIdRef.current

    const folders = await listFolders()
    const existing = folders.find(
      (folder) => folder.name.toLowerCase() === 'ai',
    )
    if (existing) {
      aiFolderIdRef.current = existing.id
      return existing.id
    }

    const created = await createFolder({ data: { name: 'ai', labels: ['ai'] } })
    aiFolderIdRef.current = created.id
    return created.id
  }, [])

  const addFiles = useCallback((files: File[]) => {
    if (files.length === 0) return
    const next = files.map<AttachmentQueueItem>((file) => ({
      id: createUploadId(),
      file,
      progress: 0,
      status: 'uploading',
    }))
    setItems((prev) => [...prev, ...next])
  }, [])

  const removeFile = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }, [])

  const clearFiles = useCallback(() => {
    setItems([])
  }, [])

  const uploadItems = useCallback(
    async (queued: AttachmentQueueItem[]): Promise<UploadedAttachment[]> => {
      if (queued.length === 0) return []
      const folderId = await ensureAiFolderId()
      const uploaded: UploadedAttachment[] = []

      for (const item of queued) {
        try {
          updateItem(item.id, {
            status: 'uploading',
            progress: 0,
            error: undefined,
          })

          const contentType = item.file.type || 'application/octet-stream'
          const { uploadUrl, s3Key } = await generatePresignedUploadUrl({
            data: {
              fileName: item.file.name,
              fileType: contentType,
              fileSize: item.file.size,
            },
          })

          await new Promise<void>((resolve, reject) => {
            const xhr = new XMLHttpRequest()
            xhr.open('PUT', uploadUrl)
            xhr.setRequestHeader('Content-Type', contentType)

            xhr.upload.onprogress = (event) => {
              if (!event.lengthComputable) return
              const progress = Math.min(
                100,
                Math.round((event.loaded / event.total) * 100),
              )
              updateItem(item.id, { progress })
            }

            xhr.onload = () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                updateItem(item.id, { progress: 100 })
                resolve()
                return
              }
              reject(new Error(`Upload failed (${xhr.status})`))
            }

            xhr.onerror = () => reject(new Error('Network error during upload'))
            xhr.send(item.file)
          })

          const document = await createDocument({
            data: {
              folderId,
              fileName: item.file.name,
              fileType: contentType,
              fileSize: item.file.size,
              s3Key,
              labels: ['ai'],
              description: 'Uploaded from chat',
              isConfidential: false,
            },
          })

          const { url: inlineUrl } = await getPresignedViewUrl({
            data: { id: document.id },
          })

          const attachment: UploadedAttachment = {
            documentId: document.id,
            name: document.fileName,
            type: document.fileType,
            size: document.fileSize,
            url: `document:${document.id}`,
            inlineUrl,
          }

          uploaded.push(attachment)
          updateItem(item.id, {
            status: 'uploaded',
            uploaded: attachment,
            error: undefined,
          })
        } catch (err) {
          const message = err instanceof Error ? err.message : 'Upload failed'
          updateItem(item.id, { status: 'error', error: message })
        }
      }

      return uploaded
    },
    [ensureAiFolderId, updateItem],
  )

  const uploadQueuedFiles = useCallback(async (): Promise<
    UploadedAttachment[]
  > => {
    const queued = items.filter((item) => item.status === 'queued')
    return uploadItems(queued)
  }, [items, uploadItems])

  const addFilesAndUpload = useCallback(
    async (files: File[]): Promise<void> => {
      if (files.length === 0) return
      const next = files.map<AttachmentQueueItem>((file) => ({
        id: createUploadId(),
        file,
        progress: 0,
        status: 'uploading',
      }))
      setItems((prev) => [...prev, ...next])
      await uploadItems(next)
    },
    [uploadItems],
  )

  const getUploadedAttachments = useCallback((): UploadedAttachment[] => {
    return items
      .filter((item) => item.status === 'uploaded' && Boolean(item.uploaded))
      .map((item) => item.uploaded as UploadedAttachment)
  }, [items])

  return {
    items,
    hasFiles,
    isUploading,
    addFiles,
    addFilesAndUpload,
    removeFile,
    clearFiles,
    uploadQueuedFiles,
    getUploadedAttachments,
  }
}
