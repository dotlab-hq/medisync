import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'

export const Route = createFileRoute('/api/chat/tts')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const session = await auth.api.getSession({
          headers: request.headers,
        })
        if (!session?.user.id) {
          return new Response(JSON.stringify({ error: 'Unauthorized' }), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          })
        }

        try {
          const { text, voice } = await request.json()
          if (!text || typeof text !== 'string') {
            return new Response(JSON.stringify({ error: 'text is required' }), {
              status: 400,
              headers: { 'Content-Type': 'application/json' },
            })
          }

          const apiKey = process.env.GROQ_API_KEY
          if (!apiKey) {
            return new Response(
              JSON.stringify({ error: 'GROQ_API_KEY not configured' }),
              { status: 500, headers: { 'Content-Type': 'application/json' } },
            )
          }

          // Call Groq TTS endpoint directly (OpenAI-compatible)
          const response = await fetch(
            'https://api.groq.com/openai/v1/audio/speech',
            {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                model: 'playai-tts',
                input: text.slice(0, 4096),
                voice: voice || 'Arista-PlayAI',
                response_format: 'wav',
              }),
            },
          )

          if (!response.ok) {
            const errText = await response.text()
            return new Response(
              JSON.stringify({ error: `TTS failed: ${errText}` }),
              { status: 502, headers: { 'Content-Type': 'application/json' } },
            )
          }

          const arrayBuf = await response.arrayBuffer()
          return new Response(arrayBuf, {
            status: 200,
            headers: {
              'Content-Type': 'audio/wav',
              'Content-Length': String(arrayBuf.byteLength),
            },
          })
        } catch (error) {
          const message = error instanceof Error ? error.message : 'TTS error'
          return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          })
        }
      },
    },
  },
})
