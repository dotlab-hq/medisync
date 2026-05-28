import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod/v4'
import { auth } from '@/lib/auth'
import { getRequest } from '@tanstack/react-start/server'
import { chat, streamToText } from '@tanstack/ai'
import { anthropicChat } from '@/lib/anthropic'

const getSession = async () => {
  const request = getRequest()
  const session = await auth.api.getSession( { headers: request.headers } )
  if ( !session?.user.id ) throw new Error( 'Unauthorized' )
  return session
}

const retitleSchema = z.object( {
  messages: z
    .array(
      z.object( {
        role: z.string(),
        content: z.string(),
      } ),
    )
    .min( 1 ),
} )

/**
 * Generate a short conversation title from the first few messages.
 * Uses OpenAI adapter via TanStack AI chat() + streamToText().
 */
export const retitleConversation = createServerFn( { method: 'POST' } )
  .inputValidator( ( data: unknown ) => retitleSchema.parse( data ) )
  .handler( async ( { data } ) => {
    await getSession()

    const context = data.messages
      .slice( 0, 4 )
      .map( ( m ) => `${m.role}: ${m.content.slice( 0, 200 )}` )
      .join( '\n' )
    console.log( 'Context for retitle:', context )

    try {
      const stream = chat( {
        adapter: anthropicChat( 'claude-sonnet-4-5' ),
        systemPrompts: [
          'Generate a very short title (3-6 words, no quotes) summarizing this conversation. Reply with ONLY the title.',
        ],
        messages: [{ role: 'user', content: context }],
        maxTokens: 30,
      } )

      const generatedTitle = ( await streamToText( stream ) )
        .trim()
        .slice( 0, 100 )
      return { title: generatedTitle || 'New Chat' }
    } catch ( e ) {
      console.error( 'Error generating title:', e )
      return { title: 'New Chat' }
    }
  } )
