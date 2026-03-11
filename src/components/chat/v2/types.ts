export type ConversationItem = {
  id: string
  title: string
  updatedAt: Date | string
}

export type DbMessage = {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  parts: Array<Record<string, unknown>>
}

export type RetitleMessage = {
  role: string
  content: string
  parts?: Array<Record<string, unknown>>
}

export function extractMessageText(message: RetitleMessage): string {
  const fromParts = (message.parts ?? [])
    .filter((part) => part.type === 'text')
    .map((part) => {
      const content = typeof part.content === 'string' ? part.content : ''
      const text = typeof part.text === 'string' ? part.text : ''
      return content.length > 0 ? content : text
    })
    .join('')

  if (fromParts.trim().length > 0) return fromParts
  return message.content || ''
}
