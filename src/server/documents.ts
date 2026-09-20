import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { documentFolder, documentFile, userStorage } from '@/db/schema'
import { eq, and, desc, sql } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const MAX_FILE_BYTES = 10 * 1024 * 1024 // 10 MB
const DEFAULT_QUOTA_BYTES = 100 * 1024 * 1024 // 100 MB

// ── S3 client (lazy – only instantiated on server) ───────────────────
function getS3Client() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  if (!accessKeyId || !secretAccessKey) {
    throw new Error(
      'S3 credentials not configured. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.',
    )
  }

  return new S3Client({
    region: process.env.AWS_REGION ?? 'us-east-1',
    ...(process.env.AWS_S3_ENDPOINT
      ? {
          endpoint: process.env.AWS_S3_ENDPOINT,
          forcePathStyle: true,
          bucketEndpoint: false,
        }
      : {}),
    credentials: { accessKeyId, secretAccessKey },
  })
}

// ── Helper: get or create storage record ────────────────────────────
async function ensureStorage(userId: string) {
  const existing = await db.query.userStorage.findFirst({
    where: eq(userStorage.userId, userId),
  })
  if (existing) return existing

  const [created] = await db
    .insert(userStorage)
    .values({ userId, usedBytes: 0, quotaBytes: DEFAULT_QUOTA_BYTES })
    .returning()
  return created
}

// ── Get user storage ─────────────────────────────────────────────────
export const getUserStorage = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user.id) throw new Error('Unauthorized')
    return ensureStorage(session.user.id)
  },
)

// ── List folders ─────────────────────────────────────────────────────
export const listFolders = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')

    return db.query.documentFolder.findMany({
      where: eq(documentFolder.userId, session.user.id),
      orderBy: desc(documentFolder.createdAt),
    })
  },
)

// ── Create folder ────────────────────────────────────────────────────
const createFolderSchema = z.object({
  name: z.string().min(1),
  labels: z.array(z.string()).optional().default([]),
})

export const createFolder = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createFolderSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')

    const [folder] = await db
      .insert(documentFolder)
      .values({
        userId: session.user.id,
        name: data.name,
        labels: data.labels,
        parentFolderId: null, // always root level
      })
      .returning()
    return folder
  })

// ── Update folder ────────────────────────────────────────────────────
const updateFolderSchema = z.object({
  id: z.string(),
  name: z.string().min(1).optional(),
  labels: z.array(z.string()).optional(),
})

export const updateFolder = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => updateFolderSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')

    const { id, ...updateData } = data
    const [updated] = await db
      .update(documentFolder)
      .set(updateData)
      .where(
        and(
          eq(documentFolder.id, id),
          eq(documentFolder.userId, session.user.id),
        ),
      )
      .returning()
    return updated
  })

// ── Delete folder ────────────────────────────────────────────────────
export const deleteFolder = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')

    // Unset folderId on contained files (set null via cascade configured in schema)
    await db
      .delete(documentFolder)
      .where(
        and(
          eq(documentFolder.id, data.id),
          eq(documentFolder.userId, session.user.id),
        ),
      )

    return { success: true }
  })

// ── List documents ───────────────────────────────────────────────────
const listDocsSchema = z.object({
  folderId: z.string().nullable().optional(),
  labels: z.array(z.string()).optional(),
})

export const listDocuments = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) => listDocsSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')
    const userId = session.user.id

    const files = await db.query.documentFile.findMany({
      where: eq(documentFile.userId, userId),
      orderBy: desc(documentFile.createdAt),
      with: { folder: true },
    })

    // Client-side filter by folderId and labels (simpler than complex SQL for now)
    let result = files

    if (data?.folderId !== undefined && data.folderId !== null) {
      result = result.filter((f) => f.folderId === data.folderId)
    }

    if (data?.labels && data.labels.length > 0) {
      result = result.filter((f) =>
        data.labels!.every((l) => f.labels.includes(l)),
      )
    }

    return result
  })

// ── All documents (no filter) ────────────────────────────────────────
export const listAllDocuments = createServerFn({ method: 'GET' }).handler(
  async () => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')

    return db.query.documentFile.findMany({
      where: eq(documentFile.userId, session.user.id),
      orderBy: desc(documentFile.createdAt),
      with: { folder: true },
    })
  },
)

// ── Generate presigned S3 upload URL ─────────────────────────────────
const presignSchema = z.object({
  fileName: z.string().min(1),
  fileType: z.string().min(1), // mime type
  fileSize: z.number().int().positive(),
})

export const generatePresignedUploadUrl = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => presignSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')
    const userId = session.user.id

    if (data.fileSize > MAX_FILE_BYTES) {
      throw new Error(`File exceeds 10 MB limit`)
    }

    // Check quota
    const storage = await ensureStorage(userId)
    if (storage.usedBytes + data.fileSize > storage.quotaBytes) {
      throw new Error('Storage quota exceeded')
    }

    const bucket = process.env.AWS_S3_BUCKET
    if (!bucket) throw new Error('S3 bucket not configured')

    const s3Key = `documents/${userId}/${Date.now()}-${data.fileName.replace(/\s+/g, '_')}`

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: s3Key,
      ContentType: data.fileType,
      ContentLength: data.fileSize,
    })

    const s3 = getS3Client()
    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 300 }) // 5 min

    return { uploadUrl, s3Key }
  })

// ── Create document record (after direct S3 upload) ──────────────────
const createDocSchema = z.object({
  folderId: z.string().nullable().optional(),
  fileName: z.string().min(1),
  fileType: z.string().min(1),
  fileSize: z.number().int().positive(),
  s3Key: z.string().min(1),
  labels: z.array(z.string()).optional().default([]),
  description: z.string().optional(),
  isConfidential: z.boolean().optional().default(false),
})

export const createDocument = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => createDocSchema.parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')
    const userId = session.user.id

    const [file] = await db
      .insert(documentFile)
      .values({
        userId,
        folderId: data.folderId ?? null,
        fileName: data.fileName,
        fileType: data.fileType,
        fileSize: data.fileSize,
        s3Key: data.s3Key,
        labels: data.labels,
        description: data.description,
        isConfidential: data.isConfidential,
      })
      .returning()

    // Update storage usage
    await db
      .update(userStorage)
      .set({ usedBytes: sql`${userStorage.usedBytes} + ${data.fileSize}` })
      .where(eq(userStorage.userId, userId))

    return file
  })

// ── Delete document ───────────────────────────────────────────────────
export const deleteDocument = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => z.object({ id: z.string() }).parse(data))
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')
    const userId = session.user.id

    const file = await db.query.documentFile.findFirst({
      where: and(eq(documentFile.id, data.id), eq(documentFile.userId, userId)),
    })
    if (!file) throw new Error('Document not found')

    // Delete from S3
    try {
      const s3 = getS3Client()
      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_S3_BUCKET!,
          Key: file.s3Key,
        }),
      )
    } catch {
      // Log but don't block the DB deletion
      console.error('S3 delete failed for key:', file.s3Key)
    }

    await db
      .delete(documentFile)
      .where(and(eq(documentFile.id, data.id), eq(documentFile.userId, userId)))

    // Update storage usage
    await db
      .update(userStorage)
      .set({
        usedBytes: sql`GREATEST(${userStorage.usedBytes} - ${file.fileSize}, 0)`,
      })
      .where(eq(userStorage.userId, userId))

    return { success: true }
  })

// ── Get presigned GET URL for viewing a private S3 file ───────────────
export const getPresignedViewUrl = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) =>
    z.object({ id: z.string().min(1) }).parse(data),
  )
  .handler(async ({ data }) => {
    const request = getRequest()
    const session = await auth.api.getSession({ headers: request.headers })
    if (!session?.user?.id) throw new Error('Unauthorized')
    const userId = session.user.id

    const file = await db.query.documentFile.findFirst({
      where: and(eq(documentFile.id, data.id), eq(documentFile.userId, userId)),
    })
    if (!file) throw new Error('Document not found')

    const bucket = process.env.AWS_S3_BUCKET
    if (!bucket) throw new Error('S3 bucket not configured')

    const s3 = getS3Client()
    const command = new GetObjectCommand({ Bucket: bucket, Key: file.s3Key })
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 }) // 1 hour

    return { url }
  })
