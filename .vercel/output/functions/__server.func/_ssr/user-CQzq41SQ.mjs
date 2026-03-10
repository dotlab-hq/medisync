import { c as createSsrRpc } from "./router-CHZxjIga.mjs";
import { e as createServerFn } from "./index.mjs";
import { o as object, s as string, _ as _enum, b as boolean } from "../_libs/zod.mjs";
const getUserProfile = createServerFn({
  method: "GET"
}).handler(createSsrRpc("e2dd391d9906aa88e79da78f80cb0276198fcbe2ceee99a6a50920bfc2f8779b"));
const updateUserSchema = object({
  name: string().min(1).optional(),
  phone: string().optional(),
  gender: _enum(["MALE", "FEMALE", "OTHER"]).optional(),
  dateOfBirth: string().optional(),
  bloodGroup: _enum(["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"]).optional(),
  image: string().optional()
});
const updateUser = createServerFn({
  method: "POST"
}).inputValidator((data) => updateUserSchema.parse(data)).handler(createSsrRpc("d1805bf453b5476ee093249fa1f666a861439bc042b7db54ca3b0cb1ceaddd87"));
const addressSchema = object({
  address: string().min(1),
  city: string().min(1),
  state: string().min(1),
  pinCode: string().min(1)
});
const upsertAddress = createServerFn({
  method: "POST"
}).inputValidator((data) => addressSchema.parse(data)).handler(createSsrRpc("ea730303a63d270b1c17291aab644dded0fea4ca8a501c6a03ed1e698e849e6d"));
const aadhaarSchema = object({
  aadhaarHash: string().min(1)
});
createServerFn({
  method: "POST"
}).inputValidator((data) => aadhaarSchema.parse(data)).handler(createSsrRpc("1bc2be2d79ea5a5979b75cb64fd8fd0d7336fd2518ab2e9fb79190165918a9f8"));
const medInfoSchema = object({
  allergies: string().optional(),
  chronicConditions: string().optional(),
  currentMedications: string().optional()
});
createServerFn({
  method: "POST"
}).inputValidator((data) => medInfoSchema.parse(data)).handler(createSsrRpc("c37309b280887fe8ebf71f118182d3699340874b90e594e056603ace2862ac6e"));
const emergencyContactSchema = object({
  name: string().min(1),
  relationship: string().optional(),
  phone: string().min(1),
  email: string().email().optional(),
  isNotificationEnabled: boolean().optional()
});
createServerFn({
  method: "POST"
}).inputValidator((data) => emergencyContactSchema.parse(data)).handler(createSsrRpc("d62070a89379813520d25f8dbfc0884fdde7f285cc1b1f1d4e31d91afcb3bd35"));
createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(createSsrRpc("c77c1a71ce39e477c6e88011b29920511223889ec7332a9bf54c51c77ea2ce63"));
export {
  upsertAddress as a,
  getUserProfile as g,
  updateUser as u
};
