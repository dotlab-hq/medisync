export type UploadedAttachment = {
  documentId?: string
  name: string
  type: string
  size: number
  url: string
  inlineUrl: string
}

export type AttachmentUploadStatus =
  | 'queued'
  | 'uploading'
  | 'uploaded'
  | 'error'

export type AttachmentQueueItem = {
  id: string
  file: File
  progress: number
  status: AttachmentUploadStatus
  error?: string
  uploaded?: UploadedAttachment
}
