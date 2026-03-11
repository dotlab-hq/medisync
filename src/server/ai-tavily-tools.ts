import { toolDefinition } from '@tanstack/ai'
import { z } from 'zod'

const optionalString = (description: string) =>
  z.preprocess(
    (value) => (value === null ? undefined : value),
    z.string().describe(description).optional(),
  )

const optionalBoolean = (description: string) =>
  z.preprocess(
    (value) => (value === null ? undefined : value),
    z.boolean().describe(description).optional(),
  )

const optionalStringArray = (description: string) =>
  z.preprocess(
    (value) => (value === null ? undefined : value),
    z
      .array(z.string().describe('A string value.'))
      .describe(description)
      .optional(),
  )

function omitUndefined(
  input: Record<string, unknown>,
): Record<string, unknown> {
  return Object.fromEntries(
    Object.entries(input).filter(([_, value]) => value !== undefined),
  )
}

const tavilySearchInputSchema = z.object({
  query: z
    .string()
    .min(1)
    .describe('Natural-language query for Tavily search.'),
  includeImages: optionalBoolean('Whether to include image links in results.'),
  searchDepth: z.preprocess(
    (value) => (value === null ? undefined : value),
    z.enum(['basic', 'advanced']).describe('Search depth strategy.').optional(),
  ),
  timeRange: optionalString(
    'Optional time window such as day, week, month, or year.',
  ),
  includeDomains: optionalStringArray('Restrict search to these domains.'),
  excludeDomains: optionalStringArray(
    'Exclude these domains from search results.',
  ),
})

const tavilyMapOrCrawlInputSchema = z.object({
  url: z.url().describe('Starting URL for map/crawl traversal.'),
  instructions: optionalString('Optional crawl/map instruction text.'),
  selectPaths: optionalStringArray('Only include these URL path patterns.'),
  selectDomains: optionalStringArray('Only include these domains.'),
  excludePaths: optionalStringArray('Exclude these URL path patterns.'),
  excludeDomains: optionalStringArray('Exclude these domains.'),
  allowExternal: optionalBoolean('Allow traversal to external domains.'),
  categories: optionalStringArray('Optional Tavily categories filter.'),
})

const tavilyExtractInputSchema = z.object({
  urls: z
    .array(z.url().describe('A URL to extract content from.'))
    .min(1)
    .describe('List of URLs to extract.'),
  extractDepth: z.preprocess(
    (value) => (value === null ? undefined : value),
    z
      .enum(['basic', 'advanced'])
      .describe('Extraction depth level.')
      .optional(),
  ),
  includeImages: optionalBoolean(
    'Include image references in extracted output.',
  ),
})

function ensureTavilyKey() {
  if (!process.env.TAVILY_API_KEY) {
    throw new Error('TAVILY_API_KEY is not configured')
  }
}

export const tavilySearchDef = toolDefinition({
  name: 'tavily_search',
  description: 'Search the web with Tavily and return AI-optimized results.',
  inputSchema: {
    type: 'object',
    properties: {
      query: { type: 'string' },
      includeImages: { type: 'boolean' },
      searchDepth: { type: 'string', enum: ['basic', 'advanced'] },
      timeRange: { type: 'string' },
      includeDomains: { type: 'array', items: { type: 'string' } },
      excludeDomains: { type: 'array', items: { type: 'string' } },
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

export function createTavilySearchTool() {
  return tavilySearchDef.server(async (args: unknown) => {
    ensureTavilyKey()
    const data = tavilySearchInputSchema.parse(args)
    const payload = omitUndefined(data as unknown as Record<string, unknown>)
    const moduleUnknown = await import('@langchain/tavily')
    const moduleTyped = moduleUnknown as {
      TavilySearch: new (options: Record<string, unknown>) => {
        invoke: (input: Record<string, unknown>) => Promise<unknown>
      }
    }
    const tool = new moduleTyped.TavilySearch({
      maxResults: 5,
      topic: 'general',
      includeAnswer: false,
      includeRawContent: false,
    })
    const res = await tool.invoke(payload)
    return { result: typeof res === 'string' ? res : JSON.stringify(res) }
  })
}

export const tavilyMapDef = toolDefinition({
  name: 'tavily_map',
  description:
    'Traverse a website graph and produce a discovered site map using Tavily Map.',
  inputSchema: {
    type: 'object',
    properties: {
      url: { type: 'string' },
      instructions: { type: 'string' },
      allowExternal: { type: 'boolean' },
    },
    required: ['url'],
    additionalProperties: true,
  },
  outputSchema: {
    type: 'object',
    properties: { result: { type: 'string' } },
    required: ['result'],
    additionalProperties: false,
  },
})

export function createTavilyMapTool() {
  return tavilyMapDef.server(async (args: unknown) => {
    ensureTavilyKey()
    const data = tavilyMapOrCrawlInputSchema.parse(args)
    const payload = omitUndefined(data as unknown as Record<string, unknown>)
    const moduleUnknown = await import('@langchain/tavily')
    const moduleTyped = moduleUnknown as {
      TavilyMap: new (options: Record<string, unknown>) => {
        invoke: (input: Record<string, unknown>) => Promise<unknown>
      }
    }
    const tool = new moduleTyped.TavilyMap({ maxDepth: 3, maxBreadth: 50 })
    const res = await tool.invoke(payload)
    return { result: typeof res === 'string' ? res : JSON.stringify(res) }
  })
}

export const tavilyCrawlDef = toolDefinition({
  name: 'tavily_crawl',
  description:
    'Crawl a site in parallel and extract discovered content using Tavily Crawl.',
  inputSchema: {
    type: 'object',
    properties: {
      url: { type: 'string' },
      instructions: { type: 'string' },
      allowExternal: { type: 'boolean' },
    },
    required: ['url'],
    additionalProperties: true,
  },
  outputSchema: {
    type: 'object',
    properties: { result: { type: 'string' } },
    required: ['result'],
    additionalProperties: false,
  },
})

export function createTavilyCrawlTool() {
  return tavilyCrawlDef.server(async (args: unknown) => {
    ensureTavilyKey()
    const data = tavilyMapOrCrawlInputSchema.parse(args)
    const payload = omitUndefined(data as unknown as Record<string, unknown>)
    const moduleUnknown = await import('@langchain/tavily')
    const moduleTyped = moduleUnknown as {
      TavilyCrawl: new (options: Record<string, unknown>) => {
        invoke: (input: Record<string, unknown>) => Promise<unknown>
      }
    }
    const tool = new moduleTyped.TavilyCrawl({ maxDepth: 3, maxBreadth: 50 })
    const res = await tool.invoke(payload)
    return { result: typeof res === 'string' ? res : JSON.stringify(res) }
  })
}

export const tavilyExtractDef = toolDefinition({
  name: 'tavily_extract',
  description:
    'Extract raw content from one or more URLs using Tavily Extract.',
  inputSchema: {
    type: 'object',
    properties: {
      urls: { type: 'array', items: { type: 'string' } },
      extractDepth: { type: 'string', enum: ['basic', 'advanced'] },
      includeImages: { type: 'boolean' },
    },
    required: ['urls'],
    additionalProperties: false,
  },
  outputSchema: {
    type: 'object',
    properties: { result: { type: 'string' } },
    required: ['result'],
    additionalProperties: false,
  },
})

export function createTavilyExtractTool() {
  return tavilyExtractDef.server(async (args: unknown) => {
    ensureTavilyKey()
    const data = tavilyExtractInputSchema.parse(args)
    const payload = omitUndefined(data as unknown as Record<string, unknown>)
    const moduleUnknown = await import('@langchain/tavily')
    const moduleTyped = moduleUnknown as {
      TavilyExtract: new (options: Record<string, unknown>) => {
        invoke: (input: Record<string, unknown>) => Promise<unknown>
      }
    }
    const tool = new moduleTyped.TavilyExtract({
      extractDepth: 'basic',
      includeImages: false,
    })
    const res = await tool.invoke(payload)
    return { result: typeof res === 'string' ? res : JSON.stringify(res) }
  })
}
