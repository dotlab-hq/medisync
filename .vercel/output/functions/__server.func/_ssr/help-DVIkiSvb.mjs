import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-BPoG-cgC.mjs";
import { g as getLocale } from "./router-CHZxjIga.mjs";
import { i as CircleQuestionMark, F as FileText, n as MessageSquare, m as Mail } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/next-themes.mjs";
import "../_libs/sonner.mjs";
import "./index.mjs";
import "node:async_hooks";
import "./server-Cw4QVuYO.mjs";
import "../_libs/zod.mjs";
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
import "../_libs/radix-ui__react-tooltip.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/radix-ui__react-slot.mjs";
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
const en_help_title = (
  /** @type {(inputs: Help_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Help & Support`
    );
  })
);
const de_help_title = (
  /** @type {(inputs: Help_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Hilfe & Support`
    );
  })
);
const help_title = (
  /** @type {((inputs?: Help_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Help_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_help_title();
    return de_help_title();
  })
);
const en_help_subtitle = (
  /** @type {(inputs: Help_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Find answers to common questions and ways to reach us`
    );
  })
);
const de_help_subtitle = (
  /** @type {(inputs: Help_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Finden Sie Antworten auf häufige Fragen und Kontaktmöglichkeiten`
    );
  })
);
const help_subtitle = (
  /** @type {((inputs?: Help_SubtitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Help_SubtitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_help_subtitle();
    return de_help_subtitle();
  })
);
function HelpPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-4 py-12 max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: help_title() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: help_subtitle() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleQuestionMark, { className: "h-6 w-6 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "How do I generate a QR code?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground text-sm", children: "After completing your profile, go to Dashboard → QR Code. Your emergency QR code is generated automatically and can be shared or printed." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "h-6 w-6 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Are my documents secure?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground text-sm", children: "Yes. Documents marked as confidential are never shown on the public emergency page. Only you can access them from your dashboard." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "h-6 w-6 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "How do emergency contacts work?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground text-sm", children: "Your emergency contacts are displayed on your public QR page with a click-to-call button so responders can reach them immediately." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-6 w-6 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Need more help?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "text-muted-foreground text-sm", children: [
          "Reach out to us at",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:support@medisync.app", className: "text-primary hover:underline", children: "support@medisync.app" }),
          ". We respond within 24 hours."
        ] })
      ] })
    ] })
  ] });
}
export {
  HelpPage as component
};
