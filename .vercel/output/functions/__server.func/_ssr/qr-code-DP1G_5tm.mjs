import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { d as db, q as qrCode, u as user } from "./index-Dc8WRQC8.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { e as eq } from "../_libs/drizzle-orm.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
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
const getOrCreateQrCode_createServerFn_handler = createServerRpc({
  id: "49d250873620461f0994e41222ed37cbb5e8851b8382701a202f213522e049e0",
  name: "getOrCreateQrCode",
  filename: "src/server/qr-code.ts"
}, (opts) => getOrCreateQrCode.__executeServer(opts));
const getOrCreateQrCode = createServerFn({
  method: "GET"
}).handler(getOrCreateQrCode_createServerFn_handler, async () => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const existing = await db.query.qrCode.findFirst({
    where: eq(qrCode.userId, userId)
  });
  if (existing) return existing;
  const qrData = `/emergency/${userId}`;
  const qrUrl = qrData;
  const [created] = await db.insert(qrCode).values({
    userId,
    qrCodeData: qrData,
    qrCodeUrl: qrUrl
  }).returning();
  return created;
});
const regenerateQrCode_createServerFn_handler = createServerRpc({
  id: "9218c0087258df5ec15d65eb5bf79930d6b0beb8c60edd3df581bc9f493a976f",
  name: "regenerateQrCode",
  filename: "src/server/qr-code.ts"
}, (opts) => regenerateQrCode.__executeServer(opts));
const regenerateQrCode = createServerFn({
  method: "POST"
}).handler(regenerateQrCode_createServerFn_handler, async () => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  await db.delete(qrCode).where(eq(qrCode.userId, userId));
  const qrData = `/emergency/${userId}`;
  const [created] = await db.insert(qrCode).values({
    userId,
    qrCodeData: qrData,
    qrCodeUrl: qrData
  }).returning();
  return created;
});
const emergencyProfileSchema = object({
  userId: string().min(1)
});
const getEmergencyProfile_createServerFn_handler = createServerRpc({
  id: "5d3fdf9965a23b6f39d2dc0be6165eb83dd783fcc9100f9ae7e7f88bc9c0224f",
  name: "getEmergencyProfile",
  filename: "src/server/qr-code.ts"
}, (opts) => getEmergencyProfile.__executeServer(opts));
const getEmergencyProfile = createServerFn({
  method: "GET"
}).inputValidator((data) => emergencyProfileSchema.parse(data)).handler(getEmergencyProfile_createServerFn_handler, async ({
  data
}) => {
  const profile = await db.query.user.findFirst({
    where: eq(user.id, data.userId),
    columns: {
      id: true,
      name: true,
      gender: true,
      dateOfBirth: true,
      bloodGroup: true,
      image: true
    },
    with: {
      medicalInformation: true,
      emergencyContacts: true
    }
  });
  if (!profile) throw new Error("Profile not found");
  return profile;
});
export {
  getEmergencyProfile_createServerFn_handler,
  getOrCreateQrCode_createServerFn_handler,
  regenerateQrCode_createServerFn_handler
};
