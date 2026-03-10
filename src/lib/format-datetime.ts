/**
 * Formats a date string ("YYYY-MM-DD") and a time string ("HH:MM")
 * into a human-readable local datetime string.
 * e.g. "Mar 10, 2026, 2:30 PM"
 */
export function formatLocalDateTime( date: string, time: string ): string {
    const combined = `${date}T${time}`;
    const parsed = new Date( combined );
    if ( isNaN( parsed.getTime() ) ) return `${date} ${time}`;
    return parsed.toLocaleString( undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
    } );
}
