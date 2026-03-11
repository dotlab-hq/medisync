import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod/v4'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'
import { chat, streamToText } from '@tanstack/ai'
import { groqChat } from '@/lib/groq'

const getSession = async () => {
  const request = getRequest()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user.id) throw new Error('Unauthorized')
  return session
}

const retitleSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.string(),
        content: z.string(),
      }),
    )
    .min(1),
})

/**
 * Generate a short conversation title from the first few messages.
 * Uses groqChat (Mixtral) via TanStack AI chat() + streamToText().
 */
export const retitleConversation = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => retitleSchema.parse(data))
  .handler(async ({ data }) => {
    await getSession()

    const context = data.messages
      .slice(0, 4)
      .map((m) => `${m.role}: ${m.content.slice(0, 200)}`)
      .join('\n')

    try {
      const stream = chat({
        adapter: groqChat('llama-3.1-8b-instant'),
        systemPrompts: [
          'Generate a very short title (3-6 words, no quotes) summarizing this conversation. Reply with ONLY the title.',
        ],
        messages: [{ role: 'user', content: context }],
      })

      const title =
        (await streamToText(stream)).trim().slice(0, 100) || 'New Chat'
      return { title }
    } catch {
      return { title: 'New Chat' }
    }
  })
