import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent } from "./card-BPoG-cgC.mjs";
import { g as getLocale } from "./router-CHZxjIga.mjs";
import { H as Heart, j as Shield, r as Users, G as Globe } from "../_libs/lucide-react.mjs";
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
const en_about_title = (
  /** @type {(inputs: About_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `About MediSync`
    );
  })
);
const de_about_title = (
  /** @type {(inputs: About_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Über MediSync`
    );
  })
);
const about_title = (
  /** @type {((inputs?: About_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_title();
    return de_about_title();
  })
);
const en_about_subtitle = (
  /** @type {(inputs: About_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `A smart medical identity platform built for emergencies and everyday health management.`
    );
  })
);
const de_about_subtitle = (
  /** @type {(inputs: About_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Eine intelligente medizinische Identitätsplattform für Notfälle und tägliches Gesundheitsmanagement.`
    );
  })
);
const about_subtitle = (
  /** @type {((inputs?: About_SubtitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_SubtitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_subtitle();
    return de_about_subtitle();
  })
);
const en_about_mission_title = (
  /** @type {(inputs: About_Mission_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Our Mission`
    );
  })
);
const de_about_mission_title = (
  /** @type {(inputs: About_Mission_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Unsere Mission`
    );
  })
);
const about_mission_title = (
  /** @type {((inputs?: About_Mission_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Mission_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_mission_title();
    return de_about_mission_title();
  })
);
const en_about_mission_desc = (
  /** @type {(inputs: About_Mission_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Make critical medical information instantly accessible during emergencies while keeping everyday health management simple and private.`
    );
  })
);
const de_about_mission_desc = (
  /** @type {(inputs: About_Mission_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Kritische medizinische Informationen im Notfall sofort zugänglich machen und gleichzeitig das tägliche Gesundheitsmanagement einfach und privat halten.`
    );
  })
);
const about_mission_desc = (
  /** @type {((inputs?: About_Mission_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Mission_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_mission_desc();
    return de_about_mission_desc();
  })
);
const en_about_open_title = (
  /** @type {(inputs: About_Open_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Open & Transparent`
    );
  })
);
const de_about_open_title = (
  /** @type {(inputs: About_Open_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Offen & Transparent`
    );
  })
);
const about_open_title = (
  /** @type {((inputs?: About_Open_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Open_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_open_title();
    return de_about_open_title();
  })
);
const en_about_open_desc = (
  /** @type {(inputs: About_Open_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `MediSync is built with modern open-source technologies. Your data stays yours.`
    );
  })
);
const de_about_open_desc = (
  /** @type {(inputs: About_Open_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `MediSync basiert auf modernen Open-Source-Technologien. Ihre Daten gehören Ihnen.`
    );
  })
);
const about_open_desc = (
  /** @type {((inputs?: About_Open_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Open_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_open_desc();
    return de_about_open_desc();
  })
);
const en_about_privacy_title = (
  /** @type {(inputs: About_Privacy_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Privacy First`
    );
  })
);
const de_about_privacy_title = (
  /** @type {(inputs: About_Privacy_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Datenschutz zuerst`
    );
  })
);
const about_privacy_title = (
  /** @type {((inputs?: About_Privacy_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Privacy_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_privacy_title();
    return de_about_privacy_title();
  })
);
const en_about_privacy_desc = (
  /** @type {(inputs: About_Privacy_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Confidential records are never shown on public emergency pages. You control what responders see.`
    );
  })
);
const de_about_privacy_desc = (
  /** @type {(inputs: About_Privacy_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Vertrauliche Unterlagen werden nie auf öffentlichen Notfallseiten angezeigt. Sie bestimmen, was Ersthelfer sehen.`
    );
  })
);
const about_privacy_desc = (
  /** @type {((inputs?: About_Privacy_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Privacy_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_privacy_desc();
    return de_about_privacy_desc();
  })
);
const en_about_accessible_title = (
  /** @type {(inputs: About_Accessible_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Accessible Anywhere`
    );
  })
);
const de_about_accessible_title = (
  /** @type {(inputs: About_Accessible_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Überall zugänglich`
    );
  })
);
const about_accessible_title = (
  /** @type {((inputs?: About_Accessible_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Accessible_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_accessible_title();
    return de_about_accessible_title();
  })
);
const en_about_accessible_desc = (
  /** @type {(inputs: About_Accessible_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Works on any device with a browser — no app install required for scanning or viewing emergency profiles.`
    );
  })
);
const de_about_accessible_desc = (
  /** @type {(inputs: About_Accessible_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Funktioniert auf jedem Gerät mit Browser — keine App-Installation zum Scannen oder Anzeigen von Notfallprofilen nötig.`
    );
  })
);
const about_accessible_desc = (
  /** @type {((inputs?: About_Accessible_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<About_Accessible_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_about_accessible_desc();
    return de_about_accessible_desc();
  })
);
function About() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-4 py-12 max-w-4xl mx-auto space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: about_title() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto", children: about_subtitle() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-6 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-8 w-8 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: about_mission_title() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground", children: about_mission_desc() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "h-8 w-8 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: about_privacy_title() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground", children: about_privacy_desc() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "h-8 w-8 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: about_open_title() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground", children: about_open_desc() })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "h-8 w-8 text-primary mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: about_accessible_title() })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "text-muted-foreground", children: about_accessible_desc() })
      ] })
    ] })
  ] });
}
export {
  About as component
};
