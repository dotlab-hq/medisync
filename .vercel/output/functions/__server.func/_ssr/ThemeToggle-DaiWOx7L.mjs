import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { g as getLocale, l as locales, s as setLocale } from "./router-CHZxjIga.mjs";
const en_language_label = (
  /** @type {(inputs: Language_LabelInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Language`
    );
  })
);
const de_language_label = (
  /** @type {(inputs: Language_LabelInputs) => LocalizedString} */
  (() => {
    return (
      /** @type {LocalizedString} */
      `Sprache`
    );
  })
);
const language_label = (
  /** @type {((inputs?: Language_LabelInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Language_LabelInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs = {}, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_language_label();
    return de_language_label();
  })
);
const en_current_locale = (
  /** @type {(inputs: Current_LocaleInputs) => LocalizedString} */
  ((i) => {
    return (
      /** @type {LocalizedString} */
      `Current locale: ${i?.locale}`
    );
  })
);
const de_current_locale = (
  /** @type {(inputs: Current_LocaleInputs) => LocalizedString} */
  ((i) => {
    return (
      /** @type {LocalizedString} */
      `Aktuelle Sprache: ${i?.locale}`
    );
  })
);
const current_locale = (
  /** @type {((inputs: Current_LocaleInputs, options?: { locale?: "en" | "de" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Current_LocaleInputs, { locale?: "en" | "de" }, {}>} */
  ((inputs, options = {}) => {
    const locale = options.locale ?? getLocale();
    if (locale === "en") return en_current_locale(inputs);
    return de_current_locale(inputs);
  })
);
function ParaglideLocaleSwitcher() {
  const currentLocale = getLocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      style: {
        display: "flex",
        gap: "0.5rem",
        alignItems: "center",
        color: "inherit"
      },
      "aria-label": language_label(),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { opacity: 0.85 }, children: current_locale({ locale: currentLocale }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { display: "flex", gap: "0.25rem" }, children: locales.map((locale) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setLocale(locale),
            "aria-pressed": locale === currentLocale,
            style: {
              cursor: "pointer",
              padding: "0.35rem 0.75rem",
              borderRadius: "999px",
              border: "1px solid @d1d5db",
              background: locale === currentLocale ? "@0f172a" : "transparent",
              color: locale === currentLocale ? "@f8fafc" : "inherit",
              fontWeight: locale === currentLocale ? 700 : 500,
              letterSpacing: "0.01em"
            },
            children: locale.toUpperCase()
          },
          locale
        )) })
      ]
    }
  );
}
function getInitialMode() {
  if (typeof window === "undefined") {
    return "auto";
  }
  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark" || stored === "auto") {
    return stored;
  }
  return "auto";
}
function applyThemeMode(mode) {
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  const resolved = mode === "auto" ? prefersDark ? "dark" : "light" : mode;
  document.documentElement.classList.remove("light", "dark");
  document.documentElement.classList.add(resolved);
  if (mode === "auto") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }
  document.documentElement.style.colorScheme = resolved;
}
function ThemeToggle() {
  const [mode, setMode] = reactExports.useState("auto");
  reactExports.useEffect(() => {
    const initialMode = getInitialMode();
    setMode(initialMode);
    applyThemeMode(initialMode);
  }, []);
  reactExports.useEffect(() => {
    if (mode !== "auto") {
      return;
    }
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => applyThemeMode("auto");
    media.addEventListener("change", onChange);
    return () => {
      media.removeEventListener("change", onChange);
    };
  }, [mode]);
  function toggleMode() {
    const nextMode = mode === "light" ? "dark" : mode === "dark" ? "auto" : "light";
    setMode(nextMode);
    applyThemeMode(nextMode);
    window.localStorage.setItem("theme", nextMode);
  }
  const label = mode === "auto" ? "Theme mode: auto (system). Click to switch to light mode." : `Theme mode: ${mode}. Click to switch mode.`;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "button",
    {
      type: "button",
      onClick: toggleMode,
      "aria-label": label,
      title: label,
      className: "rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-sm font-semibold text-[var(--sea-ink)] shadow-[0_8px_22px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5",
      children: mode === "auto" ? "Auto" : mode === "dark" ? "Dark" : "Light"
    }
  );
}
export {
  ParaglideLocaleSwitcher as P,
  ThemeToggle as T
};
