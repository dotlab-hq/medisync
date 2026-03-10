import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { u as useQuery } from "./_libs/tanstack__react-query.mjs";
import { g as getEmergencyProfile } from "./_ssr/qr-code-DzOz3Mhw.mjs";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, c as CardDescription } from "./_ssr/card-BPoG-cgC.mjs";
import { B as Badge } from "./_ssr/badge-CT5ZN08I.mjs";
import { B as BLOOD_GROUP_LABELS } from "./_ssr/index-Ci4fYs76.mjs";
import { R as Route$l } from "./_ssr/router-CHZxjIga.mjs";
import { L as LoaderCircle, T as TriangleAlert, H as Heart, U as User, D as Droplets, k as Pill, P as Phone, l as BellOff, m as Mail } from "./_libs/lucide-react.mjs";
import "./_libs/tanstack__query-core.mjs";
import "./_ssr/index.mjs";
import "node:async_hooks";
import "./_libs/tanstack__react-router.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "./_libs/isbot.mjs";
import "./_libs/tiny-warning.mjs";
import "./_libs/zod.mjs";
import "./_ssr/utils-H80jjgLf.mjs";
import "./_libs/clsx.mjs";
import "./_libs/tailwind-merge.mjs";
import "./_libs/class-variance-authority.mjs";
import "./_libs/radix-ui__react-slot.mjs";
import "./_libs/radix-ui__react-compose-refs.mjs";
import "./_libs/next-themes.mjs";
import "./_libs/sonner.mjs";
import "./_ssr/server-Cw4QVuYO.mjs";
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
function EmergencyProfilePage() {
  const {
    token
  } = Route$l.useParams();
  const {
    data: profile,
    isLoading,
    error
  } = useQuery({
    queryKey: ["emergencyProfile", token],
    queryFn: () => getEmergencyProfile({
      data: {
        userId: token
      }
    })
  });
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) });
  }
  if (error || !profile) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-md text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-12 w-12 text-destructive mx-auto mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg font-medium", children: "Profile not found" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2", children: "This emergency profile may have been removed or the link is invalid." })
    ] }) }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-red-50 dark:bg-red-950/10 py-8 px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-lg mx-auto space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "inline-flex items-center gap-2 rounded-full bg-red-100 dark:bg-red-900/30 px-4 py-2 text-red-700 dark:text-red-300", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Heart, { className: "h-5 w-5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-lg", children: "EMERGENCY MEDICAL INFO" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-red-200 dark:border-red-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-5 w-5" }),
        "Patient Information"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
        profile.image ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: profile.image, alt: profile.name, className: "h-20 w-20 rounded-full object-cover border-2 border-red-200" }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-20 w-20 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center border-2 border-red-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "h-10 w-10 text-red-400" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Gender" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium capitalize", children: profile.gender ? profile.gender.toLowerCase() : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Date of Birth" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.dateOfBirth ? new Date(profile.dateOfBirth).toLocaleDateString() : "—" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Blood Group" }),
            profile.bloodGroup ? /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "destructive", className: "text-base px-3 py-1 font-bold", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { className: "h-4 w-4 mr-1" }),
              BLOOD_GROUP_LABELS[profile.bloodGroup] ?? profile.bloodGroup
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-muted-foreground", children: "Unknown" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-red-200 dark:border-red-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pill, { className: "h-5 w-5" }),
        "Medical Information"
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: profile.medicalInformation ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Allergies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.medicalInformation.allergies || "None reported" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Chronic Conditions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.medicalInformation.chronicConditions || "None reported" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Current Medications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: profile.medicalInformation.currentMedications || "None reported" })
        ] })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No medical information on file." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "border-red-200 dark:border-red-800", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5" }),
          "Emergency Contacts"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "Call the contacts below in case of emergency" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { className: "space-y-3", children: profile.emergencyContacts && profile.emergencyContacts.length > 0 ? profile.emergencyContacts.map((ec) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border rounded-lg p-3 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: ec.name }),
            ec.relationship && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: ec.relationship }),
            !ec.isNotificationEnabled && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-muted-foreground mt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BellOff, { className: "h-3 w-3" }),
              "Notifications off"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `tel:${ec.phone}`, className: "inline-flex items-center gap-1 rounded-md bg-green-600 px-3 py-2 text-sm font-medium text-white hover:bg-green-700 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-4 w-4" }),
            ec.phone
          ] })
        ] }),
        ec.email && /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { href: `mailto:${ec.email}`, className: "inline-flex items-center gap-1 text-xs text-primary hover:underline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "h-3 w-3" }),
          ec.email
        ] })
      ] }, ec.id)) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No emergency contacts on file." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground pt-4", children: "Powered by MediSync — Emergency Medical Data on the Go" })
  ] }) });
}
export {
  EmergencyProfilePage as component
};
