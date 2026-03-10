import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { d as db, r as reminder } from "./index-Dc8WRQC8.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { d as desc, e as eq, a as and } from "../_libs/drizzle-orm.mjs";
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
const listReminders_createServerFn_handler = createServerRpc({
  id: "b970486a21f52a63c2cf311348c33d6b49e06b28bb2fcbfc523ed4a958662b49",
  name: "listReminders",
  filename: "src/server/reminders.ts"
}, (opts) => listReminders.__executeServer(opts));
const listReminders = createServerFn({
  method: "GET"
}).handler(listReminders_createServerFn_handler, async () => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  return db.query.reminder.findMany({
    where: eq(reminder.userId, userId),
    orderBy: desc(reminder.createdAt)
  });
});
const createReminderSchema = object({
  title: string().min(1),
  description: string().optional(),
  type: _enum(["medication", "appointment", "checkup", "other"]).optional(),
  date: string().min(1),
  time: string().optional()
});
const createReminder_createServerFn_handler = createServerRpc({
  id: "cab02afddd5f103ac96cafd663f34a6e562d67f110f4f97c61f5cd6605ad4157",
  name: "createReminder",
  filename: "src/server/reminders.ts"
}, (opts) => createReminder.__executeServer(opts));
const createReminder = createServerFn({
  method: "POST"
}).inputValidator((data) => createReminderSchema.parse(data)).handler(createReminder_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const [created] = await db.insert(reminder).values({
    ...data,
    userId
  }).returning();
  return created;
});
const toggleReminder_createServerFn_handler = createServerRpc({
  id: "b1acbba0327eb735b286bfff9da8cc160182b8af2337ac2e77e74f7e3bc55f3e",
  name: "toggleReminder",
  filename: "src/server/reminders.ts"
}, (opts) => toggleReminder.__executeServer(opts));
const toggleReminder = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string(),
  isCompleted: boolean()
}).parse(data)).handler(toggleReminder_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const [updated] = await db.update(reminder).set({
    isCompleted: data.isCompleted
  }).where(and(eq(reminder.id, data.id), eq(reminder.userId, userId))).returning();
  if (!updated) throw new Error("Reminder not found");
  return updated;
});
const deleteReminder_createServerFn_handler = createServerRpc({
  id: "0027180fb15ea4a88baa5ec3cbaeda0400c820f4a98d3c18c87a416e9dec6971",
  name: "deleteReminder",
  filename: "src/server/reminders.ts"
}, (opts) => deleteReminder.__executeServer(opts));
const deleteReminder = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(deleteReminder_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  await db.delete(reminder).where(and(eq(reminder.id, data.id), eq(reminder.userId, userId)));
  return {
    success: true
  };
});
export {
  createReminder_createServerFn_handler,
  deleteReminder_createServerFn_handler,
  listReminders_createServerFn_handler,
  toggleReminder_createServerFn_handler
};
