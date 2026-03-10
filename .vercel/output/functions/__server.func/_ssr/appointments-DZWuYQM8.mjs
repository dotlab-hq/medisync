import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { d as db, c as appointment } from "./index-Dc8WRQC8.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { d as desc, e as eq, a as and } from "../_libs/drizzle-orm.mjs";
import { o as object, s as string, _ as _enum } from "../_libs/zod.mjs";
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
const listAppointments_createServerFn_handler = createServerRpc({
  id: "f503b996f7276fb6a21d6030bfe9b4263eb319391c8adb1fc538bfc2e279a1dc",
  name: "listAppointments",
  filename: "src/server/appointments.ts"
}, (opts) => listAppointments.__executeServer(opts));
const listAppointments = createServerFn({
  method: "GET"
}).handler(listAppointments_createServerFn_handler, async () => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  return db.query.appointment.findMany({
    where: eq(appointment.userId, userId),
    orderBy: desc(appointment.createdAt)
  });
});
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
const createAppointment_createServerFn_handler = createServerRpc({
  id: "d7c954be952b3b31d4236ab459074b1f25bbbd39ce43205aa4c2b0f36f531524",
  name: "createAppointment",
  filename: "src/server/appointments.ts"
}, (opts) => createAppointment.__executeServer(opts));
const createAppointment = createServerFn({
  method: "POST"
}).inputValidator((data) => createAppointmentSchema.parse(data)).handler(createAppointment_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const [created] = await db.insert(appointment).values({
    ...data,
    userId
  }).returning();
  return created;
});
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
const updateAppointment_createServerFn_handler = createServerRpc({
  id: "453acd7ae1a95f5b1c3127f53cca38c638a032e226e25251b47b824ad0fdac36",
  name: "updateAppointment",
  filename: "src/server/appointments.ts"
}, (opts) => updateAppointment.__executeServer(opts));
const updateAppointment = createServerFn({
  method: "POST"
}).inputValidator((data) => updateAppointmentSchema.parse(data)).handler(updateAppointment_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const {
    id,
    ...updateData
  } = data;
  const [updated] = await db.update(appointment).set(updateData).where(and(eq(appointment.id, id), eq(appointment.userId, userId))).returning();
  if (!updated) throw new Error("Appointment not found");
  return updated;
});
const deleteAppointment_createServerFn_handler = createServerRpc({
  id: "93625b80296327fa815814e9de2c28f49ebd0316888955272ceea4d45b68f544",
  name: "deleteAppointment",
  filename: "src/server/appointments.ts"
}, (opts) => deleteAppointment.__executeServer(opts));
const deleteAppointment = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(deleteAppointment_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  await db.delete(appointment).where(and(eq(appointment.id, data.id), eq(appointment.userId, userId)));
  return {
    success: true
  };
});
export {
  createAppointment_createServerFn_handler,
  deleteAppointment_createServerFn_handler,
  listAppointments_createServerFn_handler,
  updateAppointment_createServerFn_handler
};
