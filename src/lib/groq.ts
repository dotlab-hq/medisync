import { createOpenaiChat, createOpenaiTranscription } from '@tanstack/ai-openai'

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'

function getGroqApiKey(): string {
  const key = process.env.GROQ_API_KEY
  if ( !key ) throw new Error( 'GROQ_API_KEY is not configured' )
  return key
}

/** Groq chat adapter (OpenAI-compatible via base URL override) */
export function groqChat( model = 'llama-3.3-70b-versatile' ) {
  // Groq models aren't in OpenAI's type union — cast to satisfy the generic
  return createOpenaiChat( model as 'gpt-5.2', getGroqApiKey(), {
    baseURL: GROQ_BASE_URL,
  } )
}

/** Groq transcription adapter (Whisper via OpenAI-compatible API) */
export function groqTranscription( model = 'whisper-large-v3-turbo' ) {
  return createOpenaiTranscription( model as 'whisper-1', getGroqApiKey(), {
    baseURL: GROQ_BASE_URL,
  } )
}
