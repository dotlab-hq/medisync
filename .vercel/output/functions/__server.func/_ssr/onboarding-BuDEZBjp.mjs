import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { d as db, u as user, a as addressDetails, m as medicalInformation, e as emergencyContact } from "./index-Dc8WRQC8.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { o as object, s as string, _ as _enum } from "../_libs/zod.mjs";
import { e as eq } from "../_libs/drizzle-orm.mjs";
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
const submitOnboarding_createServerFn_handler = createServerRpc({
  id: "5c6c452e0c65c1103c8a33d7b1faafa436be92977fc19a789d01e4ec5cbb69ad",
  name: "submitOnboarding",
  filename: "src/server/onboarding.ts"
}, (opts) => submitOnboarding.__executeServer(opts));
const submitOnboarding = createServerFn({
  method: "POST"
}).inputValidator((data) => onboardingSchema.parse(data)).handler(submitOnboarding_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  await db.update(user).set({
    name: data.name,
    phone: data.phone,
    gender: data.gender,
    dateOfBirth: new Date(data.dateOfBirth),
    bloodGroup: data.bloodGroup,
    onboardingCompleted: true
  }).where(eq(user.id, userId));
  const existingAddr = await db.query.addressDetails.findFirst({
    where: eq(addressDetails.userId, userId)
  });
  if (existingAddr) {
    await db.update(addressDetails).set({
      address: data.address,
      city: data.city,
      state: data.state,
      pinCode: data.pinCode
    }).where(eq(addressDetails.userId, userId));
  } else {
    await db.insert(addressDetails).values({
      userId,
      address: data.address,
      city: data.city,
      state: data.state,
      pinCode: data.pinCode
    });
  }
  const existingMed = await db.query.medicalInformation.findFirst({
    where: eq(medicalInformation.userId, userId)
  });
  if (existingMed) {
    await db.update(medicalInformation).set({
      allergies: data.allergies ?? "",
      chronicConditions: data.chronicConditions ?? "",
      currentMedications: data.currentMedications ?? ""
    }).where(eq(medicalInformation.userId, userId));
  } else {
    await db.insert(medicalInformation).values({
      userId,
      allergies: data.allergies ?? "",
      chronicConditions: data.chronicConditions ?? "",
      currentMedications: data.currentMedications ?? ""
    });
  }
  await db.insert(emergencyContact).values({
    userId,
    name: data.emergencyContactName,
    phone: data.emergencyContactPhone,
    relationship: data.emergencyContactRelationship,
    email: data.emergencyContactEmail
  });
  return {
    success: true
  };
});
export {
  submitOnboarding_createServerFn_handler
};
