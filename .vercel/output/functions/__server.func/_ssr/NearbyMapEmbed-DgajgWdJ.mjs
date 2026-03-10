import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { B as Button } from "./button-BjPlzk1J.mjs";
import { A as Alert, a as AlertDescription } from "./alert-BJNLCpqC.mjs";
import { L as LoaderCircle, p as CircleAlert, h as MapPin } from "../_libs/lucide-react.mjs";
function buildEmbedUrl(query, lat, lng) {
  if (lat !== void 0 && lng !== void 0) {
    return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&ll=${lat},${lng}&z=13&output=embed&t=m`;
  }
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&output=embed&t=m`;
}
function NearbyMapEmbed({ query, title, heightClass = "h-[400px]" }) {
  const [location, setLocation] = reactExports.useState({ status: "idle" });
  function requestLocation() {
    setLocation({ status: "loading" });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          status: "ready",
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        setLocation({
          status: "denied",
          error: err.message || "Location access denied"
        });
      },
      { timeout: 1e4, enableHighAccuracy: true }
    );
  }
  reactExports.useEffect(() => {
    if ("geolocation" in navigator) {
      requestLocation();
    } else {
      setLocation({ status: "denied", error: "Geolocation not supported by your browser." });
    }
  }, []);
  const iframeSrc = location.status === "ready" ? buildEmbedUrl(query, location.lat, location.lng) : buildEmbedUrl(query);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    location.status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-4 w-4 animate-spin" }),
      "Detecting your location for accurate results…"
    ] }),
    location.status === "denied" && /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", className: "mb-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDescription, { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          location.error,
          " — showing generic results."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", onClick: requestLocation, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-3 w-3 mr-1" }),
          "Retry"
        ] })
      ] })
    ] }),
    location.status === "ready" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-green-600 dark:text-green-400", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "h-4 w-4" }),
      "Showing results near your current location"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl overflow-hidden border shadow-sm ${heightClass}`, children: [
      location.status !== "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "iframe",
        {
          title,
          src: iframeSrc,
          width: "100%",
          height: "100%",
          loading: "lazy",
          allowFullScreen: true,
          referrerPolicy: "no-referrer-when-downgrade",
          className: "w-full h-full border-0"
        }
      ),
      location.status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-full flex items-center justify-center bg-muted", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-muted-foreground" }) })
    ] })
  ] });
}
export {
  NearbyMapEmbed as N
};
