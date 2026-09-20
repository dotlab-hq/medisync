import { generateText, transcribe } from 'ai'
import { getChatModel, getGroqProvider } from '@/lib/ai-model'

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

/** Step 1: Transcribe audio using Whisper through Vercel AI SDK. */
export async function transcribeAudio(audioFile: File): Promise<string> {
  const result = await transcribe({
    model: getGroqProvider().transcription('whisper-large-v3-turbo'),
    audio: await audioFile.arrayBuffer(),
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
    const { text: raw } = await generateText({
      model: getChatModel(),
      system:
        'You analyze emotional tone in speech transcripts. Reply with only valid JSON, without markdown.',
      prompt,
    })
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
    const { text } = await generateText({
      model: getChatModel(),
      system:
        'Format speech transcripts without changing words. Return only the formatted text.',
      prompt,
    })
    const formatted = text.trim()
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
