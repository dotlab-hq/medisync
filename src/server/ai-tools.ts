import { toolDefinition } from '@tanstack/ai'
import { db } from '@/db'
import { documentFile, documentFolder } from '@/db/schema'
import { eq, and, or, ilike, isNull } from 'drizzle-orm'
import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const MAX_EXPIRY_SECONDS = 7 * 24 * 3600 // 7 days
const DEFAULT_EXPIRY_SECONDS = 3600 // 1 hour
const MAX_CONTENT_CHARS = 50_000 // ~50 KB of text returned to LLM

// ---------------------------------------------------------------------------
// S3 client
// ---------------------------------------------------------------------------
function getS3Client() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
  if ( !accessKeyId || !secretAccessKey ) {
    throw new Error( 'S3 credentials not configured.' )
  }
  return new S3Client( {
    region: process.env.AWS_REGION ?? 'us-east-1',
    ...( process.env.AWS_S3_ENDPOINT
      ? { endpoint: process.env.AWS_S3_ENDPOINT, forcePathStyle: true }
      : {} ),
    credentials: { accessKeyId, secretAccessKey },
  } )
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const TEXT_MIME_PREFIXES = [
  'text/',
  'application/json',
  'application/xml',
  'application/csv',
  'application/x-ndjson',
  'application/x-yaml',
]

function isTextFile( mimeType: string ): boolean {
  return TEXT_MIME_PREFIXES.some( ( prefix ) => mimeType.startsWith( prefix ) )
}

// ---------------------------------------------------------------------------
// Tool 1: list_folders
// ---------------------------------------------------------------------------
export const listFoldersDef = toolDefinition( {
  name: 'list_folders',
  description:
    "List all folders in the user's document workspace, including how many files each folder contains and how many files sit at the root (not in any folder). Call this first to explore the workspace structure.",
  inputSchema: {
    type: 'object',
    properties: {},
    required: [],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      folders: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            labels: { type: 'array', items: { type: 'string' } },
            fileCount: { type: 'number' },
            createdAt: { type: 'string' },
          },
          required: ['id', 'name', 'labels', 'fileCount', 'createdAt'],
          additionalProperties: false,
        },
      },
      rootFileCount: {
        type: 'number',
        description: 'Number of files that are not inside any folder',
      },
    },
    required: ['folders', 'rootFileCount'],
    additionalProperties: false,
  },
} )

export function createListFoldersTool( userId: string ) {
  return listFoldersDef.server( async () => {
    const folders = await db.query.documentFolder.findMany( {
      where: eq( documentFolder.userId, userId ),
      with: { files: { columns: { id: true } } },
    } )

    const rootFiles = await db.query.documentFile.findMany( {
      where: and( eq( documentFile.userId, userId ), isNull( documentFile.folderId ) ),
      columns: { id: true },
    } )

    return {
      folders: folders.map( ( f ) => ( {
        id: f.id,
        name: f.name,
        labels: f.labels,
        fileCount: f.files.length,
        createdAt: f.createdAt.toISOString(),
      } ) ),
      rootFileCount: rootFiles.length,
    }
  } )
}

// ---------------------------------------------------------------------------
// Tool 2: list_files_in_folder
// ---------------------------------------------------------------------------
export const listFilesInFolderDef = toolDefinition( {
  name: 'list_files_in_folder',
  description:
    "List documents inside a specific folder. Pass folderId to get that folder's contents. Omit folderId (or pass null) to list unfiled documents at the workspace root.",
  inputSchema: {
    type: 'object',
    properties: {
      folderId: {
        type: ['string', 'null'],
        description: 'Folder ID from list_folders, or null/omit for root files',
      },
    },
    required: [],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      folderName: { type: ['string', 'null'] },
      files: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            fileName: { type: 'string' },
            fileType: { type: 'string' },
            fileSize: { type: 'number' },
            labels: { type: 'array', items: { type: 'string' } },
            description: { type: ['string', 'null'] },
            isConfidential: { type: 'boolean' },
            createdAt: { type: 'string' },
          },
          required: [
            'id', 'fileName', 'fileType', 'fileSize',
            'labels', 'description', 'isConfidential', 'createdAt',
          ],
          additionalProperties: false,
        },
      },
    },
    required: ['folderName', 'files'],
    additionalProperties: false,
  },
} )

export function createListFilesInFolderTool( userId: string ) {
  return listFilesInFolderDef.server( async ( args: any ) => {
    const { folderId } = args
    let folderName: string | null = null

    if ( folderId ) {
      const folder = await db.query.documentFolder.findFirst( {
        where: and(
          eq( documentFolder.id, folderId ),
          eq( documentFolder.userId, userId ),
        ),
      } )
      if ( !folder ) throw new Error( 'Folder not found' )
      folderName = folder.name
    }

    const files = await db.query.documentFile.findMany( {
      where: and(
        eq( documentFile.userId, userId ),
        folderId
          ? eq( documentFile.folderId, folderId )
          : isNull( documentFile.folderId ),
      ),
    } )

    return {
      folderName,
      files: files.map( ( f ) => ( {
        id: f.id,
        fileName: f.fileName,
        fileType: f.fileType,
        fileSize: f.fileSize,
        labels: f.labels,
        description: f.description ?? null,
        isConfidential: f.isConfidential,
        createdAt: f.createdAt.toISOString(),
      } ) ),
    }
  } )
}

// ---------------------------------------------------------------------------
// Tool 3: search_files
// ---------------------------------------------------------------------------
export const searchFilesDef = toolDefinition( {
  name: 'search_files',
  description:
    'Search across all uploaded documents in the workspace by file name, description, or MIME type. Use this to find files relevant to a user query before reading them.',
  inputSchema: {
    type: 'object',
    properties: {
      query: {
        type: 'string',
        description: 'Search term matched against file name, description, and MIME type',
      },
    },
    required: ['query'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      results: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            fileName: { type: 'string' },
            fileType: { type: 'string' },
            fileSize: { type: 'number' },
            folderName: { type: ['string', 'null'] },
            description: { type: ['string', 'null'] },
            labels: { type: 'array', items: { type: 'string' } },
            createdAt: { type: 'string' },
          },
          required: [
            'id', 'fileName', 'fileType', 'fileSize',
            'folderName', 'description', 'labels', 'createdAt',
          ],
          additionalProperties: false,
        },
      },
    },
    required: ['results'],
    additionalProperties: false,
  },
} )

export function createSearchFilesTool( userId: string ) {
  return searchFilesDef.server( async ( args: any ) => {
    const { query } = args
    const term = `%${query}%`
    const matches = await db.query.documentFile.findMany( {
      where: and(
        eq( documentFile.userId, userId ),
        or(
          ilike( documentFile.fileName, term ),
          ilike( documentFile.description, term ),
          ilike( documentFile.fileType, term ),
        ),
      ),
      with: { folder: true },
      limit: 20,
    } )

    return {
      results: matches.map( ( f ) => ( {
        id: f.id,
        fileName: f.fileName,
        fileType: f.fileType,
        fileSize: f.fileSize,
        folderName: f.folder?.name ?? null,
        description: f.description ?? null,
        labels: f.labels,
        createdAt: f.createdAt.toISOString(),
      } ) ),
    }
  } )
}

// ---------------------------------------------------------------------------
// Tool 4: get_file_url
// Presigned URL with configurable content-disposition and expiry
// ---------------------------------------------------------------------------
export const getFileUrlDef = toolDefinition( {
  name: 'get_file_url',
  description:
    "Generate a presigned URL for a document. Use disposition='inline' so the user can view the file in-browser (good for PDFs, images), or disposition='attachment' for a forced-download link. Increase expiresIn (seconds) if the user needs a longer-lived link — default is 3600 (1 hour), max is 604800 (7 days).",
  inputSchema: {
    type: 'object',
    properties: {
      fileId: {
        type: 'string',
        description: 'Document ID from list_folders, list_files_in_folder, or search_files',
      },
      disposition: {
        type: 'string',
        enum: ['inline', 'attachment'],
        description:
          "Content-Disposition: 'inline' = view in browser, 'attachment' = force download. Defaults to 'inline'.",
      },
      expiresIn: {
        type: 'number',
        description:
          'URL validity in seconds. Default: 3600 (1 h). Max: 604800 (7 days). Increase if the user requests a longer-lived link.',
      },
    },
    required: ['fileId'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      fileName: { type: 'string' },
      fileType: { type: 'string' },
      url: { type: 'string' },
      disposition: { type: 'string' },
      expiresIn: { type: 'number' },
      description: { type: ['string', 'null'] },
    },
    required: ['fileName', 'fileType', 'url', 'disposition', 'expiresIn', 'description'],
    additionalProperties: false,
  },
} )

export function createGetFileUrlTool( userId: string ) {
  return getFileUrlDef.server(
    async ( args: any ) => {
      const { fileId, disposition = 'inline', expiresIn } = args
      const file = await db.query.documentFile.findFirst( {
        where: and(
          eq( documentFile.id, fileId ),
          eq( documentFile.userId, userId ),
        ),
      } )
      if ( !file ) throw new Error( 'File not found or access denied' )

      const bucket = process.env.AWS_S3_BUCKET
      if ( !bucket ) throw new Error( 'S3 bucket not configured' )

      const resolvedExpiry = Math.min(
        Math.max( 1, expiresIn ?? DEFAULT_EXPIRY_SECONDS ),
        MAX_EXPIRY_SECONDS,
      )

      const s3 = getS3Client()
      const command = new GetObjectCommand( {
        Bucket: bucket,
        Key: file.s3Key,
        ResponseContentDisposition:
          disposition === 'attachment'
            ? `attachment; filename="${file.fileName}"`
            : 'inline',
        ResponseContentType: file.fileType,
      } )
      const url = await getSignedUrl( s3, command, { expiresIn: resolvedExpiry } )

      return {
        fileName: file.fileName,
        fileType: file.fileType,
        url,
        disposition,
        expiresIn: resolvedExpiry,
        description: file.description ?? null,
      }
    },
  )
}

// ---------------------------------------------------------------------------
// Tool 5: read_file_content
// Fetches actual bytes from S3.
//   • Text files  → returns raw text (truncated to MAX_CONTENT_CHARS)
//   • Images/PDFs → returns a presigned inline URL for LLM or user to view
// ---------------------------------------------------------------------------
export const readFileContentDef = toolDefinition( {
  name: 'read_file_content',
  description:
    'Read the actual content of a document. For plain-text files (TXT, CSV, JSON, Markdown, XML, YAML) the file text is returned so you can analyse or summarise it. For images and PDFs a presigned inline URL is returned — include it in your reply so the user can open it. Use this when the user asks you to read, summarise, or analyse a specific file.',
  inputSchema: {
    type: 'object',
    properties: {
      fileId: {
        type: 'string',
        description: 'Document ID to read',
      },
    },
    required: ['fileId'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: {
      fileName: { type: 'string' },
      fileType: { type: 'string' },
      contentType: {
        type: 'string',
        enum: ['text', 'url'],
        description:
          "'text' — textual content returned directly; 'url' — binary/image/PDF, presigned inline URL returned",
      },
      content: {
        type: 'string',
        description:
          'File text (when contentType=text) OR presigned inline URL (when contentType=url)',
      },
      truncated: {
        type: 'boolean',
        description: 'true when text was truncated to avoid overflowing the context window',
      },
    },
    required: ['fileName', 'fileType', 'contentType', 'content', 'truncated'],
    additionalProperties: false,
  },
} )

export function createReadFileContentTool( userId: string ) {
  return readFileContentDef.server( async ( args: any ) => {
    const { fileId } = args
    const file = await db.query.documentFile.findFirst( {
      where: and(
        eq( documentFile.id, fileId ),
        eq( documentFile.userId, userId ),
      ),
    } )
    if ( !file ) throw new Error( 'File not found or access denied' )

    const bucket = process.env.AWS_S3_BUCKET
    if ( !bucket ) throw new Error( 'S3 bucket not configured' )

    const s3 = getS3Client()

    if ( isTextFile( file.fileType ) ) {
      // Server fetches the object directly — no presigned URL needed
      const command = new GetObjectCommand( { Bucket: bucket, Key: file.s3Key } )
      const response = await s3.send( command )
      if ( !response.Body ) throw new Error( 'Unable to read file body from S3' )

      const rawText = await (
        response.Body as { transformToString: ( enc: string ) => Promise<string> }
      ).transformToString( 'utf8' )

      const truncated = rawText.length > MAX_CONTENT_CHARS
      const content = truncated
        ? rawText.slice( 0, MAX_CONTENT_CHARS ) + '\n\n[…content truncated to 50 000 characters…]'
        : rawText

      return {
        fileName: file.fileName,
        fileType: file.fileType,
        contentType: 'text' as const,
        content,
        truncated,
      }
    }

    // Binary / image / PDF — return presigned inline URL
    const command = new GetObjectCommand( {
      Bucket: bucket,
      Key: file.s3Key,
      ResponseContentDisposition: 'inline',
      ResponseContentType: file.fileType,
    } )
    const url = await getSignedUrl( s3, command, { expiresIn: DEFAULT_EXPIRY_SECONDS } )

    return {
      fileName: file.fileName,
      fileType: file.fileType,
      contentType: 'url' as const,
      content: url,
      truncated: false,
    }
  } )
}
