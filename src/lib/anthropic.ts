import { createAnthropicChat } from '@tanstack/ai-anthropic'
import { createServerOnlyFn } from '@tanstack/react-start'

const ANTHROPIC_BASE_URL = 'https://ai-edge.onrender.com/anthropic'

function getAnthropicApiKey(): string {
  const key = process.env.RELAYX_API_KEY || process.env.ANTHROPIC_API_KEY
  if (!key || key.includes('temporary')) {
    throw new Error(
      'AI is not configured. Set RELAYX_API_KEY for ai-edge or a valid ANTHROPIC_API_KEY.',
    )
  }
  return key
}

/** Anthropic chat adapter via ai-edge. */
export const anthropicChat = createServerOnlyFn(
  (model: string = 'claude-sonnet-4-5') => {
    return createAnthropicChat(
      model as 'claude-sonnet-4-5',
      getAnthropicApiKey(),
      { baseURL: ANTHROPIC_BASE_URL },
    )
  },
)
