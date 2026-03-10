import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { randomBytes, createHash } from "crypto";
import { R as RelayX } from "../_libs/dotlab-hq__relayx-js.mjs";
import { d as db, o as otpVerification } from "./index-Dc8WRQC8.mjs";
import { e as createServerFn } from "./index.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import { e as eq, l as lt } from "../_libs/drizzle-orm.mjs";
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
const relayx = new RelayX();
async function sendSms(phone, message) {
  console.log(`Sending SMS to ${phone}: ${message}`);
  await relayx.sendSMS({
    phoneNumber: "+918700407283",
    message
  });
  console.log(`[SMS STUB] To: ${phone} | Message: ${message}`);
  return true;
}
const OTP_EXPIRY_MS = 5 * 60 * 1e3;
function generateCode() {
  return Math.floor(1e5 + Math.random() * 9e5).toString();
}
function hashOtp(salt, code) {
  return createHash("sha256").update(`${salt}:${code}`).digest("hex");
}
async function generateOtp(phone) {
  await db.delete(otpVerification).where(eq(otpVerification.phone, phone));
  const code = generateCode();
  const salt = randomBytes(16).toString("hex");
  const saltedHash = `${salt}:${hashOtp(salt, code)}`;
  const expiresAt = new Date(Date.now() + OTP_EXPIRY_MS);
  await db.insert(otpVerification).values({ phone, saltedHash, expiresAt });
  const sent = await sendSms(phone, `Your MediSync verification code is: ${code}`);
  return { success: sent };
}
async function verifyOtp(phone, code) {
  await db.delete(otpVerification).where(lt(otpVerification.expiresAt, /* @__PURE__ */ new Date()));
  const entry = await db.query.otpVerification.findFirst({
    where: eq(otpVerification.phone, phone)
  });
  if (!entry) {
    return { valid: false, message: "No OTP found. Please request a new one." };
  }
  if (/* @__PURE__ */ new Date() > entry.expiresAt) {
    await db.delete(otpVerification).where(eq(otpVerification.phone, phone));
    return { valid: false, message: "OTP has expired. Please request a new one." };
  }
  const [salt, storedHash] = entry.saltedHash.split(":");
  const candidate = hashOtp(salt, code);
  if (candidate !== storedHash) {
    return { valid: false, message: "Invalid OTP. Please try again." };
  }
  await db.delete(otpVerification).where(eq(otpVerification.phone, phone));
  return { valid: true, message: "Phone number verified successfully." };
}
const sendOtp_createServerFn_handler = createServerRpc({
  id: "8167ab2af8762107db6e79555e4cec8e7ac336a7a1f91afdf6483d64417202c5",
  name: "sendOtp",
  filename: "src/server/phone-auth.ts"
}, (opts) => sendOtp.__executeServer(opts));
const sendOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  phone: string().min(10)
}).parse(data)).handler(sendOtp_createServerFn_handler, async ({
  data
}) => {
  return generateOtp(data.phone);
});
const verifyPhoneOtp_createServerFn_handler = createServerRpc({
  id: "8ede051d9a9d64ba95475cf28fed726573526025e9f31245deafa6b23b482833",
  name: "verifyPhoneOtp",
  filename: "src/server/phone-auth.ts"
}, (opts) => verifyPhoneOtp.__executeServer(opts));
const verifyPhoneOtp = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  phone: string().min(10),
  code: string().length(6)
}).parse(data)).handler(verifyPhoneOtp_createServerFn_handler, async ({
  data
}) => {
  return await verifyOtp(data.phone, data.code);
});
export {
  sendOtp_createServerFn_handler,
  verifyPhoneOtp_createServerFn_handler
};
