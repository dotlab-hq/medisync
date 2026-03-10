import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { d as db, u as user } from "./index-Dc8WRQC8.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { e as eq } from "../_libs/drizzle-orm.mjs";
import "../_libs/zod.mjs";
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
const getSession_createServerFn_handler = createServerRpc({
  id: "a25ee52c3707674a0708759ce51bbede27783305d5c10599240f3902a9f63a55",
  name: "getSession",
  filename: "src/server/auth.ts"
}, (opts) => getSession.__executeServer(opts));
const getSession = createServerFn({
  method: "GET"
}).handler(getSession_createServerFn_handler, async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  return session;
});
const getOnboardingStatus_createServerFn_handler = createServerRpc({
  id: "045fa6ce7c5617f84a2ae0e1bf934ad915f0e764902c292dc5eb7744c298981d",
  name: "getOnboardingStatus",
  filename: "src/server/auth.ts"
}, (opts) => getOnboardingStatus.__executeServer(opts));
const getOnboardingStatus = createServerFn({
  method: "GET"
}).handler(getOnboardingStatus_createServerFn_handler, async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) return {
    onboardingCompleted: false
  };
  const row = await db.query.user.findFirst({
    where: eq(user.id, session.user.id),
    columns: {
      onboardingCompleted: true
    }
  });
  return {
    onboardingCompleted: row?.onboardingCompleted ?? false
  };
});
export {
  getOnboardingStatus_createServerFn_handler,
  getSession_createServerFn_handler
};
