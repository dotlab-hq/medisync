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
 *   DATABASE_URL          – PostgreSQL connection string
 *   MEDISYNC_PRIVATE_KEY  – Secret key used to authenticate cron requests
 *   BETTER_AUTH_URL       – Public base URL of the app (e.g. https://app.medisync.io)
 */
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { config } from "dotenv";

// Load .env from the project root (one directory above /scripts)
const __dirname = dirname( fileURLToPath( import.meta.url ) );
config( { path: resolve( __dirname, "../.env" ) } );

// ── Validate required env vars ────────────────────────────────────────
function requireEnv( name: string ): string {
    const v = process.env[name];
    if ( !v ) {
        console.error( `\n❌  Missing required environment variable: ${name}` );
        console.error( `    Add it to your .env file and re-run.\n` );
        process.exit( 1 );
    }
    return v;
}

const DATABASE_URL = requireEnv( "DATABASE_URL" );
const PRIVATE_KEY = requireEnv( "MEDISYNC_PRIVATE_KEY" );
const APP_URL = ( process.env.BETTER_AUTH_URL ?? "http://localhost:3000" ).replace( /\/$/, "" );

// ── Build final SQL (substitute placeholders) ─────────────────────────
const sqlTemplate = readFileSync( resolve( __dirname, "setup-cron.sql" ), "utf-8" );
const finalSql = sqlTemplate
    .replaceAll( "{{APP_URL}}", APP_URL )
    .replaceAll( "{{PRIVATE_KEY}}", PRIVATE_KEY );

// ── Execute via pg ────────────────────────────────────────────────────
import pg from "pg";
const { Client } = pg;

async function run() {
    console.log( "\n🔧  MediSync cron setup" );
    console.log( `    App URL    : ${APP_URL}` );
    console.log( `    Database   : ${DATABASE_URL.replace( /:[^:@]+@/, ":***@" )}\n` );

    const client = new Client( { connectionString: DATABASE_URL } );
    await client.connect();

    try {
        // Split on statement-breakpoint markers and filter empty strings
        const statements = finalSql
            .split( /-->.*?statement-breakpoint|\n\s*\n/ )
            .map( ( s ) => s.trim() )
            .filter( ( s ) => s.length > 0 && !s.startsWith( "--" ) );

        // Execute each SQL block sequentially (some DB drivers require this)
        for ( const stmt of statements ) {
            await client.query( stmt );
        }

        console.log( "✅  Cron jobs installed successfully:\n" );
        const { rows } = await client.query<{ jobname: string; schedule: string }>(
            `SELECT jobname, schedule FROM cron.job WHERE jobname LIKE 'medisync-%' ORDER BY jobname`,
        );
        for ( const row of rows ) {
            console.log( `    • ${row.jobname}  (${row.schedule})` );
        }
        console.log();
    } finally {
        await client.end();
    }
}

run().catch( ( err ) => {
    console.error( "\n❌  Setup failed:", err instanceof Error ? err.message : err );
    process.exit( 1 );
} );
