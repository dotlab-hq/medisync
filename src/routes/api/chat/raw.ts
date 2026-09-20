import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod/v4'
import { generateText } from 'ai'
import { getChatModel } from '@/lib/ai-model'

const querySchema = z.string().trim().min(1, 'query is required')

export const Route = createFileRoute('/api/chat/raw')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const parsedQuery = querySchema.safeParse(url.searchParams.get('query'))

        if (!parsedQuery.success) {
          return Response.json({ error: 'query is required' }, { status: 400 })
        }

        try {
          const { text } = await generateText({
            model: getChatModel(),
            system: 'Reply concisely and directly.',
            prompt: parsedQuery.data,
            temperature: 0.7,
            maxOutputTokens: 4096,
          })
          const content = text.trim()

          if (!content) {
            return Response.json(
              { error: 'The AI provider returned an empty response' },
              { status: 502 },
            )
          }

          return new Response(content, {
            status: 200,
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
            },
          })
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'Raw chat error'
          return Response.json({ error: message }, { status: 500 })
        }
      },
    },
  },
})
