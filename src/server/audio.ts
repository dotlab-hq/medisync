import { getRequest } from '@tanstack/react-start/server'
import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'
import { db } from '@/db'
import { chatMessage } from '@/db/schema'
import { eq } from 'drizzle-orm'
import { auth } from '@/lib/auth'
import { transcribeAudio, analyzeTone, formatTranscript } from '@/lib/audio-pipeline'

// Helper to get session
const getSession = async () => {
    const request = getRequest()
    const session = await auth.api.getSession( { headers: request.headers } )
    if ( !session?.user.id ) throw new Error( 'Unauthorized' )
    return session
}

// ── Schema ───────────────────────────────────────────────────────────
const generateAudioSchema = z.object( {
    messageId: z.string().min( 1 ),
    content: z.string().min( 1 ),
} )

// ── Generate and cache TTS audio ─────────────────────────────────────
export const generateMessageAudio = createServerFn( { method: 'POST' } )
    .inputValidator( ( data: unknown ) => generateAudioSchema.parse( data ) )
    .handler( async ( { data } ) => {
        await getSession()

        // Check if audio already exists
        const message = await db.query.chatMessage.findFirst( {
            where: eq( chatMessage.id, data.messageId ),
        } )

        if ( message?.audioUrl ) {
            return { audioUrl: message.audioUrl, cached: true }
        }

        // TODO: Generate audio using TTS service (e.g., OpenAI TTS, ElevenLabs)
        // Example with OpenAI:
        // const response = await fetch('https://api.openai.com/v1/audio/speech', {
        //     method: 'POST',
        //     headers: {
        //         'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({
        //         model: 'tts-1',
        //         voice: 'alloy',
        //         input: data.content,
        //     }),
        // });
        // const audioBlob = await response.blob();
        // const audioUrl = await uploadToS3(audioBlob, `${data.messageId}.mp3`);

        const audioUrl = `https://example.com/audio/${data.messageId}.mp3`

        // Save the audio URL to the database
        await db
            .update( chatMessage )
            .set( { audioUrl } )
            .where( eq( chatMessage.id, data.messageId ) )

        return { audioUrl, cached: false }
    } )

// Note: Audio transcription is handled by the transcribeAudioMessage server function below.

// ── Get cached audio URL ─────────────────────────────────────────────
export const getMessageAudio = createServerFn( { method: 'GET' } )
    .inputValidator( ( data: unknown ) =>
        z.object( { messageId: z.string() } ).parse( data ),
    )
    .handler( async ( { data } ) => {
        await getSession()

        const message = await db.query.chatMessage.findFirst( {
            where: eq( chatMessage.id, data.messageId ),
        } )

        return { audioUrl: message?.audioUrl || null }
    } )

// ── Transcribe audio from base64 (full pipeline: Whisper → Tone → Format) ──
const transcribeAudioSchema = z.object( {
    audioBase64: z.string().min( 1 ),
    mimeType: z.string().default( 'audio/webm' ),
} )

export const transcribeAudioMessage = createServerFn( { method: 'POST' } )
    .inputValidator( ( data: unknown ) => transcribeAudioSchema.parse( data ) )
    .handler( async ( { data } ) => {
        await getSession()

        // Decode base64 → Uint8Array → File for the TanStack AI transcription adapter
        const binary = atob( data.audioBase64 )
        const bytes = new Uint8Array( binary.length )
        for ( let i = 0; i < binary.length; i++ ) bytes[i] = binary.charCodeAt( i )
        const ext = data.mimeType.split( '/' )[1] ?? 'webm'
        const audioFile = new File( [bytes], `recording.${ext}`, { type: data.mimeType } )

        // Step 1: Whisper transcription
        const rawText = await transcribeAudio( audioFile )
        if ( !rawText.trim() ) return { text: '', rawText: '', toneAnalysis: null }

        // Steps 2 & 3: Tone analysis then formatting
        const toneAnalysis = await analyzeTone( rawText )
        const text = await formatTranscript( rawText, toneAnalysis )

        return { text, rawText, toneAnalysis }
    } )
