import { createGroq } from '@ai-sdk/groq'

export const CHAT_MODEL_ID = 'openai/gpt-oss-120b' as const

function getGroqApiKey(): string {
  const key = process.env.GROQ_API_KEY
  if (!key || /temporary|your-|xxx|change-me/i.test(key)) {
    throw new Error('AI is not configured. Set a valid GROQ_API_KEY.')
  }
  return key
}

export function getChatModel() {
  return createGroq({ apiKey: getGroqApiKey() })(CHAT_MODEL_ID)
}

export function getGroqProvider() {
  return createGroq({ apiKey: getGroqApiKey() })
}
