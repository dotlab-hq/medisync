/**
 * scripts/setup-cron.ts
 *
 * Reads scripts/setup-cron.sql, substitutes env var placeholders, then
 * executes the SQL against the configured PostgreSQL database using Drizzle.
 *
 * Usage:
 *   pnpm db:setup-cron
 *
 * Required env vars (set in .env):
 *   DATABASE_URL          – PostgreSQL connection string (pooler or direct)
 *   DATABASE_URL_DIRECT   – (optional) Override with a direct Postgres URL.
 *                           Required when DATABASE_URL points to Supabase's
 *                           transaction-mode pooler (:6543). If omitted the
 *                           script will attempt to auto-convert the pooler URL.
 *   MEDISYNC_PRIVATE_KEY  – Secret key used to authenticate cron requests
 *   BETTER_AUTH_URL       – Public base URL of the app (e.g. https://app.medisync.io)
 *                           Must be publicly reachable — NOT localhost.
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { config } from 'dotenv'

// ── Execute via pg ────────────────────────────────────────────────────
import pg from 'pg'

// Load .env from the project root (one directory above /scripts)
const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })

// ── Validate required env vars ────────────────────────────────────────
function requireEnv(name: string): string {
  const v = process.env[name]
  if (!v) {
    console.error(`\n❌  Missing required environment variable: ${name}`)
    console.error(`    Add it to your .env file and re-run.\n`)
    process.exit(1)
  }
  return v
}

const DATABASE_URL_RAW = requireEnv('DATABASE_URL')
const PRIVATE_KEY = requireEnv('MEDISYNC_PRIVATE_KEY')
const APP_URL = process.env.APP_URL || requireEnv('BETTER_AUTH_URL')

/**
 * pg_cron + pg_net setup MUST run over a direct (non-pooled) connection.
 * Supabase pooler URL:  ...pooler.supabase.com:6543/...
 * Direct URL pattern:  ...db.<ref>.supabase.co:5432/...
 *
 * If DATABASE_URL_DIRECT is set, use that; otherwise try to convert the
 * pooler URL automatically, and warn if we can't.
 */
function resolveDirectUrl(raw: string): string {
  // Prefer an explicit override
  if (process.env.DATABASE_URL_DIRECT) return process.env.DATABASE_URL_DIRECT

  // Supabase pooler URLs (both transaction-mode :6543 and session-mode :5432):
  //   postgresql://postgres.PROJECTREF:pass@*.pooler.supabase.com:PORT/db
  // → direct: postgresql://postgres:pass@db.PROJECTREF.supabase.co:5432/db
  const poolerMatch = raw.match(
    /^(postgresql:\/\/[^:]+\.)([^:]+)(:[^@]+)@[^@]+\.pooler\.supabase\.com:\d+\/(.+)$/,
  )
  if (poolerMatch) {
    // poolerMatch[2] = project ref (e.g. "bqisqgwkjckwppqzkopj")
    // poolerMatch[3] = :password
    // poolerMatch[4] = database name
    const ref = poolerMatch[2]
    const pass = poolerMatch[3]
    const dbName = poolerMatch[4].split('?')[0]
    const direct = `postgresql://postgres${pass}@db.${ref}.supabase.co:5432/${dbName}`
    console.warn(
      '⚠️   Supabase pooler URL detected — switching to direct connection for cron setup.',
    )
    console.warn(`    Direct URL: ${direct.replace(/:[^:@]+@/, ':***@')}`)
    console.warn(
      '    Tip: set DATABASE_URL_DIRECT in .env to skip auto-conversion.\n',
    )
    return direct
  }

  // Already a direct / local URL — use as-is
  if (
    raw.includes('localhost') ||
    raw.includes('127.0.0.1') ||
    raw.includes('db.')
  ) {
    return raw
  }

  console.warn(
    '⚠️   Could not detect a Supabase pooler URL to auto-convert.\n' +
      "    If jobs don't appear, set DATABASE_URL_DIRECT in .env to your Supabase direct connection URL.\n" +
      '    Format: postgresql://postgres:PASSWORD@db.PROJECTREF.supabase.co:5432/postgres\n',
  )
  return raw
}

const DATABASE_URL = resolveDirectUrl(DATABASE_URL_RAW)

// ── Build final SQL (substitute placeholders) ─────────────────────────
const sqlTemplate = readFileSync(resolve(__dirname, 'setup-cron.sql'), 'utf-8')
const finalSql = sqlTemplate
  .replaceAll('{{APP_URL}}', APP_URL)
  .replaceAll('{{PRIVATE_KEY}}', PRIVATE_KEY)
const { Client } = pg

async function run() {
  console.log('\n🔧  MediSync cron setup')
  console.log(`    App URL    : ${APP_URL}`)
  console.log(`    Database   : ${DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`)
  if (APP_URL.includes('localhost') || APP_URL.includes('127.0.0.1')) {
    console.warn(
      '\n⚠️   BETTER_AUTH_URL is set to localhost.\n' +
        '    Supabase pg_cron runs on Supabase servers and cannot reach localhost.\n' +
        '    Set BETTER_AUTH_URL to your public app URL (e.g. https://app.example.com).\n',
    )
  }
  console.log()

  const client = new Client({ connectionString: DATABASE_URL })
  await client.connect()

  try {
    // Split on statement-breakpoint markers and filter empty strings.
    // Strip leading comment lines before deciding whether a block is empty,
    // but send the ORIGINAL block (with comments) to the database — Postgres
    // handles inline comments just fine.
    const statements = finalSql
      .split(/-->.*?statement-breakpoint|\n\s*\n/)
      .map((s) => s.trim())
      .filter((s) => {
        if (s.length === 0) return false
        // Remove all leading comment lines and check if anything real remains
        const withoutComments = s.replace(/^(--[^\n]*\n?)*/m, '').trim()
        return withoutComments.length > 0
      })

    // Execute each SQL block sequentially (some DB drivers require this)
    for (const stmt of statements) {
      try {
        await client.query(stmt)
      } catch (stmtErr) {
        const msg = stmtErr instanceof Error ? stmtErr.message : String(stmtErr)
        console.error(
          `\n❌  Statement failed:\n    ${stmt.slice(0, 120)}...\n    Error: ${msg}\n`,
        )
        throw stmtErr
      }
    }

    // Show all jobs for diagnosis, not just medisync ones
    const { rows: allJobs } = await client.query<{
      jobname: string
      schedule: string
      database: string
    }>(`SELECT jobname, schedule, database FROM cron.job ORDER BY jobname`)

    const mediJobs = allJobs.filter((r) => r.jobname.startsWith('medisync-'))

    if (mediJobs.length === 0) {
      console.warn('\n⚠️   No medisync-* jobs found in cron.job after install.')
      console.warn(
        '    This usually means pg_cron is not enabled on your Supabase project.',
      )
      console.warn(
        '    Enable it in the Supabase Dashboard → Database → Extensions → pg_cron',
      )
      console.warn(`    Total jobs in cron.job: ${allJobs.length}\n`)
    } else {
      console.log('✅  Cron jobs installed successfully:\n')
      for (const row of mediJobs) {
        console.log(
          `    • ${row.jobname}  (${row.schedule})  db=${row.database}`,
        )
      }
      console.log()
    }
  } finally {
    await client.end()
  }
}

run().catch((err) => {
  console.error('\n❌  Setup failed:', err instanceof Error ? err.message : err)
  process.exit(1)
})
