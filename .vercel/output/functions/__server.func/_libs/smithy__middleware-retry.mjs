import { d as getAugmentedNamespace } from "./react.mjs";
import { a as isRetryableByTrait, b as isClockSkewError, i as isThrottlingError, c as isTransientError, d as isServerError } from "./@smithy/service-error-classification+[...].mjs";
import { T as TIMEOUT_RETRY_COST, a as RETRY_COST, N as NO_RETRY_INCREMENT, M as MAXIMUM_RETRY_DELAY, R as RETRY_MODES, D as DEFAULT_MAX_ATTEMPTS, I as INVOCATION_ID_HEADER, b as REQUEST_HEADER, c as THROTTLING_RETRY_DELAY_BASE, d as DEFAULT_RETRY_DELAY_BASE, e as INITIAL_RETRY_TOKENS, f as DefaultRateLimiter, A as AdaptiveRetryStrategy$1, S as StandardRetryStrategy$1, g as DEFAULT_RETRY_MODE } from "./smithy__util-retry.mjs";
import { v as v4 } from "./smithy__uuid.mjs";
import { H as HttpRequest, a as HttpResponse } from "./smithy__protocol-http.mjs";
import { n as normalizeProvider } from "./smithy__util-middleware.mjs";
import { Readable } from "stream";
import { N as NoOpLogger } from "./smithy__smithy-client.mjs";
const getDefaultRetryQuota = (initialRetryTokens, options) => {
  const MAX_CAPACITY = initialRetryTokens;
  const noRetryIncrement = NO_RETRY_INCREMENT;
  const retryCost = RETRY_COST;
  const timeoutRetryCost = TIMEOUT_RETRY_COST;
  let availableCapacity = initialRetryTokens;
  const getCapacityAmount = (error) => error.name === "TimeoutError" ? timeoutRetryCost : retryCost;
  const hasRetryTokens = (error) => getCapacityAmount(error) <= availableCapacity;
  const retrieveRetryTokens = (error) => {
    if (!hasRetryTokens(error)) {
      throw new Error("No retry token available");
    }
    const capacityAmount = getCapacityAmount(error);
    availableCapacity -= capacityAmount;
    return capacityAmount;
  };
  const releaseRetryTokens = (capacityReleaseAmount) => {
    availableCapacity += capacityReleaseAmount ?? noRetryIncrement;
    availableCapacity = Math.min(availableCapacity, MAX_CAPACITY);
  };
  return Object.freeze({
    hasRetryTokens,
    retrieveRetryTokens,
    releaseRetryTokens
  });
};
const defaultDelayDecider = (delayBase, attempts) => Math.floor(Math.min(MAXIMUM_RETRY_DELAY, Math.random() * 2 ** attempts * delayBase));
const defaultRetryDecider = (error) => {
  if (!error) {
    return false;
  }
  return isRetryableByTrait(error) || isClockSkewError(error) || isThrottlingError(error) || isTransientError(error);
};
const asSdkError = (error) => {
  if (error instanceof Error)
    return error;
  if (error instanceof Object)
    return Object.assign(new Error(), error);
  if (typeof error === "string")
    return new Error(error);
  return new Error(`AWS SDK error wrapper for ${error}`);
};
class StandardRetryStrategy {
  maxAttemptsProvider;
  retryDecider;
  delayDecider;
  retryQuota;
  mode = RETRY_MODES.STANDARD;
  constructor(maxAttemptsProvider, options) {
    this.maxAttemptsProvider = maxAttemptsProvider;
    this.retryDecider = options?.retryDecider ?? defaultRetryDecider;
    this.delayDecider = options?.delayDecider ?? defaultDelayDecider;
    this.retryQuota = options?.retryQuota ?? getDefaultRetryQuota(INITIAL_RETRY_TOKENS);
  }
  shouldRetry(error, attempts, maxAttempts) {
    return attempts < maxAttempts && this.retryDecider(error) && this.retryQuota.hasRetryTokens(error);
  }
  async getMaxAttempts() {
    let maxAttempts;
    try {
      maxAttempts = await this.maxAttemptsProvider();
    } catch (error) {
      maxAttempts = DEFAULT_MAX_ATTEMPTS;
    }
    return maxAttempts;
  }
  async retry(next, args, options) {
    let retryTokenAmount;
    let attempts = 0;
    let totalDelay = 0;
    const maxAttempts = await this.getMaxAttempts();
    const { request } = args;
    if (HttpRequest.isInstance(request)) {
      request.headers[INVOCATION_ID_HEADER] = v4();
    }
    while (true) {
      try {
        if (HttpRequest.isInstance(request)) {
          request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
        }
        if (options?.beforeRequest) {
          await options.beforeRequest();
        }
        const { response, output } = await next(args);
        if (options?.afterRequest) {
          options.afterRequest(response);
        }
        this.retryQuota.releaseRetryTokens(retryTokenAmount);
        output.$metadata.attempts = attempts + 1;
        output.$metadata.totalRetryDelay = totalDelay;
        return { response, output };
      } catch (e) {
        const err = asSdkError(e);
        attempts++;
        if (this.shouldRetry(err, attempts, maxAttempts)) {
          retryTokenAmount = this.retryQuota.retrieveRetryTokens(err);
          const delayFromDecider = this.delayDecider(isThrottlingError(err) ? THROTTLING_RETRY_DELAY_BASE : DEFAULT_RETRY_DELAY_BASE, attempts);
          const delayFromResponse = getDelayFromRetryAfterHeader(err.$response);
          const delay = Math.max(delayFromResponse || 0, delayFromDecider);
          totalDelay += delay;
          await new Promise((resolve) => setTimeout(resolve, delay));
          continue;
        }
        if (!err.$metadata) {
          err.$metadata = {};
        }
        err.$metadata.attempts = attempts;
        err.$metadata.totalRetryDelay = totalDelay;
        throw err;
      }
    }
  }
}
const getDelayFromRetryAfterHeader = (response) => {
  if (!HttpResponse.isInstance(response))
    return;
  const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
  if (!retryAfterHeaderName)
    return;
  const retryAfter = response.headers[retryAfterHeaderName];
  const retryAfterSeconds = Number(retryAfter);
  if (!Number.isNaN(retryAfterSeconds))
    return retryAfterSeconds * 1e3;
  const retryAfterDate = new Date(retryAfter);
  return retryAfterDate.getTime() - Date.now();
};
class AdaptiveRetryStrategy extends StandardRetryStrategy {
  rateLimiter;
  constructor(maxAttemptsProvider, options) {
    const { rateLimiter, ...superOptions } = options ?? {};
    super(maxAttemptsProvider, superOptions);
    this.rateLimiter = rateLimiter ?? new DefaultRateLimiter();
    this.mode = RETRY_MODES.ADAPTIVE;
  }
  async retry(next, args) {
    return super.retry(next, args, {
      beforeRequest: async () => {
        return this.rateLimiter.getSendToken();
      },
      afterRequest: (response) => {
        this.rateLimiter.updateClientSendingRate(response);
      }
    });
  }
}
const ENV_MAX_ATTEMPTS = "AWS_MAX_ATTEMPTS";
const CONFIG_MAX_ATTEMPTS = "max_attempts";
const NODE_MAX_ATTEMPT_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => {
    const value = env[ENV_MAX_ATTEMPTS];
    if (!value)
      return void 0;
    const maxAttempt = parseInt(value);
    if (Number.isNaN(maxAttempt)) {
      throw new Error(`Environment variable ${ENV_MAX_ATTEMPTS} mast be a number, got "${value}"`);
    }
    return maxAttempt;
  },
  configFileSelector: (profile) => {
    const value = profile[CONFIG_MAX_ATTEMPTS];
    if (!value)
      return void 0;
    const maxAttempt = parseInt(value);
    if (Number.isNaN(maxAttempt)) {
      throw new Error(`Shared config file entry ${CONFIG_MAX_ATTEMPTS} mast be a number, got "${value}"`);
    }
    return maxAttempt;
  },
  default: DEFAULT_MAX_ATTEMPTS
};
const resolveRetryConfig = (input) => {
  const { retryStrategy, retryMode: _retryMode, maxAttempts: _maxAttempts } = input;
  const maxAttempts = normalizeProvider(_maxAttempts ?? DEFAULT_MAX_ATTEMPTS);
  return Object.assign(input, {
    maxAttempts,
    retryStrategy: async () => {
      if (retryStrategy) {
        return retryStrategy;
      }
      const retryMode = await normalizeProvider(_retryMode)();
      if (retryMode === RETRY_MODES.ADAPTIVE) {
        return new AdaptiveRetryStrategy$1(maxAttempts);
      }
      return new StandardRetryStrategy$1(maxAttempts);
    }
  });
};
const ENV_RETRY_MODE = "AWS_RETRY_MODE";
const CONFIG_RETRY_MODE = "retry_mode";
const NODE_RETRY_MODE_CONFIG_OPTIONS = {
  environmentVariableSelector: (env) => env[ENV_RETRY_MODE],
  configFileSelector: (profile) => profile[CONFIG_RETRY_MODE],
  default: DEFAULT_RETRY_MODE
};
const omitRetryHeadersMiddleware = () => (next) => async (args) => {
  const { request } = args;
  if (HttpRequest.isInstance(request)) {
    delete request.headers[INVOCATION_ID_HEADER];
    delete request.headers[REQUEST_HEADER];
  }
  return next(args);
};
const omitRetryHeadersMiddlewareOptions = {
  name: "omitRetryHeadersMiddleware",
  tags: ["RETRY", "HEADERS", "OMIT_RETRY_HEADERS"],
  relation: "before",
  toMiddleware: "awsAuthMiddleware",
  override: true
};
const getOmitRetryHeadersPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.addRelativeTo(omitRetryHeadersMiddleware(), omitRetryHeadersMiddlewareOptions);
  }
});
const isStreamingPayload = (request) => request?.body instanceof Readable || typeof ReadableStream !== "undefined" && request?.body instanceof ReadableStream;
const retryMiddleware = (options) => (next, context) => async (args) => {
  let retryStrategy = await options.retryStrategy();
  const maxAttempts = await options.maxAttempts();
  if (isRetryStrategyV2(retryStrategy)) {
    retryStrategy = retryStrategy;
    let retryToken = await retryStrategy.acquireInitialRetryToken(context["partition_id"]);
    let lastError = new Error();
    let attempts = 0;
    let totalRetryDelay = 0;
    const { request } = args;
    const isRequest = HttpRequest.isInstance(request);
    if (isRequest) {
      request.headers[INVOCATION_ID_HEADER] = v4();
    }
    while (true) {
      try {
        if (isRequest) {
          request.headers[REQUEST_HEADER] = `attempt=${attempts + 1}; max=${maxAttempts}`;
        }
        const { response, output } = await next(args);
        retryStrategy.recordSuccess(retryToken);
        output.$metadata.attempts = attempts + 1;
        output.$metadata.totalRetryDelay = totalRetryDelay;
        return { response, output };
      } catch (e) {
        const retryErrorInfo = getRetryErrorInfo(e);
        lastError = asSdkError(e);
        if (isRequest && isStreamingPayload(request)) {
          (context.logger instanceof NoOpLogger ? console : context.logger)?.warn("An error was encountered in a non-retryable streaming request.");
          throw lastError;
        }
        try {
          retryToken = await retryStrategy.refreshRetryTokenForRetry(retryToken, retryErrorInfo);
        } catch (refreshError) {
          if (!lastError.$metadata) {
            lastError.$metadata = {};
          }
          lastError.$metadata.attempts = attempts + 1;
          lastError.$metadata.totalRetryDelay = totalRetryDelay;
          throw lastError;
        }
        attempts = retryToken.getRetryCount();
        const delay = retryToken.getRetryDelay();
        totalRetryDelay += delay;
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  } else {
    retryStrategy = retryStrategy;
    if (retryStrategy?.mode)
      context.userAgent = [...context.userAgent || [], ["cfg/retry-mode", retryStrategy.mode]];
    return retryStrategy.retry(next, args);
  }
};
const isRetryStrategyV2 = (retryStrategy) => typeof retryStrategy.acquireInitialRetryToken !== "undefined" && typeof retryStrategy.refreshRetryTokenForRetry !== "undefined" && typeof retryStrategy.recordSuccess !== "undefined";
const getRetryErrorInfo = (error) => {
  const errorInfo = {
    error,
    errorType: getRetryErrorType(error)
  };
  const retryAfterHint = getRetryAfterHint(error.$response);
  if (retryAfterHint) {
    errorInfo.retryAfterHint = retryAfterHint;
  }
  return errorInfo;
};
const getRetryErrorType = (error) => {
  if (isThrottlingError(error))
    return "THROTTLING";
  if (isTransientError(error))
    return "TRANSIENT";
  if (isServerError(error))
    return "SERVER_ERROR";
  return "CLIENT_ERROR";
};
const retryMiddlewareOptions = {
  name: "retryMiddleware",
  tags: ["RETRY"],
  step: "finalizeRequest",
  priority: "high",
  override: true
};
const getRetryPlugin = (options) => ({
  applyToStack: (clientStack) => {
    clientStack.add(retryMiddleware(options), retryMiddlewareOptions);
  }
});
const getRetryAfterHint = (response) => {
  if (!HttpResponse.isInstance(response))
    return;
  const retryAfterHeaderName = Object.keys(response.headers).find((key) => key.toLowerCase() === "retry-after");
  if (!retryAfterHeaderName)
    return;
  const retryAfter = response.headers[retryAfterHeaderName];
  const retryAfterSeconds = Number(retryAfter);
  if (!Number.isNaN(retryAfterSeconds))
    return new Date(retryAfterSeconds * 1e3);
  const retryAfterDate = new Date(retryAfter);
  return retryAfterDate;
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  AdaptiveRetryStrategy,
  CONFIG_MAX_ATTEMPTS,
  CONFIG_RETRY_MODE,
  ENV_MAX_ATTEMPTS,
  ENV_RETRY_MODE,
  NODE_MAX_ATTEMPT_CONFIG_OPTIONS,
  NODE_RETRY_MODE_CONFIG_OPTIONS,
  StandardRetryStrategy,
  defaultDelayDecider,
  defaultRetryDecider,
  getOmitRetryHeadersPlugin,
  getRetryAfterHint,
  getRetryPlugin,
  omitRetryHeadersMiddleware,
  omitRetryHeadersMiddlewareOptions,
  resolveRetryConfig,
  retryMiddleware,
  retryMiddlewareOptions
});
const require$$9 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  NODE_RETRY_MODE_CONFIG_OPTIONS as N,
  NODE_MAX_ATTEMPT_CONFIG_OPTIONS as a,
  require$$9 as b,
  getRetryPlugin as g,
  resolveRetryConfig as r
};
