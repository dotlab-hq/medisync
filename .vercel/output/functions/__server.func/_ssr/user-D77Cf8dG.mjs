import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { d as db, u as user, a as addressDetails, b as aadhaarDetails, m as medicalInformation, e as emergencyContact } from "./index-Dc8WRQC8.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { e as eq } from "../_libs/drizzle-orm.mjs";
import { o as object, s as string, _ as _enum, b as boolean } from "../_libs/zod.mjs";
import "../_libs/resend.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/svix.mjs";
import "../_libs/uuid.mjs";
import "node:crypto";
import "../_libs/standardwebhooks.mjs";
import "../_libs/stablelib__base64.mjs";
import "../_libs/fast-sha256.mjs";
import "node:async_hooks";
import "../_libs/react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
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
const getUserProfile_createServerFn_handler = createServerRpc({
  id: "e2dd391d9906aa88e79da78f80cb0276198fcbe2ceee99a6a50920bfc2f8779b",
  name: "getUserProfile",
  filename: "src/server/user.ts"
}, (opts) => getUserProfile.__executeServer(opts));
const getUserProfile = createServerFn({
  method: "GET"
}).handler(getUserProfile_createServerFn_handler, async () => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const result = await db.query.user.findFirst({
    where: eq(user.id, userId),
    with: {
      addressDetails: true,
      aadhaarDetails: true,
      medicalInformation: true,
      emergencyContacts: true,
      qrCode: true
    }
  });
  if (!result) throw new Error("User not found");
  return result;
});
const updateUserSchema = object({
  name: string().min(1).optional(),
  phone: string().optional(),
  gender: _enum(["MALE", "FEMALE", "OTHER"]).optional(),
  dateOfBirth: string().optional(),
  bloodGroup: _enum(["A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"]).optional(),
  image: string().optional()
});
const updateUser_createServerFn_handler = createServerRpc({
  id: "d1805bf453b5476ee093249fa1f666a861439bc042b7db54ca3b0cb1ceaddd87",
  name: "updateUser",
  filename: "src/server/user.ts"
}, (opts) => updateUser.__executeServer(opts));
const updateUser = createServerFn({
  method: "POST"
}).inputValidator((data) => updateUserSchema.parse(data)).handler(updateUser_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const updateData = {};
  if (data.name !== void 0) updateData.name = data.name;
  if (data.phone !== void 0) updateData.phone = data.phone;
  if (data.gender !== void 0) updateData.gender = data.gender;
  if (data.dateOfBirth !== void 0) updateData.dateOfBirth = new Date(data.dateOfBirth);
  if (data.bloodGroup !== void 0) updateData.bloodGroup = data.bloodGroup;
  if (data.image !== void 0) updateData.image = data.image;
  const [updated] = await db.update(user).set(updateData).where(eq(user.id, userId)).returning();
  return updated;
});
const addressSchema = object({
  address: string().min(1),
  city: string().min(1),
  state: string().min(1),
  pinCode: string().min(1)
});
const upsertAddress_createServerFn_handler = createServerRpc({
  id: "ea730303a63d270b1c17291aab644dded0fea4ca8a501c6a03ed1e698e849e6d",
  name: "upsertAddress",
  filename: "src/server/user.ts"
}, (opts) => upsertAddress.__executeServer(opts));
const upsertAddress = createServerFn({
  method: "POST"
}).inputValidator((data) => addressSchema.parse(data)).handler(upsertAddress_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const existing = await db.query.addressDetails.findFirst({
    where: eq(addressDetails.userId, userId)
  });
  if (existing) {
    const [updated] = await db.update(addressDetails).set(data).where(eq(addressDetails.userId, userId)).returning();
    return updated;
  }
  const [created] = await db.insert(addressDetails).values({
    ...data,
    userId
  }).returning();
  return created;
});
const aadhaarSchema = object({
  aadhaarHash: string().min(1)
});
const upsertAadhaar_createServerFn_handler = createServerRpc({
  id: "1bc2be2d79ea5a5979b75cb64fd8fd0d7336fd2518ab2e9fb79190165918a9f8",
  name: "upsertAadhaar",
  filename: "src/server/user.ts"
}, (opts) => upsertAadhaar.__executeServer(opts));
const upsertAadhaar = createServerFn({
  method: "POST"
}).inputValidator((data) => aadhaarSchema.parse(data)).handler(upsertAadhaar_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const existing = await db.query.aadhaarDetails.findFirst({
    where: eq(aadhaarDetails.userId, userId)
  });
  if (existing) {
    const [updated] = await db.update(aadhaarDetails).set(data).where(eq(aadhaarDetails.userId, userId)).returning();
    return updated;
  }
  const [created] = await db.insert(aadhaarDetails).values({
    ...data,
    userId
  }).returning();
  return created;
});
const medInfoSchema = object({
  allergies: string().optional(),
  chronicConditions: string().optional(),
  currentMedications: string().optional()
});
const upsertMedicalInfo_createServerFn_handler = createServerRpc({
  id: "c37309b280887fe8ebf71f118182d3699340874b90e594e056603ace2862ac6e",
  name: "upsertMedicalInfo",
  filename: "src/server/user.ts"
}, (opts) => upsertMedicalInfo.__executeServer(opts));
const upsertMedicalInfo = createServerFn({
  method: "POST"
}).inputValidator((data) => medInfoSchema.parse(data)).handler(upsertMedicalInfo_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const existing = await db.query.medicalInformation.findFirst({
    where: eq(medicalInformation.userId, userId)
  });
  if (existing) {
    const [updated] = await db.update(medicalInformation).set(data).where(eq(medicalInformation.userId, userId)).returning();
    return updated;
  }
  const [created] = await db.insert(medicalInformation).values({
    ...data,
    userId
  }).returning();
  return created;
});
const emergencyContactSchema = object({
  name: string().min(1),
  relationship: string().optional(),
  phone: string().min(1),
  email: string().email().optional(),
  isNotificationEnabled: boolean().optional()
});
const addEmergencyContact_createServerFn_handler = createServerRpc({
  id: "d62070a89379813520d25f8dbfc0884fdde7f285cc1b1f1d4e31d91afcb3bd35",
  name: "addEmergencyContact",
  filename: "src/server/user.ts"
}, (opts) => addEmergencyContact.__executeServer(opts));
const addEmergencyContact = createServerFn({
  method: "POST"
}).inputValidator((data) => emergencyContactSchema.parse(data)).handler(addEmergencyContact_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const [created] = await db.insert(emergencyContact).values({
    ...data,
    userId
  }).returning();
  return created;
});
const deleteEmergencyContact_createServerFn_handler = createServerRpc({
  id: "c77c1a71ce39e477c6e88011b29920511223889ec7332a9bf54c51c77ea2ce63",
  name: "deleteEmergencyContact",
  filename: "src/server/user.ts"
}, (opts) => deleteEmergencyContact.__executeServer(opts));
const deleteEmergencyContact = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(deleteEmergencyContact_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  await db.delete(emergencyContact).where(eq(emergencyContact.id, data.id));
  return {
    success: true
  };
});
export {
  addEmergencyContact_createServerFn_handler,
  deleteEmergencyContact_createServerFn_handler,
  getUserProfile_createServerFn_handler,
  updateUser_createServerFn_handler,
  upsertAadhaar_createServerFn_handler,
  upsertAddress_createServerFn_handler,
  upsertMedicalInfo_createServerFn_handler
};
