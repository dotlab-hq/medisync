/**
 * Environment variable guards for MediSync.
 * Import this module anywhere you need validated env vars at runtime.
 */

/**
 * Returns MEDISYNC_PRIVATE_KEY or throws a descriptive error.
 * Used by cron API endpoints to authenticate inbound requests
 * and by the cron setup script to embed the key in the job.
 *
 * The application CANNOT process notifications without this key.
 */
export function getMediSyncPrivateKey(): string {
    const value = process.env.MEDISYNC_PRIVATE_KEY;
    if ( !value ) {
        throw new Error(
            "[MediSync] MEDISYNC_PRIVATE_KEY environment variable is not set.\n" +
            "This key is required for the notification cron service to authenticate.\n" +
            "Add it to your .env file and restart the application.",
        );
    }
    return value;
}

/** Returns BETTER_AUTH_URL (public app base URL) with no trailing slash. */
export function getAppUrl(): string {
    const raw = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";
    return raw.replace( /\/$/, "" );
}
