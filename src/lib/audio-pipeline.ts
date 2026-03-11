const GROQ_BASE_URL = 'https://api.groq.com/openai/v1'

/** Max characters of transcript sent to tone analysis to keep within model context limits */
const MAX_TONE_ANALYSIS_LENGTH = 2000

function getApiKey(): string {
  const key = process.env.GROQ_API_KEY
  if ( !key ) throw new Error( 'GROQ_API_KEY not configured' )
  return key
}

export type ToneAnalysis = {
  happiness: number
  sadness: number
  anger: number
  anxiety: number
  calmness: number
  urgency: number
  overallMood: string
}

/** Step 1: Transcribe audio using Whisper */
export async function transcribeAudio( audioFile: File ): Promise<string> {
  const fd = new FormData()
  fd.append( 'file', audioFile )
  fd.append( 'model', 'whisper-large-v3-turbo' )
  fd.append( 'response_format', 'json' )

  const res = await fetch( `${GROQ_BASE_URL}/audio/transcriptions`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${getApiKey()}` },
    body: fd,
  } )

  if ( !res.ok ) {
    const errText = await res.text()
    throw new Error( `Groq transcription failed: ${errText}` )
  }

  const result = await res.json()
  return ( result.text as string ) ?? ''
}

/** Step 2: Analyze tone/emotion from transcript text using Qwen 3 32B */
export async function analyzeTone( transcript: string ): Promise<ToneAnalysis> {
  const prompt = `Analyze the emotional tone of this spoken transcript. Rate each emotion from 0.0 to 1.0. Return ONLY valid JSON, no markdown.

Transcript: """${transcript.slice( 0, MAX_TONE_ANALYSIS_LENGTH )}"""

Return JSON:
{"happiness":0.0,"sadness":0.0,"anger":0.0,"anxiety":0.0,"calmness":0.0,"urgency":0.0,"overallMood":"neutral"}`

  try {
    const res = await fetch( `${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        model: 'qwen/qwen3-32b',
        messages: [
          { role: 'system', content: 'You analyze emotional tone in speech transcripts. Reply with ONLY valid JSON, no reasoning tags, no markdown.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.1,
        max_tokens: 200,
      } ),
    } )

    if ( !res.ok ) {
      console.error( 'Tone analysis failed:', await res.text() )
      return defaultTone()
    }

    const data = await res.json()
    const raw = data.choices?.[0]?.message?.content ?? ''
    // Extract JSON from possible markdown or thinking tags
    const jsonMatch = raw.match( /\{[\s\S]*?\}/ )
    if ( !jsonMatch ) return defaultTone()
    return JSON.parse( jsonMatch[0] ) as ToneAnalysis
  } catch {
    return defaultTone()
  }
}

/** Step 3: Format transcript text with proper punctuation using Llama */
export async function formatTranscript(
  rawText: string,
  tone: ToneAnalysis,
): Promise<string> {
  if ( !rawText.trim() ) return rawText

  const prompt = `Format this spoken transcript for readability. Rules:
- Keep EVERY word exactly as spoken — do not add, remove, or change any words
- Add proper punctuation (periods, commas, question marks, exclamation marks)
- Break into logical paragraphs based on topic shifts or natural pauses
- The speaker's mood is: ${tone.overallMood}
- If the speaker sounds urgent or emotional, reflect that in punctuation (e.g. exclamation marks)
- Do NOT add any commentary, headers, or labels — return ONLY the formatted text

Transcript:
"""${rawText}"""`

  try {
    const res = await fetch( `${GROQ_BASE_URL}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${getApiKey()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( {
        model: 'meta-llama/llama-4-scout-17b-16e-instruct',
        messages: [
          { role: 'system', content: 'You format speech transcripts. Keep every word exactly as spoken. Only add punctuation and paragraph breaks. Return ONLY the formatted text.' },
          { role: 'user', content: prompt },
        ],
        temperature: 0.2,
        max_tokens: 4096,
      } ),
    } )

    if ( !res.ok ) {
      console.error( 'Format failed:', await res.text() )
      return rawText
    }

    const data = await res.json()
    const formatted = data.choices?.[0]?.message?.content?.trim()
    return formatted || rawText
  } catch {
    return rawText
  }
}

function defaultTone(): ToneAnalysis {
  return {
    happiness: 0.5,
    sadness: 0,
    anger: 0,
    anxiety: 0,
    calmness: 0.5,
    urgency: 0,
    overallMood: 'neutral',
  }
}
