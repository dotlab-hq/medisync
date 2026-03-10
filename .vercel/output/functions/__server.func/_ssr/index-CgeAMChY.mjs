import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { B as Button } from "./button-BjPlzk1J.mjs";
import { C as Card, a as CardHeader, b as CardTitle, d as CardContent, c as CardDescription } from "./card-BPoG-cgC.mjs";
import { g as getLocale } from "./router-CHZxjIga.mjs";
import { Q as QrCode, F as FileText, B as Bell, A as Activity, j as Shield, H as Heart } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-slot.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
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
const en_hero_title = (
  /** @type {(inputs: Hero_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Your Medical Identity, One Scan Away`
    );
  })
);
const de_hero_title = (
  /** @type {(inputs: Hero_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Ihre medizinische Identität, nur einen Scan entfernt`
    );
  })
);
const hero_title = (
  /** @type {((inputs?: Hero_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hero_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_hero_title();
    return de_hero_title();
  })
);
const en_hero_subtitle = (
  /** @type {(inputs: Hero_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Store your vital medical information securely and share it instantly via QR code in emergencies.`
    );
  })
);
const de_hero_subtitle = (
  /** @type {(inputs: Hero_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Speichern Sie Ihre wichtigen medizinischen Daten sicher und teilen Sie sie im Notfall sofort per QR-Code.`
    );
  })
);
const hero_subtitle = (
  /** @type {((inputs?: Hero_SubtitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hero_SubtitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_hero_subtitle();
    return de_hero_subtitle();
  })
);
const en_hero_cta = (
  /** @type {(inputs: Hero_CtaInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Get Started — It's Free`
    );
  })
);
const de_hero_cta = (
  /** @type {(inputs: Hero_CtaInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Starten Sie kostenlos`
    );
  })
);
const hero_cta = (
  /** @type {((inputs?: Hero_CtaInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hero_CtaInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_hero_cta();
    return de_hero_cta();
  })
);
const en_hero_learn = (
  /** @type {(inputs: Hero_LearnInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Learn More`
    );
  })
);
const de_hero_learn = (
  /** @type {(inputs: Hero_LearnInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Mehr erfahren`
    );
  })
);
const hero_learn = (
  /** @type {((inputs?: Hero_LearnInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Hero_LearnInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_hero_learn();
    return de_hero_learn();
  })
);
const en_feature_qr_title = (
  /** @type {(inputs: Feature_Qr_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Emergency QR Code`
    );
  })
);
const de_feature_qr_title = (
  /** @type {(inputs: Feature_Qr_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Notfall-QR-Code`
    );
  })
);
const feature_qr_title = (
  /** @type {((inputs?: Feature_Qr_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Qr_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_qr_title();
    return de_feature_qr_title();
  })
);
const en_feature_qr_desc = (
  /** @type {(inputs: Feature_Qr_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Generate a scannable QR code that links to your critical medical information for first responders.`
    );
  })
);
const de_feature_qr_desc = (
  /** @type {(inputs: Feature_Qr_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Erstellen Sie einen scanbaren QR-Code mit Ihren wichtigsten medizinischen Informationen für Ersthelfer.`
    );
  })
);
const feature_qr_desc = (
  /** @type {((inputs?: Feature_Qr_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Qr_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_qr_desc();
    return de_feature_qr_desc();
  })
);
const en_feature_records_title = (
  /** @type {(inputs: Feature_Records_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Medical Records`
    );
  })
);
const de_feature_records_title = (
  /** @type {(inputs: Feature_Records_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Medizinische Unterlagen`
    );
  })
);
const feature_records_title = (
  /** @type {((inputs?: Feature_Records_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Records_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_records_title();
    return de_feature_records_title();
  })
);
const en_feature_records_desc = (
  /** @type {(inputs: Feature_Records_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Upload and organize prescriptions, lab reports, and medical documents in one secure place.`
    );
  })
);
const de_feature_records_desc = (
  /** @type {(inputs: Feature_Records_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Laden Sie Rezepte, Laborberichte und medizinische Dokumente sicher hoch und organisieren Sie diese.`
    );
  })
);
const feature_records_desc = (
  /** @type {((inputs?: Feature_Records_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Records_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_records_desc();
    return de_feature_records_desc();
  })
);
const en_feature_reminders_title = (
  /** @type {(inputs: Feature_Reminders_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Smart Reminders`
    );
  })
);
const de_feature_reminders_title = (
  /** @type {(inputs: Feature_Reminders_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Intelligente Erinnerungen`
    );
  })
);
const feature_reminders_title = (
  /** @type {((inputs?: Feature_Reminders_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Reminders_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_reminders_title();
    return de_feature_reminders_title();
  })
);
const en_feature_reminders_desc = (
  /** @type {(inputs: Feature_Reminders_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Never miss a medication dose or an upcoming appointment with timely reminders.`
    );
  })
);
const de_feature_reminders_desc = (
  /** @type {(inputs: Feature_Reminders_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Verpassen Sie nie wieder eine Medikamentendosis oder einen Arzttermin.`
    );
  })
);
const feature_reminders_desc = (
  /** @type {((inputs?: Feature_Reminders_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Reminders_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_reminders_desc();
    return de_feature_reminders_desc();
  })
);
const en_feature_health_title = (
  /** @type {(inputs: Feature_Health_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Health Metrics`
    );
  })
);
const de_feature_health_title = (
  /** @type {(inputs: Feature_Health_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Gesundheitsdaten`
    );
  })
);
const feature_health_title = (
  /** @type {((inputs?: Feature_Health_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Health_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_health_title();
    return de_feature_health_title();
  })
);
const en_feature_health_desc = (
  /** @type {(inputs: Feature_Health_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Track blood pressure, blood sugar, weight, and other vitals over time.`
    );
  })
);
const de_feature_health_desc = (
  /** @type {(inputs: Feature_Health_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Verfolgen Sie Blutdruck, Blutzucker, Gewicht und andere Vitalwerte über die Zeit.`
    );
  })
);
const feature_health_desc = (
  /** @type {((inputs?: Feature_Health_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Health_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_health_desc();
    return de_feature_health_desc();
  })
);
const en_feature_contacts_title = (
  /** @type {(inputs: Feature_Contacts_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Emergency Contacts`
    );
  })
);
const de_feature_contacts_title = (
  /** @type {(inputs: Feature_Contacts_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Notfallkontakte`
    );
  })
);
const feature_contacts_title = (
  /** @type {((inputs?: Feature_Contacts_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Contacts_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_contacts_title();
    return de_feature_contacts_title();
  })
);
const en_feature_contacts_desc = (
  /** @type {(inputs: Feature_Contacts_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Responders can instantly reach your emergency contacts from your QR profile.`
    );
  })
);
const de_feature_contacts_desc = (
  /** @type {(inputs: Feature_Contacts_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Ersthelfer können Ihre Notfallkontakte direkt von Ihrem QR-Profil aus erreichen.`
    );
  })
);
const feature_contacts_desc = (
  /** @type {((inputs?: Feature_Contacts_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Contacts_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_contacts_desc();
    return de_feature_contacts_desc();
  })
);
const en_feature_multilang_title = (
  /** @type {(inputs: Feature_Multilang_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Multi-language`
    );
  })
);
const de_feature_multilang_title = (
  /** @type {(inputs: Feature_Multilang_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Mehrsprachig`
    );
  })
);
const feature_multilang_title = (
  /** @type {((inputs?: Feature_Multilang_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Multilang_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_multilang_title();
    return de_feature_multilang_title();
  })
);
const en_feature_multilang_desc = (
  /** @type {(inputs: Feature_Multilang_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Use MediSync in your preferred language — currently English and German.`
    );
  })
);
const de_feature_multilang_desc = (
  /** @type {(inputs: Feature_Multilang_DescInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Nutzen Sie MediSync in Ihrer bevorzugten Sprache — derzeit Englisch und Deutsch.`
    );
  })
);
const feature_multilang_desc = (
  /** @type {((inputs?: Feature_Multilang_DescInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Feature_Multilang_DescInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_feature_multilang_desc();
    return de_feature_multilang_desc();
  })
);
const en_cta_title = (
  /** @type {(inputs: Cta_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Ready to secure your health information?`
    );
  })
);
const de_cta_title = (
  /** @type {(inputs: Cta_TitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Bereit, Ihre Gesundheitsdaten zu sichern?`
    );
  })
);
const cta_title = (
  /** @type {((inputs?: Cta_TitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cta_TitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_cta_title();
    return de_cta_title();
  })
);
const en_cta_subtitle = (
  /** @type {(inputs: Cta_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Create your free MediSync profile in under 5 minutes.`
    );
  })
);
const de_cta_subtitle = (
  /** @type {(inputs: Cta_SubtitleInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Erstellen Sie Ihr kostenloses MediSync-Profil in unter 5 Minuten.`
    );
  })
);
const cta_subtitle = (
  /** @type {((inputs?: Cta_SubtitleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cta_SubtitleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_cta_subtitle();
    return de_cta_subtitle();
  })
);
const en_cta_button = (
  /** @type {(inputs: Cta_ButtonInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Create Free Account`
    );
  })
);
const de_cta_button = (
  /** @type {(inputs: Cta_ButtonInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Kostenloses Konto erstellen`
    );
  })
);
const cta_button = (
  /** @type {((inputs?: Cta_ButtonInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Cta_ButtonInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_cta_button();
    return de_cta_button();
  })
);
function getFeatures() {
  return [{
    icon: QrCode,
    title: feature_qr_title(),
    description: feature_qr_desc()
  }, {
    icon: FileText,
    title: feature_records_title(),
    description: feature_records_desc()
  }, {
    icon: Bell,
    title: feature_reminders_title(),
    description: feature_reminders_desc()
  }, {
    icon: Activity,
    title: feature_health_title(),
    description: feature_health_desc()
  }, {
    icon: Shield,
    title: feature_contacts_title(),
    description: feature_contacts_desc()
  }, {
    icon: Heart,
    title: feature_multilang_title(),
    description: feature_multilang_desc()
  }];
}
function HomePage() {
  const features = getFeatures();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "px-4 pb-16 pt-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-4xl text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-6xl font-bold tracking-tight mb-6", children: hero_title() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-muted-foreground max-w-2xl mx-auto mb-8", children: hero_subtitle() }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/signup", children: hero_cta() }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", variant: "outline", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", children: hero_learn() }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto max-w-6xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-6 sm:grid-cols-2 lg:grid-cols-3", children: features.map(({
      icon: Icon,
      title,
      description
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "hover:border-primary/50 transition-colors", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-8 w-8 text-primary mb-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: title })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: description }) })
    ] }, title)) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "mx-auto max-w-2xl text-center py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-bold mb-4", children: cta_title() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mb-6", children: cta_subtitle() }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "lg", asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/signup", children: cta_button() }) })
    ] })
  ] });
}
export {
  HomePage as component
};
