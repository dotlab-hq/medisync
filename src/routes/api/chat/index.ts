import { chat, toServerSentEventsResponse } from '@tanstack/ai'
import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { groqChat } from '@/lib/groq'
import {
  createGetUserFileTool,
  createListUserFilesTool,
} from '@/server/ai-tools'

const SYSTEM_PROMPT = `You are MediSync AI, a helpful health assistant.
You can help users with their medical documents, health questions, appointments, and reminders.
When the user mentions a file or document, use the available tools to retrieve it.
Be concise, empathetic, and accurate. Never provide medical diagnoses — recommend consulting a doctor for medical concerns.
If using a tool to fetch a file, present the result clearly with the file name and a clickable link.`

export const Route = createFileRoute('/api/chat/')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        // Auth check
        const session = await auth.api.getSession({
          headers: request.headers,
        })
        if (!session || !session.user.id) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        const userId = session.user.id

        try {
          const { messages } = await request.json()

          // Build server tools with ownership scoped to this user
          const getFileTool = createGetUserFileTool(userId)
          const listFilesTool = createListUserFilesTool(userId)

          const stream = chat({
            adapter: groqChat('openai/gpt-oss-120b'),
            messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
            tools: [getFileTool, listFilesTool],
          })

          return toServerSentEventsResponse(stream)
        } catch (error) {
          const message =
            error instanceof Error ? error.message : 'An error occurred'
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      },
    },
  },
})
