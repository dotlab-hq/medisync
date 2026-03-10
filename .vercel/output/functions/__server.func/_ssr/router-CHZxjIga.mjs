import { p as redirect } from "../_libs/tanstack__router-core.mjs";
import { c as createRouter, a as createRootRouteWithContext, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { b as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { z } from "../_libs/next-themes.mjs";
import { T as Toaster$1 } from "../_libs/sonner.mjs";
import { e as createServerFn, T as TSS_SERVER_FUNCTION, f as getServerFnById } from "./index.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { L as LoaderCircle, O as OctagonX, T as TriangleAlert, I as Info, C as CircleCheck } from "../_libs/lucide-react.mjs";
import { P as Provider } from "../_libs/radix-ui__react-tooltip.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
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
let context;
function getContext() {
  if (context) {
    return context;
  }
  const queryClient = new QueryClient();
  context = {
    queryClient
  };
  return context;
}
function TanStackQueryProvider({
  children
}) {
  const { queryClient } = getContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children });
}
function TooltipProvider({
  delayDuration = 0,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Provider,
    {
      "data-slot": "tooltip-provider",
      delayDuration,
      ...props
    }
  );
}
const Toaster = ({ ...props }) => {
  const { theme = "system" } = z();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Toaster$1,
    {
      theme,
      className: "toaster group",
      icons: {
        success: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4" }),
        info: /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "size-4" }),
        warning: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4" }),
        error: /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonX, { className: "size-4" }),
        loading: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" })
      },
      style: {
        "--normal-bg": "var(--popover)",
        "--normal-text": "var(--popover-foreground)",
        "--normal-border": "var(--border)",
        "--border-radius": "var(--radius)"
      },
      ...props
    }
  );
};
const baseLocale = "en";
const locales = (
  /** @type {const} */
  ["en", "de"]
);
const cookieName = "PARAGLIDE_LOCALE";
const strategy = [
  "cookie",
  "globalVariable",
  "baseLocale"
];
globalThis.__paraglide = {};
let _locale;
let localeInitiallySet = false;
let getLocale = () => {
  let strategyToUse = strategy;
  const resolved = resolveLocaleWithStrategies(strategyToUse);
  if (resolved) {
    if (!localeInitiallySet) {
      _locale = resolved;
      localeInitiallySet = true;
      setLocale(resolved, { reload: false });
    }
    return resolved;
  }
  throw new Error("No locale found. Read the docs https://inlang.com/m/gerre34r/library-inlang-paraglideJs/errors#no-locale-found");
};
function resolveLocaleWithStrategies(strategyToUse, urlForUrlStrategy) {
  let locale;
  for (const strat of strategyToUse) {
    if (strat === "cookie") {
      locale = extractLocaleFromCookie();
    } else if (strat === "baseLocale") {
      locale = baseLocale;
    } else if (strat === "globalVariable" && _locale !== void 0) {
      locale = _locale;
    } else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
      const handler = customClientStrategies.get(strat);
      if (handler) {
        const result = handler.getLocale();
        if (result instanceof Promise) {
          continue;
        }
        locale = result;
      }
    }
    if (locale !== void 0) {
      return assertIsLocale(locale);
    }
  }
  return void 0;
}
let setLocale = (newLocale, options) => {
  ({
    ...options
  });
  let currentLocale;
  try {
    currentLocale = getLocale();
  } catch {
  }
  const customSetLocalePromises = [];
  let strategyToUse = strategy;
  for (const strat of strategyToUse) {
    if (strat === "globalVariable") {
      _locale = newLocale;
    } else if (strat === "cookie") {
      {
        continue;
      }
    } else if (strat === "baseLocale") {
      continue;
    } else if (isCustomStrategy(strat) && customClientStrategies.has(strat)) {
      const handler = customClientStrategies.get(strat);
      if (handler) {
        let result = handler.setLocale(newLocale);
        if (result instanceof Promise) {
          result = result.catch((error) => {
            throw new Error(`Custom strategy "${strat}" setLocale failed.`, {
              cause: error
            });
          });
          customSetLocalePromises.push(result);
        }
      }
    }
  }
  if (customSetLocalePromises.length) {
    return Promise.all(customSetLocalePromises).then(() => {
    });
  }
  return;
};
function isLocale(locale) {
  if (typeof locale !== "string")
    return false;
  return !locale ? false : locales.some((item) => item.toLowerCase() === locale.toLowerCase());
}
function assertIsLocale(input) {
  if (typeof input !== "string") {
    throw new Error(`Invalid locale: ${input}. Expected a string.`);
  }
  const lowerInput = input.toLowerCase();
  const matchedLocale = locales.find((item) => item.toLowerCase() === lowerInput);
  if (!matchedLocale) {
    throw new Error(`Invalid locale: ${input}. Expected one of: ${locales.join(", ")}`);
  }
  return matchedLocale;
}
function extractLocaleFromCookie() {
  if (typeof document === "undefined" || !document.cookie) {
    return;
  }
  const match = document.cookie.match(new RegExp(`(^| )${cookieName}=([^;]+)`));
  const locale = match?.[2];
  if (isLocale(locale)) {
    return locale;
  }
  return void 0;
}
const customClientStrategies = /* @__PURE__ */ new Map();
function isCustomStrategy(strategy2) {
  return typeof strategy2 === "string" && /^custom-[A-Za-z0-9_-]+$/.test(strategy2);
}
const appCss = "/assets/styles-Cf1Wfvws.css";
const THEME_INIT_SCRIPT = `(function(){try{var stored=window.localStorage.getItem('theme');var mode=(stored==='light'||stored==='dark'||stored==='auto')?stored:'auto';var prefersDark=window.matchMedia('(prefers-color-scheme: dark)').matches;var resolved=mode==='auto'?(prefersDark?'dark':'light'):mode;var root=document.documentElement;root.classList.remove('light','dark');root.classList.add(resolved);if(mode==='auto'){root.removeAttribute('data-theme')}else{root.setAttribute('data-theme',mode)}root.style.colorScheme=resolved;}catch(e){}})();`;
const Route$s = createRootRouteWithContext()({
  beforeLoad: async () => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", getLocale());
    }
  },
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "MediSync — Emergency Medical Data on the Go"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss
      }
    ]
  }),
  shellComponent: RootDocument
});
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: getLocale(), suppressHydrationWarning: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("script", { dangerouslySetInnerHTML: { __html: THEME_INIT_SCRIPT } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "font-sans antialiased wrap-anywhere selection:bg-[rgba(79,184,178,0.24)]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TanStackQueryProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipProvider, { children: [
        children,
        /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { richColors: true, position: "top-right" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
const createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    const serverFn = await getServerFnById(functionId);
    return serverFn(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const getSession = createServerFn({
  method: "GET"
}).handler(createSsrRpc("a25ee52c3707674a0708759ce51bbede27783305d5c10599240f3902a9f63a55"));
const getOnboardingStatus = createServerFn({
  method: "GET"
}).handler(createSsrRpc("045fa6ce7c5617f84a2ae0e1bf934ad915f0e764902c292dc5eb7744c298981d"));
const $$splitComponentImporter$p = () => import("./onboarding-CRMc38k7.mjs");
const Route$r = createFileRoute("/onboarding")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session?.user) throw redirect({
      to: "/auth/login"
    });
    return {
      session
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$p, "component")
});
const $$splitComponentImporter$o = () => import("./auth-k2apyBVf.mjs");
const Route$q = createFileRoute("/auth")({
  beforeLoad: async () => {
    const session = await getSession();
    if (session?.user) {
      throw redirect({
        to: "/dashboard"
      });
    }
  },
  component: lazyRouteComponent($$splitComponentImporter$o, "component")
});
const $$splitComponentImporter$n = () => import("../_public-rhddZJ0h.mjs");
const Route$p = createFileRoute("/_public")({
  component: lazyRouteComponent($$splitComponentImporter$n, "component")
});
const $$splitComponentImporter$m = () => import("../_dashboard-BCl8lQfL.mjs");
const Route$o = createFileRoute("/_dashboard")({
  beforeLoad: async () => {
    const session = await getSession();
    if (!session?.user) {
      throw redirect({
        to: "/auth/login"
      });
    }
    const {
      onboardingCompleted
    } = await getOnboardingStatus();
    if (!onboardingCompleted) {
      throw redirect({
        to: "/onboarding"
      });
    }
    return {
      session
    };
  },
  component: lazyRouteComponent($$splitComponentImporter$m, "component")
});
const Route$n = createFileRoute("/auth/")({
  beforeLoad: () => {
    throw redirect({ to: "/auth/login" });
  }
});
const $$splitComponentImporter$l = () => import("./index-CgeAMChY.mjs");
const Route$m = createFileRoute("/_public/")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("../_token-DducUQDx.mjs");
const Route$l = createFileRoute("/emergency/$token")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./verify-email-nsLNbMYy.mjs");
const Route$k = createFileRoute("/auth/verify-email")({
  validateSearch: object({
    email: string().email().optional()
  }),
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./signup-CeUBmCFR.mjs");
const Route$j = createFileRoute("/auth/signup")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./reset-password-DAl2Zu7S.mjs");
const Route$i = createFileRoute("/auth/reset-password")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./login-DWpqMm7F.mjs");
const Route$h = createFileRoute("/auth/login")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./forgot-password-uG0h7vNE.mjs");
const Route$g = createFileRoute("/auth/forgot-password")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./terms-BXk-RAHb.mjs");
const Route$f = createFileRoute("/_public/terms")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./privacy-CKPy_Z11.mjs");
const Route$e = createFileRoute("/_public/privacy")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./help-DVIkiSvb.mjs");
const Route$d = createFileRoute("/_public/help")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./geo-assistance-Dogh8Hk1.mjs");
const Route$c = createFileRoute("/_public/geo-assistance")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./camps-bSuNohWP.mjs");
const Route$b = createFileRoute("/_public/camps")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./about-BI-D0wmp.mjs");
const Route$a = createFileRoute("/_public/about")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./index-Bve0wAab.mjs");
const Route$9 = createFileRoute("/_dashboard/dashboard/")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const Route$8 = createFileRoute("/api/auth/$")({
  server: {
    handlers: {
      GET: ({ request }) => auth.handler(request),
      POST: ({ request }) => auth.handler(request)
    }
  }
});
const $$splitComponentImporter$7 = () => import("./settings-D6jmiG3k.mjs");
const Route$7 = createFileRoute("/_dashboard/dashboard/settings")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./reminders-C6-wH0pP.mjs");
const Route$6 = createFileRoute("/_dashboard/dashboard/reminders")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./qr-code-B1g19q9J.mjs");
const Route$5 = createFileRoute("/_dashboard/dashboard/qr-code")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./profile-CoYU5LTK.mjs");
const Route$4 = createFileRoute("/_dashboard/dashboard/profile")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./health-DTIJXgX1.mjs");
const Route$3 = createFileRoute("/_dashboard/dashboard/health")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./documents-Btdsi1KL.mjs");
const Route$2 = createFileRoute("/_dashboard/dashboard/documents")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./developer-DqhE2LQK.mjs");
const Route$1 = createFileRoute("/_dashboard/dashboard/developer")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./appointments-CryxnXeK.mjs");
const Route = createFileRoute("/_dashboard/dashboard/appointments")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const OnboardingRoute = Route$r.update({
  id: "/onboarding",
  path: "/onboarding",
  getParentRoute: () => Route$s
});
const AuthRoute = Route$q.update({
  id: "/auth",
  path: "/auth",
  getParentRoute: () => Route$s
});
const PublicRoute = Route$p.update({
  id: "/_public",
  getParentRoute: () => Route$s
});
const DashboardRoute = Route$o.update({
  id: "/_dashboard",
  getParentRoute: () => Route$s
});
const AuthIndexRoute = Route$n.update({
  id: "/",
  path: "/",
  getParentRoute: () => AuthRoute
});
const PublicIndexRoute = Route$m.update({
  id: "/",
  path: "/",
  getParentRoute: () => PublicRoute
});
const EmergencyTokenRoute = Route$l.update({
  id: "/emergency/$token",
  path: "/emergency/$token",
  getParentRoute: () => Route$s
});
const AuthVerifyEmailRoute = Route$k.update({
  id: "/verify-email",
  path: "/verify-email",
  getParentRoute: () => AuthRoute
});
const AuthSignupRoute = Route$j.update({
  id: "/signup",
  path: "/signup",
  getParentRoute: () => AuthRoute
});
const AuthResetPasswordRoute = Route$i.update({
  id: "/reset-password",
  path: "/reset-password",
  getParentRoute: () => AuthRoute
});
const AuthLoginRoute = Route$h.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => AuthRoute
});
const AuthForgotPasswordRoute = Route$g.update({
  id: "/forgot-password",
  path: "/forgot-password",
  getParentRoute: () => AuthRoute
});
const PublicTermsRoute = Route$f.update({
  id: "/terms",
  path: "/terms",
  getParentRoute: () => PublicRoute
});
const PublicPrivacyRoute = Route$e.update({
  id: "/privacy",
  path: "/privacy",
  getParentRoute: () => PublicRoute
});
const PublicHelpRoute = Route$d.update({
  id: "/help",
  path: "/help",
  getParentRoute: () => PublicRoute
});
const PublicGeoAssistanceRoute = Route$c.update({
  id: "/geo-assistance",
  path: "/geo-assistance",
  getParentRoute: () => PublicRoute
});
const PublicCampsRoute = Route$b.update({
  id: "/camps",
  path: "/camps",
  getParentRoute: () => PublicRoute
});
const PublicAboutRoute = Route$a.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => PublicRoute
});
const DashboardDashboardIndexRoute = Route$9.update({
  id: "/dashboard/",
  path: "/dashboard/",
  getParentRoute: () => DashboardRoute
});
const ApiAuthSplatRoute = Route$8.update({
  id: "/api/auth/$",
  path: "/api/auth/$",
  getParentRoute: () => Route$s
});
const DashboardDashboardSettingsRoute = Route$7.update({
  id: "/dashboard/settings",
  path: "/dashboard/settings",
  getParentRoute: () => DashboardRoute
});
const DashboardDashboardRemindersRoute = Route$6.update({
  id: "/dashboard/reminders",
  path: "/dashboard/reminders",
  getParentRoute: () => DashboardRoute
});
const DashboardDashboardQrCodeRoute = Route$5.update({
  id: "/dashboard/qr-code",
  path: "/dashboard/qr-code",
  getParentRoute: () => DashboardRoute
});
const DashboardDashboardProfileRoute = Route$4.update({
  id: "/dashboard/profile",
  path: "/dashboard/profile",
  getParentRoute: () => DashboardRoute
});
const DashboardDashboardHealthRoute = Route$3.update({
  id: "/dashboard/health",
  path: "/dashboard/health",
  getParentRoute: () => DashboardRoute
});
const DashboardDashboardDocumentsRoute = Route$2.update({
  id: "/dashboard/documents",
  path: "/dashboard/documents",
  getParentRoute: () => DashboardRoute
});
const DashboardDashboardDeveloperRoute = Route$1.update({
  id: "/dashboard/developer",
  path: "/dashboard/developer",
  getParentRoute: () => DashboardRoute
});
const DashboardDashboardAppointmentsRoute = Route.update({
  id: "/dashboard/appointments",
  path: "/dashboard/appointments",
  getParentRoute: () => DashboardRoute
});
const DashboardRouteChildren = {
  DashboardDashboardAppointmentsRoute,
  DashboardDashboardDeveloperRoute,
  DashboardDashboardDocumentsRoute,
  DashboardDashboardHealthRoute,
  DashboardDashboardProfileRoute,
  DashboardDashboardQrCodeRoute,
  DashboardDashboardRemindersRoute,
  DashboardDashboardSettingsRoute,
  DashboardDashboardIndexRoute
};
const DashboardRouteWithChildren = DashboardRoute._addFileChildren(
  DashboardRouteChildren
);
const PublicRouteChildren = {
  PublicAboutRoute,
  PublicCampsRoute,
  PublicGeoAssistanceRoute,
  PublicHelpRoute,
  PublicPrivacyRoute,
  PublicTermsRoute,
  PublicIndexRoute
};
const PublicRouteWithChildren = PublicRoute._addFileChildren(PublicRouteChildren);
const AuthRouteChildren = {
  AuthForgotPasswordRoute,
  AuthLoginRoute,
  AuthResetPasswordRoute,
  AuthSignupRoute,
  AuthVerifyEmailRoute,
  AuthIndexRoute
};
const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren);
const rootRouteChildren = {
  DashboardRoute: DashboardRouteWithChildren,
  PublicRoute: PublicRouteWithChildren,
  AuthRoute: AuthRouteWithChildren,
  OnboardingRoute,
  EmergencyTokenRoute,
  ApiAuthSplatRoute
};
const routeTree = Route$s._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router2 = createRouter({
    routeTree,
    context: getContext(),
    scrollRestoration: true,
    defaultPreload: "intent",
    defaultPreloadStaleTime: 0
  });
  return router2;
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$l as R,
  Route$k as a,
  createSsrRpc as c,
  getLocale as g,
  locales as l,
  router as r,
  setLocale as s
};
