import { Resend } from "resend";

// ── Client ────────────────────────────────────────────────────────────────────

const resend = new Resend( process.env.RESEND_API_KEY );

const FROM = process.env.EMAIL_FROM ?? "MediSync <noreply@medisync.app>";
const APP_URL = process.env.BETTER_AUTH_URL ?? "https://medisync.app";

// ── Locale helper ─────────────────────────────────────────────────────────────

type Locale = "en" | "de";

export function detectLocale( request?: Request | null ): Locale {
    const raw = request?.headers?.get( "accept-language" ) ?? "";
    const primary = raw.split( "," )[0]?.split( "-" )[0]?.toLowerCase() ?? "en";
    return primary === "de" ? "de" : "en";
}

// ── Shared layout wrapper ─────────────────────────────────────────────────────

function layout( content: string ): string {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MediSync</title>
</head>
<body style="margin:0;padding:0;background:#f4f7f9;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f7f9;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#56c6be 0%,#3aa89f 100%);padding:32px 40px;text-align:center;">
              <h1 style="margin:0;font-size:28px;font-weight:700;color:#ffffff;letter-spacing:-0.5px;">
                🏥 MediSync
              </h1>
              <p style="margin:6px 0 0;font-size:13px;color:rgba(255,255,255,.85);">
                Your medical identity, one scan away
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 32px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background:#f8fafb;border-top:1px solid #e8ecef;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">
                © ${new Date().getFullYear()} MediSync · All rights reserved<br/>
                <a href="${APP_URL}/privacy" style="color:#56c6be;text-decoration:none;">Privacy Policy</a>
                &nbsp;·&nbsp;
                <a href="${APP_URL}/terms" style="color:#56c6be;text-decoration:none;">Terms of Service</a>
              </p>
              <p style="margin:8px 0 0;font-size:11px;color:#d1d5db;">
                If you did not request this email, you can safely ignore it.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function button( href: string, label: string ): string {
    return `<a href="${href}"
      style="display:inline-block;margin:24px 0 8px;padding:14px 32px;background:linear-gradient(135deg,#56c6be,#3aa89f);color:#ffffff;font-size:16px;font-weight:600;text-decoration:none;border-radius:8px;letter-spacing:.3px;">
      ${label}
    </a>
    <p style="margin:8px 0 0;font-size:12px;color:#9ca3af;">
      Or copy this link: <a href="${href}" style="color:#56c6be;word-break:break-all;">${href}</a>
    </p>`;
}

// ── i18n strings ──────────────────────────────────────────────────────────────

const t = {
    en: {
        verifySubject: "Verify your MediSync email address",
        verifyHeading: "Verify your email",
        verifyGreeting: ( name: string ) =>
            `Hi ${name}, welcome to MediSync!`,
        verifyBody:
            "Please confirm your email address to activate your account and start building your medical identity.",
        verifyButton: "Verify Email Address",
        verifyExpiry: "This link expires in 1 hour.",

        resetSubject: "Reset your MediSync password",
        resetHeading: "Reset your password",
        resetGreeting: ( name: string ) => `Hi ${name},`,
        resetBody:
            "We received a request to reset your MediSync password. Click the button below to choose a new password.",
        resetButton: "Reset Password",
        resetExpiry: "This link expires in 1 hour. If you did not request a password reset, no action is needed.",

        changedSubject: "Your MediSync password was changed",
        changedHeading: "Password changed",
        changedGreeting: ( name: string ) => `Hi ${name},`,
        changedBody:
            "Your MediSync password was successfully changed. If this was you, no further action is needed.",
        changedWarning:
            "If you did not make this change, please reset your password immediately and contact support.",
        changedButton: "Reset password now",
        changedButtonHref: `${APP_URL}/auth/forgot-password`,
    },
    de: {
        verifySubject: "Bestätigen Sie Ihre MediSync-E-Mail-Adresse",
        verifyHeading: "E-Mail-Adresse bestätigen",
        verifyGreeting: ( name: string ) =>
            `Hallo ${name}, willkommen bei MediSync!`,
        verifyBody:
            "Bitte bestätigen Sie Ihre E-Mail-Adresse, um Ihr Konto zu aktivieren und Ihre medizinische Identität aufzubauen.",
        verifyButton: "E-Mail-Adresse bestätigen",
        verifyExpiry: "Dieser Link läuft in 1 Stunde ab.",

        resetSubject: "MediSync-Passwort zurücksetzen",
        resetHeading: "Passwort zurücksetzen",
        resetGreeting: ( name: string ) => `Hallo ${name},`,
        resetBody:
            "Wir haben eine Anfrage erhalten, Ihr MediSync-Passwort zurückzusetzen. Klicken Sie auf die Schaltfläche, um ein neues Passwort zu wählen.",
        resetButton: "Passwort zurücksetzen",
        resetExpiry:
            "Dieser Link läuft in 1 Stunde ab. Falls Sie keine Zurücksetzung beantragt haben, ist keine Aktion erforderlich.",

        changedSubject: "Ihr MediSync-Passwort wurde geändert",
        changedHeading: "Passwort geändert",
        changedGreeting: ( name: string ) => `Hallo ${name},`,
        changedBody:
            "Ihr MediSync-Passwort wurde erfolgreich geändert. Falls das Sie waren, ist keine weitere Aktion erforderlich.",
        changedWarning:
            "Falls Sie diese Änderung nicht vorgenommen haben, setzen Sie Ihr Passwort sofort zurück und kontaktieren Sie den Support.",
        changedButton: "Passwort jetzt zurücksetzen",
        changedButtonHref: `${APP_URL}/auth/forgot-password`,
    },
};

// ── HTML templates ────────────────────────────────────────────────────────────

function renderVerificationEmail( name: string, url: string, locale: Locale = "en" ): string {
    const s = t[locale];
    return layout( `
      <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;">${s.verifyHeading}</h2>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;">${s.verifyGreeting( name )}</p>
      <p style="margin:0;font-size:15px;color:#6b7280;line-height:1.6;">${s.verifyBody}</p>
      ${button( url, s.verifyButton )}
      <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;">${s.verifyExpiry}</p>
    ` );
}

function renderPasswordResetEmail( name: string, url: string, locale: Locale = "en" ): string {
    const s = t[locale];
    return layout( `
      <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;">${s.resetHeading}</h2>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;">${s.resetGreeting( name )}</p>
      <p style="margin:0;font-size:15px;color:#6b7280;line-height:1.6;">${s.resetBody}</p>
      ${button( url, s.resetButton )}
      <p style="margin:24px 0 0;font-size:13px;color:#9ca3af;">${s.resetExpiry}</p>
    ` );
}

function renderPasswordChangedEmail( name: string, locale: Locale = "en" ): string {
    const s = t[locale];
    return layout( `
      <h2 style="margin:0 0 8px;font-size:24px;font-weight:700;color:#111827;">${s.changedHeading}</h2>
      <p style="margin:0 0 16px;font-size:15px;color:#374151;">${s.changedGreeting( name )}</p>
      <p style="margin:0 0 16px;font-size:15px;color:#6b7280;line-height:1.6;">${s.changedBody}</p>
      <div style="background:#fff7ed;border:1px solid #fed7aa;border-radius:8px;padding:16px;margin:16px 0;">
        <p style="margin:0;font-size:14px;color:#9a3412;font-weight:500;">⚠️ ${s.changedWarning}</p>
      </div>
      ${button( s.changedButtonHref, s.changedButton )}
    ` );
}

// ── Public send helpers ───────────────────────────────────────────────────────

export async function sendVerificationEmail( opts: {
    to: string;
    name: string;
    url: string;
    locale?: Locale;
} ) {
    const locale = opts.locale ?? "en";
    const { error } = await resend.emails.send( {
        from: FROM,
        to: opts.to,
        subject: t[locale].verifySubject,
        html: renderVerificationEmail( opts.name, opts.url, locale ),
    } );
    if ( error ) console.error( "[email] sendVerificationEmail failed:", error );
}

export async function sendPasswordResetEmail( opts: {
    to: string;
    name: string;
    url: string;
    locale?: Locale;
} ) {
    const locale = opts.locale ?? "en";
    const { error } = await resend.emails.send( {
        from: FROM,
        to: opts.to,
        subject: t[locale].resetSubject,
        html: renderPasswordResetEmail( opts.name, opts.url, locale ),
    } );
    if ( error ) console.error( "[email] sendPasswordResetEmail failed:", error );
}

export async function sendPasswordChangedEmail( opts: {
    to: string;
    name: string;
    locale?: Locale;
} ) {
    const locale = opts.locale ?? "en";
    const { error } = await resend.emails.send( {
        from: FROM,
        to: opts.to,
        subject: t[locale].changedSubject,
        html: renderPasswordChangedEmail( opts.name, locale ),
    } );
    if ( error ) console.error( "[email] sendPasswordChangedEmail failed:", error );
}
