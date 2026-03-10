import { j as jsxRuntimeExports, r as reactExports } from "./_libs/react.mjs";
import { O as Outlet, L as Link, d as useLocation } from "./_libs/tanstack__react-router.mjs";
import { B as Button } from "./_ssr/button-BjPlzk1J.mjs";
import { c as cn } from "./_ssr/utils-H80jjgLf.mjs";
import { a as authClient } from "./_ssr/auth-client-CK1Wyhfj.mjs";
import { g as getLocale } from "./_ssr/router-CHZxjIga.mjs";
import { H as Heart, e as LogOut, X, M as Menu, f as House, F as FileText, Q as QrCode, B as Bell, A as Activity, g as Calendar, h as MapPin, U as User, S as Settings, K as Key, i as CircleQuestionMark } from "./_libs/lucide-react.mjs";
import { R as Root, T as Trigger, C as Content, a as Close, P as Portal, O as Overlay } from "./_libs/radix-ui__react-dialog.mjs";
import { R as Root$1 } from "./_libs/radix-ui__react-separator.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "./_libs/isbot.mjs";
import "./_libs/tiny-warning.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/clsx.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/tailwind-merge.mjs";
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
import "./_libs/radix-ui__react-context.mjs";
import "./_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "./_libs/radix-ui__react-primitive.mjs";
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
import "./_libs/radix-ui__react-id.mjs";
import "./_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "./_libs/radix-ui__react-focus-scope.mjs";
import "./_libs/radix-ui__react-portal.mjs";
import "./_libs/radix-ui__react-focus-guards.mjs";
import "./_libs/react-remove-scroll.mjs";
import "tslib";
import "./_libs/react-remove-scroll-bar.mjs";
import "./_libs/react-style-singleton.mjs";
import "./_libs/get-nonce.mjs";
import "./_libs/use-sidecar.mjs";
import "./_libs/use-callback-ref.mjs";
import "./_libs/aria-hidden.mjs";
const en_sidebar_dashboard = (
  /** @type {(inputs: Sidebar_DashboardInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Dashboard`
    );
  })
);
const de_sidebar_dashboard = (
  /** @type {(inputs: Sidebar_DashboardInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Dashboard`
    );
  })
);
const sidebar_dashboard = (
  /** @type {((inputs?: Sidebar_DashboardInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_DashboardInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_dashboard();
    return de_sidebar_dashboard();
  })
);
const en_sidebar_documents = (
  /** @type {(inputs: Sidebar_DocumentsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Documents`
    );
  })
);
const de_sidebar_documents = (
  /** @type {(inputs: Sidebar_DocumentsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Dokumente`
    );
  })
);
const sidebar_documents = (
  /** @type {((inputs?: Sidebar_DocumentsInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_DocumentsInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_documents();
    return de_sidebar_documents();
  })
);
const en_sidebar_qr = (
  /** @type {(inputs: Sidebar_QrInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `QR Code`
    );
  })
);
const de_sidebar_qr = (
  /** @type {(inputs: Sidebar_QrInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `QR-Code`
    );
  })
);
const sidebar_qr = (
  /** @type {((inputs?: Sidebar_QrInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_QrInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_qr();
    return de_sidebar_qr();
  })
);
const en_sidebar_reminders = (
  /** @type {(inputs: Sidebar_RemindersInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Reminders`
    );
  })
);
const de_sidebar_reminders = (
  /** @type {(inputs: Sidebar_RemindersInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Erinnerungen`
    );
  })
);
const sidebar_reminders = (
  /** @type {((inputs?: Sidebar_RemindersInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_RemindersInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_reminders();
    return de_sidebar_reminders();
  })
);
const en_sidebar_health = (
  /** @type {(inputs: Sidebar_HealthInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Health Metrics`
    );
  })
);
const de_sidebar_health = (
  /** @type {(inputs: Sidebar_HealthInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Gesundheitsdaten`
    );
  })
);
const sidebar_health = (
  /** @type {((inputs?: Sidebar_HealthInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_HealthInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_health();
    return de_sidebar_health();
  })
);
const en_sidebar_appointments = (
  /** @type {(inputs: Sidebar_AppointmentsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Appointments`
    );
  })
);
const de_sidebar_appointments = (
  /** @type {(inputs: Sidebar_AppointmentsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Termine`
    );
  })
);
const sidebar_appointments = (
  /** @type {((inputs?: Sidebar_AppointmentsInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_AppointmentsInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_appointments();
    return de_sidebar_appointments();
  })
);
const en_sidebar_camps = (
  /** @type {(inputs: Sidebar_CampsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Health Camps`
    );
  })
);
const de_sidebar_camps = (
  /** @type {(inputs: Sidebar_CampsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Gesundheitscamps`
    );
  })
);
const sidebar_camps = (
  /** @type {((inputs?: Sidebar_CampsInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_CampsInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_camps();
    return de_sidebar_camps();
  })
);
const en_sidebar_geo = (
  /** @type {(inputs: Sidebar_GeoInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Geo Assistance`
    );
  })
);
const de_sidebar_geo = (
  /** @type {(inputs: Sidebar_GeoInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Geo-Hilfe`
    );
  })
);
const sidebar_geo = (
  /** @type {((inputs?: Sidebar_GeoInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_GeoInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_geo();
    return de_sidebar_geo();
  })
);
const en_sidebar_profile = (
  /** @type {(inputs: Sidebar_ProfileInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Profile`
    );
  })
);
const de_sidebar_profile = (
  /** @type {(inputs: Sidebar_ProfileInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Profil`
    );
  })
);
const sidebar_profile = (
  /** @type {((inputs?: Sidebar_ProfileInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_ProfileInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_profile();
    return de_sidebar_profile();
  })
);
const en_sidebar_settings = (
  /** @type {(inputs: Sidebar_SettingsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Settings`
    );
  })
);
const de_sidebar_settings = (
  /** @type {(inputs: Sidebar_SettingsInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Einstellungen`
    );
  })
);
const sidebar_settings = (
  /** @type {((inputs?: Sidebar_SettingsInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_SettingsInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_settings();
    return de_sidebar_settings();
  })
);
const en_sidebar_developer = (
  /** @type {(inputs: Sidebar_DeveloperInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Developer`
    );
  })
);
const de_sidebar_developer = (
  /** @type {(inputs: Sidebar_DeveloperInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Entwickler`
    );
  })
);
const sidebar_developer = (
  /** @type {((inputs?: Sidebar_DeveloperInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_DeveloperInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_developer();
    return de_sidebar_developer();
  })
);
const en_sidebar_help = (
  /** @type {(inputs: Sidebar_HelpInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Help & Support`
    );
  })
);
const de_sidebar_help = (
  /** @type {(inputs: Sidebar_HelpInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Hilfe & Support`
    );
  })
);
const sidebar_help = (
  /** @type {((inputs?: Sidebar_HelpInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_HelpInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_help();
    return de_sidebar_help();
  })
);
const en_sidebar_logout = (
  /** @type {(inputs: Sidebar_LogoutInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Log out`
    );
  })
);
const de_sidebar_logout = (
  /** @type {(inputs: Sidebar_LogoutInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Abmelden`
    );
  })
);
const sidebar_logout = (
  /** @type {((inputs?: Sidebar_LogoutInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Sidebar_LogoutInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_sidebar_logout();
    return de_sidebar_logout();
  })
);
function Sheet({ ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Root, { "data-slot": "sheet", ...props });
}
function SheetTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Trigger, { "data-slot": "sheet-trigger", ...props });
}
function SheetPortal({
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Portal, { "data-slot": "sheet-portal", ...props });
}
function SheetOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Overlay,
    {
      "data-slot": "sheet-overlay",
      className: cn(
        "fixed inset-0 z-50 bg-black/50 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:animate-in data-[state=open]:fade-in-0",
        className
      ),
      ...props
    }
  );
}
function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPortal, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetOverlay, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Content,
      {
        "data-slot": "sheet-content",
        className: cn(
          "fixed z-50 flex flex-col gap-4 bg-background shadow-lg transition ease-in-out data-[state=closed]:animate-out data-[state=closed]:duration-300 data-[state=open]:animate-in data-[state=open]:duration-500",
          side === "right" && "inset-y-0 right-0 h-full w-3/4 border-l data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right sm:max-w-sm",
          side === "left" && "inset-y-0 left-0 h-full w-3/4 border-r data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left sm:max-w-sm",
          side === "top" && "inset-x-0 top-0 h-auto border-b data-[state=closed]:slide-out-to-top data-[state=open]:slide-in-from-top",
          side === "bottom" && "inset-x-0 bottom-0 h-auto border-t data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxRuntimeExports.jsxs(Close, { className: "absolute top-4 right-4 rounded-xs opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none data-[state=open]:bg-secondary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Close" })
          ] })
        ]
      }
    )
  ] });
}
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root$1,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function getMainNav() {
  return [
    { label: sidebar_dashboard(), icon: House, path: "/dashboard" },
    { label: sidebar_documents(), icon: FileText, path: "/dashboard/documents" },
    { label: sidebar_qr(), icon: QrCode, path: "/dashboard/qr-code" },
    { label: sidebar_reminders(), icon: Bell, path: "/dashboard/reminders" },
    { label: sidebar_health(), icon: Activity, path: "/dashboard/health" },
    { label: sidebar_appointments(), icon: Calendar, path: "/dashboard/appointments" },
    { label: sidebar_camps(), icon: Heart, path: "/camps" },
    { label: sidebar_geo(), icon: MapPin, path: "/geo-assistance" }
  ];
}
function getAccountNav() {
  return [
    { label: sidebar_profile(), icon: User, path: "/dashboard/profile" },
    { label: sidebar_settings(), icon: Settings, path: "/dashboard/settings" },
    { label: sidebar_developer(), icon: Key, path: "/dashboard/developer" },
    { label: sidebar_help(), icon: CircleQuestionMark, path: "/help" }
  ];
}
function NavItems({ onNavigate }) {
  const location = useLocation();
  const pathname = location.pathname;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 px-3", children: [
    getMainNav().map(({ label, icon: Icon, path }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: path,
        onClick: onNavigate,
        className: cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          pathname === path && "bg-accent text-accent-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          label
        ]
      },
      path
    )),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "my-2" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: "Account" }),
    getAccountNav().map(({ label, icon: Icon, path }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Link,
      {
        to: path,
        onClick: onNavigate,
        className: cn(
          "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
          pathname === path && "bg-accent text-accent-foreground"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
          label
        ]
      },
      path
    ))
  ] });
}
function DashboardSidebar() {
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const [isMobile, setIsMobile] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  const handleLogout = async () => {
    await authClient.signOut();
    window.location.href = "/";
  };
  const sidebarContent = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-14 items-center border-b px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 font-bold text-lg", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5 text-primary" }),
      "MediSync"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 overflow-y-auto py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavItems, { onNavigate: () => setMobileOpen(false) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        variant: "ghost",
        className: "w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10",
        onClick: handleLogout,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
          sidebar_logout()
        ]
      }
    ) })
  ] });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    isMobile && /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { open: mobileOpen, onOpenChange: setMobileOpen, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          variant: "ghost",
          size: "icon",
          className: "fixed top-3 left-3 z-50 lg:hidden",
          children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-5 w-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "h-5 w-5" })
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetContent, { side: "left", className: "w-64 p-0", children: sidebarContent })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: "hidden lg:block w-64 border-r sticky top-0 h-screen shrink-0", children: sidebarContent })
  ] });
}
function DashboardLayout() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSidebar, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto py-6 px-4 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) })
  ] });
}
export {
  DashboardLayout as component
};
