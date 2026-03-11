/**
 * Converts a local date + time + IANA timezone into a UTC Date.
 *
 * @param date  Local date string, e.g. "2026-03-15"
 * @param time  Local time string, e.g. "14:30" or "14:30:00"
 * @param tz    IANA timezone, e.g. "Asia/Kolkata"
 * @returns     Date object representing the UTC instant
 */
export function toUtcDate(date: string, time: string, tz: string): Date {
  // Build an ISO-like string in the target timezone, then compute the UTC offset
  // by comparing the formatter output to the raw Date.
  const dtStr = `${date}T${time.length === 5 ? `${time}:00` : time}`

  // Create a date assuming UTC first
  const naive = new Date(`${dtStr}Z`)

  // Use Intl to find the real UTC offset for this timezone at this moment
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: tz,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  // Format `naive` (which is in UTC) in the target timezone to find the offset
  const parts = formatter.formatToParts(naive)
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? '0'

  const tzYear = parseInt(get('year'), 10)
  const tzMonth = parseInt(get('month'), 10)
  const tzDay = parseInt(get('day'), 10)
  const tzHour = parseInt(get('hour'), 10)
  const tzMinute = parseInt(get('minute'), 10)
  const tzSecond = parseInt(get('second'), 10)

  // Build a UTC Date from the formatted parts (this represents what `naive` looks like in `tz`)
  const inTz = Date.UTC(tzYear, tzMonth - 1, tzDay, tzHour, tzMinute, tzSecond)

  // The offset is the difference: what UTC shows vs what the timezone sees
  const offsetMs = inTz - naive.getTime()

  // The user's local datetime string interpreted in their timezone → UTC
  const localAsUtc = new Date(`${dtStr}Z`)
  return new Date(localAsUtc.getTime() - offsetMs)
}
