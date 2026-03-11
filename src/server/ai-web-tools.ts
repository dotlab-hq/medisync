import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

const optionalPositiveInt = (description: string, max: number) =>
  z.preprocess(
    (value) => (value === null ? undefined : value),
    z.number().int().positive().max(max).describe(description).optional(),
  )

const wikipediaInputSchema = z.object({
  query: z.string().min(1).describe('Natural-language query for Wikipedia.'),
  topKResults: optionalPositiveInt(
    'Maximum number of Wikipedia results to include.',
    10,
  ),
  maxDocContentLength: optionalPositiveInt(
    'Maximum summary character length.',
    20_000,
  ),
})

const stackExchangeInputSchema = z.object({
  query: z.string().min(1).describe('Search text for StackExchange.'),
  queryType: z.preprocess(
    (value) => (value === null ? undefined : value),
    z
      .enum(['title', 'body'])
      .describe('Whether query targets title or full body.')
      .optional(),
  ),
})

const calculatorInputSchema = z.object({
  expression: z.string().min(1).describe('Arithmetic expression to evaluate.'),
})

export const wikipediaQueryDef = toolDefinition({
  name: 'wikipedia_query',
  description:
    'Search Wikipedia and return concise page summaries for a query.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      topKResults: { type: 'number' },
      maxDocContentLength: { type: 'number' },
    },
    required: ['query'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: { result: { type: 'string' } },
    required: ['result'],
    additionalProperties: false,
  },
})

export function createWikipediaQueryTool() {
  return wikipediaQueryDef.server(async (args: unknown) => {
    const data = wikipediaInputSchema.parse(args)
    const limit = data.topKResults ?? 3
    const maxChars = data.maxDocContentLength ?? 4_000
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${encodeURIComponent(data.query)}&format=json&srlimit=${limit}&origin=*`
    const searchRes = await fetch(searchUrl)
    if (!searchRes.ok) throw new Error('Wikipedia search failed')
    const searchJson = (await searchRes.json()) as {
      query?: { search?: Array<{ title?: string }> }
    }
    const titles = (searchJson.query?.search ?? [])
      .map((item) => item.title)
      .filter((title): title is string => Boolean(title))

    if (titles.length === 0) return { result: 'No Wikipedia results found.' }

    const extractsUrl = `https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=1&explaintext=1&format=json&titles=${encodeURIComponent(titles.join('|'))}&origin=*`
    const extractsRes = await fetch(extractsUrl)
    if (!extractsRes.ok) throw new Error('Wikipedia content fetch failed')
    const extractsJson = (await extractsRes.json()) as {
      query?: { pages?: Record<string, { title?: string; extract?: string }> }
    }

    const pages = extractsJson.query?.pages ?? {}
    const summary = Object.values(pages)
      .map((page) => `# ${page.title ?? 'Untitled'}\n${page.extract ?? ''}`)
      .join('\n\n')
      .slice(0, maxChars)

    return { result: summary || 'No Wikipedia summary available.' }
  })
}

export const stackExchangeSearchDef = toolDefinition({
  name: 'stackexchange_search',
  description:
    'Search StackExchange questions and return top relevant results.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      queryType: { type: 'string', enum: ['title', 'body'] },
    },
    required: ['query'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: { result: { type: 'string' } },
    required: ['result'],
    additionalProperties: false,
  },
})

export function createStackExchangeSearchTool() {
  return stackExchangeSearchDef.server(async (args: unknown) => {
    const data = stackExchangeInputSchema.parse(args)
    const queryParam = data.queryType === 'title' ? 'title' : 'q'
    const url = `https://api.stackexchange.com/2.3/search/advanced?order=desc&sort=relevance&site=stackoverflow&${queryParam}=${encodeURIComponent(data.query)}`
    const response = await fetch(url)
    if (!response.ok) throw new Error('StackExchange search failed')
    const json = (await response.json()) as {
      items?: Array<{ title?: string; link?: string; score?: number }>
    }

    const rows = (json.items ?? [])
      .slice(0, 5)
      .map(
        (item) =>
          `- ${item.title ?? 'Untitled'} (score: ${item.score ?? 0})\n  ${item.link ?? ''}`,
      )
      .join('\n')

    return { result: rows || 'No StackExchange results found.' }
  })
}

export const calculatorDef = toolDefinition({
  name: 'calculator',
  description: 'Evaluate arithmetic expressions like 2*(3+4) or 10/5+6.',
  inputSchema: {
    type: 'object',
    properties: { expression: { type: 'string' } },
    required: ['expression'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: { result: { type: 'string' } },
    required: ['result'],
    additionalProperties: false,
  },
})

export function createCalculatorTool() {
  return calculatorDef.server(async (args: unknown) => {
    const data = calculatorInputSchema.parse(args)
    const expression = data.expression.trim().replace(/\^/g, '**')

    if (!/^[0-9+\-*/().%\s*]+$/.test(expression)) {
      throw new Error('Invalid arithmetic expression')
    }

    const fn = Function(`return (${expression});`) as () => unknown
    const value = fn()

    if (typeof value !== 'number' || !Number.isFinite(value)) {
      throw new Error('Could not evaluate expression')
    }

    return { result: String(value) }
  })
}
