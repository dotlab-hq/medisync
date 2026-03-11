import { chat, streamToText, generateTranscription } from '@tanstack/ai'
import { groqChat, groqTranscription } from '@/lib/groq'

/** Max characters of transcript sent to tone analysis to keep within model context limits */
const MAX_TONE_ANALYSIS_LENGTH = 2000

export type ToneAnalysis = {
  happiness: number
  sadness: number
  anger: number
  anxiety: number
  calmness: number
  urgency: number
  overallMood: string
}

/** Step 1: Transcribe audio using Whisper via TanStack AI generateTranscription */
export async function transcribeAudio(audioFile: File): Promise<string> {
  const result = await generateTranscription({
    adapter: groqTranscription('whisper-large-v3-turbo'),
    audio: audioFile,
    responseFormat: 'json',
  })
  return result.text ?? ''
}

/** Step 2: Analyze tone/emotion from transcript text using Qwen via TanStack AI chat() */
export async function analyzeTone(transcript: string): Promise<ToneAnalysis> {
  const prompt = `Analyze the emotional tone of this spoken transcript. Rate each emotion from 0.0 to 1.0. Return ONLY valid JSON, no markdown.

Transcript: """${transcript.slice(0, MAX_TONE_ANALYSIS_LENGTH)}"""

Return JSON:
{"happiness":0.0,"sadness":0.0,"anger":0.0,"anxiety":0.0,"calmness":0.0,"urgency":0.0,"overallMood":"neutral"}`

  try {
    const stream = chat({
      adapter: groqChat('qwen/qwen3-32b'),
      messages: [
        {
          role: 'system',
          content:
            'You analyze emotional tone in speech transcripts. Reply with ONLY valid JSON, no reasoning tags, no markdown.',
        },
        { role: 'user', content: prompt },
      ],
    })
    const raw = await streamToText(stream)
    const jsonMatch = raw.match(/\{[\s\S]*?\}/)
    if (!jsonMatch) return defaultTone()
    return JSON.parse(jsonMatch[0]) as ToneAnalysis
  } catch {
    return defaultTone()
  }
}

/** Step 3: Format transcript text with proper punctuation using Llama via TanStack AI chat() */
export async function formatTranscript(
  rawText: string,
  tone: ToneAnalysis,
): Promise<string> {
  if (!rawText.trim()) return rawText

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
    const stream = chat({
      adapter: groqChat('meta-llama/llama-4-scout-17b-16e-instruct'),
      messages: [
        {
          role: 'system',
          content:
            'You format speech transcripts. Keep every word exactly as spoken. Only add punctuation and paragraph breaks. Return ONLY the formatted text.',
        },
        { role: 'user', content: prompt },
      ],
    })
    const formatted = (await streamToText(stream)).trim()
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
