import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent, e as CardFooter } from "./card-BPoG-cgC.mjs";
import { B as Button } from "./button-BjPlzk1J.mjs";
import { A as Alert, a as AlertDescription } from "./alert-BJNLCpqC.mjs";
import { a as authClient } from "./auth-client-CK1Wyhfj.mjs";
import { a as Route$k, g as getLocale } from "./router-CHZxjIga.mjs";
import { m as Mail, a as CircleCheckBig, L as LoaderCircle, R as RefreshCw } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "./server-Cw4QVuYO.mjs";
import "../_libs/zod.mjs";
import "./index.mjs";
import "node:async_hooks";
import "./index-Dc8WRQC8.mjs";
import "../_libs/drizzle-orm.mjs";
import "../_libs/pg.mjs";
import "events";
import "../_libs/pg-types.mjs";
import "../_libs/postgres-array.mjs";
import "../_libs/postgres-date.mjs";
import "../_libs/postgres-interval.mjs";
import "../_libs/xtend.mjs";
import "../_libs/postgres-bytea.mjs";
import "../_libs/pg-int8.mjs";
import "util";
import "crypto";
import "dns";
import "../_libs/pg-connection-string.mjs";
import "fs";
import "../_libs/pg-protocol.mjs";
import "net";
import "tls";
import "../_libs/pg-cloudflare.mjs";
import "../_libs/pgpass.mjs";
import "path";
import "stream";
import "../_libs/split2.mjs";
import "string_decoder";
import "../_libs/pg-pool.mjs";
import "../_libs/resend.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/svix.mjs";
import "../_libs/uuid.mjs";
import "node:crypto";
import "../_libs/standardwebhooks.mjs";
import "../_libs/stablelib__base64.mjs";
import "../_libs/fast-sha256.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/next-themes.mjs";
import "../_libs/sonner.mjs";
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-popper.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/radix-ui__react-arrow.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/radix-ui__react-use-size.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/@radix-ui/react-visually-hidden+[...].mjs";
const en_verify_title = (
  /** @type {(inputs: Verify_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Check your email`
    );
  })
);
const de_verify_title = (
  /** @type {(inputs: Verify_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `E-Mail überprüfen`
    );
  })
);
const verify_title = (
  /** @type {((inputs?: Verify_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_title();
    return de_verify_title();
  })
);
const en_verify_subtitle = (
  /** @type {(inputs: Verify_SubtitleInputs) => LocalizedString} */
  ((i) => {
    return (
      /** @type {LocalizedString} */
      `We sent a verification link to ${i?.email}. Click it to activate your account.`
    );
  })
);
const de_verify_subtitle = (
  /** @type {(inputs: Verify_SubtitleInputs) => LocalizedString} */
  ((i) => {
    return (
      /** @type {LocalizedString} */
      `Wir haben einen Bestätigungslink an ${i?.email} gesendet. Klicken Sie auf den Link, um Ihr Konto zu aktivieren.`
    );
  })
);
const verify_subtitle = (
  /** @type {((inputs: Verify_SubtitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_SubtitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_subtitle(inputs);
    return de_verify_subtitle(inputs);
  })
);
const en_verify_subtitle_noemail = (
  /** @type {(inputs: Verify_Subtitle_NoemailInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `We sent a verification link to your email address. Click it to activate your account.`
    );
  })
);
const de_verify_subtitle_noemail = (
  /** @type {(inputs: Verify_Subtitle_NoemailInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Wir haben einen Bestätigungslink an Ihre E-Mail-Adresse gesendet. Klicken Sie auf den Link, um Ihr Konto zu aktivieren.`
    );
  })
);
const verify_subtitle_noemail = (
  /** @type {((inputs?: Verify_Subtitle_NoemailInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_Subtitle_NoemailInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_subtitle_noemail();
    return de_verify_subtitle_noemail();
  })
);
const en_verify_spam = (
  /** @type {(inputs: Verify_SpamInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Can't find the email? Check your spam or junk folder.`
    );
  })
);
const de_verify_spam = (
  /** @type {(inputs: Verify_SpamInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `E-Mail nicht gefunden? Prüfen Sie Ihren Spam- oder Junk-Ordner.`
    );
  })
);
const verify_spam = (
  /** @type {((inputs?: Verify_SpamInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_SpamInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_spam();
    return de_verify_spam();
  })
);
const en_verify_resend = (
  /** @type {(inputs: Verify_ResendInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Resend verification email`
    );
  })
);
const de_verify_resend = (
  /** @type {(inputs: Verify_ResendInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Bestätigungs-E-Mail erneut senden`
    );
  })
);
const verify_resend = (
  /** @type {((inputs?: Verify_ResendInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_ResendInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_resend();
    return de_verify_resend();
  })
);
const en_verify_resend_wait = (
  /** @type {(inputs: Verify_Resend_WaitInputs) => LocalizedString} */
  ((i) => {
    return (
      /** @type {LocalizedString} */
      `Resend in ${i?.seconds}s`
    );
  })
);
const de_verify_resend_wait = (
  /** @type {(inputs: Verify_Resend_WaitInputs) => LocalizedString} */
  ((i) => {
    return (
      /** @type {LocalizedString} */
      `Erneut senden in ${i?.seconds}s`
    );
  })
);
const verify_resend_wait = (
  /** @type {((inputs: Verify_Resend_WaitInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_Resend_WaitInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_resend_wait(inputs);
    return de_verify_resend_wait(inputs);
  })
);
const en_verify_resent = (
  /** @type {(inputs: Verify_ResentInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Verification email sent!`
    );
  })
);
const de_verify_resent = (
  /** @type {(inputs: Verify_ResentInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Bestätigungs-E-Mail wurde gesendet!`
    );
  })
);
const verify_resent = (
  /** @type {((inputs?: Verify_ResentInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_ResentInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_resent();
    return de_verify_resent();
  })
);
const en_verify_done = (
  /** @type {(inputs: Verify_DoneInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `I've verified my email`
    );
  })
);
const de_verify_done = (
  /** @type {(inputs: Verify_DoneInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Ich habe meine E-Mail bestätigt`
    );
  })
);
const verify_done = (
  /** @type {((inputs?: Verify_DoneInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_DoneInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_done();
    return de_verify_done();
  })
);
const en_verify_done_checking = (
  /** @type {(inputs: Verify_Done_CheckingInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Checking…`
    );
  })
);
const de_verify_done_checking = (
  /** @type {(inputs: Verify_Done_CheckingInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Wird geprüft…`
    );
  })
);
const verify_done_checking = (
  /** @type {((inputs?: Verify_Done_CheckingInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_Done_CheckingInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_done_checking();
    return de_verify_done_checking();
  })
);
const en_verify_not_yet = (
  /** @type {(inputs: Verify_Not_YetInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Email not yet verified. Please click the link in your inbox first.`
    );
  })
);
const de_verify_not_yet = (
  /** @type {(inputs: Verify_Not_YetInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `E-Mail noch nicht bestätigt. Bitte klicken Sie zuerst auf den Link in Ihrem Posteingang.`
    );
  })
);
const verify_not_yet = (
  /** @type {((inputs?: Verify_Not_YetInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_Not_YetInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_not_yet();
    return de_verify_not_yet();
  })
);
const en_verify_back = (
  /** @type {(inputs: Verify_BackInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Back to Sign In`
    );
  })
);
const de_verify_back = (
  /** @type {(inputs: Verify_BackInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Zurück zur Anmeldung`
    );
  })
);
const verify_back = (
  /** @type {((inputs?: Verify_BackInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Verify_BackInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_verify_back();
    return de_verify_back();
  })
);
const RESEND_COOLDOWN = 60;
function VerifyEmailPage() {
  const {
    email
  } = Route$k.useSearch();
  const navigate = useNavigate();
  const [countdown, setCountdown] = reactExports.useState(0);
  const [resendStatus, setResendStatus] = reactExports.useState("idle");
  const [verifyStatus, setVerifyStatus] = reactExports.useState("idle");
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  reactExports.useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1e3);
    return () => clearTimeout(id);
  }, [countdown]);
  const handleResend = async () => {
    if (!email || countdown > 0) return;
    setResendStatus("sending");
    setErrorMsg("");
    const {
      error
    } = await authClient.sendVerificationEmail({
      email,
      callbackURL: "/dashboard"
    });
    if (error) {
      setResendStatus("error");
      setErrorMsg(error.message ?? "Failed to resend email.");
    } else {
      setResendStatus("sent");
      setCountdown(RESEND_COOLDOWN);
      setTimeout(() => setResendStatus((s) => s === "sent" ? "idle" : s), 4e3);
    }
  };
  const handleVerified = async () => {
    setVerifyStatus("checking");
    setErrorMsg("");
    const {
      data
    } = await authClient.getSession();
    if (data?.user?.emailVerified) {
      navigate({
        to: "/dashboard"
      });
    } else {
      setVerifyStatus("error");
      setErrorMsg(verify_not_yet());
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-6 w-6 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-2xl", children: verify_title() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: email ? verify_subtitle({
        email
      }) : verify_subtitle_noemail() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: verify_spam() }),
      resendStatus === "sent" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { className: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4 text-green-600 dark:text-green-400" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-green-700 dark:text-green-300", children: verify_resent() })
      ] }),
      errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: errorMsg }) }),
      email && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", disabled: countdown > 0 || resendStatus === "sending", onClick: handleResend, children: resendStatus === "sending" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        verify_resend()
      ] }) : countdown > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-2 h-4 w-4" }),
        verify_resend_wait({
          seconds: String(countdown)
        })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "mr-2 h-4 w-4" }),
        verify_resend()
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", disabled: verifyStatus === "checking", onClick: handleVerified, children: verifyStatus === "checking" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "mr-2 h-4 w-4 animate-spin" }),
        verify_done_checking()
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "mr-2 h-4 w-4" }),
        verify_done()
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { className: "justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", children: verify_back() }) }) })
  ] });
}
export {
  VerifyEmailPage as component
};
