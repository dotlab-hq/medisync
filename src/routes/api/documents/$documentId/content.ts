import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { getOwnedDocumentObject } from '@/server/documents'

function safeFilename(value: string): string {
  return value.replace(/["\\\r\n]/g, '_')
}

export const Route = createFileRoute('/api/documents/$documentId/content')({
  server: {
    handlers: {
      GET: async ({ request, params }) => {
        const session = await auth.api.getSession({ headers: request.headers })
        if (!session?.user.id) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const result = await getOwnedDocumentObject(
          session.user.id,
          params.documentId,
        )
        if (!result?.object.Body) {
          return Response.json({ error: 'Document not found' }, { status: 404 })
        }

        const headers = new Headers({
          'Content-Type': result.file.fileType || 'application/octet-stream',
          'Content-Disposition': `inline; filename="${safeFilename(result.file.fileName)}"`,
          'Cache-Control': 'private, no-store',
          'X-Content-Type-Options': 'nosniff',
        })
        if (result.object.ContentLength != null) {
          headers.set('Content-Length', String(result.object.ContentLength))
        }
        if (result.object.ETag) headers.set('ETag', result.object.ETag)

        return new Response(result.object.Body.transformToWebStream(), {
          status: 200,
          headers,
        })
      },
    },
  },
})
