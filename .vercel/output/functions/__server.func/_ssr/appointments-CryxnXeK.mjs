import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { a as useQueryClient, u as useQuery, b as useMutation } from "../_libs/tanstack__react-query.mjs";
import { c as createSsrRpc } from "./router-CHZxjIga.mjs";
import { e as createServerFn } from "./index.mjs";
import { B as Button } from "./button-BjPlzk1J.mjs";
import { I as Input } from "./input-BMB51kx9.mjs";
import { L as Label } from "./label-DIGbqCUN.mjs";
import { C as Card, d as CardContent, a as CardHeader, b as CardTitle, c as CardDescription } from "./card-BPoG-cgC.mjs";
import { D as Dialog, a as DialogTrigger, b as DialogContent, c as DialogHeader, d as DialogTitle } from "./dialog-DglpjyKJ.mjs";
import { B as Badge } from "./badge-CT5ZN08I.mjs";
import { s as Plus, g as Calendar, C as CircleCheck, N as CircleX, t as Trash2 } from "../_libs/lucide-react.mjs";
import { o as object, s as string, _ as _enum } from "../_libs/zod.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/next-themes.mjs";
import "../_libs/sonner.mjs";
import "./server-Cw4QVuYO.mjs";
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
import "node:async_hooks";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "./utils-H80jjgLf.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
const listAppointments = createServerFn({
  method: "GET"
}).handler(createSsrRpc("f503b996f7276fb6a21d6030bfe9b4263eb319391c8adb1fc538bfc2e279a1dc"));
const createAppointmentSchema = object({
  doctorName: string().min(1),
  specialty: string().optional(),
  hospital: string().optional(),
  address: string().optional(),
  date: string().min(1),
  time: string().min(1),
  notes: string().optional(),
  contactNumber: string().optional()
});
const createAppointment = createServerFn({
  method: "POST"
}).inputValidator((data) => createAppointmentSchema.parse(data)).handler(createSsrRpc("d7c954be952b3b31d4236ab459074b1f25bbbd39ce43205aa4c2b0f36f531524"));
const updateAppointmentSchema = object({
  id: string(),
  doctorName: string().min(1).optional(),
  specialty: string().optional(),
  hospital: string().optional(),
  address: string().optional(),
  date: string().optional(),
  time: string().optional(),
  status: _enum(["upcoming", "completed", "cancelled"]).optional(),
  notes: string().optional(),
  contactNumber: string().optional()
});
const updateAppointment = createServerFn({
  method: "POST"
}).inputValidator((data) => updateAppointmentSchema.parse(data)).handler(createSsrRpc("453acd7ae1a95f5b1c3127f53cca38c638a032e226e25251b47b824ad0fdac36"));
const deleteAppointment = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(createSsrRpc("93625b80296327fa815814e9de2c28f49ebd0316888955272ceea4d45b68f544"));
function AppointmentsPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = reactExports.useState(false);
  const {
    data: appointments = [],
    isLoading
  } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => listAppointments()
  });
  const createMut = useMutation({
    mutationFn: createAppointment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["appointments"]
      });
      setOpen(false);
    }
  });
  const updateMut = useMutation({
    mutationFn: updateAppointment,
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["appointments"]
    })
  });
  const deleteMut = useMutation({
    mutationFn: deleteAppointment,
    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["appointments"]
    })
  });
  const handleCreate = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    createMut.mutate({
      data: {
        doctorName: fd.get("doctorName"),
        specialty: fd.get("specialty") || void 0,
        hospital: fd.get("hospital") || void 0,
        date: fd.get("date"),
        time: fd.get("time"),
        notes: fd.get("notes") || void 0,
        contactNumber: fd.get("contactNumber") || void 0
      }
    });
  };
  const statusBadge = (status) => {
    if (status === "completed") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { className: "bg-green-100 text-green-800", children: "Completed" });
    if (status === "cancelled") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "destructive", children: "Cancelled" });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "Upcoming" });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold", children: "Appointments" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "Manage your doctor appointments" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Dialog, { open, onOpenChange: setOpen, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "h-4 w-4 mr-2" }),
          " New Appointment"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(DialogHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(DialogTitle, { children: "New Appointment" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleCreate, className: "space-y-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "doctorName", children: "Doctor Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "doctorName", name: "doctorName", required: true })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "specialty", children: "Specialty" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "specialty", name: "specialty" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "hospital", children: "Hospital" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "hospital", name: "hospital" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "date", children: "Date" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "date", name: "date", type: "date", required: true })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "time", children: "Time" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "time", name: "time", type: "time", required: true })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "contactNumber", children: "Contact Number" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "contactNumber", name: "contactNumber" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "notes", children: "Notes" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { id: "notes", name: "notes" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", className: "w-full", disabled: createMut.isPending, children: createMut.isPending ? "Saving…" : "Create Appointment" })
          ] })
        ] })
      ] })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-center py-8", children: "Loading…" }) : appointments.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "flex flex-col items-center justify-center py-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-12 w-12 text-muted-foreground mb-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground", children: "No appointments yet" })
    ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: appointments.map((appt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-base", children: [
            "Dr. ",
            appt.doctorName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
            appt.specialty && `${appt.specialty} · `,
            appt.hospital ?? ""
          ] })
        ] }),
        statusBadge(appt.status)
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
          appt.date,
          " at ",
          appt.time
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
          appt.status === "upcoming" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", title: "Mark Completed", onClick: () => updateMut.mutate({
              data: {
                id: appt.id,
                status: "completed"
              }
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "h-4 w-4 text-green-600" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", title: "Cancel", onClick: () => updateMut.mutate({
              data: {
                id: appt.id,
                status: "cancelled"
              }
            }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "h-4 w-4 text-orange-500" }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "icon", onClick: () => deleteMut.mutate({
            data: {
              id: appt.id
            }
          }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "h-4 w-4 text-destructive" }) })
        ] })
      ] }) })
    ] }, appt.id)) })
  ] });
}
export {
  AppointmentsPage as component
};
