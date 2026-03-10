export const COMMON_TIMEZONES = [
    "UTC",
    "Asia/Kolkata",
    "Asia/Dubai",
    "Asia/Singapore",
    "Asia/Tokyo",
    "Asia/Shanghai",
    "Europe/London",
    "Europe/Paris",
    "Europe/Berlin",
    "America/New_York",
    "America/Chicago",
    "America/Denver",
    "America/Los_Angeles",
    "America/Sao_Paulo",
    "Australia/Sydney",
    "Pacific/Auckland",
];

export function detectTimezone(): string {
    try {
        return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
    } catch {
        return "UTC";
    }
}

export function getTimezoneOptions(): string[] {
    const detected = detectTimezone();
    if ( !COMMON_TIMEZONES.includes( detected ) ) {
        return [detected, ...COMMON_TIMEZONES];
    }
    return COMMON_TIMEZONES;
}
