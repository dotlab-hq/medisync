import { createAnthropicChat } from '@tanstack/ai-anthropic'
import { createServerOnlyFn } from '@tanstack/react-start'

const ANTHROPIC_BASE_URL = 'https://ai-edge.onrender.com/anthropic'

function getAnthropicApiKey(): string {
    const key = process.env.ANTHROPIC_API_KEY
    if ( !key ) throw new Error( 'ANTHROPIC_API_KEY is not configured' )
    return key
}

/** Anthropic chat adapter via ai-edge. */
export const anthropicChat = createServerOnlyFn(
    ( model: string = 'claude-sonnet-4-5' ) => {
        return createAnthropicChat(
            model as 'claude-sonnet-4-5',
            getAnthropicApiKey(),
            { baseURL: ANTHROPIC_BASE_URL },
        )
    },
)
