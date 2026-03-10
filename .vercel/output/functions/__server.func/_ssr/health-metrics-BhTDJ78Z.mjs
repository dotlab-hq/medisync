import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { d as db, h as healthMetric } from "./index-Dc8WRQC8.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { d as desc, e as eq, a as and } from "../_libs/drizzle-orm.mjs";
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
const listHealthMetrics_createServerFn_handler = createServerRpc({
  id: "bf4800951fa79cb8c5570d023a0e5a25c4f04f4cdde6c1534ecfda68c8d7aed1",
  name: "listHealthMetrics",
  filename: "src/server/health-metrics.ts"
}, (opts) => listHealthMetrics.__executeServer(opts));
const listHealthMetrics = createServerFn({
  method: "GET"
}).handler(listHealthMetrics_createServerFn_handler, async () => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  return db.query.healthMetric.findMany({
    where: eq(healthMetric.userId, userId),
    orderBy: desc(healthMetric.measuredAt)
  });
});
const createMetricSchema = object({
  metricType: string().min(1),
  value: string().min(1),
  unit: string().optional(),
  notes: string().optional(),
  measuredAt: string().optional()
});
const createHealthMetric_createServerFn_handler = createServerRpc({
  id: "632d3552b30bcada2b7dd08689fb409c230962f0723fa2444deb6ebb64b49c5c",
  name: "createHealthMetric",
  filename: "src/server/health-metrics.ts"
}, (opts) => createHealthMetric.__executeServer(opts));
const createHealthMetric = createServerFn({
  method: "POST"
}).inputValidator((data) => createMetricSchema.parse(data)).handler(createHealthMetric_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  const [created] = await db.insert(healthMetric).values({
    ...data,
    measuredAt: data.measuredAt ? new Date(data.measuredAt) : /* @__PURE__ */ new Date(),
    userId
  }).returning();
  return created;
});
const deleteHealthMetric_createServerFn_handler = createServerRpc({
  id: "6b60165619ac3286edced0f74c9cb42c1608828913e9771715fff3e70ed50f9d",
  name: "deleteHealthMetric",
  filename: "src/server/health-metrics.ts"
}, (opts) => deleteHealthMetric.__executeServer(opts));
const deleteHealthMetric = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(deleteHealthMetric_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const sessionData = await auth.api.getSession({
    headers: request.headers
  });
  if (!sessionData?.user?.id) throw new Error("Unauthorized");
  const userId = sessionData.user.id;
  await db.delete(healthMetric).where(and(eq(healthMetric.id, data.id), eq(healthMetric.userId, userId)));
  return {
    success: true
  };
});
export {
  createHealthMetric_createServerFn_handler,
  deleteHealthMetric_createServerFn_handler,
  listHealthMetrics_createServerFn_handler
};
