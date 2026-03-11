import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'

export const Route = createFileRoute( '/api/chat/transcribe' )( {
    server: {
        handlers: {
            POST: async ( { request } ) => {
                const session = await auth.api.getSession( {
                    headers: request.headers,
                } )
                if ( !session?.user.id ) {
                    return new Response( JSON.stringify( { error: 'Unauthorized' } ), {
                        status: 401,
                        headers: { 'Content-Type': 'application/json' },
                    } )
                }

                try {
                    const formData = await request.formData()
                    const audioFile = formData.get( 'audio' ) as File | null

                    if ( !audioFile || !( audioFile instanceof File ) ) {
                        return new Response(
                            JSON.stringify( { error: 'audio file is required' } ),
                            { status: 400, headers: { 'Content-Type': 'application/json' } },
                        )
                    }

                    const apiKey = process.env.GROQ_API_KEY
                    if ( !apiKey ) {
                        return new Response(
                            JSON.stringify( { error: 'GROQ_API_KEY not configured' } ),
                            { status: 500, headers: { 'Content-Type': 'application/json' } },
                        )
                    }

                    const groqForm = new FormData()
                    groqForm.append( 'file', audioFile )
                    groqForm.append( 'model', 'whisper-large-v3-turbo' )
                    groqForm.append( 'response_format', 'json' )

                    const response = await fetch(
                        'https://api.groq.com/openai/v1/audio/transcriptions',
                        {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${apiKey}`,
                            },
                            body: groqForm,
                        },
                    )

                    if ( !response.ok ) {
                        const errText = await response.text()
                        return new Response(
                            JSON.stringify( { error: `Groq transcription failed: ${errText}` } ),
                            { status: 502, headers: { 'Content-Type': 'application/json' } },
                        )
                    }

                    const result = await response.json()
                    return new Response( JSON.stringify( { text: result.text ?? '' } ), {
                        status: 200,
                        headers: { 'Content-Type': 'application/json' },
                    } )
                } catch ( error ) {
                    const message =
                        error instanceof Error ? error.message : 'Transcription error'
                    return new Response( JSON.stringify( { error: message } ), {
                        status: 500,
                        headers: { 'Content-Type': 'application/json' },
                    } )
                }
            },
        },
    },
} )
