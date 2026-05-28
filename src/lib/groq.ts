import { createOpenaiTranscription } from '@tanstack/ai-openai'
import { createServerOnlyFn } from '@tanstack/react-start'

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'

function getGroqApiKey(): string {
  const key = process.env.GROQ_API_KEY
  if ( !key ) throw new Error( 'GROQ_API_KEY is not configured' )
  return key
}

/** Groq transcription adapter (Whisper via OpenAI-compatible API) */
export const groqTranscription = createServerOnlyFn(
  ( model: string = 'whisper-large-v3-turbo' ) => {
    return createOpenaiTranscription( model as 'whisper-1', getGroqApiKey(), {
      baseURL: GROQ_BASE_URL,
    } )
  },
)
