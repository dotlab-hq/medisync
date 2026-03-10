import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { c as createSsrRpc } from "./router-CHZxjIga.mjs";
import { e as createServerFn } from "./index.mjs";
import { P as Progress } from "./progress-Bx83hked.mjs";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardContent } from "./card-BPoG-cgC.mjs";
import { A as Alert, a as AlertDescription } from "./alert-BJNLCpqC.mjs";
import { u as useForm, F as FormProvider, C as Controller, b as useFormContext, c as useFormState } from "../_libs/react-hook-form.mjs";
import { a } from "../_libs/hookform__resolvers.mjs";
import { B as Button } from "./button-BjPlzk1J.mjs";
import { I as Input } from "./input-BMB51kx9.mjs";
import { c as cn } from "./utils-H80jjgLf.mjs";
import { L as Label } from "./label-DIGbqCUN.mjs";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-DdVZeUE9.mjs";
import { G as GENDER_LABELS, B as BLOOD_GROUP_LABELS } from "./index-Ci4fYs76.mjs";
import { B as Badge } from "./badge-CT5ZN08I.mjs";
import { P as Phone, a as CircleCheckBig, L as LoaderCircle, R as RefreshCw } from "../_libs/lucide-react.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { o as object, s as string, _ as _enum, e as email } from "../_libs/zod.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
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
import "../_libs/radix-ui__react-progress.mjs";
import "../_libs/class-variance-authority.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/radix-ui__react-label.mjs";
import "../_libs/radix-ui__react-select.mjs";
import "../_libs/radix-ui__number.mjs";
import "../_libs/radix-ui__react-collection.mjs";
import "../_libs/radix-ui__react-direction.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/radix-ui__react-use-previous.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
const onboardingSchema = object({
  // Step 1 – Personal Info
  name: string().min(1),
  phone: string().min(10),
  gender: _enum(["MALE", "FEMALE", "OTHER"]),
  dateOfBirth: string().min(1),
  // Step 2 – Address
  address: string().min(1),
  city: string().min(1),
  state: string().min(1),
  pinCode: string().min(1),
  // Step 3 – Medical
  bloodGroup: _enum(["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"]),
  allergies: string().optional(),
  chronicConditions: string().optional(),
  currentMedications: string().optional(),
  // Step 4 – Emergency Contact
  emergencyContactName: string().min(1),
  emergencyContactPhone: string().min(10),
  emergencyContactRelationship: string().optional(),
  emergencyContactEmail: string().email().optional()
});
const submitOnboarding = createServerFn({
  method: "POST"
}).inputValidator((data) => onboardingSchema.parse(data)).handler(createSsrRpc("5c6c452e0c65c1103c8a33d7b1faafa436be92977fc19a789d01e4ec5cbb69ad"));
const Form = FormProvider;
const FormFieldContext = reactExports.createContext(
  {}
);
const FormField = ({
  ...props
}) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormFieldContext.Provider, { value: { name: props.name }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Controller, { ...props }) });
};
const useFormField = () => {
  const fieldContext = reactExports.useContext(FormFieldContext);
  const itemContext = reactExports.useContext(FormItemContext);
  const { getFieldState } = useFormContext();
  const formState = useFormState({ name: fieldContext.name });
  const fieldState = getFieldState(fieldContext.name, formState);
  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>");
  }
  const { id } = itemContext;
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
};
const FormItemContext = reactExports.createContext(
  {}
);
function FormItem({ className, ...props }) {
  const id = reactExports.useId();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(FormItemContext.Provider, { value: { id }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "form-item",
      className: cn("grid gap-2", className),
      ...props
    }
  ) });
}
function FormLabel({
  className,
  ...props
}) {
  const { error, formItemId } = useFormField();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Label,
    {
      "data-slot": "form-label",
      "data-error": !!error,
      className: cn("data-[error=true]:text-destructive", className),
      htmlFor: formItemId,
      ...props
    }
  );
}
function FormControl({ ...props }) {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Slot,
    {
      "data-slot": "form-control",
      id: formItemId,
      "aria-describedby": !error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`,
      "aria-invalid": !!error,
      ...props
    }
  );
}
function FormDescription({ className, ...props }) {
  const { formDescriptionId } = useFormField();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      "data-slot": "form-description",
      id: formDescriptionId,
      className: cn("text-sm text-muted-foreground", className),
      ...props
    }
  );
}
function FormMessage({ className, ...props }) {
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message ?? "") : props.children;
  if (!body) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "p",
    {
      "data-slot": "form-message",
      id: formMessageId,
      className: cn("text-sm text-destructive", className),
      ...props,
      children: body
    }
  );
}
const schema$3 = object({
  name: string().min(1, "Name is required"),
  phone: string().min(10, "Enter a valid phone number").regex(/^\+?[\d\s\-()]{10,15}$/, "Invalid phone format"),
  gender: _enum(["MALE", "FEMALE", "OTHER"], { error: "Select a gender" }),
  dateOfBirth: string().min(1, "Date of birth is required")
});
function StepPersonal({ defaultValues, onNext, onBack }) {
  const form = useForm({
    resolver: a(schema$3),
    defaultValues: { name: "", phone: "", gender: void 0, dateOfBirth: "", ...defaultValues }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onNext), className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "name",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Full Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "John Doe", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "phone",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Phone Number" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "tel", placeholder: "+91 XXXXXXXXXX", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "gender",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Gender" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select gender" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(GENDER_LABELS).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: key, children: label }, key)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "dateOfBirth",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Date of Birth" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "date", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onBack, disabled: !onBack, children: "Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Continue" })
    ] })
  ] }) });
}
const sendOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  phone: string().min(10)
}).parse(data)).handler(createSsrRpc("8167ab2af8762107db6e79555e4cec8e7ac336a7a1f91afdf6483d64417202c5"));
const verifyPhoneOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  phone: string().min(10),
  code: string().length(6)
}).parse(data)).handler(createSsrRpc("8ede051d9a9d64ba95475cf28fed726573526025e9f31245deafa6b23b482833"));
function StepPhoneOtp({ phone, onVerified, onBack }) {
  const [state, setState] = reactExports.useState("idle");
  const [otp, setOtp] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState("");
  async function handleSend() {
    setError("");
    setSuccess("");
    setState("sending");
    try {
      const res = await sendOtp({ data: { phone } });
      if (res.success) {
        setState("waiting");
        setSuccess(`OTP sent to ${phone}`);
      } else {
        setError("Failed to send OTP. Please try again.");
        setState("idle");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to send OTP");
      setState("idle");
    }
  }
  async function handleVerify() {
    if (otp.length !== 6) {
      setError("Enter the 6-digit OTP");
      return;
    }
    setError("");
    setState("verifying");
    try {
      const res = await verifyPhoneOtp({ data: { phone, code: otp } });
      if (res.valid) {
        setState("done");
        setSuccess(res.message);
      } else {
        setError(res.message);
        setState("waiting");
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Verification failed");
      setState("waiting");
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-lg border bg-muted/50 px-4 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Phone, { className: "h-5 w-5 text-primary shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Verifying phone number" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold", children: phone })
      ] }),
      state === "done" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "secondary", className: "ml-auto gap-1 text-green-600", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-3 w-3" }),
        " Verified"
      ] })
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error }) }),
    success && state !== "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { className: "text-green-700", children: success }) }),
    state === "idle" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "We'll send a 6-digit code to verify your number." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: handleSend, className: "w-full", children: "Send OTP" })
    ] }),
    state === "sending" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-2 py-4 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Sending OTP…"
    ] }),
    (state === "waiting" || state === "verifying") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "otp-input", children: "Enter 6-digit OTP" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input,
        {
          id: "otp-input",
          type: "text",
          inputMode: "numeric",
          maxLength: 6,
          placeholder: "______",
          value: otp,
          onChange: (e) => setOtp(e.target.value.replace(/\D/g, "")),
          className: "text-center text-2xl tracking-[0.5em] font-mono",
          disabled: state === "verifying"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            variant: "outline",
            size: "sm",
            onClick: handleSend,
            disabled: state === "verifying",
            className: "gap-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "h-3 w-3" }),
              "Resend"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            className: "flex-1",
            onClick: handleVerify,
            disabled: state === "verifying" || otp.length !== 6,
            children: state === "verifying" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin mr-2" }),
              "Verifying…"
            ] }) : "Verify OTP"
          }
        )
      ] })
    ] }),
    state === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { className: "flex items-center gap-2 text-green-700", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "h-4 w-4" }),
      success || "Phone number verified successfully."
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onBack, children: "Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onVerified, disabled: state !== "done", children: "Continue" })
    ] })
  ] });
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "flex field-sizing-content min-h-16 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 md:text-sm dark:bg-input/30 dark:aria-invalid:ring-destructive/40",
        className
      ),
      ...props
    }
  );
}
const schema$2 = object({
  address: string().min(5, "Enter a valid address"),
  city: string().min(1, "City is required"),
  state: string().min(1, "State is required"),
  pinCode: string().regex(/^\d{5,6}$/, "Enter a valid PIN code")
});
function StepAddress({ defaultValues, onNext, onBack }) {
  const form = useForm({
    resolver: a(schema$2),
    defaultValues: { address: "", city: "", state: "", pinCode: "", ...defaultValues }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onNext), className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "address",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Street Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { rows: 2, placeholder: "123, Main Street, Sector 5…", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "city",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "City" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Mumbai", ...field }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        FormField,
        {
          control: form.control,
          name: "state",
          render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "State" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "Maharashtra", ...field }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
          ] })
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "pinCode",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "PIN Code" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "400001", maxLength: 6, ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onBack, children: "Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Continue" })
    ] })
  ] }) });
}
const schema$1 = object({
  bloodGroup: _enum(
    ["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"],
    { error: "Select a blood group" }
  ),
  allergies: string(),
  chronicConditions: string(),
  currentMedications: string()
});
function StepMedical({ defaultValues, onNext, onBack }) {
  const form = useForm({
    resolver: a(schema$1),
    defaultValues: {
      bloodGroup: void 0,
      allergies: "",
      chronicConditions: "",
      currentMedications: "",
      ...defaultValues
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onNext), className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "bloodGroup",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Blood Group" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { onValueChange: field.onChange, defaultValue: field.value, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "Select blood group" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectContent, { children: Object.entries(BLOOD_GROUP_LABELS).map(([key, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: key, children: label }, key)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "allergies",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Allergies" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Leave blank if none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              rows: 2,
              placeholder: "e.g. Peanuts, Penicillin, Dust",
              ...field
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "chronicConditions",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Chronic Conditions" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Leave blank if none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              rows: 2,
              placeholder: "e.g. Diabetes, Hypertension, Asthma",
              ...field
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "currentMedications",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Current Medications" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Leave blank if none" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Textarea,
            {
              rows: 2,
              placeholder: "e.g. Metformin 500mg twice daily",
              ...field
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onBack, children: "Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "Continue" })
    ] })
  ] }) });
}
const schema = object({
  emergencyContactName: string().min(1, "Contact name is required"),
  emergencyContactPhone: string().min(10, "Enter a valid phone number").regex(/^\+?[\d\s\-()]{10,15}$/, "Invalid phone format"),
  emergencyContactRelationship: string(),
  emergencyContactEmail: string().refine((v) => !v || email().safeParse(v).success, "Invalid email")
});
function StepEmergency({ defaultValues, onNext, onBack, loading }) {
  const form = useForm({
    resolver: a(schema),
    defaultValues: {
      emergencyContactName: "",
      emergencyContactPhone: "",
      emergencyContactRelationship: "",
      emergencyContactEmail: "",
      ...defaultValues
    }
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form, { ...form, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: form.handleSubmit(onNext), className: "space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "emergencyContactName",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Contact Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "e.g. Jane Doe", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "emergencyContactPhone",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Contact Phone" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "tel", placeholder: "+91 XXXXXXXXXX", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "emergencyContactRelationship",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Relationship" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Optional" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "e.g. Spouse, Parent, Sibling", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      FormField,
      {
        control: form.control,
        name: "emergencyContactEmail",
        render: ({ field }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(FormItem, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormLabel, { children: "Contact Email" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormDescription, { children: "Optional" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { type: "email", placeholder: "jane@example.com", ...field }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FormMessage, {})
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between pt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "button", variant: "outline", onClick: onBack, children: "Back" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", disabled: loading, children: loading ? "Saving…" : "Complete Setup" })
    ] })
  ] }) });
}
const STEPS = ["Personal Info", "Verify Phone", "Address", "Medical Info", "Emergency Contact"];
function OnboardingPage() {
  const navigate = useNavigate();
  const [step, setStep] = reactExports.useState(0);
  const [error, setError] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [data, setData] = reactExports.useState({});
  const totalSteps = STEPS.length;
  const progress = (step + 1) / totalSteps * 100;
  const next = () => setStep((s) => Math.min(s + 1, totalSteps - 1));
  const back = () => {
    setError("");
    setStep((s) => Math.max(s - 1, 0));
  };
  function handlePersonalNext(personal) {
    setData((d) => ({
      ...d,
      personal
    }));
    next();
  }
  function handleAddressNext(address) {
    setData((d) => ({
      ...d,
      address
    }));
    next();
  }
  function handleMedicalNext(medical) {
    setData((d) => ({
      ...d,
      medical
    }));
    next();
  }
  async function handleEmergencyNext(emergency) {
    if (!data.personal || !data.address || !data.medical) {
      setError("Missing required data. Please go back and fill all steps.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await submitOnboarding({
        data: {
          ...data.personal,
          ...data.address,
          ...data.medical,
          ...emergency
        }
      });
      navigate({
        to: "/dashboard"
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save profile");
    } finally {
      setLoading(false);
    }
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "Complete your profile" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardDescription, { children: [
        "Step ",
        step + 1,
        " of ",
        totalSteps,
        " — ",
        STEPS[step]
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progress, className: "mt-2" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
      error && /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "destructive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: error }) }),
      step === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(StepPersonal, { defaultValues: data.personal ?? {}, onNext: handlePersonalNext }),
      step === 1 && data.personal && /* @__PURE__ */ jsxRuntimeExports.jsx(StepPhoneOtp, { phone: data.personal.phone, onVerified: next, onBack: back }),
      step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsx(StepAddress, { defaultValues: data.address ?? {}, onNext: handleAddressNext, onBack: back }),
      step === 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(StepMedical, { defaultValues: data.medical ?? {}, onNext: handleMedicalNext, onBack: back }),
      step === 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(StepEmergency, { defaultValues: {}, onNext: handleEmergencyNext, onBack: back, loading })
    ] })
  ] }) });
}
export {
  OnboardingPage as component
};
