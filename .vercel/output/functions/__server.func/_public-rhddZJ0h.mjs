import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { O as Outlet, L as Link } from "./_libs/tanstack__react-router.mjs";
import { P as ParaglideLocaleSwitcher, T as ThemeToggle } from "./_ssr/ThemeToggle-DaiWOx7L.mjs";
import { a as authClient } from "./_ssr/auth-client-CK1Wyhfj.mjs";
import { g as getLocale } from "./_ssr/router-CHZxjIga.mjs";
import { B as Button } from "./_ssr/button-BjPlzk1J.mjs";
import { X, M as Menu } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "./_libs/isbot.mjs";
import "./_libs/tiny-warning.mjs";
import "./_ssr/server-Cw4QVuYO.mjs";
import "./_libs/zod.mjs";
import "./_ssr/index.mjs";
import "node:async_hooks";
import "./_ssr/index-Dc8WRQC8.mjs";
import "./_libs/drizzle-orm.mjs";
import "./_libs/pg.mjs";
import "events";
import "./_libs/pg-types.mjs";
import "./_libs/postgres-array.mjs";
import "./_libs/postgres-date.mjs";
import "./_libs/postgres-interval.mjs";
import "./_libs/xtend.mjs";
import "./_libs/postgres-bytea.mjs";
import "./_libs/pg-int8.mjs";
import "util";
import "crypto";
import "dns";
import "./_libs/pg-connection-string.mjs";
import "fs";
import "./_libs/pg-protocol.mjs";
import "net";
import "tls";
import "./_libs/pg-cloudflare.mjs";
import "./_libs/pgpass.mjs";
import "path";
import "stream";
import "./_libs/split2.mjs";
import "string_decoder";
import "./_libs/pg-pool.mjs";
import "./_libs/resend.mjs";
import "./_libs/postal-mime.mjs";
import "./_libs/svix.mjs";
import "./_libs/uuid.mjs";
import "node:crypto";
import "./_libs/standardwebhooks.mjs";
import "./_libs/stablelib__base64.mjs";
import "./_libs/fast-sha256.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_libs/tanstack__react-query.mjs";
import "./_libs/next-themes.mjs";
import "./_libs/sonner.mjs";
import "./_libs/radix-ui__react-tooltip.mjs";
import "./_libs/radix-ui__primitive.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "./_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "./_libs/radix-ui__react-popper.mjs";
import "./_libs/floating-ui__react-dom.mjs";
import "./_libs/floating-ui__dom.mjs";
import "./_libs/floating-ui__core.mjs";
import "./_libs/floating-ui__utils.mjs";
import "./_libs/radix-ui__react-arrow.mjs";
import "./_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "./_libs/radix-ui__react-use-size.mjs";
import "./_libs/radix-ui__react-presence.mjs";
import "./_libs/@radix-ui/react-visually-hidden+[...].mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/tailwind-merge.mjs";
const en_nav_home = (
  /** @type {(inputs: Nav_HomeInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Home`
    );
  })
);
const de_nav_home = (
  /** @type {(inputs: Nav_HomeInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Startseite`
    );
  })
);
const nav_home = (
  /** @type {((inputs?: Nav_HomeInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_HomeInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_nav_home();
    return de_nav_home();
  })
);
const en_nav_about = (
  /** @type {(inputs: Nav_AboutInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `About`
    );
  })
);
const de_nav_about = (
  /** @type {(inputs: Nav_AboutInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Über uns`
    );
  })
);
const nav_about = (
  /** @type {((inputs?: Nav_AboutInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_AboutInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_nav_about();
    return de_nav_about();
  })
);
const en_nav_help = (
  /** @type {(inputs: Nav_HelpInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Help`
    );
  })
);
const de_nav_help = (
  /** @type {(inputs: Nav_HelpInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Hilfe`
    );
  })
);
const nav_help = (
  /** @type {((inputs?: Nav_HelpInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_HelpInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_nav_help();
    return de_nav_help();
  })
);
const en_nav_camps = (
  /** @type {(inputs: Nav_CampsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Health Camps`
    );
  })
);
const de_nav_camps = (
  /** @type {(inputs: Nav_CampsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Gesundheitscamps`
    );
  })
);
const nav_camps = (
  /** @type {((inputs?: Nav_CampsInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_CampsInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_nav_camps();
    return de_nav_camps();
  })
);
const en_nav_geo = (
  /** @type {(inputs: Nav_GeoInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Geo Assistance`
    );
  })
);
const de_nav_geo = (
  /** @type {(inputs: Nav_GeoInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Geo-Hilfe`
    );
  })
);
const nav_geo = (
  /** @type {((inputs?: Nav_GeoInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_GeoInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_nav_geo();
    return de_nav_geo();
  })
);
const en_nav_login = (
  /** @type {(inputs: Nav_LoginInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Log in`
    );
  })
);
const de_nav_login = (
  /** @type {(inputs: Nav_LoginInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Anmelden`
    );
  })
);
const nav_login = (
  /** @type {((inputs?: Nav_LoginInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_LoginInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_nav_login();
    return de_nav_login();
  })
);
const en_nav_signup = (
  /** @type {(inputs: Nav_SignupInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Sign up`
    );
  })
);
const de_nav_signup = (
  /** @type {(inputs: Nav_SignupInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Registrieren`
    );
  })
);
const nav_signup = (
  /** @type {((inputs?: Nav_SignupInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SignupInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_nav_signup();
    return de_nav_signup();
  })
);
const en_footer_rights = (
  /** @type {(inputs: Footer_RightsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `All rights reserved.`
    );
  })
);
const de_footer_rights = (
  /** @type {(inputs: Footer_RightsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Alle Rechte vorbehalten.`
    );
  })
);
const footer_rights = (
  /** @type {((inputs?: Footer_RightsInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_RightsInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_footer_rights();
    return de_footer_rights();
  })
);
const en_footer_privacy = (
  /** @type {(inputs: Footer_PrivacyInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Privacy`
    );
  })
);
const de_footer_privacy = (
  /** @type {(inputs: Footer_PrivacyInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Datenschutz`
    );
  })
);
const footer_privacy = (
  /** @type {((inputs?: Footer_PrivacyInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_PrivacyInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_footer_privacy();
    return de_footer_privacy();
  })
);
const en_footer_terms = (
  /** @type {(inputs: Footer_TermsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Terms`
    );
  })
);
const de_footer_terms = (
  /** @type {(inputs: Footer_TermsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Nutzungsbedingungen`
    );
  })
);
const footer_terms = (
  /** @type {((inputs?: Footer_TermsInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_TermsInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_footer_terms();
    return de_footer_terms();
  })
);
function BetterAuthHeader() {
  const { data: session, isPending } = authClient.useSession();
  if (isPending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 bg-neutral-100 dark:bg-neutral-800 animate-pulse" });
  }
  if (session?.user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      session.user.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: session.user.image, alt: "", className: "h-8 w-8" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-8 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-neutral-600 dark:text-neutral-400", children: session.user.name?.charAt(0).toUpperCase() || "U" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            void authClient.signOut();
          },
          className: "flex-1 h-9 px-4 text-sm font-medium bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors",
          children: "Sign out"
        }
      )
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Link,
    {
      to: "/auth/login",
      className: "h-9 px-4 text-sm font-medium bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-50 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors inline-flex items-center",
      children: "Sign in"
    }
  );
}
const navLinks = [
  { to: "/", label: () => nav_home(), exact: true },
  { to: "/about", label: () => nav_about() },
  { to: "/help", label: () => nav_help() },
  { to: "/camps", label: () => nav_camps() },
  { to: "/geo-assistance", label: () => nav_geo() }
];
function Header() {
  const [isMenuOpen, setIsMenuOpen] = reactExports.useState(false);
  const [scrolled, setScrolled] = reactExports.useState(false);
  const { data: session, isPending } = authClient.useSession();
  reactExports.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const closeMenu = () => setIsMenuOpen(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "header",
    {
      className: [
        "sticky top-0 z-50 w-full border-b border-[var(--line)] transition-all duration-300",
        scrolled ? "bg-[var(--header-bg)] shadow-sm backdrop-blur-md" : "bg-[var(--header-bg)] backdrop-blur-lg"
      ].join(" "),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "page-wrap flex items-center gap-x-3 py-3 sm:py-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "m-0 flex-shrink-0 text-base font-semibold tracking-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: "/",
              className: "inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm text-[var(--sea-ink)] no-underline shadow-[0_8px_24px_rgba(30,90,72,0.08)] sm:px-4 sm:py-2",
              onClick: closeMenu,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-2 w-2 rounded-full bg-[linear-gradient(90deg,#56c6be,#7ed3bf)]" }),
                "MediSync"
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-6 hidden items-center gap-x-5 text-sm font-semibold md:flex", children: navLinks.map(({ to, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to,
              className: "nav-link",
              activeProps: { className: "nav-link is-active" },
              children: label()
            },
            to
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5 sm:gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ParaglideLocaleSwitcher, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ThemeToggle, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden items-center gap-2 md:flex", children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 w-16 animate-pulse rounded bg-neutral-100 dark:bg-neutral-800" }) : session?.user ? /* @__PURE__ */ jsxRuntimeExports.jsx(BetterAuthHeader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", size: "sm", children: nav_login() }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/signup", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: nav_signup() }) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                className: "flex items-center justify-center rounded-md p-2 text-[var(--sea-ink-soft)] transition-colors hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)] md:hidden",
                "aria-label": "Toggle menu",
                onClick: () => setIsMenuOpen((v) => !v),
                children: isMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
              }
            )
          ] })
        ] }),
        isMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-md md:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-wrap flex flex-col gap-1 py-4", children: [
          navLinks.map(({ to, label }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to,
              className: "nav-link py-2 text-sm font-semibold",
              activeProps: { className: "nav-link is-active py-2 text-sm font-semibold" },
              onClick: closeMenu,
              children: label()
            },
            to
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-col gap-2 border-t border-[var(--line)] pt-3", children: isPending ? null : session?.user ? /* @__PURE__ */ jsxRuntimeExports.jsx(BetterAuthHeader, {}) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/login", onClick: closeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", className: "w-full", children: nav_login() }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/auth/signup", onClick: closeMenu, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { className: "w-full", children: nav_signup() }) })
          ] }) })
        ] }) })
      ]
    }
  );
}
function Footer() {
  const year = (/* @__PURE__ */ new Date()).getFullYear();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "mt-20 border-t border-[var(--line)] px-4 pb-14 pt-10 text-[var(--sea-ink-soft)]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "page-wrap", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-between gap-6 text-center sm:flex-row sm:text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 mb-1 text-base font-semibold text-[var(--sea-ink)]", children: "MediSync" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "m-0 text-sm", children: "Emergency Medical Data on the Go" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/privacy", className: "nav-link", children: footer_privacy() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/terms", className: "nav-link", children: footer_terms() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/help", className: "nav-link", children: nav_help() }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about", className: "nav-link", children: nav_about() })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-[var(--line)] pt-4 text-center text-xs", children: [
      "© ",
      year,
      " MediSync. ",
      footer_rights()
    ] })
  ] }) });
}
function PublicLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  PublicLayout as component
};
