import { c as createSsrRpc } from "./router-CHZxjIga.mjs";
import { e as createServerFn } from "./index.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
const getOrCreateQrCode = createServerFn({
  method: "GET"
}).handler(createSsrRpc("49d250873620461f0994e41222ed37cbb5e8851b8382701a202f213522e049e0"));
const regenerateQrCode = createServerFn({
  method: "POST"
}).handler(createSsrRpc("9218c0087258df5ec15d65eb5bf79930d6b0beb8c60edd3df581bc9f493a976f"));
const emergencyProfileSchema = object({
  userId: string().min(1)
});
const getEmergencyProfile = createServerFn({
  method: "GET"
}).inputValidator((data) => emergencyProfileSchema.parse(data)).handler(createSsrRpc("5d3fdf9965a23b6f39d2dc0be6165eb83dd783fcc9100f9ae7e7f88bc9c0224f"));
export {
  getOrCreateQrCode as a,
  getEmergencyProfile as g,
  regenerateQrCode as r
};
