import { d as getAugmentedNamespace } from "../react.mjs";
import { i as invokeStoreExports } from "../aws__lambda-invoke-store.mjs";
import { H as HttpRequest } from "../smithy__protocol-http.mjs";
const recursionDetectionMiddlewareOptions = {
  step: "build",
  tags: ["RECURSION_DETECTION"],
  name: "recursionDetectionMiddleware",
  override: true,
  priority: "low"
};
const TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
const ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
const ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
const recursionDetectionMiddleware = () => (next) => async (args) => {
  const { request } = args;
  if (!HttpRequest.isInstance(request)) {
    return next(args);
  }
  const traceIdHeader = Object.keys(request.headers ?? {}).find((h) => h.toLowerCase() === TRACE_ID_HEADER_NAME.toLowerCase()) ?? TRACE_ID_HEADER_NAME;
  if (request.headers.hasOwnProperty(traceIdHeader)) {
    return next(args);
  }
  const functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
  const traceIdFromEnv = process.env[ENV_TRACE_ID];
  const invokeStore = await invokeStoreExports.InvokeStore.getInstanceAsync();
  const traceIdFromInvokeStore = invokeStore?.getXRayTraceId();
  const traceId = traceIdFromInvokeStore ?? traceIdFromEnv;
  const nonEmptyString = (str) => typeof str === "string" && str.length > 0;
  if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
    request.headers[TRACE_ID_HEADER_NAME] = traceId;
  }
  return next({
    ...args,
    request
  });
};
const getRecursionDetectionPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(recursionDetectionMiddleware(), recursionDetectionMiddlewareOptions);
  }
});
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getRecursionDetectionPlugin,
  recursionDetectionMiddleware
});
const require$$2 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  getRecursionDetectionPlugin as g,
  require$$2 as r
};
