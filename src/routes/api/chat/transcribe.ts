import { createFileRoute } from '@tanstack/react-router'
import { auth } from '@/lib/auth'
import { transcribeAudio, analyzeTone, formatTranscript } from '@/lib/audio-pipeline'

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

                    if ( !process.env.GROQ_API_KEY ) {
                        return new Response(
                            JSON.stringify( { error: 'GROQ_API_KEY not configured' } ),
                            { status: 500, headers: { 'Content-Type': 'application/json' } },
                        )
                    }

                    // Step 1: Whisper transcription
                    const rawText = await transcribeAudio( audioFile )
                    if ( !rawText.trim() ) {
                        return new Response(
                            JSON.stringify( { text: '', rawText: '', toneAnalysis: null } ),
                            { status: 200, headers: { 'Content-Type': 'application/json' } },
                        )
                    }

                    // Steps 2 & 3: Tone analysis (Qwen) then formatting (Llama)
                    const toneAnalysis = await analyzeTone( rawText )
                    const formattedText = await formatTranscript( rawText, toneAnalysis )

                    return new Response(
                        JSON.stringify( {
                            text: formattedText,
                            rawText,
                            toneAnalysis,
                        } ),
                        { status: 200, headers: { 'Content-Type': 'application/json' } },
                    )
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
