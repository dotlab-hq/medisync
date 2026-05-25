import {
  createOpenaiChat,
  createOpenaiTranscription,
} from '@tanstack/ai-openai'
import { createServerOnlyFn } from '@tanstack/react-start'

const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'
const OPENAI_BASE_URL = 'https://ai-edge.onrender.com/v1'


function getGroqApiKey(): string {
  const key = process.env.GROQ_API_KEY
  if ( !key ) throw new Error( 'GROQ_API_KEY is not configured' )
  return key
}

function getOpenAIApiKey(): string {
  const key = process.env.OPENAI_API_KEY
  if ( !key ) throw new Error( 'OPENAI_API_KEY is not configured' );
  // console.log('Using OpenAI API Key:', key.slice(0, 4) + '...' + key.slice(-4)) // Log partial key for verification
  return key
}

/** Groq chat adapter (OpenAI-compatible via base URL override) */
export const groqChat = createServerOnlyFn(
  ( model: string = 'llama-3.3-70b-versatile' ) => {
    // Groq models aren't in OpenAI's type union — cast to satisfy the generic
    return createOpenaiChat( model as 'gpt-5.2', getOpenAIApiKey(), {
      baseURL: OPENAI_BASE_URL,
    } )
  },
)

/** Groq transcription adapter (Whisper via OpenAI-compatible API) */
export const groqTranscription = createServerOnlyFn(
  ( model: string = 'whisper-large-v3-turbo' ) => {
    return createOpenaiTranscription( model as 'whisper-1', getGroqApiKey(), {
      baseURL: GROQ_BASE_URL,
    } )
  },
)
