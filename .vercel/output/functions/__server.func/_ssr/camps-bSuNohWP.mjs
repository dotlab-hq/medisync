import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BPoG-cgC.mjs";
import { B as Badge } from "./badge-CT5ZN08I.mjs";
import { g as getLocale } from "./router-CHZxjIga.mjs";
import { N as NearbyMapEmbed } from "./NearbyMapEmbed-DgajgWdJ.mjs";
import { H as Heart, q as Map, h as MapPin, g as Calendar } from "../_libs/lucide-react.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
import "./button-BjPlzk1J.mjs";
import "./alert-BJNLCpqC.mjs";
const en_camps_title = (
  /** @type {(inputs: Camps_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Health Camps`
    );
  })
);
const de_camps_title = (
  /** @type {(inputs: Camps_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Gesundheitscamps`
    );
  })
);
const camps_title = (
  /** @type {((inputs?: Camps_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Camps_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_camps_title();
    return de_camps_title();
  })
);
const en_camps_subtitle = (
  /** @type {(inputs: Camps_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Discover free health camps and awareness events near you`
    );
  })
);
const de_camps_subtitle = (
  /** @type {(inputs: Camps_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Entdecken Sie kostenlose Gesundheitscamps und Veranstaltungen in Ihrer Nähe`
    );
  })
);
const camps_subtitle = (
  /** @type {((inputs?: Camps_SubtitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Camps_SubtitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_camps_subtitle();
    return de_camps_subtitle();
  })
);
const CAMPS = [{
  id: "1",
  name: "Free Blood Donation Camp",
  location: "Community Hall, Sector 15, Noida",
  date: "2025-02-15",
  organiser: "Red Cross India",
  type: "Blood Donation"
}, {
  id: "2",
  name: "Eye Checkup Drive",
  location: "Government Hospital, MG Road, Pune",
  date: "2025-03-01",
  organiser: "Lions Club",
  type: "Eye Care"
}, {
  id: "3",
  name: "Diabetes Awareness Workshop",
  location: "Town Hall, T. Nagar, Chennai",
  date: "2025-03-10",
  organiser: "Apollo Foundation",
  type: "Awareness"
}];
function CampsPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-4 py-12 max-w-4xl mx-auto space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-10 w-10 text-primary mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold mb-4", children: camps_title() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground", children: camps_subtitle() })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Map, { className: "h-5 w-5" }),
          "Health Camps Near You"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Live map of health camps and medical drives based on your location." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NearbyMapEmbed, { query: "health camp medical camp near me", title: "Health camps near me", heightClass: "h-[400px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.google.com/maps/search/health+camp+near+me", target: "_blank", rel: "noopener noreferrer", className: "inline-block text-primary hover:underline text-sm", children: "Open full map in Google Maps ↗" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-5 w-5" }),
          "Hospitals Near You"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Find nearby hospitals and clinics for immediate care." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NearbyMapEmbed, { query: "hospital clinic near me", title: "Hospitals near me", heightClass: "h-[400px]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "https://www.google.com/maps/search/hospital+near+me", target: "_blank", rel: "noopener noreferrer", className: "inline-block text-primary hover:underline text-sm", children: "Open full map in Google Maps ↗" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-semibold", children: "Upcoming Camps" }),
      CAMPS.map((camp) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: camp.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
              "by ",
              camp.organiser
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: camp.type })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex items-center gap-6 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
            camp.location
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4" }),
            camp.date
          ] })
        ] })
      ] }, camp.id))
    ] })
  ] });
}
export {
  CampsPage as component
};
