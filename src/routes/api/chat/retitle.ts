import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { chat, streamToText } from '@tanstack/ai'
import { anthropicChat } from '@/lib/anthropic'

export const Route = createFileRoute( '/api/chat/retitle' )( {
  server: {
    handlers: {
      POST: async ( { request } ) => {
        const session = await auth.api.getSession( {
          headers: request.headers,
        } )
        if ( !session || !session.user.id ) {
          return new Response( JSON.stringify( { error: 'Unauthorized' } ), {
            status: 401,
            headers: { 'Content-Type': 'application/json' },
          } )
        }

        try {
          const { messages } = await request.json()
          if ( !messages || !Array.isArray( messages ) || messages.length === 0 ) {
            return new Response( JSON.stringify( { title: 'New Chat' } ), {
              status: 200,
              headers: { 'Content-Type': 'application/json' },
            } )
          }

          // Take the first few messages for context
          const context = messages
            .slice( 0, 4 )
            .map( ( message: unknown ) => {
              const entry = message as Record<string, unknown>
              const content =
                typeof entry.content === 'string'
                  ? entry.content
                  : typeof entry.text === 'string'
                    ? entry.text
                    : ''
              const role =
                typeof entry.role === 'string' && entry.role.length > 0
                  ? entry.role
                  : 'user'
              return `${role}: ${content.slice( 0, 200 )}`
            } )
            .join( '\n' )

          const stream = chat( {
            adapter: anthropicChat( 'claude-sonnet-4-5' ),
            systemPrompts: [
              'Generate a very short title (3-6 words, no quotes) summarizing this conversation. Reply with ONLY the title.',
            ],
            messages: [{ role: 'user', content: context }],
            maxTokens: 30,
          } )

          const title =
            ( await streamToText( stream ) ).trim().slice( 0, 100 ) || 'New Chat'

          return new Response( JSON.stringify( { title } ), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          } )
        } catch ( error ) {
          console.error( 'Retitle error:', error )
          return new Response( JSON.stringify( { title: 'New Chat' } ), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          } )
        }
      },
    },
  },
} )
