import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BPoG-cgC.mjs";
import { g as getLocale } from "./router-CHZxjIga.mjs";
import { N as NearbyMapEmbed } from "./NearbyMapEmbed-DgajgWdJ.mjs";
import { h as MapPin, P as Phone, o as Hospital } from "../_libs/lucide-react.mjs";
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
import "./button-BjPlzk1J.mjs";
import "../_libs/class-variance-authority.mjs";
import "./alert-BJNLCpqC.mjs";
const en_geo_title = (
  /** @type {(inputs: Geo_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Geo Assistance`
    );
  })
);
const de_geo_title = (
  /** @type {(inputs: Geo_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Geo-Hilfe`
    );
  })
);
const geo_title = (
  /** @type {((inputs?: Geo_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Geo_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_geo_title();
    return de_geo_title();
  })
);
const en_geo_subtitle = (
  /** @type {(inputs: Geo_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Find nearby hospitals and emergency services`
    );
  })
);
const de_geo_subtitle = (
  /** @type {(inputs: Geo_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Finden Sie nahegelegene Krankenhäuser und Notdienste`
    );
  })
);
const geo_subtitle = (
  /** @type {((inputs?: Geo_SubtitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Geo_SubtitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_geo_subtitle();
    return de_geo_subtitle();
  })
);
function GeoAssistancePage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-4 py-12 max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-10 w-10 text-primary mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: geo_title() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: geo_subtitle() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Emergency Numbers" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Important numbers you should always have handy" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: [{
        label: "Ambulance",
        number: "102"
      }, {
        label: "Emergency (India)",
        number: "112"
      }, {
        label: "Police",
        number: "100"
      }, {
        label: "Fire",
        number: "101"
      }].map(({
        label,
        number
      }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between border rounded-lg p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: label })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: `tel:${number}`, className: "font-bold text-primary hover:underline", children: number })
      ] }, number)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Hospital, { className: "h-5 w-5" }),
          "Hospitals Near You"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Live map showing hospitals based on your current location." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NearbyMapEmbed, { query: "hospital near me", title: "Hospitals near me", heightClass: "h-[420px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.google.com/maps/search/hospital+near+me", target: "_blank", rel: "noopener noreferrer", className: "inline-block text-primary hover:underline text-sm", children: "Open full map in Google Maps ↗" })
      ] })
    ] })
  ] });
}
export {
  GeoAssistancePage as component
};
