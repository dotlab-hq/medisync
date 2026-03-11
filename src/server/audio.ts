import { getRequest } from '@tanstack/react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { chatMessage } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'

// Helper to get session
const getSession = async () => {
  const request = getRequest()
  const session = await auth.api.getSession({ headers: request.headers })
  if (!session?.user.id) throw new Error('Unauthorized')
  return session
}

// ── Schema ───────────────────────────────────────────────────────────
const generateAudioSchema = z.object({
  messageId: z.string().min(1),
  content: z.string().min(1),
})

const transcribeAudioSchema = z.object({
  audio: z.instanceof(File),
})

// ── Generate and cache TTS audio ─────────────────────────────────────
export const generateMessageAudio = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => generateAudioSchema.parse(data))
  .handler(async ({ data }) => {
    await getSession()

    // Check if audio already exists
    const message = await db.query.chatMessage.findFirst({
      where: eq(chatMessage.id, data.messageId),
    })

    if (message?.audioUrl) {
      return { audioUrl: message.audioUrl, cached: true }
    }

    // TODO: Generate audio using TTS service (e.g., OpenAI TTS, ElevenLabs)
    // Example with OpenAI:
    // const response = await fetch('https://api.openai.com/v1/audio/speech', {
    //     method: 'POST',
    //     headers: {
    //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    //         'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //         model: 'tts-1',
    //         voice: 'alloy',
    //         input: data.content,
    //     }),
    // });
    // const audioBlob = await response.blob();
    // const audioUrl = await uploadToS3(audioBlob, `${data.messageId}.mp3`);

    const audioUrl = `https://example.com/audio/${data.messageId}.mp3`

    // Save the audio URL to the database
    await db
      .update(chatMessage)
      .set({ audioUrl })
      .where(eq(chatMessage.id, data.messageId))

    return { audioUrl, cached: false }
  })

// ── Transcribe audio using Groq Whisper ─────────────────────────────
export const transcribeAudio = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => transcribeAudioSchema.parse(data))
  .handler(async ({ data }) => {
    await getSession()

    const GROQ_API_KEY = process.env.GROQ_API_KEY
    if (!GROQ_API_KEY) {
      throw new Error('GROQ_API_KEY not configured')
    }

    try {
      const formData = new FormData()
      formData.append('file', data.audio)
      formData.append('model', 'whisper-large-v3-turbo')

      const response = await fetch(
        'https://api.groq.com/openai/v1/audio/transcriptions',
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${GROQ_API_KEY}`,
          },
          body: formData,
        },
      )

      if (!response.ok) {
        throw new Error(`Groq API error: ${response.statusText}`)
      }

      const result = await response.json()
      return { text: result.text }
    } catch (error) {
      console.error('Error transcribing audio:', error)
      throw new Error('Failed to transcribe audio')
    }
  })

// ── Get cached audio URL ─────────────────────────────────────────────
export const getMessageAudio = createServerFn({ method: 'GET' })
  .inputValidator((data: unknown) =>
    z.object({ messageId: z.string() }).parse(data),
  )
  .handler(async ({ data }) => {
    await getSession()

    const message = await db.query.chatMessage.findFirst({
      where: eq(chatMessage.id, data.messageId),
    })

    return { audioUrl: message?.audioUrl || null }
  })
