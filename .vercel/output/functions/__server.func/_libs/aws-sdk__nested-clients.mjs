import { a as require$$0$1 } from "./@aws-sdk/middleware-host-header+[...].mjs";
import { r as require$$1$3 } from "./aws-sdk__middleware-logger.mjs";
import { r as require$$2 } from "./@aws-sdk/middleware-recursion-detection+[...].mjs";
import { a as require$$3$1 } from "./aws-sdk__middleware-user-agent.mjs";
import { e as require$$4$1 } from "./smithy__config-resolver.mjs";
import { a as requireSchema, d as requireDistCjs$1 } from "./smithy__core.mjs";
import { r as require$$7$1 } from "./@smithy/middleware-content-length+[...].mjs";
import { c as require$$8$1 } from "./smithy__middleware-endpoint.mjs";
import { b as require$$9 } from "./smithy__middleware-retry.mjs";
import { r as require$$10 } from "./smithy__smithy-client.mjs";
import { r as requireDistCjs, a as requireProtocols, b as requireClient } from "./aws-sdk__core.mjs";
import { r as require$$1$1 } from "./smithy__util-middleware.mjs";
import { r as requireTslib } from "./tslib.mjs";
import { r as require$$3 } from "./aws-sdk__util-user-agent-node.mjs";
import { r as require$$5$1 } from "./smithy__hash-node.mjs";
import { r as require$$7 } from "./smithy__node-config-provider.mjs";
import { r as require$$8 } from "./smithy__node-http-handler.mjs";
import { r as require$$10$1 } from "./smithy__util-body-length-node.mjs";
import { a as require$$11 } from "./@smithy/util-defaults-mode-node+[...].mjs";
import { r as require$$12 } from "./smithy__util-retry.mjs";
import { r as require$$4 } from "./smithy__url-parser.mjs";
import { r as require$$5 } from "./smithy__util-base64.mjs";
import { r as require$$6 } from "./smithy__util-utf8.mjs";
import { r as require$$0 } from "./aws-sdk__util-endpoints.mjs";
import { d as require$$1$2 } from "./smithy__util-endpoints.mjs";
import { a as require$$13 } from "./@aws-sdk/region-config-resolver+[...].mjs";
import { r as require$$14 } from "./smithy__protocol-http.mjs";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: function() {
                return e[k];
              }
            });
          }
        }
      }
    }
  }
  return Object.freeze(n);
}
var ssoOidc = {};
var httpAuthSchemeProvider$3 = {};
var hasRequiredHttpAuthSchemeProvider$3;
function requireHttpAuthSchemeProvider$3() {
  if (hasRequiredHttpAuthSchemeProvider$3) return httpAuthSchemeProvider$3;
  hasRequiredHttpAuthSchemeProvider$3 = 1;
  Object.defineProperty(httpAuthSchemeProvider$3, "__esModule", { value: true });
  httpAuthSchemeProvider$3.resolveHttpAuthSchemeConfig = httpAuthSchemeProvider$3.defaultSSOOIDCHttpAuthSchemeProvider = httpAuthSchemeProvider$3.defaultSSOOIDCHttpAuthSchemeParametersProvider = void 0;
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const util_middleware_1 = require$$1$1;
  const defaultSSOOIDCHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
      operation: (0, util_middleware_1.getSmithyContext)(context).operation,
      region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })()
    };
  };
  httpAuthSchemeProvider$3.defaultSSOOIDCHttpAuthSchemeParametersProvider = defaultSSOOIDCHttpAuthSchemeParametersProvider;
  function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "sso-oauth",
        region: authParameters.region
      },
      propertiesExtractor: (config, context) => ({
        signingProperties: {
          config,
          context
        }
      })
    };
  }
  function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
      schemeId: "smithy.api#noAuth"
    };
  }
  const defaultSSOOIDCHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
      case "CreateToken": {
        options.push(createSmithyApiNoAuthHttpAuthOption());
        break;
      }
      default: {
        options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      }
    }
    return options;
  };
  httpAuthSchemeProvider$3.defaultSSOOIDCHttpAuthSchemeProvider = defaultSSOOIDCHttpAuthSchemeProvider;
  const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0, core_1.resolveAwsSdkSigV4Config)(config);
    return Object.assign(config_0, {
      authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? [])
    });
  };
  httpAuthSchemeProvider$3.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
  return httpAuthSchemeProvider$3;
}
var runtimeConfig$3 = {};
const name = "@aws-sdk/nested-clients";
const version = "3.996.7";
const description = "Nested clients for AWS SDK packages.";
const main = "./dist-cjs/index.js";
const module$1 = "./dist-es/index.js";
const types = "./dist-types/index.d.ts";
const scripts = { "build": "yarn lint && concurrently 'yarn:build:types' 'yarn:build:es' && yarn build:cjs", "build:cjs": "node ../../scripts/compilation/inline nested-clients", "build:es": "tsc -p tsconfig.es.json", "build:include:deps": 'yarn g:turbo run build -F="$npm_package_name"', "build:types": "tsc -p tsconfig.types.json", "build:types:downlevel": "downlevel-dts dist-types dist-types/ts3.4", "clean": "premove dist-cjs dist-es dist-types tsconfig.cjs.tsbuildinfo tsconfig.es.tsbuildinfo tsconfig.types.tsbuildinfo", "lint": "node ../../scripts/validation/submodules-linter.js --pkg nested-clients", "test": "yarn g:vitest run", "test:watch": "yarn g:vitest watch" };
const engines = { "node": ">=20.0.0" };
const sideEffects = false;
const author = { "name": "AWS SDK for JavaScript Team", "url": "https://aws.amazon.com/javascript/" };
const license = "Apache-2.0";
const dependencies = { "@aws-crypto/sha256-browser": "5.2.0", "@aws-crypto/sha256-js": "5.2.0", "@aws-sdk/core": "^3.973.18", "@aws-sdk/middleware-host-header": "^3.972.7", "@aws-sdk/middleware-logger": "^3.972.7", "@aws-sdk/middleware-recursion-detection": "^3.972.7", "@aws-sdk/middleware-user-agent": "^3.972.19", "@aws-sdk/region-config-resolver": "^3.972.7", "@aws-sdk/types": "^3.973.5", "@aws-sdk/util-endpoints": "^3.996.4", "@aws-sdk/util-user-agent-browser": "^3.972.7", "@aws-sdk/util-user-agent-node": "^3.973.4", "@smithy/config-resolver": "^4.4.10", "@smithy/core": "^3.23.8", "@smithy/fetch-http-handler": "^5.3.13", "@smithy/hash-node": "^4.2.11", "@smithy/invalid-dependency": "^4.2.11", "@smithy/middleware-content-length": "^4.2.11", "@smithy/middleware-endpoint": "^4.4.22", "@smithy/middleware-retry": "^4.4.39", "@smithy/middleware-serde": "^4.2.12", "@smithy/middleware-stack": "^4.2.11", "@smithy/node-config-provider": "^4.3.11", "@smithy/node-http-handler": "^4.4.14", "@smithy/protocol-http": "^5.3.11", "@smithy/smithy-client": "^4.12.2", "@smithy/types": "^4.13.0", "@smithy/url-parser": "^4.2.11", "@smithy/util-base64": "^4.3.2", "@smithy/util-body-length-browser": "^4.2.2", "@smithy/util-body-length-node": "^4.2.3", "@smithy/util-defaults-mode-browser": "^4.3.38", "@smithy/util-defaults-mode-node": "^4.2.41", "@smithy/util-endpoints": "^3.3.2", "@smithy/util-middleware": "^4.2.11", "@smithy/util-retry": "^4.2.11", "@smithy/util-utf8": "^4.2.2", "tslib": "^2.6.2" };
const devDependencies = { "concurrently": "7.0.0", "downlevel-dts": "0.10.1", "premove": "4.0.0", "typescript": "~5.8.3" };
const typesVersions = { "<4.5": { "dist-types/*": ["dist-types/ts3.4/*"] } };
const files = ["./cognito-identity.d.ts", "./cognito-identity.js", "./signin.d.ts", "./signin.js", "./sso-oidc.d.ts", "./sso-oidc.js", "./sso.d.ts", "./sso.js", "./sts.d.ts", "./sts.js", "dist-*/**"];
const browser = { "./dist-es/submodules/cognito-identity/runtimeConfig": "./dist-es/submodules/cognito-identity/runtimeConfig.browser", "./dist-es/submodules/signin/runtimeConfig": "./dist-es/submodules/signin/runtimeConfig.browser", "./dist-es/submodules/sso-oidc/runtimeConfig": "./dist-es/submodules/sso-oidc/runtimeConfig.browser", "./dist-es/submodules/sso/runtimeConfig": "./dist-es/submodules/sso/runtimeConfig.browser", "./dist-es/submodules/sts/runtimeConfig": "./dist-es/submodules/sts/runtimeConfig.browser" };
const homepage = "https://github.com/aws/aws-sdk-js-v3/tree/main/packages/nested-clients";
const repository = { "type": "git", "url": "https://github.com/aws/aws-sdk-js-v3.git", "directory": "packages/nested-clients" };
const exports$1 = { "./package.json": "./package.json", "./sso-oidc": { "types": "./dist-types/submodules/sso-oidc/index.d.ts", "module": "./dist-es/submodules/sso-oidc/index.js", "node": "./dist-cjs/submodules/sso-oidc/index.js", "import": "./dist-es/submodules/sso-oidc/index.js", "require": "./dist-cjs/submodules/sso-oidc/index.js" }, "./sts": { "types": "./dist-types/submodules/sts/index.d.ts", "module": "./dist-es/submodules/sts/index.js", "node": "./dist-cjs/submodules/sts/index.js", "import": "./dist-es/submodules/sts/index.js", "require": "./dist-cjs/submodules/sts/index.js" }, "./signin": { "types": "./dist-types/submodules/signin/index.d.ts", "module": "./dist-es/submodules/signin/index.js", "node": "./dist-cjs/submodules/signin/index.js", "import": "./dist-es/submodules/signin/index.js", "require": "./dist-cjs/submodules/signin/index.js" }, "./cognito-identity": { "types": "./dist-types/submodules/cognito-identity/index.d.ts", "module": "./dist-es/submodules/cognito-identity/index.js", "node": "./dist-cjs/submodules/cognito-identity/index.js", "import": "./dist-es/submodules/cognito-identity/index.js", "require": "./dist-cjs/submodules/cognito-identity/index.js" }, "./sso": { "types": "./dist-types/submodules/sso/index.d.ts", "module": "./dist-es/submodules/sso/index.js", "node": "./dist-cjs/submodules/sso/index.js", "import": "./dist-es/submodules/sso/index.js", "require": "./dist-cjs/submodules/sso/index.js" } };
const require$$1 = {
  name,
  version,
  description,
  main,
  module: module$1,
  types,
  scripts,
  engines,
  sideEffects,
  author,
  license,
  dependencies,
  devDependencies,
  typesVersions,
  files,
  browser,
  "react-native": {},
  homepage,
  repository,
  exports: exports$1
};
var runtimeConfig_shared$3 = {};
var endpointResolver$3 = {};
var ruleset$3 = {};
var hasRequiredRuleset$3;
function requireRuleset$3() {
  if (hasRequiredRuleset$3) return ruleset$3;
  hasRequiredRuleset$3 = 1;
  Object.defineProperty(ruleset$3, "__esModule", { value: true });
  ruleset$3.ruleSet = void 0;
  const u = "required", v = "fn", w = "argv", x = "ref";
  const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "getAttr", i = { [u]: false, type: "string" }, j = { [u]: true, default: false, type: "boolean" }, k = { [x]: "Endpoint" }, l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] }, m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] }, n = {}, o = { [v]: h, [w]: [{ [x]: g }, "supportsFIPS"] }, p = { [x]: g }, q = { [v]: c, [w]: [true, { [v]: h, [w]: [p, "supportsDualStack"] }] }, r = [l], s = [m], t = [{ [x]: "Region" }];
  const _data = {
    version: "1.0",
    parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i },
    rules: [
      {
        conditions: [{ [v]: b, [w]: [k] }],
        rules: [
          { conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d },
          { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d },
          { endpoint: { url: k, properties: n, headers: n }, type: e }
        ],
        type: f
      },
      {
        conditions: [{ [v]: b, [w]: t }],
        rules: [
          {
            conditions: [{ [v]: "aws.partition", [w]: t, assign: g }],
            rules: [
              {
                conditions: [l, m],
                rules: [
                  {
                    conditions: [{ [v]: c, [w]: [a, o] }, q],
                    rules: [
                      {
                        endpoint: {
                          url: "https://oidc-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: n,
                          headers: n
                        },
                        type: e
                      }
                    ],
                    type: f
                  },
                  { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }
                ],
                type: f
              },
              {
                conditions: r,
                rules: [
                  {
                    conditions: [{ [v]: c, [w]: [o, a] }],
                    rules: [
                      {
                        conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }],
                        endpoint: { url: "https://oidc.{Region}.amazonaws.com", properties: n, headers: n },
                        type: e
                      },
                      {
                        endpoint: {
                          url: "https://oidc-fips.{Region}.{PartitionResult#dnsSuffix}",
                          properties: n,
                          headers: n
                        },
                        type: e
                      }
                    ],
                    type: f
                  },
                  { error: "FIPS is enabled but this partition does not support FIPS", type: d }
                ],
                type: f
              },
              {
                conditions: s,
                rules: [
                  {
                    conditions: [q],
                    rules: [
                      {
                        endpoint: {
                          url: "https://oidc.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: n,
                          headers: n
                        },
                        type: e
                      }
                    ],
                    type: f
                  },
                  { error: "DualStack is enabled but this partition does not support DualStack", type: d }
                ],
                type: f
              },
              {
                endpoint: { url: "https://oidc.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n },
                type: e
              }
            ],
            type: f
          }
        ],
        type: f
      },
      { error: "Invalid Configuration: Missing Region", type: d }
    ]
  };
  ruleset$3.ruleSet = _data;
  return ruleset$3;
}
var hasRequiredEndpointResolver$3;
function requireEndpointResolver$3() {
  if (hasRequiredEndpointResolver$3) return endpointResolver$3;
  hasRequiredEndpointResolver$3 = 1;
  Object.defineProperty(endpointResolver$3, "__esModule", { value: true });
  endpointResolver$3.defaultEndpointResolver = void 0;
  const util_endpoints_1 = require$$0;
  const util_endpoints_2 = require$$1$2;
  const ruleset_1 = /* @__PURE__ */ requireRuleset$3();
  const cache = new util_endpoints_2.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
  });
  const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
      endpointParams,
      logger: context.logger
    }));
  };
  endpointResolver$3.defaultEndpointResolver = defaultEndpointResolver;
  util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
  return endpointResolver$3;
}
var schemas_0$3 = {};
var errors$3 = {};
var SSOOIDCServiceException = {};
var hasRequiredSSOOIDCServiceException;
function requireSSOOIDCServiceException() {
  if (hasRequiredSSOOIDCServiceException) return SSOOIDCServiceException;
  hasRequiredSSOOIDCServiceException = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.SSOOIDCServiceException = exports$12.__ServiceException = void 0;
    const smithy_client_1 = require$$10;
    Object.defineProperty(exports$12, "__ServiceException", { enumerable: true, get: function() {
      return smithy_client_1.ServiceException;
    } });
    class SSOOIDCServiceException2 extends smithy_client_1.ServiceException {
      constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SSOOIDCServiceException2.prototype);
      }
    }
    exports$12.SSOOIDCServiceException = SSOOIDCServiceException2;
  })(SSOOIDCServiceException);
  return SSOOIDCServiceException;
}
var hasRequiredErrors$3;
function requireErrors$3() {
  if (hasRequiredErrors$3) return errors$3;
  hasRequiredErrors$3 = 1;
  Object.defineProperty(errors$3, "__esModule", { value: true });
  errors$3.UnsupportedGrantTypeException = errors$3.UnauthorizedClientException = errors$3.SlowDownException = errors$3.InvalidScopeException = errors$3.InvalidRequestException = errors$3.InvalidGrantException = errors$3.InvalidClientException = errors$3.InternalServerException = errors$3.ExpiredTokenException = errors$3.AuthorizationPendingException = errors$3.AccessDeniedException = void 0;
  const SSOOIDCServiceException_1 = /* @__PURE__ */ requireSSOOIDCServiceException();
  class AccessDeniedException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "AccessDeniedException";
    $fault = "client";
    error;
    reason;
    error_description;
    constructor(opts) {
      super({
        name: "AccessDeniedException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, AccessDeniedException.prototype);
      this.error = opts.error;
      this.reason = opts.reason;
      this.error_description = opts.error_description;
    }
  }
  errors$3.AccessDeniedException = AccessDeniedException;
  class AuthorizationPendingException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "AuthorizationPendingException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "AuthorizationPendingException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, AuthorizationPendingException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.AuthorizationPendingException = AuthorizationPendingException;
  class ExpiredTokenException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "ExpiredTokenException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "ExpiredTokenException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, ExpiredTokenException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.ExpiredTokenException = ExpiredTokenException;
  class InternalServerException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "InternalServerException";
    $fault = "server";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InternalServerException",
        $fault: "server",
        ...opts
      });
      Object.setPrototypeOf(this, InternalServerException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.InternalServerException = InternalServerException;
  class InvalidClientException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "InvalidClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidClientException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, InvalidClientException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.InvalidClientException = InvalidClientException;
  class InvalidGrantException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "InvalidGrantException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidGrantException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, InvalidGrantException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.InvalidGrantException = InvalidGrantException;
  class InvalidRequestException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "InvalidRequestException";
    $fault = "client";
    error;
    reason;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidRequestException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, InvalidRequestException.prototype);
      this.error = opts.error;
      this.reason = opts.reason;
      this.error_description = opts.error_description;
    }
  }
  errors$3.InvalidRequestException = InvalidRequestException;
  class InvalidScopeException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "InvalidScopeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "InvalidScopeException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, InvalidScopeException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.InvalidScopeException = InvalidScopeException;
  class SlowDownException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "SlowDownException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "SlowDownException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, SlowDownException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.SlowDownException = SlowDownException;
  class UnauthorizedClientException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "UnauthorizedClientException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "UnauthorizedClientException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, UnauthorizedClientException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.UnauthorizedClientException = UnauthorizedClientException;
  class UnsupportedGrantTypeException extends SSOOIDCServiceException_1.SSOOIDCServiceException {
    name = "UnsupportedGrantTypeException";
    $fault = "client";
    error;
    error_description;
    constructor(opts) {
      super({
        name: "UnsupportedGrantTypeException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, UnsupportedGrantTypeException.prototype);
      this.error = opts.error;
      this.error_description = opts.error_description;
    }
  }
  errors$3.UnsupportedGrantTypeException = UnsupportedGrantTypeException;
  return errors$3;
}
var hasRequiredSchemas_0$3;
function requireSchemas_0$3() {
  if (hasRequiredSchemas_0$3) return schemas_0$3;
  hasRequiredSchemas_0$3 = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.CreateToken$ = exports$12.CreateTokenResponse$ = exports$12.CreateTokenRequest$ = exports$12.errorTypeRegistries = exports$12.UnsupportedGrantTypeException$ = exports$12.UnauthorizedClientException$ = exports$12.SlowDownException$ = exports$12.InvalidScopeException$ = exports$12.InvalidRequestException$ = exports$12.InvalidGrantException$ = exports$12.InvalidClientException$ = exports$12.InternalServerException$ = exports$12.ExpiredTokenException$ = exports$12.AuthorizationPendingException$ = exports$12.AccessDeniedException$ = exports$12.SSOOIDCServiceException$ = void 0;
    const _ADE = "AccessDeniedException";
    const _APE = "AuthorizationPendingException";
    const _AT = "AccessToken";
    const _CS = "ClientSecret";
    const _CT = "CreateToken";
    const _CTR = "CreateTokenRequest";
    const _CTRr = "CreateTokenResponse";
    const _CV = "CodeVerifier";
    const _ETE = "ExpiredTokenException";
    const _ICE = "InvalidClientException";
    const _IGE = "InvalidGrantException";
    const _IRE = "InvalidRequestException";
    const _ISE = "InternalServerException";
    const _ISEn = "InvalidScopeException";
    const _IT = "IdToken";
    const _RT = "RefreshToken";
    const _SDE = "SlowDownException";
    const _UCE = "UnauthorizedClientException";
    const _UGTE = "UnsupportedGrantTypeException";
    const _aT = "accessToken";
    const _c = "client";
    const _cI = "clientId";
    const _cS = "clientSecret";
    const _cV = "codeVerifier";
    const _co = "code";
    const _dC = "deviceCode";
    const _e = "error";
    const _eI = "expiresIn";
    const _ed = "error_description";
    const _gT = "grantType";
    const _h = "http";
    const _hE = "httpError";
    const _iT = "idToken";
    const _r = "reason";
    const _rT = "refreshToken";
    const _rU = "redirectUri";
    const _s = "smithy.ts.sdk.synthetic.com.amazonaws.ssooidc";
    const _sc = "scope";
    const _se = "server";
    const _tT = "tokenType";
    const n0 = "com.amazonaws.ssooidc";
    const schema_1 = /* @__PURE__ */ requireSchema();
    const errors_1 = /* @__PURE__ */ requireErrors$3();
    const SSOOIDCServiceException_1 = /* @__PURE__ */ requireSSOOIDCServiceException();
    const _s_registry = schema_1.TypeRegistry.for(_s);
    exports$12.SSOOIDCServiceException$ = [-3, _s, "SSOOIDCServiceException", 0, [], []];
    _s_registry.registerError(exports$12.SSOOIDCServiceException$, SSOOIDCServiceException_1.SSOOIDCServiceException);
    const n0_registry = schema_1.TypeRegistry.for(n0);
    exports$12.AccessDeniedException$ = [
      -3,
      n0,
      _ADE,
      { [_e]: _c, [_hE]: 400 },
      [_e, _r, _ed],
      [0, 0, 0]
    ];
    n0_registry.registerError(exports$12.AccessDeniedException$, errors_1.AccessDeniedException);
    exports$12.AuthorizationPendingException$ = [
      -3,
      n0,
      _APE,
      { [_e]: _c, [_hE]: 400 },
      [_e, _ed],
      [0, 0]
    ];
    n0_registry.registerError(exports$12.AuthorizationPendingException$, errors_1.AuthorizationPendingException);
    exports$12.ExpiredTokenException$ = [-3, n0, _ETE, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
    n0_registry.registerError(exports$12.ExpiredTokenException$, errors_1.ExpiredTokenException);
    exports$12.InternalServerException$ = [-3, n0, _ISE, { [_e]: _se, [_hE]: 500 }, [_e, _ed], [0, 0]];
    n0_registry.registerError(exports$12.InternalServerException$, errors_1.InternalServerException);
    exports$12.InvalidClientException$ = [-3, n0, _ICE, { [_e]: _c, [_hE]: 401 }, [_e, _ed], [0, 0]];
    n0_registry.registerError(exports$12.InvalidClientException$, errors_1.InvalidClientException);
    exports$12.InvalidGrantException$ = [-3, n0, _IGE, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
    n0_registry.registerError(exports$12.InvalidGrantException$, errors_1.InvalidGrantException);
    exports$12.InvalidRequestException$ = [
      -3,
      n0,
      _IRE,
      { [_e]: _c, [_hE]: 400 },
      [_e, _r, _ed],
      [0, 0, 0]
    ];
    n0_registry.registerError(exports$12.InvalidRequestException$, errors_1.InvalidRequestException);
    exports$12.InvalidScopeException$ = [-3, n0, _ISEn, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
    n0_registry.registerError(exports$12.InvalidScopeException$, errors_1.InvalidScopeException);
    exports$12.SlowDownException$ = [-3, n0, _SDE, { [_e]: _c, [_hE]: 400 }, [_e, _ed], [0, 0]];
    n0_registry.registerError(exports$12.SlowDownException$, errors_1.SlowDownException);
    exports$12.UnauthorizedClientException$ = [
      -3,
      n0,
      _UCE,
      { [_e]: _c, [_hE]: 400 },
      [_e, _ed],
      [0, 0]
    ];
    n0_registry.registerError(exports$12.UnauthorizedClientException$, errors_1.UnauthorizedClientException);
    exports$12.UnsupportedGrantTypeException$ = [
      -3,
      n0,
      _UGTE,
      { [_e]: _c, [_hE]: 400 },
      [_e, _ed],
      [0, 0]
    ];
    n0_registry.registerError(exports$12.UnsupportedGrantTypeException$, errors_1.UnsupportedGrantTypeException);
    exports$12.errorTypeRegistries = [_s_registry, n0_registry];
    var AccessToken = [0, n0, _AT, 8, 0];
    var ClientSecret = [0, n0, _CS, 8, 0];
    var CodeVerifier = [0, n0, _CV, 8, 0];
    var IdToken = [0, n0, _IT, 8, 0];
    var RefreshToken = [0, n0, _RT, 8, 0];
    exports$12.CreateTokenRequest$ = [
      3,
      n0,
      _CTR,
      0,
      [_cI, _cS, _gT, _dC, _co, _rT, _sc, _rU, _cV],
      [0, [() => ClientSecret, 0], 0, 0, 0, [() => RefreshToken, 0], 64 | 0, 0, [() => CodeVerifier, 0]],
      3
    ];
    exports$12.CreateTokenResponse$ = [
      3,
      n0,
      _CTRr,
      0,
      [_aT, _tT, _eI, _rT, _iT],
      [[() => AccessToken, 0], 0, 1, [() => RefreshToken, 0], [() => IdToken, 0]]
    ];
    exports$12.CreateToken$ = [
      9,
      n0,
      _CT,
      { [_h]: ["POST", "/token", 200] },
      () => exports$12.CreateTokenRequest$,
      () => exports$12.CreateTokenResponse$
    ];
  })(schemas_0$3);
  return schemas_0$3;
}
var hasRequiredRuntimeConfig_shared$3;
function requireRuntimeConfig_shared$3() {
  if (hasRequiredRuntimeConfig_shared$3) return runtimeConfig_shared$3;
  hasRequiredRuntimeConfig_shared$3 = 1;
  Object.defineProperty(runtimeConfig_shared$3, "__esModule", { value: true });
  runtimeConfig_shared$3.getRuntimeConfig = void 0;
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const protocols_1 = /* @__PURE__ */ requireProtocols();
  const core_2 = /* @__PURE__ */ requireDistCjs$1();
  const smithy_client_1 = require$$10;
  const url_parser_1 = require$$4;
  const util_base64_1 = require$$5;
  const util_utf8_1 = require$$6;
  const httpAuthSchemeProvider_1 = /* @__PURE__ */ requireHttpAuthSchemeProvider$3();
  const endpointResolver_1 = /* @__PURE__ */ requireEndpointResolver$3();
  const schemas_0_1 = /* @__PURE__ */ requireSchemas_0$3();
  const getRuntimeConfig = (config) => {
    return {
      apiVersion: "2019-06-10",
      base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
      base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
      disableHostPrefix: config?.disableHostPrefix ?? false,
      endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
      extensions: config?.extensions ?? [],
      httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSSOOIDCHttpAuthSchemeProvider,
      httpAuthSchemes: config?.httpAuthSchemes ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
          signer: new core_1.AwsSdkSigV4Signer()
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new core_2.NoAuthSigner()
        }
      ],
      logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
      protocol: config?.protocol ?? protocols_1.AwsRestJsonProtocol,
      protocolSettings: config?.protocolSettings ?? {
        defaultNamespace: "com.amazonaws.ssooidc",
        errorTypeRegistries: schemas_0_1.errorTypeRegistries,
        version: "2019-06-10",
        serviceTarget: "AWSSSOOIDCService"
      },
      serviceId: config?.serviceId ?? "SSO OIDC",
      urlParser: config?.urlParser ?? url_parser_1.parseUrl,
      utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
      utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
    };
  };
  runtimeConfig_shared$3.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig_shared$3;
}
var hasRequiredRuntimeConfig$3;
function requireRuntimeConfig$3() {
  if (hasRequiredRuntimeConfig$3) return runtimeConfig$3;
  hasRequiredRuntimeConfig$3 = 1;
  Object.defineProperty(runtimeConfig$3, "__esModule", { value: true });
  runtimeConfig$3.getRuntimeConfig = void 0;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const package_json_1 = tslib_1.__importDefault(require$$1);
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const util_user_agent_node_1 = require$$3;
  const config_resolver_1 = require$$4$1;
  const hash_node_1 = require$$5$1;
  const middleware_retry_1 = require$$9;
  const node_config_provider_1 = require$$7;
  const node_http_handler_1 = require$$8;
  const smithy_client_1 = require$$10;
  const util_body_length_node_1 = require$$10$1;
  const util_defaults_mode_node_1 = require$$11;
  const util_retry_1 = require$$12;
  const runtimeConfig_shared_1 = /* @__PURE__ */ requireRuntimeConfig_shared$3();
  const getRuntimeConfig = (config) => {
    (0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    (0, core_1.emitWarningIfUnsupportedVersion)(process.version);
    const loaderConfig = {
      profile: config?.profile,
      logger: clientSharedValues.logger
    };
    return {
      ...clientSharedValues,
      ...config,
      runtime: "node",
      defaultsMode,
      authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
      bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
      defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
      maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
      region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, { ...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
      requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
      retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
        ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
        default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
      }, config),
      sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
      streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
      useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
    };
  };
  runtimeConfig$3.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig$3;
}
var hasRequiredSsoOidc;
function requireSsoOidc() {
  if (hasRequiredSsoOidc) return ssoOidc;
  hasRequiredSsoOidc = 1;
  (function(exports$12) {
    var middlewareHostHeader = require$$0$1;
    var middlewareLogger = require$$1$3;
    var middlewareRecursionDetection = require$$2;
    var middlewareUserAgent = require$$3$1;
    var configResolver = require$$4$1;
    var core = /* @__PURE__ */ requireDistCjs$1();
    var schema = /* @__PURE__ */ requireSchema();
    var middlewareContentLength = require$$7$1;
    var middlewareEndpoint = require$$8$1;
    var middlewareRetry = require$$9;
    var smithyClient = require$$10;
    var httpAuthSchemeProvider2 = /* @__PURE__ */ requireHttpAuthSchemeProvider$3();
    var runtimeConfig2 = /* @__PURE__ */ requireRuntimeConfig$3();
    var regionConfigResolver = require$$13;
    var protocolHttp = require$$14;
    var schemas_02 = /* @__PURE__ */ requireSchemas_0$3();
    var errors2 = /* @__PURE__ */ requireErrors$3();
    var SSOOIDCServiceException2 = /* @__PURE__ */ requireSSOOIDCServiceException();
    const resolveClientEndpointParameters = (options) => {
      return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "sso-oauth"
      });
    };
    const commonParams = {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
    };
    const getHttpAuthExtensionConfiguration = (runtimeConfig3) => {
      const _httpAuthSchemes = runtimeConfig3.httpAuthSchemes;
      let _httpAuthSchemeProvider = runtimeConfig3.httpAuthSchemeProvider;
      let _credentials = runtimeConfig3.credentials;
      return {
        setHttpAuthScheme(httpAuthScheme) {
          const index2 = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
          if (index2 === -1) {
            _httpAuthSchemes.push(httpAuthScheme);
          } else {
            _httpAuthSchemes.splice(index2, 1, httpAuthScheme);
          }
        },
        httpAuthSchemes() {
          return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider3) {
          _httpAuthSchemeProvider = httpAuthSchemeProvider3;
        },
        httpAuthSchemeProvider() {
          return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
          _credentials = credentials;
        },
        credentials() {
          return _credentials;
        }
      };
    };
    const resolveHttpAuthRuntimeConfig = (config) => {
      return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
      };
    };
    const resolveRuntimeExtensions = (runtimeConfig3, extensions) => {
      const extensionConfiguration = Object.assign(regionConfigResolver.getAwsRegionExtensionConfiguration(runtimeConfig3), smithyClient.getDefaultExtensionConfiguration(runtimeConfig3), protocolHttp.getHttpHandlerExtensionConfiguration(runtimeConfig3), getHttpAuthExtensionConfiguration(runtimeConfig3));
      extensions.forEach((extension) => extension.configure(extensionConfiguration));
      return Object.assign(runtimeConfig3, regionConfigResolver.resolveAwsRegionExtensionConfiguration(extensionConfiguration), smithyClient.resolveDefaultRuntimeConfig(extensionConfiguration), protocolHttp.resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
    };
    class SSOOIDCClient extends smithyClient.Client {
      config;
      constructor(...[configuration]) {
        const _config_0 = runtimeConfig2.getRuntimeConfig(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = middlewareUserAgent.resolveUserAgentConfig(_config_1);
        const _config_3 = middlewareRetry.resolveRetryConfig(_config_2);
        const _config_4 = configResolver.resolveRegionConfig(_config_3);
        const _config_5 = middlewareHostHeader.resolveHostHeaderConfig(_config_4);
        const _config_6 = middlewareEndpoint.resolveEndpointConfig(_config_5);
        const _config_7 = httpAuthSchemeProvider2.resolveHttpAuthSchemeConfig(_config_6);
        const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use(schema.getSchemaSerdePlugin(this.config));
        this.middlewareStack.use(middlewareUserAgent.getUserAgentPlugin(this.config));
        this.middlewareStack.use(middlewareRetry.getRetryPlugin(this.config));
        this.middlewareStack.use(middlewareContentLength.getContentLengthPlugin(this.config));
        this.middlewareStack.use(middlewareHostHeader.getHostHeaderPlugin(this.config));
        this.middlewareStack.use(middlewareLogger.getLoggerPlugin(this.config));
        this.middlewareStack.use(middlewareRecursionDetection.getRecursionDetectionPlugin(this.config));
        this.middlewareStack.use(core.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: httpAuthSchemeProvider2.defaultSSOOIDCHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": config.credentials
          })
        }));
        this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
      }
      destroy() {
        super.destroy();
      }
    }
    class CreateTokenCommand extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
      return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
    }).s("AWSSSOOIDCService", "CreateToken", {}).n("SSOOIDCClient", "CreateTokenCommand").sc(schemas_02.CreateToken$).build() {
    }
    const commands = {
      CreateTokenCommand
    };
    class SSOOIDC extends SSOOIDCClient {
    }
    smithyClient.createAggregatedClient(commands, SSOOIDC);
    const AccessDeniedExceptionReason = {
      KMS_ACCESS_DENIED: "KMS_AccessDeniedException"
    };
    const InvalidRequestExceptionReason = {
      KMS_DISABLED_KEY: "KMS_DisabledException",
      KMS_INVALID_KEY_USAGE: "KMS_InvalidKeyUsageException",
      KMS_INVALID_STATE: "KMS_InvalidStateException",
      KMS_KEY_NOT_FOUND: "KMS_NotFoundException"
    };
    exports$12.$Command = smithyClient.Command;
    exports$12.__Client = smithyClient.Client;
    exports$12.SSOOIDCServiceException = SSOOIDCServiceException2.SSOOIDCServiceException;
    exports$12.AccessDeniedExceptionReason = AccessDeniedExceptionReason;
    exports$12.CreateTokenCommand = CreateTokenCommand;
    exports$12.InvalidRequestExceptionReason = InvalidRequestExceptionReason;
    exports$12.SSOOIDC = SSOOIDC;
    exports$12.SSOOIDCClient = SSOOIDCClient;
    Object.prototype.hasOwnProperty.call(schemas_02, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: schemas_02["__proto__"]
    });
    Object.keys(schemas_02).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = schemas_02[k];
    });
    Object.prototype.hasOwnProperty.call(errors2, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: errors2["__proto__"]
    });
    Object.keys(errors2).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = errors2[k];
    });
  })(ssoOidc);
  return ssoOidc;
}
var ssoOidcExports = /* @__PURE__ */ requireSsoOidc();
const index$2 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null
}, [ssoOidcExports]);
var sso = {};
var httpAuthSchemeProvider$2 = {};
var hasRequiredHttpAuthSchemeProvider$2;
function requireHttpAuthSchemeProvider$2() {
  if (hasRequiredHttpAuthSchemeProvider$2) return httpAuthSchemeProvider$2;
  hasRequiredHttpAuthSchemeProvider$2 = 1;
  Object.defineProperty(httpAuthSchemeProvider$2, "__esModule", { value: true });
  httpAuthSchemeProvider$2.resolveHttpAuthSchemeConfig = httpAuthSchemeProvider$2.defaultSSOHttpAuthSchemeProvider = httpAuthSchemeProvider$2.defaultSSOHttpAuthSchemeParametersProvider = void 0;
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const util_middleware_1 = require$$1$1;
  const defaultSSOHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
      operation: (0, util_middleware_1.getSmithyContext)(context).operation,
      region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })()
    };
  };
  httpAuthSchemeProvider$2.defaultSSOHttpAuthSchemeParametersProvider = defaultSSOHttpAuthSchemeParametersProvider;
  function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "awsssoportal",
        region: authParameters.region
      },
      propertiesExtractor: (config, context) => ({
        signingProperties: {
          config,
          context
        }
      })
    };
  }
  function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
      schemeId: "smithy.api#noAuth"
    };
  }
  const defaultSSOHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
      case "GetRoleCredentials": {
        options.push(createSmithyApiNoAuthHttpAuthOption());
        break;
      }
      default: {
        options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      }
    }
    return options;
  };
  httpAuthSchemeProvider$2.defaultSSOHttpAuthSchemeProvider = defaultSSOHttpAuthSchemeProvider;
  const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0, core_1.resolveAwsSdkSigV4Config)(config);
    return Object.assign(config_0, {
      authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? [])
    });
  };
  httpAuthSchemeProvider$2.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
  return httpAuthSchemeProvider$2;
}
var runtimeConfig$2 = {};
var runtimeConfig_shared$2 = {};
var endpointResolver$2 = {};
var ruleset$2 = {};
var hasRequiredRuleset$2;
function requireRuleset$2() {
  if (hasRequiredRuleset$2) return ruleset$2;
  hasRequiredRuleset$2 = 1;
  Object.defineProperty(ruleset$2, "__esModule", { value: true });
  ruleset$2.ruleSet = void 0;
  const u = "required", v = "fn", w = "argv", x = "ref";
  const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "getAttr", i = { [u]: false, type: "string" }, j = { [u]: true, default: false, type: "boolean" }, k = { [x]: "Endpoint" }, l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] }, m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] }, n = {}, o = { [v]: h, [w]: [{ [x]: g }, "supportsFIPS"] }, p = { [x]: g }, q = { [v]: c, [w]: [true, { [v]: h, [w]: [p, "supportsDualStack"] }] }, r = [l], s = [m], t = [{ [x]: "Region" }];
  const _data = {
    version: "1.0",
    parameters: { Region: i, UseDualStack: j, UseFIPS: j, Endpoint: i },
    rules: [
      {
        conditions: [{ [v]: b, [w]: [k] }],
        rules: [
          { conditions: r, error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d },
          { conditions: s, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", type: d },
          { endpoint: { url: k, properties: n, headers: n }, type: e }
        ],
        type: f
      },
      {
        conditions: [{ [v]: b, [w]: t }],
        rules: [
          {
            conditions: [{ [v]: "aws.partition", [w]: t, assign: g }],
            rules: [
              {
                conditions: [l, m],
                rules: [
                  {
                    conditions: [{ [v]: c, [w]: [a, o] }, q],
                    rules: [
                      {
                        endpoint: {
                          url: "https://portal.sso-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: n,
                          headers: n
                        },
                        type: e
                      }
                    ],
                    type: f
                  },
                  { error: "FIPS and DualStack are enabled, but this partition does not support one or both", type: d }
                ],
                type: f
              },
              {
                conditions: r,
                rules: [
                  {
                    conditions: [{ [v]: c, [w]: [o, a] }],
                    rules: [
                      {
                        conditions: [{ [v]: "stringEquals", [w]: [{ [v]: h, [w]: [p, "name"] }, "aws-us-gov"] }],
                        endpoint: { url: "https://portal.sso.{Region}.amazonaws.com", properties: n, headers: n },
                        type: e
                      },
                      {
                        endpoint: {
                          url: "https://portal.sso-fips.{Region}.{PartitionResult#dnsSuffix}",
                          properties: n,
                          headers: n
                        },
                        type: e
                      }
                    ],
                    type: f
                  },
                  { error: "FIPS is enabled but this partition does not support FIPS", type: d }
                ],
                type: f
              },
              {
                conditions: s,
                rules: [
                  {
                    conditions: [q],
                    rules: [
                      {
                        endpoint: {
                          url: "https://portal.sso.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: n,
                          headers: n
                        },
                        type: e
                      }
                    ],
                    type: f
                  },
                  { error: "DualStack is enabled but this partition does not support DualStack", type: d }
                ],
                type: f
              },
              {
                endpoint: { url: "https://portal.sso.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n },
                type: e
              }
            ],
            type: f
          }
        ],
        type: f
      },
      { error: "Invalid Configuration: Missing Region", type: d }
    ]
  };
  ruleset$2.ruleSet = _data;
  return ruleset$2;
}
var hasRequiredEndpointResolver$2;
function requireEndpointResolver$2() {
  if (hasRequiredEndpointResolver$2) return endpointResolver$2;
  hasRequiredEndpointResolver$2 = 1;
  Object.defineProperty(endpointResolver$2, "__esModule", { value: true });
  endpointResolver$2.defaultEndpointResolver = void 0;
  const util_endpoints_1 = require$$0;
  const util_endpoints_2 = require$$1$2;
  const ruleset_1 = /* @__PURE__ */ requireRuleset$2();
  const cache = new util_endpoints_2.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
  });
  const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
      endpointParams,
      logger: context.logger
    }));
  };
  endpointResolver$2.defaultEndpointResolver = defaultEndpointResolver;
  util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
  return endpointResolver$2;
}
var schemas_0$2 = {};
var errors$2 = {};
var SSOServiceException = {};
var hasRequiredSSOServiceException;
function requireSSOServiceException() {
  if (hasRequiredSSOServiceException) return SSOServiceException;
  hasRequiredSSOServiceException = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.SSOServiceException = exports$12.__ServiceException = void 0;
    const smithy_client_1 = require$$10;
    Object.defineProperty(exports$12, "__ServiceException", { enumerable: true, get: function() {
      return smithy_client_1.ServiceException;
    } });
    class SSOServiceException2 extends smithy_client_1.ServiceException {
      constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SSOServiceException2.prototype);
      }
    }
    exports$12.SSOServiceException = SSOServiceException2;
  })(SSOServiceException);
  return SSOServiceException;
}
var hasRequiredErrors$2;
function requireErrors$2() {
  if (hasRequiredErrors$2) return errors$2;
  hasRequiredErrors$2 = 1;
  Object.defineProperty(errors$2, "__esModule", { value: true });
  errors$2.UnauthorizedException = errors$2.TooManyRequestsException = errors$2.ResourceNotFoundException = errors$2.InvalidRequestException = void 0;
  const SSOServiceException_1 = /* @__PURE__ */ requireSSOServiceException();
  class InvalidRequestException extends SSOServiceException_1.SSOServiceException {
    name = "InvalidRequestException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "InvalidRequestException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, InvalidRequestException.prototype);
    }
  }
  errors$2.InvalidRequestException = InvalidRequestException;
  class ResourceNotFoundException extends SSOServiceException_1.SSOServiceException {
    name = "ResourceNotFoundException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "ResourceNotFoundException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
  }
  errors$2.ResourceNotFoundException = ResourceNotFoundException;
  class TooManyRequestsException extends SSOServiceException_1.SSOServiceException {
    name = "TooManyRequestsException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "TooManyRequestsException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, TooManyRequestsException.prototype);
    }
  }
  errors$2.TooManyRequestsException = TooManyRequestsException;
  class UnauthorizedException extends SSOServiceException_1.SSOServiceException {
    name = "UnauthorizedException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "UnauthorizedException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, UnauthorizedException.prototype);
    }
  }
  errors$2.UnauthorizedException = UnauthorizedException;
  return errors$2;
}
var hasRequiredSchemas_0$2;
function requireSchemas_0$2() {
  if (hasRequiredSchemas_0$2) return schemas_0$2;
  hasRequiredSchemas_0$2 = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.GetRoleCredentials$ = exports$12.RoleCredentials$ = exports$12.GetRoleCredentialsResponse$ = exports$12.GetRoleCredentialsRequest$ = exports$12.errorTypeRegistries = exports$12.UnauthorizedException$ = exports$12.TooManyRequestsException$ = exports$12.ResourceNotFoundException$ = exports$12.InvalidRequestException$ = exports$12.SSOServiceException$ = void 0;
    const _ATT = "AccessTokenType";
    const _GRC = "GetRoleCredentials";
    const _GRCR = "GetRoleCredentialsRequest";
    const _GRCRe = "GetRoleCredentialsResponse";
    const _IRE = "InvalidRequestException";
    const _RC = "RoleCredentials";
    const _RNFE = "ResourceNotFoundException";
    const _SAKT = "SecretAccessKeyType";
    const _STT = "SessionTokenType";
    const _TMRE = "TooManyRequestsException";
    const _UE = "UnauthorizedException";
    const _aI = "accountId";
    const _aKI = "accessKeyId";
    const _aT = "accessToken";
    const _ai = "account_id";
    const _c = "client";
    const _e = "error";
    const _ex = "expiration";
    const _h = "http";
    const _hE = "httpError";
    const _hH = "httpHeader";
    const _hQ = "httpQuery";
    const _m = "message";
    const _rC = "roleCredentials";
    const _rN = "roleName";
    const _rn = "role_name";
    const _s = "smithy.ts.sdk.synthetic.com.amazonaws.sso";
    const _sAK = "secretAccessKey";
    const _sT = "sessionToken";
    const _xasbt = "x-amz-sso_bearer_token";
    const n0 = "com.amazonaws.sso";
    const schema_1 = /* @__PURE__ */ requireSchema();
    const errors_1 = /* @__PURE__ */ requireErrors$2();
    const SSOServiceException_1 = /* @__PURE__ */ requireSSOServiceException();
    const _s_registry = schema_1.TypeRegistry.for(_s);
    exports$12.SSOServiceException$ = [-3, _s, "SSOServiceException", 0, [], []];
    _s_registry.registerError(exports$12.SSOServiceException$, SSOServiceException_1.SSOServiceException);
    const n0_registry = schema_1.TypeRegistry.for(n0);
    exports$12.InvalidRequestException$ = [-3, n0, _IRE, { [_e]: _c, [_hE]: 400 }, [_m], [0]];
    n0_registry.registerError(exports$12.InvalidRequestException$, errors_1.InvalidRequestException);
    exports$12.ResourceNotFoundException$ = [-3, n0, _RNFE, { [_e]: _c, [_hE]: 404 }, [_m], [0]];
    n0_registry.registerError(exports$12.ResourceNotFoundException$, errors_1.ResourceNotFoundException);
    exports$12.TooManyRequestsException$ = [-3, n0, _TMRE, { [_e]: _c, [_hE]: 429 }, [_m], [0]];
    n0_registry.registerError(exports$12.TooManyRequestsException$, errors_1.TooManyRequestsException);
    exports$12.UnauthorizedException$ = [-3, n0, _UE, { [_e]: _c, [_hE]: 401 }, [_m], [0]];
    n0_registry.registerError(exports$12.UnauthorizedException$, errors_1.UnauthorizedException);
    exports$12.errorTypeRegistries = [_s_registry, n0_registry];
    var AccessTokenType = [0, n0, _ATT, 8, 0];
    var SecretAccessKeyType = [0, n0, _SAKT, 8, 0];
    var SessionTokenType = [0, n0, _STT, 8, 0];
    exports$12.GetRoleCredentialsRequest$ = [
      3,
      n0,
      _GRCR,
      0,
      [_rN, _aI, _aT],
      [
        [0, { [_hQ]: _rn }],
        [0, { [_hQ]: _ai }],
        [() => AccessTokenType, { [_hH]: _xasbt }]
      ],
      3
    ];
    exports$12.GetRoleCredentialsResponse$ = [
      3,
      n0,
      _GRCRe,
      0,
      [_rC],
      [[() => exports$12.RoleCredentials$, 0]]
    ];
    exports$12.RoleCredentials$ = [
      3,
      n0,
      _RC,
      0,
      [_aKI, _sAK, _sT, _ex],
      [0, [() => SecretAccessKeyType, 0], [() => SessionTokenType, 0], 1]
    ];
    exports$12.GetRoleCredentials$ = [
      9,
      n0,
      _GRC,
      { [_h]: ["GET", "/federation/credentials", 200] },
      () => exports$12.GetRoleCredentialsRequest$,
      () => exports$12.GetRoleCredentialsResponse$
    ];
  })(schemas_0$2);
  return schemas_0$2;
}
var hasRequiredRuntimeConfig_shared$2;
function requireRuntimeConfig_shared$2() {
  if (hasRequiredRuntimeConfig_shared$2) return runtimeConfig_shared$2;
  hasRequiredRuntimeConfig_shared$2 = 1;
  Object.defineProperty(runtimeConfig_shared$2, "__esModule", { value: true });
  runtimeConfig_shared$2.getRuntimeConfig = void 0;
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const protocols_1 = /* @__PURE__ */ requireProtocols();
  const core_2 = /* @__PURE__ */ requireDistCjs$1();
  const smithy_client_1 = require$$10;
  const url_parser_1 = require$$4;
  const util_base64_1 = require$$5;
  const util_utf8_1 = require$$6;
  const httpAuthSchemeProvider_1 = /* @__PURE__ */ requireHttpAuthSchemeProvider$2();
  const endpointResolver_1 = /* @__PURE__ */ requireEndpointResolver$2();
  const schemas_0_1 = /* @__PURE__ */ requireSchemas_0$2();
  const getRuntimeConfig = (config) => {
    return {
      apiVersion: "2019-06-10",
      base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
      base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
      disableHostPrefix: config?.disableHostPrefix ?? false,
      endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
      extensions: config?.extensions ?? [],
      httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSSOHttpAuthSchemeProvider,
      httpAuthSchemes: config?.httpAuthSchemes ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
          signer: new core_1.AwsSdkSigV4Signer()
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new core_2.NoAuthSigner()
        }
      ],
      logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
      protocol: config?.protocol ?? protocols_1.AwsRestJsonProtocol,
      protocolSettings: config?.protocolSettings ?? {
        defaultNamespace: "com.amazonaws.sso",
        errorTypeRegistries: schemas_0_1.errorTypeRegistries,
        version: "2019-06-10",
        serviceTarget: "SWBPortalService"
      },
      serviceId: config?.serviceId ?? "SSO",
      urlParser: config?.urlParser ?? url_parser_1.parseUrl,
      utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
      utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
    };
  };
  runtimeConfig_shared$2.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig_shared$2;
}
var hasRequiredRuntimeConfig$2;
function requireRuntimeConfig$2() {
  if (hasRequiredRuntimeConfig$2) return runtimeConfig$2;
  hasRequiredRuntimeConfig$2 = 1;
  Object.defineProperty(runtimeConfig$2, "__esModule", { value: true });
  runtimeConfig$2.getRuntimeConfig = void 0;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const package_json_1 = tslib_1.__importDefault(require$$1);
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const util_user_agent_node_1 = require$$3;
  const config_resolver_1 = require$$4$1;
  const hash_node_1 = require$$5$1;
  const middleware_retry_1 = require$$9;
  const node_config_provider_1 = require$$7;
  const node_http_handler_1 = require$$8;
  const smithy_client_1 = require$$10;
  const util_body_length_node_1 = require$$10$1;
  const util_defaults_mode_node_1 = require$$11;
  const util_retry_1 = require$$12;
  const runtimeConfig_shared_1 = /* @__PURE__ */ requireRuntimeConfig_shared$2();
  const getRuntimeConfig = (config) => {
    (0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    (0, core_1.emitWarningIfUnsupportedVersion)(process.version);
    const loaderConfig = {
      profile: config?.profile,
      logger: clientSharedValues.logger
    };
    return {
      ...clientSharedValues,
      ...config,
      runtime: "node",
      defaultsMode,
      authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
      bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
      defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
      maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
      region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, { ...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
      requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
      retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
        ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
        default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
      }, config),
      sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
      streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
      useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
    };
  };
  runtimeConfig$2.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig$2;
}
var hasRequiredSso;
function requireSso() {
  if (hasRequiredSso) return sso;
  hasRequiredSso = 1;
  (function(exports$12) {
    var middlewareHostHeader = require$$0$1;
    var middlewareLogger = require$$1$3;
    var middlewareRecursionDetection = require$$2;
    var middlewareUserAgent = require$$3$1;
    var configResolver = require$$4$1;
    var core = /* @__PURE__ */ requireDistCjs$1();
    var schema = /* @__PURE__ */ requireSchema();
    var middlewareContentLength = require$$7$1;
    var middlewareEndpoint = require$$8$1;
    var middlewareRetry = require$$9;
    var smithyClient = require$$10;
    var httpAuthSchemeProvider2 = /* @__PURE__ */ requireHttpAuthSchemeProvider$2();
    var runtimeConfig2 = /* @__PURE__ */ requireRuntimeConfig$2();
    var regionConfigResolver = require$$13;
    var protocolHttp = require$$14;
    var schemas_02 = /* @__PURE__ */ requireSchemas_0$2();
    var errors2 = /* @__PURE__ */ requireErrors$2();
    var SSOServiceException2 = /* @__PURE__ */ requireSSOServiceException();
    const resolveClientEndpointParameters = (options) => {
      return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "awsssoportal"
      });
    };
    const commonParams = {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
    };
    const getHttpAuthExtensionConfiguration = (runtimeConfig3) => {
      const _httpAuthSchemes = runtimeConfig3.httpAuthSchemes;
      let _httpAuthSchemeProvider = runtimeConfig3.httpAuthSchemeProvider;
      let _credentials = runtimeConfig3.credentials;
      return {
        setHttpAuthScheme(httpAuthScheme) {
          const index2 = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
          if (index2 === -1) {
            _httpAuthSchemes.push(httpAuthScheme);
          } else {
            _httpAuthSchemes.splice(index2, 1, httpAuthScheme);
          }
        },
        httpAuthSchemes() {
          return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider3) {
          _httpAuthSchemeProvider = httpAuthSchemeProvider3;
        },
        httpAuthSchemeProvider() {
          return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
          _credentials = credentials;
        },
        credentials() {
          return _credentials;
        }
      };
    };
    const resolveHttpAuthRuntimeConfig = (config) => {
      return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
      };
    };
    const resolveRuntimeExtensions = (runtimeConfig3, extensions) => {
      const extensionConfiguration = Object.assign(regionConfigResolver.getAwsRegionExtensionConfiguration(runtimeConfig3), smithyClient.getDefaultExtensionConfiguration(runtimeConfig3), protocolHttp.getHttpHandlerExtensionConfiguration(runtimeConfig3), getHttpAuthExtensionConfiguration(runtimeConfig3));
      extensions.forEach((extension) => extension.configure(extensionConfiguration));
      return Object.assign(runtimeConfig3, regionConfigResolver.resolveAwsRegionExtensionConfiguration(extensionConfiguration), smithyClient.resolveDefaultRuntimeConfig(extensionConfiguration), protocolHttp.resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
    };
    class SSOClient extends smithyClient.Client {
      config;
      constructor(...[configuration]) {
        const _config_0 = runtimeConfig2.getRuntimeConfig(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = middlewareUserAgent.resolveUserAgentConfig(_config_1);
        const _config_3 = middlewareRetry.resolveRetryConfig(_config_2);
        const _config_4 = configResolver.resolveRegionConfig(_config_3);
        const _config_5 = middlewareHostHeader.resolveHostHeaderConfig(_config_4);
        const _config_6 = middlewareEndpoint.resolveEndpointConfig(_config_5);
        const _config_7 = httpAuthSchemeProvider2.resolveHttpAuthSchemeConfig(_config_6);
        const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use(schema.getSchemaSerdePlugin(this.config));
        this.middlewareStack.use(middlewareUserAgent.getUserAgentPlugin(this.config));
        this.middlewareStack.use(middlewareRetry.getRetryPlugin(this.config));
        this.middlewareStack.use(middlewareContentLength.getContentLengthPlugin(this.config));
        this.middlewareStack.use(middlewareHostHeader.getHostHeaderPlugin(this.config));
        this.middlewareStack.use(middlewareLogger.getLoggerPlugin(this.config));
        this.middlewareStack.use(middlewareRecursionDetection.getRecursionDetectionPlugin(this.config));
        this.middlewareStack.use(core.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: httpAuthSchemeProvider2.defaultSSOHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": config.credentials
          })
        }));
        this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
      }
      destroy() {
        super.destroy();
      }
    }
    class GetRoleCredentialsCommand extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
      return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
    }).s("SWBPortalService", "GetRoleCredentials", {}).n("SSOClient", "GetRoleCredentialsCommand").sc(schemas_02.GetRoleCredentials$).build() {
    }
    const commands = {
      GetRoleCredentialsCommand
    };
    class SSO extends SSOClient {
    }
    smithyClient.createAggregatedClient(commands, SSO);
    exports$12.$Command = smithyClient.Command;
    exports$12.__Client = smithyClient.Client;
    exports$12.SSOServiceException = SSOServiceException2.SSOServiceException;
    exports$12.GetRoleCredentialsCommand = GetRoleCredentialsCommand;
    exports$12.SSO = SSO;
    exports$12.SSOClient = SSOClient;
    Object.prototype.hasOwnProperty.call(schemas_02, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: schemas_02["__proto__"]
    });
    Object.keys(schemas_02).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = schemas_02[k];
    });
    Object.prototype.hasOwnProperty.call(errors2, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: errors2["__proto__"]
    });
    Object.keys(errors2).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = errors2[k];
    });
  })(sso);
  return sso;
}
var ssoExports = /* @__PURE__ */ requireSso();
var sts = {};
var STSClient = {};
var httpAuthSchemeProvider$1 = {};
var hasRequiredHttpAuthSchemeProvider$1;
function requireHttpAuthSchemeProvider$1() {
  if (hasRequiredHttpAuthSchemeProvider$1) return httpAuthSchemeProvider$1;
  hasRequiredHttpAuthSchemeProvider$1 = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.resolveHttpAuthSchemeConfig = exports$12.resolveStsAuthConfig = exports$12.defaultSTSHttpAuthSchemeProvider = exports$12.defaultSTSHttpAuthSchemeParametersProvider = void 0;
    const core_1 = /* @__PURE__ */ requireDistCjs();
    const util_middleware_1 = require$$1$1;
    const STSClient_1 = /* @__PURE__ */ requireSTSClient();
    const defaultSTSHttpAuthSchemeParametersProvider = async (config, context, input) => {
      return {
        operation: (0, util_middleware_1.getSmithyContext)(context).operation,
        region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
          throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
        })()
      };
    };
    exports$12.defaultSTSHttpAuthSchemeParametersProvider = defaultSTSHttpAuthSchemeParametersProvider;
    function createAwsAuthSigv4HttpAuthOption(authParameters) {
      return {
        schemeId: "aws.auth#sigv4",
        signingProperties: {
          name: "sts",
          region: authParameters.region
        },
        propertiesExtractor: (config, context) => ({
          signingProperties: {
            config,
            context
          }
        })
      };
    }
    function createSmithyApiNoAuthHttpAuthOption(authParameters) {
      return {
        schemeId: "smithy.api#noAuth"
      };
    }
    const defaultSTSHttpAuthSchemeProvider = (authParameters) => {
      const options = [];
      switch (authParameters.operation) {
        case "AssumeRoleWithWebIdentity": {
          options.push(createSmithyApiNoAuthHttpAuthOption());
          break;
        }
        default: {
          options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
        }
      }
      return options;
    };
    exports$12.defaultSTSHttpAuthSchemeProvider = defaultSTSHttpAuthSchemeProvider;
    const resolveStsAuthConfig = (input) => Object.assign(input, {
      stsClientCtor: STSClient_1.STSClient
    });
    exports$12.resolveStsAuthConfig = resolveStsAuthConfig;
    const resolveHttpAuthSchemeConfig = (config) => {
      const config_0 = (0, exports$12.resolveStsAuthConfig)(config);
      const config_1 = (0, core_1.resolveAwsSdkSigV4Config)(config_0);
      return Object.assign(config_1, {
        authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? [])
      });
    };
    exports$12.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
  })(httpAuthSchemeProvider$1);
  return httpAuthSchemeProvider$1;
}
var EndpointParameters = {};
var hasRequiredEndpointParameters;
function requireEndpointParameters() {
  if (hasRequiredEndpointParameters) return EndpointParameters;
  hasRequiredEndpointParameters = 1;
  Object.defineProperty(EndpointParameters, "__esModule", { value: true });
  EndpointParameters.commonParams = EndpointParameters.resolveClientEndpointParameters = void 0;
  const resolveClientEndpointParameters = (options) => {
    return Object.assign(options, {
      useDualstackEndpoint: options.useDualstackEndpoint ?? false,
      useFipsEndpoint: options.useFipsEndpoint ?? false,
      useGlobalEndpoint: options.useGlobalEndpoint ?? false,
      defaultSigningName: "sts"
    });
  };
  EndpointParameters.resolveClientEndpointParameters = resolveClientEndpointParameters;
  EndpointParameters.commonParams = {
    UseGlobalEndpoint: { type: "builtInParams", name: "useGlobalEndpoint" },
    UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
    Endpoint: { type: "builtInParams", name: "endpoint" },
    Region: { type: "builtInParams", name: "region" },
    UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
  };
  return EndpointParameters;
}
var runtimeConfig$1 = {};
var runtimeConfig_shared$1 = {};
var endpointResolver$1 = {};
var ruleset$1 = {};
var hasRequiredRuleset$1;
function requireRuleset$1() {
  if (hasRequiredRuleset$1) return ruleset$1;
  hasRequiredRuleset$1 = 1;
  Object.defineProperty(ruleset$1, "__esModule", { value: true });
  ruleset$1.ruleSet = void 0;
  const F = "required", G = "type", H = "fn", I = "argv", J = "ref";
  const a = false, b = true, c = "booleanEquals", d = "stringEquals", e = "sigv4", f = "sts", g = "us-east-1", h = "endpoint", i = "https://sts.{Region}.{PartitionResult#dnsSuffix}", j = "tree", k = "error", l = "getAttr", m = { [F]: false, [G]: "string" }, n = { [F]: true, default: false, [G]: "boolean" }, o = { [J]: "Endpoint" }, p = { [H]: "isSet", [I]: [{ [J]: "Region" }] }, q = { [J]: "Region" }, r = { [H]: "aws.partition", [I]: [q], assign: "PartitionResult" }, s = { [J]: "UseFIPS" }, t = { [J]: "UseDualStack" }, u = {
    url: "https://sts.amazonaws.com",
    properties: { authSchemes: [{ name: e, signingName: f, signingRegion: g }] },
    headers: {}
  }, v = {}, w = { conditions: [{ [H]: d, [I]: [q, "aws-global"] }], [h]: u, [G]: h }, x = { [H]: c, [I]: [s, true] }, y = { [H]: c, [I]: [t, true] }, z = { [H]: l, [I]: [{ [J]: "PartitionResult" }, "supportsFIPS"] }, A = { [J]: "PartitionResult" }, B = { [H]: c, [I]: [true, { [H]: l, [I]: [A, "supportsDualStack"] }] }, C = [{ [H]: "isSet", [I]: [o] }], D = [x], E = [y];
  const _data = {
    version: "1.0",
    parameters: { Region: m, UseDualStack: n, UseFIPS: n, Endpoint: m, UseGlobalEndpoint: n },
    rules: [
      {
        conditions: [
          { [H]: c, [I]: [{ [J]: "UseGlobalEndpoint" }, b] },
          { [H]: "not", [I]: C },
          p,
          r,
          { [H]: c, [I]: [s, a] },
          { [H]: c, [I]: [t, a] }
        ],
        rules: [
          { conditions: [{ [H]: d, [I]: [q, "ap-northeast-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "ap-south-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "ap-southeast-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "ap-southeast-2"] }], endpoint: u, [G]: h },
          w,
          { conditions: [{ [H]: d, [I]: [q, "ca-central-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "eu-central-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "eu-north-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "eu-west-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "eu-west-2"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "eu-west-3"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "sa-east-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, g] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "us-east-2"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "us-west-1"] }], endpoint: u, [G]: h },
          { conditions: [{ [H]: d, [I]: [q, "us-west-2"] }], endpoint: u, [G]: h },
          {
            endpoint: {
              url: i,
              properties: { authSchemes: [{ name: e, signingName: f, signingRegion: "{Region}" }] },
              headers: v
            },
            [G]: h
          }
        ],
        [G]: j
      },
      {
        conditions: C,
        rules: [
          { conditions: D, error: "Invalid Configuration: FIPS and custom endpoint are not supported", [G]: k },
          { conditions: E, error: "Invalid Configuration: Dualstack and custom endpoint are not supported", [G]: k },
          { endpoint: { url: o, properties: v, headers: v }, [G]: h }
        ],
        [G]: j
      },
      {
        conditions: [p],
        rules: [
          {
            conditions: [r],
            rules: [
              {
                conditions: [x, y],
                rules: [
                  {
                    conditions: [{ [H]: c, [I]: [b, z] }, B],
                    rules: [
                      {
                        endpoint: {
                          url: "https://sts-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: v,
                          headers: v
                        },
                        [G]: h
                      }
                    ],
                    [G]: j
                  },
                  { error: "FIPS and DualStack are enabled, but this partition does not support one or both", [G]: k }
                ],
                [G]: j
              },
              {
                conditions: D,
                rules: [
                  {
                    conditions: [{ [H]: c, [I]: [z, b] }],
                    rules: [
                      {
                        conditions: [{ [H]: d, [I]: [{ [H]: l, [I]: [A, "name"] }, "aws-us-gov"] }],
                        endpoint: { url: "https://sts.{Region}.amazonaws.com", properties: v, headers: v },
                        [G]: h
                      },
                      {
                        endpoint: {
                          url: "https://sts-fips.{Region}.{PartitionResult#dnsSuffix}",
                          properties: v,
                          headers: v
                        },
                        [G]: h
                      }
                    ],
                    [G]: j
                  },
                  { error: "FIPS is enabled but this partition does not support FIPS", [G]: k }
                ],
                [G]: j
              },
              {
                conditions: E,
                rules: [
                  {
                    conditions: [B],
                    rules: [
                      {
                        endpoint: {
                          url: "https://sts.{Region}.{PartitionResult#dualStackDnsSuffix}",
                          properties: v,
                          headers: v
                        },
                        [G]: h
                      }
                    ],
                    [G]: j
                  },
                  { error: "DualStack is enabled but this partition does not support DualStack", [G]: k }
                ],
                [G]: j
              },
              w,
              { endpoint: { url: i, properties: v, headers: v }, [G]: h }
            ],
            [G]: j
          }
        ],
        [G]: j
      },
      { error: "Invalid Configuration: Missing Region", [G]: k }
    ]
  };
  ruleset$1.ruleSet = _data;
  return ruleset$1;
}
var hasRequiredEndpointResolver$1;
function requireEndpointResolver$1() {
  if (hasRequiredEndpointResolver$1) return endpointResolver$1;
  hasRequiredEndpointResolver$1 = 1;
  Object.defineProperty(endpointResolver$1, "__esModule", { value: true });
  endpointResolver$1.defaultEndpointResolver = void 0;
  const util_endpoints_1 = require$$0;
  const util_endpoints_2 = require$$1$2;
  const ruleset_1 = /* @__PURE__ */ requireRuleset$1();
  const cache = new util_endpoints_2.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS", "UseGlobalEndpoint"]
  });
  const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
      endpointParams,
      logger: context.logger
    }));
  };
  endpointResolver$1.defaultEndpointResolver = defaultEndpointResolver;
  util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
  return endpointResolver$1;
}
var schemas_0$1 = {};
var errors$1 = {};
var STSServiceException = {};
var hasRequiredSTSServiceException;
function requireSTSServiceException() {
  if (hasRequiredSTSServiceException) return STSServiceException;
  hasRequiredSTSServiceException = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.STSServiceException = exports$12.__ServiceException = void 0;
    const smithy_client_1 = require$$10;
    Object.defineProperty(exports$12, "__ServiceException", { enumerable: true, get: function() {
      return smithy_client_1.ServiceException;
    } });
    class STSServiceException2 extends smithy_client_1.ServiceException {
      constructor(options) {
        super(options);
        Object.setPrototypeOf(this, STSServiceException2.prototype);
      }
    }
    exports$12.STSServiceException = STSServiceException2;
  })(STSServiceException);
  return STSServiceException;
}
var hasRequiredErrors$1;
function requireErrors$1() {
  if (hasRequiredErrors$1) return errors$1;
  hasRequiredErrors$1 = 1;
  Object.defineProperty(errors$1, "__esModule", { value: true });
  errors$1.IDPCommunicationErrorException = errors$1.InvalidIdentityTokenException = errors$1.IDPRejectedClaimException = errors$1.RegionDisabledException = errors$1.PackedPolicyTooLargeException = errors$1.MalformedPolicyDocumentException = errors$1.ExpiredTokenException = void 0;
  const STSServiceException_1 = /* @__PURE__ */ requireSTSServiceException();
  class ExpiredTokenException extends STSServiceException_1.STSServiceException {
    name = "ExpiredTokenException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "ExpiredTokenException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, ExpiredTokenException.prototype);
    }
  }
  errors$1.ExpiredTokenException = ExpiredTokenException;
  class MalformedPolicyDocumentException extends STSServiceException_1.STSServiceException {
    name = "MalformedPolicyDocumentException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "MalformedPolicyDocumentException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, MalformedPolicyDocumentException.prototype);
    }
  }
  errors$1.MalformedPolicyDocumentException = MalformedPolicyDocumentException;
  class PackedPolicyTooLargeException extends STSServiceException_1.STSServiceException {
    name = "PackedPolicyTooLargeException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "PackedPolicyTooLargeException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, PackedPolicyTooLargeException.prototype);
    }
  }
  errors$1.PackedPolicyTooLargeException = PackedPolicyTooLargeException;
  class RegionDisabledException extends STSServiceException_1.STSServiceException {
    name = "RegionDisabledException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "RegionDisabledException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, RegionDisabledException.prototype);
    }
  }
  errors$1.RegionDisabledException = RegionDisabledException;
  class IDPRejectedClaimException extends STSServiceException_1.STSServiceException {
    name = "IDPRejectedClaimException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "IDPRejectedClaimException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, IDPRejectedClaimException.prototype);
    }
  }
  errors$1.IDPRejectedClaimException = IDPRejectedClaimException;
  class InvalidIdentityTokenException extends STSServiceException_1.STSServiceException {
    name = "InvalidIdentityTokenException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "InvalidIdentityTokenException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, InvalidIdentityTokenException.prototype);
    }
  }
  errors$1.InvalidIdentityTokenException = InvalidIdentityTokenException;
  class IDPCommunicationErrorException extends STSServiceException_1.STSServiceException {
    name = "IDPCommunicationErrorException";
    $fault = "client";
    constructor(opts) {
      super({
        name: "IDPCommunicationErrorException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, IDPCommunicationErrorException.prototype);
    }
  }
  errors$1.IDPCommunicationErrorException = IDPCommunicationErrorException;
  return errors$1;
}
var hasRequiredSchemas_0$1;
function requireSchemas_0$1() {
  if (hasRequiredSchemas_0$1) return schemas_0$1;
  hasRequiredSchemas_0$1 = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.AssumeRoleWithWebIdentity$ = exports$12.AssumeRole$ = exports$12.Tag$ = exports$12.ProvidedContext$ = exports$12.PolicyDescriptorType$ = exports$12.Credentials$ = exports$12.AssumeRoleWithWebIdentityResponse$ = exports$12.AssumeRoleWithWebIdentityRequest$ = exports$12.AssumeRoleResponse$ = exports$12.AssumeRoleRequest$ = exports$12.AssumedRoleUser$ = exports$12.errorTypeRegistries = exports$12.RegionDisabledException$ = exports$12.PackedPolicyTooLargeException$ = exports$12.MalformedPolicyDocumentException$ = exports$12.InvalidIdentityTokenException$ = exports$12.IDPRejectedClaimException$ = exports$12.IDPCommunicationErrorException$ = exports$12.ExpiredTokenException$ = exports$12.STSServiceException$ = void 0;
    const _A = "Arn";
    const _AKI = "AccessKeyId";
    const _AR = "AssumeRole";
    const _ARI = "AssumedRoleId";
    const _ARR = "AssumeRoleRequest";
    const _ARRs = "AssumeRoleResponse";
    const _ARU = "AssumedRoleUser";
    const _ARWWI = "AssumeRoleWithWebIdentity";
    const _ARWWIR = "AssumeRoleWithWebIdentityRequest";
    const _ARWWIRs = "AssumeRoleWithWebIdentityResponse";
    const _Au = "Audience";
    const _C = "Credentials";
    const _CA = "ContextAssertion";
    const _DS = "DurationSeconds";
    const _E = "Expiration";
    const _EI = "ExternalId";
    const _ETE = "ExpiredTokenException";
    const _IDPCEE = "IDPCommunicationErrorException";
    const _IDPRCE = "IDPRejectedClaimException";
    const _IITE = "InvalidIdentityTokenException";
    const _K = "Key";
    const _MPDE = "MalformedPolicyDocumentException";
    const _P = "Policy";
    const _PA = "PolicyArns";
    const _PAr = "ProviderArn";
    const _PC = "ProvidedContexts";
    const _PCLT = "ProvidedContextsListType";
    const _PCr = "ProvidedContext";
    const _PDT = "PolicyDescriptorType";
    const _PI = "ProviderId";
    const _PPS = "PackedPolicySize";
    const _PPTLE = "PackedPolicyTooLargeException";
    const _Pr = "Provider";
    const _RA = "RoleArn";
    const _RDE = "RegionDisabledException";
    const _RSN = "RoleSessionName";
    const _SAK = "SecretAccessKey";
    const _SFWIT = "SubjectFromWebIdentityToken";
    const _SI = "SourceIdentity";
    const _SN = "SerialNumber";
    const _ST = "SessionToken";
    const _T = "Tags";
    const _TC = "TokenCode";
    const _TTK = "TransitiveTagKeys";
    const _Ta = "Tag";
    const _V = "Value";
    const _WIT = "WebIdentityToken";
    const _a = "arn";
    const _aKST = "accessKeySecretType";
    const _aQE = "awsQueryError";
    const _c = "client";
    const _cTT = "clientTokenType";
    const _e = "error";
    const _hE = "httpError";
    const _m = "message";
    const _pDLT = "policyDescriptorListType";
    const _s = "smithy.ts.sdk.synthetic.com.amazonaws.sts";
    const _tLT = "tagListType";
    const n0 = "com.amazonaws.sts";
    const schema_1 = /* @__PURE__ */ requireSchema();
    const errors_1 = /* @__PURE__ */ requireErrors$1();
    const STSServiceException_1 = /* @__PURE__ */ requireSTSServiceException();
    const _s_registry = schema_1.TypeRegistry.for(_s);
    exports$12.STSServiceException$ = [-3, _s, "STSServiceException", 0, [], []];
    _s_registry.registerError(exports$12.STSServiceException$, STSServiceException_1.STSServiceException);
    const n0_registry = schema_1.TypeRegistry.for(n0);
    exports$12.ExpiredTokenException$ = [
      -3,
      n0,
      _ETE,
      { [_aQE]: [`ExpiredTokenException`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(exports$12.ExpiredTokenException$, errors_1.ExpiredTokenException);
    exports$12.IDPCommunicationErrorException$ = [
      -3,
      n0,
      _IDPCEE,
      { [_aQE]: [`IDPCommunicationError`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(exports$12.IDPCommunicationErrorException$, errors_1.IDPCommunicationErrorException);
    exports$12.IDPRejectedClaimException$ = [
      -3,
      n0,
      _IDPRCE,
      { [_aQE]: [`IDPRejectedClaim`, 403], [_e]: _c, [_hE]: 403 },
      [_m],
      [0]
    ];
    n0_registry.registerError(exports$12.IDPRejectedClaimException$, errors_1.IDPRejectedClaimException);
    exports$12.InvalidIdentityTokenException$ = [
      -3,
      n0,
      _IITE,
      { [_aQE]: [`InvalidIdentityToken`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(exports$12.InvalidIdentityTokenException$, errors_1.InvalidIdentityTokenException);
    exports$12.MalformedPolicyDocumentException$ = [
      -3,
      n0,
      _MPDE,
      { [_aQE]: [`MalformedPolicyDocument`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(exports$12.MalformedPolicyDocumentException$, errors_1.MalformedPolicyDocumentException);
    exports$12.PackedPolicyTooLargeException$ = [
      -3,
      n0,
      _PPTLE,
      { [_aQE]: [`PackedPolicyTooLarge`, 400], [_e]: _c, [_hE]: 400 },
      [_m],
      [0]
    ];
    n0_registry.registerError(exports$12.PackedPolicyTooLargeException$, errors_1.PackedPolicyTooLargeException);
    exports$12.RegionDisabledException$ = [
      -3,
      n0,
      _RDE,
      { [_aQE]: [`RegionDisabledException`, 403], [_e]: _c, [_hE]: 403 },
      [_m],
      [0]
    ];
    n0_registry.registerError(exports$12.RegionDisabledException$, errors_1.RegionDisabledException);
    exports$12.errorTypeRegistries = [_s_registry, n0_registry];
    var accessKeySecretType = [0, n0, _aKST, 8, 0];
    var clientTokenType = [0, n0, _cTT, 8, 0];
    exports$12.AssumedRoleUser$ = [3, n0, _ARU, 0, [_ARI, _A], [0, 0], 2];
    exports$12.AssumeRoleRequest$ = [
      3,
      n0,
      _ARR,
      0,
      [_RA, _RSN, _PA, _P, _DS, _T, _TTK, _EI, _SN, _TC, _SI, _PC],
      [0, 0, () => policyDescriptorListType, 0, 1, () => tagListType, 64 | 0, 0, 0, 0, 0, () => ProvidedContextsListType],
      2
    ];
    exports$12.AssumeRoleResponse$ = [
      3,
      n0,
      _ARRs,
      0,
      [_C, _ARU, _PPS, _SI],
      [[() => exports$12.Credentials$, 0], () => exports$12.AssumedRoleUser$, 1, 0]
    ];
    exports$12.AssumeRoleWithWebIdentityRequest$ = [
      3,
      n0,
      _ARWWIR,
      0,
      [_RA, _RSN, _WIT, _PI, _PA, _P, _DS],
      [0, 0, [() => clientTokenType, 0], 0, () => policyDescriptorListType, 0, 1],
      3
    ];
    exports$12.AssumeRoleWithWebIdentityResponse$ = [
      3,
      n0,
      _ARWWIRs,
      0,
      [_C, _SFWIT, _ARU, _PPS, _Pr, _Au, _SI],
      [[() => exports$12.Credentials$, 0], 0, () => exports$12.AssumedRoleUser$, 1, 0, 0, 0]
    ];
    exports$12.Credentials$ = [
      3,
      n0,
      _C,
      0,
      [_AKI, _SAK, _ST, _E],
      [0, [() => accessKeySecretType, 0], 0, 4],
      4
    ];
    exports$12.PolicyDescriptorType$ = [3, n0, _PDT, 0, [_a], [0]];
    exports$12.ProvidedContext$ = [3, n0, _PCr, 0, [_PAr, _CA], [0, 0]];
    exports$12.Tag$ = [3, n0, _Ta, 0, [_K, _V], [0, 0], 2];
    var policyDescriptorListType = [1, n0, _pDLT, 0, () => exports$12.PolicyDescriptorType$];
    var ProvidedContextsListType = [1, n0, _PCLT, 0, () => exports$12.ProvidedContext$];
    var tagListType = [1, n0, _tLT, 0, () => exports$12.Tag$];
    exports$12.AssumeRole$ = [9, n0, _AR, 0, () => exports$12.AssumeRoleRequest$, () => exports$12.AssumeRoleResponse$];
    exports$12.AssumeRoleWithWebIdentity$ = [
      9,
      n0,
      _ARWWI,
      0,
      () => exports$12.AssumeRoleWithWebIdentityRequest$,
      () => exports$12.AssumeRoleWithWebIdentityResponse$
    ];
  })(schemas_0$1);
  return schemas_0$1;
}
var hasRequiredRuntimeConfig_shared$1;
function requireRuntimeConfig_shared$1() {
  if (hasRequiredRuntimeConfig_shared$1) return runtimeConfig_shared$1;
  hasRequiredRuntimeConfig_shared$1 = 1;
  Object.defineProperty(runtimeConfig_shared$1, "__esModule", { value: true });
  runtimeConfig_shared$1.getRuntimeConfig = void 0;
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const protocols_1 = /* @__PURE__ */ requireProtocols();
  const core_2 = /* @__PURE__ */ requireDistCjs$1();
  const smithy_client_1 = require$$10;
  const url_parser_1 = require$$4;
  const util_base64_1 = require$$5;
  const util_utf8_1 = require$$6;
  const httpAuthSchemeProvider_1 = /* @__PURE__ */ requireHttpAuthSchemeProvider$1();
  const endpointResolver_1 = /* @__PURE__ */ requireEndpointResolver$1();
  const schemas_0_1 = /* @__PURE__ */ requireSchemas_0$1();
  const getRuntimeConfig = (config) => {
    return {
      apiVersion: "2011-06-15",
      base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
      base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
      disableHostPrefix: config?.disableHostPrefix ?? false,
      endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
      extensions: config?.extensions ?? [],
      httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeProvider,
      httpAuthSchemes: config?.httpAuthSchemes ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
          signer: new core_1.AwsSdkSigV4Signer()
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new core_2.NoAuthSigner()
        }
      ],
      logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
      protocol: config?.protocol ?? protocols_1.AwsQueryProtocol,
      protocolSettings: config?.protocolSettings ?? {
        defaultNamespace: "com.amazonaws.sts",
        errorTypeRegistries: schemas_0_1.errorTypeRegistries,
        xmlNamespace: "https://sts.amazonaws.com/doc/2011-06-15/",
        version: "2011-06-15",
        serviceTarget: "AWSSecurityTokenServiceV20110615"
      },
      serviceId: config?.serviceId ?? "STS",
      urlParser: config?.urlParser ?? url_parser_1.parseUrl,
      utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
      utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
    };
  };
  runtimeConfig_shared$1.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig_shared$1;
}
var hasRequiredRuntimeConfig$1;
function requireRuntimeConfig$1() {
  if (hasRequiredRuntimeConfig$1) return runtimeConfig$1;
  hasRequiredRuntimeConfig$1 = 1;
  Object.defineProperty(runtimeConfig$1, "__esModule", { value: true });
  runtimeConfig$1.getRuntimeConfig = void 0;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const package_json_1 = tslib_1.__importDefault(require$$1);
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const util_user_agent_node_1 = require$$3;
  const config_resolver_1 = require$$4$1;
  const core_2 = /* @__PURE__ */ requireDistCjs$1();
  const hash_node_1 = require$$5$1;
  const middleware_retry_1 = require$$9;
  const node_config_provider_1 = require$$7;
  const node_http_handler_1 = require$$8;
  const smithy_client_1 = require$$10;
  const util_body_length_node_1 = require$$10$1;
  const util_defaults_mode_node_1 = require$$11;
  const util_retry_1 = require$$12;
  const runtimeConfig_shared_1 = /* @__PURE__ */ requireRuntimeConfig_shared$1();
  const getRuntimeConfig = (config) => {
    (0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    (0, core_1.emitWarningIfUnsupportedVersion)(process.version);
    const loaderConfig = {
      profile: config?.profile,
      logger: clientSharedValues.logger
    };
    return {
      ...clientSharedValues,
      ...config,
      runtime: "node",
      defaultsMode,
      authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
      bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
      defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
      httpAuthSchemes: config?.httpAuthSchemes ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4") || (async (idProps) => await config.credentialDefaultProvider(idProps?.__config || {})()),
          signer: new core_1.AwsSdkSigV4Signer()
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new core_2.NoAuthSigner()
        }
      ],
      maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
      region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, { ...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
      requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
      retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
        ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
        default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
      }, config),
      sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
      streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
      useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
    };
  };
  runtimeConfig$1.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig$1;
}
var runtimeExtensions = {};
var httpAuthExtensionConfiguration = {};
var hasRequiredHttpAuthExtensionConfiguration;
function requireHttpAuthExtensionConfiguration() {
  if (hasRequiredHttpAuthExtensionConfiguration) return httpAuthExtensionConfiguration;
  hasRequiredHttpAuthExtensionConfiguration = 1;
  Object.defineProperty(httpAuthExtensionConfiguration, "__esModule", { value: true });
  httpAuthExtensionConfiguration.resolveHttpAuthRuntimeConfig = httpAuthExtensionConfiguration.getHttpAuthExtensionConfiguration = void 0;
  const getHttpAuthExtensionConfiguration = (runtimeConfig2) => {
    const _httpAuthSchemes = runtimeConfig2.httpAuthSchemes;
    let _httpAuthSchemeProvider = runtimeConfig2.httpAuthSchemeProvider;
    let _credentials = runtimeConfig2.credentials;
    return {
      setHttpAuthScheme(httpAuthScheme) {
        const index2 = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
        if (index2 === -1) {
          _httpAuthSchemes.push(httpAuthScheme);
        } else {
          _httpAuthSchemes.splice(index2, 1, httpAuthScheme);
        }
      },
      httpAuthSchemes() {
        return _httpAuthSchemes;
      },
      setHttpAuthSchemeProvider(httpAuthSchemeProvider2) {
        _httpAuthSchemeProvider = httpAuthSchemeProvider2;
      },
      httpAuthSchemeProvider() {
        return _httpAuthSchemeProvider;
      },
      setCredentials(credentials) {
        _credentials = credentials;
      },
      credentials() {
        return _credentials;
      }
    };
  };
  httpAuthExtensionConfiguration.getHttpAuthExtensionConfiguration = getHttpAuthExtensionConfiguration;
  const resolveHttpAuthRuntimeConfig = (config) => {
    return {
      httpAuthSchemes: config.httpAuthSchemes(),
      httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
      credentials: config.credentials()
    };
  };
  httpAuthExtensionConfiguration.resolveHttpAuthRuntimeConfig = resolveHttpAuthRuntimeConfig;
  return httpAuthExtensionConfiguration;
}
var hasRequiredRuntimeExtensions;
function requireRuntimeExtensions() {
  if (hasRequiredRuntimeExtensions) return runtimeExtensions;
  hasRequiredRuntimeExtensions = 1;
  Object.defineProperty(runtimeExtensions, "__esModule", { value: true });
  runtimeExtensions.resolveRuntimeExtensions = void 0;
  const region_config_resolver_1 = require$$13;
  const protocol_http_1 = require$$14;
  const smithy_client_1 = require$$10;
  const httpAuthExtensionConfiguration_1 = /* @__PURE__ */ requireHttpAuthExtensionConfiguration();
  const resolveRuntimeExtensions = (runtimeConfig2, extensions) => {
    const extensionConfiguration = Object.assign((0, region_config_resolver_1.getAwsRegionExtensionConfiguration)(runtimeConfig2), (0, smithy_client_1.getDefaultExtensionConfiguration)(runtimeConfig2), (0, protocol_http_1.getHttpHandlerExtensionConfiguration)(runtimeConfig2), (0, httpAuthExtensionConfiguration_1.getHttpAuthExtensionConfiguration)(runtimeConfig2));
    extensions.forEach((extension) => extension.configure(extensionConfiguration));
    return Object.assign(runtimeConfig2, (0, region_config_resolver_1.resolveAwsRegionExtensionConfiguration)(extensionConfiguration), (0, smithy_client_1.resolveDefaultRuntimeConfig)(extensionConfiguration), (0, protocol_http_1.resolveHttpHandlerRuntimeConfig)(extensionConfiguration), (0, httpAuthExtensionConfiguration_1.resolveHttpAuthRuntimeConfig)(extensionConfiguration));
  };
  runtimeExtensions.resolveRuntimeExtensions = resolveRuntimeExtensions;
  return runtimeExtensions;
}
var hasRequiredSTSClient;
function requireSTSClient() {
  if (hasRequiredSTSClient) return STSClient;
  hasRequiredSTSClient = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.STSClient = exports$12.__Client = void 0;
    const middleware_host_header_1 = require$$0$1;
    const middleware_logger_1 = require$$1$3;
    const middleware_recursion_detection_1 = require$$2;
    const middleware_user_agent_1 = require$$3$1;
    const config_resolver_1 = require$$4$1;
    const core_1 = /* @__PURE__ */ requireDistCjs$1();
    const schema_1 = /* @__PURE__ */ requireSchema();
    const middleware_content_length_1 = require$$7$1;
    const middleware_endpoint_1 = require$$8$1;
    const middleware_retry_1 = require$$9;
    const smithy_client_1 = require$$10;
    Object.defineProperty(exports$12, "__Client", { enumerable: true, get: function() {
      return smithy_client_1.Client;
    } });
    const httpAuthSchemeProvider_1 = /* @__PURE__ */ requireHttpAuthSchemeProvider$1();
    const EndpointParameters_1 = /* @__PURE__ */ requireEndpointParameters();
    const runtimeConfig_1 = /* @__PURE__ */ requireRuntimeConfig$1();
    const runtimeExtensions_1 = /* @__PURE__ */ requireRuntimeExtensions();
    class STSClient2 extends smithy_client_1.Client {
      config;
      constructor(...[configuration]) {
        const _config_0 = (0, runtimeConfig_1.getRuntimeConfig)(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = (0, EndpointParameters_1.resolveClientEndpointParameters)(_config_0);
        const _config_2 = (0, middleware_user_agent_1.resolveUserAgentConfig)(_config_1);
        const _config_3 = (0, middleware_retry_1.resolveRetryConfig)(_config_2);
        const _config_4 = (0, config_resolver_1.resolveRegionConfig)(_config_3);
        const _config_5 = (0, middleware_host_header_1.resolveHostHeaderConfig)(_config_4);
        const _config_6 = (0, middleware_endpoint_1.resolveEndpointConfig)(_config_5);
        const _config_7 = (0, httpAuthSchemeProvider_1.resolveHttpAuthSchemeConfig)(_config_6);
        const _config_8 = (0, runtimeExtensions_1.resolveRuntimeExtensions)(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use((0, schema_1.getSchemaSerdePlugin)(this.config));
        this.middlewareStack.use((0, middleware_user_agent_1.getUserAgentPlugin)(this.config));
        this.middlewareStack.use((0, middleware_retry_1.getRetryPlugin)(this.config));
        this.middlewareStack.use((0, middleware_content_length_1.getContentLengthPlugin)(this.config));
        this.middlewareStack.use((0, middleware_host_header_1.getHostHeaderPlugin)(this.config));
        this.middlewareStack.use((0, middleware_logger_1.getLoggerPlugin)(this.config));
        this.middlewareStack.use((0, middleware_recursion_detection_1.getRecursionDetectionPlugin)(this.config));
        this.middlewareStack.use((0, core_1.getHttpAuthSchemeEndpointRuleSetPlugin)(this.config, {
          httpAuthSchemeParametersProvider: httpAuthSchemeProvider_1.defaultSTSHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: async (config) => new core_1.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": config.credentials
          })
        }));
        this.middlewareStack.use((0, core_1.getHttpSigningPlugin)(this.config));
      }
      destroy() {
        super.destroy();
      }
    }
    exports$12.STSClient = STSClient2;
  })(STSClient);
  return STSClient;
}
var hasRequiredSts;
function requireSts() {
  if (hasRequiredSts) return sts;
  hasRequiredSts = 1;
  (function(exports$12) {
    var STSClient2 = /* @__PURE__ */ requireSTSClient();
    var smithyClient = require$$10;
    var middlewareEndpoint = require$$8$1;
    var EndpointParameters2 = /* @__PURE__ */ requireEndpointParameters();
    var schemas_02 = /* @__PURE__ */ requireSchemas_0$1();
    var errors2 = /* @__PURE__ */ requireErrors$1();
    var client = /* @__PURE__ */ requireClient();
    var regionConfigResolver = require$$13;
    var STSServiceException2 = /* @__PURE__ */ requireSTSServiceException();
    class AssumeRoleCommand extends smithyClient.Command.classBuilder().ep(EndpointParameters2.commonParams).m(function(Command, cs, config, o) {
      return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
    }).s("AWSSecurityTokenServiceV20110615", "AssumeRole", {}).n("STSClient", "AssumeRoleCommand").sc(schemas_02.AssumeRole$).build() {
    }
    class AssumeRoleWithWebIdentityCommand extends smithyClient.Command.classBuilder().ep(EndpointParameters2.commonParams).m(function(Command, cs, config, o) {
      return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
    }).s("AWSSecurityTokenServiceV20110615", "AssumeRoleWithWebIdentity", {}).n("STSClient", "AssumeRoleWithWebIdentityCommand").sc(schemas_02.AssumeRoleWithWebIdentity$).build() {
    }
    const commands = {
      AssumeRoleCommand,
      AssumeRoleWithWebIdentityCommand
    };
    class STS extends STSClient2.STSClient {
    }
    smithyClient.createAggregatedClient(commands, STS);
    const getAccountIdFromAssumedRoleUser = (assumedRoleUser) => {
      if (typeof assumedRoleUser?.Arn === "string") {
        const arnComponents = assumedRoleUser.Arn.split(":");
        if (arnComponents.length > 4 && arnComponents[4] !== "") {
          return arnComponents[4];
        }
      }
      return void 0;
    };
    const resolveRegion = async (_region, _parentRegion, credentialProviderLogger, loaderConfig = {}) => {
      const region = typeof _region === "function" ? await _region() : _region;
      const parentRegion = typeof _parentRegion === "function" ? await _parentRegion() : _parentRegion;
      let stsDefaultRegion = "";
      const resolvedRegion = region ?? parentRegion ?? (stsDefaultRegion = await regionConfigResolver.stsRegionDefaultResolver(loaderConfig)());
      credentialProviderLogger?.debug?.("@aws-sdk/client-sts::resolveRegion", "accepting first of:", `${region} (credential provider clientConfig)`, `${parentRegion} (contextual client)`, `${stsDefaultRegion} (STS default: AWS_REGION, profile region, or us-east-1)`);
      return resolvedRegion;
    };
    const getDefaultRoleAssumer$1 = (stsOptions, STSClient3) => {
      let stsClient;
      let closureSourceCreds;
      return async (sourceCreds, params) => {
        closureSourceCreds = sourceCreds;
        if (!stsClient) {
          const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
          const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
            logger,
            profile
          });
          const isCompatibleRequestHandler = !isH2(requestHandler);
          stsClient = new STSClient3({
            ...stsOptions,
            userAgentAppId,
            profile,
            credentialDefaultProvider: () => async () => closureSourceCreds,
            region: resolvedRegion,
            requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
            logger
          });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
          throw new Error(`Invalid response from STS.assumeRole call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
          accessKeyId: Credentials.AccessKeyId,
          secretAccessKey: Credentials.SecretAccessKey,
          sessionToken: Credentials.SessionToken,
          expiration: Credentials.Expiration,
          ...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
          ...accountId && { accountId }
        };
        client.setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE", "i");
        return credentials;
      };
    };
    const getDefaultRoleAssumerWithWebIdentity$1 = (stsOptions, STSClient3) => {
      let stsClient;
      return async (params) => {
        if (!stsClient) {
          const { logger = stsOptions?.parentClientConfig?.logger, profile = stsOptions?.parentClientConfig?.profile, region, requestHandler = stsOptions?.parentClientConfig?.requestHandler, credentialProviderLogger, userAgentAppId = stsOptions?.parentClientConfig?.userAgentAppId } = stsOptions;
          const resolvedRegion = await resolveRegion(region, stsOptions?.parentClientConfig?.region, credentialProviderLogger, {
            logger,
            profile
          });
          const isCompatibleRequestHandler = !isH2(requestHandler);
          stsClient = new STSClient3({
            ...stsOptions,
            userAgentAppId,
            profile,
            region: resolvedRegion,
            requestHandler: isCompatibleRequestHandler ? requestHandler : void 0,
            logger
          });
        }
        const { Credentials, AssumedRoleUser } = await stsClient.send(new AssumeRoleWithWebIdentityCommand(params));
        if (!Credentials || !Credentials.AccessKeyId || !Credentials.SecretAccessKey) {
          throw new Error(`Invalid response from STS.assumeRoleWithWebIdentity call with role ${params.RoleArn}`);
        }
        const accountId = getAccountIdFromAssumedRoleUser(AssumedRoleUser);
        const credentials = {
          accessKeyId: Credentials.AccessKeyId,
          secretAccessKey: Credentials.SecretAccessKey,
          sessionToken: Credentials.SessionToken,
          expiration: Credentials.Expiration,
          ...Credentials.CredentialScope && { credentialScope: Credentials.CredentialScope },
          ...accountId && { accountId }
        };
        if (accountId) {
          client.setCredentialFeature(credentials, "RESOLVED_ACCOUNT_ID", "T");
        }
        client.setCredentialFeature(credentials, "CREDENTIALS_STS_ASSUME_ROLE_WEB_ID", "k");
        return credentials;
      };
    };
    const isH2 = (requestHandler) => {
      return requestHandler?.metadata?.handlerProtocol === "h2";
    };
    const getCustomizableStsClientCtor = (baseCtor, customizations) => {
      if (!customizations)
        return baseCtor;
      else
        return class CustomizableSTSClient extends baseCtor {
          constructor(config) {
            super(config);
            for (const customization of customizations) {
              this.middlewareStack.use(customization);
            }
          }
        };
    };
    const getDefaultRoleAssumer = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumer$1(stsOptions, getCustomizableStsClientCtor(STSClient2.STSClient, stsPlugins));
    const getDefaultRoleAssumerWithWebIdentity = (stsOptions = {}, stsPlugins) => getDefaultRoleAssumerWithWebIdentity$1(stsOptions, getCustomizableStsClientCtor(STSClient2.STSClient, stsPlugins));
    const decorateDefaultCredentialProvider = (provider) => (input) => provider({
      roleAssumer: getDefaultRoleAssumer(input),
      roleAssumerWithWebIdentity: getDefaultRoleAssumerWithWebIdentity(input),
      ...input
    });
    exports$12.$Command = smithyClient.Command;
    exports$12.STSServiceException = STSServiceException2.STSServiceException;
    exports$12.AssumeRoleCommand = AssumeRoleCommand;
    exports$12.AssumeRoleWithWebIdentityCommand = AssumeRoleWithWebIdentityCommand;
    exports$12.STS = STS;
    exports$12.decorateDefaultCredentialProvider = decorateDefaultCredentialProvider;
    exports$12.getDefaultRoleAssumer = getDefaultRoleAssumer;
    exports$12.getDefaultRoleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity;
    Object.prototype.hasOwnProperty.call(STSClient2, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: STSClient2["__proto__"]
    });
    Object.keys(STSClient2).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = STSClient2[k];
    });
    Object.prototype.hasOwnProperty.call(schemas_02, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: schemas_02["__proto__"]
    });
    Object.keys(schemas_02).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = schemas_02[k];
    });
    Object.prototype.hasOwnProperty.call(errors2, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: errors2["__proto__"]
    });
    Object.keys(errors2).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = errors2[k];
    });
  })(sts);
  return sts;
}
var stsExports = /* @__PURE__ */ requireSts();
const index$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null
}, [stsExports]);
var signin = {};
var httpAuthSchemeProvider = {};
var hasRequiredHttpAuthSchemeProvider;
function requireHttpAuthSchemeProvider() {
  if (hasRequiredHttpAuthSchemeProvider) return httpAuthSchemeProvider;
  hasRequiredHttpAuthSchemeProvider = 1;
  Object.defineProperty(httpAuthSchemeProvider, "__esModule", { value: true });
  httpAuthSchemeProvider.resolveHttpAuthSchemeConfig = httpAuthSchemeProvider.defaultSigninHttpAuthSchemeProvider = httpAuthSchemeProvider.defaultSigninHttpAuthSchemeParametersProvider = void 0;
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const util_middleware_1 = require$$1$1;
  const defaultSigninHttpAuthSchemeParametersProvider = async (config, context, input) => {
    return {
      operation: (0, util_middleware_1.getSmithyContext)(context).operation,
      region: await (0, util_middleware_1.normalizeProvider)(config.region)() || (() => {
        throw new Error("expected `region` to be configured for `aws.auth#sigv4`");
      })()
    };
  };
  httpAuthSchemeProvider.defaultSigninHttpAuthSchemeParametersProvider = defaultSigninHttpAuthSchemeParametersProvider;
  function createAwsAuthSigv4HttpAuthOption(authParameters) {
    return {
      schemeId: "aws.auth#sigv4",
      signingProperties: {
        name: "signin",
        region: authParameters.region
      },
      propertiesExtractor: (config, context) => ({
        signingProperties: {
          config,
          context
        }
      })
    };
  }
  function createSmithyApiNoAuthHttpAuthOption(authParameters) {
    return {
      schemeId: "smithy.api#noAuth"
    };
  }
  const defaultSigninHttpAuthSchemeProvider = (authParameters) => {
    const options = [];
    switch (authParameters.operation) {
      case "CreateOAuth2Token": {
        options.push(createSmithyApiNoAuthHttpAuthOption());
        break;
      }
      default: {
        options.push(createAwsAuthSigv4HttpAuthOption(authParameters));
      }
    }
    return options;
  };
  httpAuthSchemeProvider.defaultSigninHttpAuthSchemeProvider = defaultSigninHttpAuthSchemeProvider;
  const resolveHttpAuthSchemeConfig = (config) => {
    const config_0 = (0, core_1.resolveAwsSdkSigV4Config)(config);
    return Object.assign(config_0, {
      authSchemePreference: (0, util_middleware_1.normalizeProvider)(config.authSchemePreference ?? [])
    });
  };
  httpAuthSchemeProvider.resolveHttpAuthSchemeConfig = resolveHttpAuthSchemeConfig;
  return httpAuthSchemeProvider;
}
var runtimeConfig = {};
var runtimeConfig_shared = {};
var endpointResolver = {};
var ruleset = {};
var hasRequiredRuleset;
function requireRuleset() {
  if (hasRequiredRuleset) return ruleset;
  hasRequiredRuleset = 1;
  Object.defineProperty(ruleset, "__esModule", { value: true });
  ruleset.ruleSet = void 0;
  const u = "required", v = "fn", w = "argv", x = "ref";
  const a = true, b = "isSet", c = "booleanEquals", d = "error", e = "endpoint", f = "tree", g = "PartitionResult", h = "stringEquals", i = { [u]: true, default: false, type: "boolean" }, j = { [u]: false, type: "string" }, k = { [x]: "Endpoint" }, l = { [v]: c, [w]: [{ [x]: "UseFIPS" }, true] }, m = { [v]: c, [w]: [{ [x]: "UseDualStack" }, true] }, n = {}, o = { [v]: "getAttr", [w]: [{ [x]: g }, "name"] }, p = { [v]: c, [w]: [{ [x]: "UseFIPS" }, false] }, q = { [v]: c, [w]: [{ [x]: "UseDualStack" }, false] }, r = { [v]: "getAttr", [w]: [{ [x]: g }, "supportsFIPS"] }, s = { [v]: c, [w]: [true, { [v]: "getAttr", [w]: [{ [x]: g }, "supportsDualStack"] }] }, t = [{ [x]: "Region" }];
  const _data = {
    version: "1.0",
    parameters: { UseDualStack: i, UseFIPS: i, Endpoint: j, Region: j },
    rules: [
      {
        conditions: [{ [v]: b, [w]: [k] }],
        rules: [
          { conditions: [l], error: "Invalid Configuration: FIPS and custom endpoint are not supported", type: d },
          {
            rules: [
              {
                conditions: [m],
                error: "Invalid Configuration: Dualstack and custom endpoint are not supported",
                type: d
              },
              { endpoint: { url: k, properties: n, headers: n }, type: e }
            ],
            type: f
          }
        ],
        type: f
      },
      {
        rules: [
          {
            conditions: [{ [v]: b, [w]: t }],
            rules: [
              {
                conditions: [{ [v]: "aws.partition", [w]: t, assign: g }],
                rules: [
                  {
                    conditions: [{ [v]: h, [w]: [o, "aws"] }, p, q],
                    endpoint: { url: "https://{Region}.signin.aws.amazon.com", properties: n, headers: n },
                    type: e
                  },
                  {
                    conditions: [{ [v]: h, [w]: [o, "aws-cn"] }, p, q],
                    endpoint: { url: "https://{Region}.signin.amazonaws.cn", properties: n, headers: n },
                    type: e
                  },
                  {
                    conditions: [{ [v]: h, [w]: [o, "aws-us-gov"] }, p, q],
                    endpoint: { url: "https://{Region}.signin.amazonaws-us-gov.com", properties: n, headers: n },
                    type: e
                  },
                  {
                    conditions: [l, m],
                    rules: [
                      {
                        conditions: [{ [v]: c, [w]: [a, r] }, s],
                        rules: [
                          {
                            endpoint: {
                              url: "https://signin-fips.{Region}.{PartitionResult#dualStackDnsSuffix}",
                              properties: n,
                              headers: n
                            },
                            type: e
                          }
                        ],
                        type: f
                      },
                      {
                        error: "FIPS and DualStack are enabled, but this partition does not support one or both",
                        type: d
                      }
                    ],
                    type: f
                  },
                  {
                    conditions: [l, q],
                    rules: [
                      {
                        conditions: [{ [v]: c, [w]: [r, a] }],
                        rules: [
                          {
                            endpoint: {
                              url: "https://signin-fips.{Region}.{PartitionResult#dnsSuffix}",
                              properties: n,
                              headers: n
                            },
                            type: e
                          }
                        ],
                        type: f
                      },
                      { error: "FIPS is enabled but this partition does not support FIPS", type: d }
                    ],
                    type: f
                  },
                  {
                    conditions: [p, m],
                    rules: [
                      {
                        conditions: [s],
                        rules: [
                          {
                            endpoint: {
                              url: "https://signin.{Region}.{PartitionResult#dualStackDnsSuffix}",
                              properties: n,
                              headers: n
                            },
                            type: e
                          }
                        ],
                        type: f
                      },
                      { error: "DualStack is enabled but this partition does not support DualStack", type: d }
                    ],
                    type: f
                  },
                  {
                    endpoint: { url: "https://signin.{Region}.{PartitionResult#dnsSuffix}", properties: n, headers: n },
                    type: e
                  }
                ],
                type: f
              }
            ],
            type: f
          },
          { error: "Invalid Configuration: Missing Region", type: d }
        ],
        type: f
      }
    ]
  };
  ruleset.ruleSet = _data;
  return ruleset;
}
var hasRequiredEndpointResolver;
function requireEndpointResolver() {
  if (hasRequiredEndpointResolver) return endpointResolver;
  hasRequiredEndpointResolver = 1;
  Object.defineProperty(endpointResolver, "__esModule", { value: true });
  endpointResolver.defaultEndpointResolver = void 0;
  const util_endpoints_1 = require$$0;
  const util_endpoints_2 = require$$1$2;
  const ruleset_1 = /* @__PURE__ */ requireRuleset();
  const cache = new util_endpoints_2.EndpointCache({
    size: 50,
    params: ["Endpoint", "Region", "UseDualStack", "UseFIPS"]
  });
  const defaultEndpointResolver = (endpointParams, context = {}) => {
    return cache.get(endpointParams, () => (0, util_endpoints_2.resolveEndpoint)(ruleset_1.ruleSet, {
      endpointParams,
      logger: context.logger
    }));
  };
  endpointResolver.defaultEndpointResolver = defaultEndpointResolver;
  util_endpoints_2.customEndpointFunctions.aws = util_endpoints_1.awsEndpointFunctions;
  return endpointResolver;
}
var schemas_0 = {};
var errors = {};
var SigninServiceException = {};
var hasRequiredSigninServiceException;
function requireSigninServiceException() {
  if (hasRequiredSigninServiceException) return SigninServiceException;
  hasRequiredSigninServiceException = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.SigninServiceException = exports$12.__ServiceException = void 0;
    const smithy_client_1 = require$$10;
    Object.defineProperty(exports$12, "__ServiceException", { enumerable: true, get: function() {
      return smithy_client_1.ServiceException;
    } });
    class SigninServiceException2 extends smithy_client_1.ServiceException {
      constructor(options) {
        super(options);
        Object.setPrototypeOf(this, SigninServiceException2.prototype);
      }
    }
    exports$12.SigninServiceException = SigninServiceException2;
  })(SigninServiceException);
  return SigninServiceException;
}
var hasRequiredErrors;
function requireErrors() {
  if (hasRequiredErrors) return errors;
  hasRequiredErrors = 1;
  Object.defineProperty(errors, "__esModule", { value: true });
  errors.ValidationException = errors.TooManyRequestsError = errors.InternalServerException = errors.AccessDeniedException = void 0;
  const SigninServiceException_1 = /* @__PURE__ */ requireSigninServiceException();
  class AccessDeniedException extends SigninServiceException_1.SigninServiceException {
    name = "AccessDeniedException";
    $fault = "client";
    error;
    constructor(opts) {
      super({
        name: "AccessDeniedException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, AccessDeniedException.prototype);
      this.error = opts.error;
    }
  }
  errors.AccessDeniedException = AccessDeniedException;
  class InternalServerException extends SigninServiceException_1.SigninServiceException {
    name = "InternalServerException";
    $fault = "server";
    error;
    constructor(opts) {
      super({
        name: "InternalServerException",
        $fault: "server",
        ...opts
      });
      Object.setPrototypeOf(this, InternalServerException.prototype);
      this.error = opts.error;
    }
  }
  errors.InternalServerException = InternalServerException;
  class TooManyRequestsError extends SigninServiceException_1.SigninServiceException {
    name = "TooManyRequestsError";
    $fault = "client";
    error;
    constructor(opts) {
      super({
        name: "TooManyRequestsError",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, TooManyRequestsError.prototype);
      this.error = opts.error;
    }
  }
  errors.TooManyRequestsError = TooManyRequestsError;
  class ValidationException extends SigninServiceException_1.SigninServiceException {
    name = "ValidationException";
    $fault = "client";
    error;
    constructor(opts) {
      super({
        name: "ValidationException",
        $fault: "client",
        ...opts
      });
      Object.setPrototypeOf(this, ValidationException.prototype);
      this.error = opts.error;
    }
  }
  errors.ValidationException = ValidationException;
  return errors;
}
var hasRequiredSchemas_0;
function requireSchemas_0() {
  if (hasRequiredSchemas_0) return schemas_0;
  hasRequiredSchemas_0 = 1;
  (function(exports$12) {
    Object.defineProperty(exports$12, "__esModule", { value: true });
    exports$12.CreateOAuth2Token$ = exports$12.CreateOAuth2TokenResponseBody$ = exports$12.CreateOAuth2TokenResponse$ = exports$12.CreateOAuth2TokenRequestBody$ = exports$12.CreateOAuth2TokenRequest$ = exports$12.AccessToken$ = exports$12.errorTypeRegistries = exports$12.ValidationException$ = exports$12.TooManyRequestsError$ = exports$12.InternalServerException$ = exports$12.AccessDeniedException$ = exports$12.SigninServiceException$ = void 0;
    const _ADE = "AccessDeniedException";
    const _AT = "AccessToken";
    const _COAT = "CreateOAuth2Token";
    const _COATR = "CreateOAuth2TokenRequest";
    const _COATRB = "CreateOAuth2TokenRequestBody";
    const _COATRBr = "CreateOAuth2TokenResponseBody";
    const _COATRr = "CreateOAuth2TokenResponse";
    const _ISE = "InternalServerException";
    const _RT = "RefreshToken";
    const _TMRE = "TooManyRequestsError";
    const _VE = "ValidationException";
    const _aKI = "accessKeyId";
    const _aT = "accessToken";
    const _c = "client";
    const _cI = "clientId";
    const _cV = "codeVerifier";
    const _co = "code";
    const _e = "error";
    const _eI = "expiresIn";
    const _gT = "grantType";
    const _h = "http";
    const _hE = "httpError";
    const _iT = "idToken";
    const _jN = "jsonName";
    const _m = "message";
    const _rT = "refreshToken";
    const _rU = "redirectUri";
    const _s = "smithy.ts.sdk.synthetic.com.amazonaws.signin";
    const _sAK = "secretAccessKey";
    const _sT = "sessionToken";
    const _se = "server";
    const _tI = "tokenInput";
    const _tO = "tokenOutput";
    const _tT = "tokenType";
    const n0 = "com.amazonaws.signin";
    const schema_1 = /* @__PURE__ */ requireSchema();
    const errors_1 = /* @__PURE__ */ requireErrors();
    const SigninServiceException_1 = /* @__PURE__ */ requireSigninServiceException();
    const _s_registry = schema_1.TypeRegistry.for(_s);
    exports$12.SigninServiceException$ = [-3, _s, "SigninServiceException", 0, [], []];
    _s_registry.registerError(exports$12.SigninServiceException$, SigninServiceException_1.SigninServiceException);
    const n0_registry = schema_1.TypeRegistry.for(n0);
    exports$12.AccessDeniedException$ = [-3, n0, _ADE, { [_e]: _c }, [_e, _m], [0, 0], 2];
    n0_registry.registerError(exports$12.AccessDeniedException$, errors_1.AccessDeniedException);
    exports$12.InternalServerException$ = [-3, n0, _ISE, { [_e]: _se, [_hE]: 500 }, [_e, _m], [0, 0], 2];
    n0_registry.registerError(exports$12.InternalServerException$, errors_1.InternalServerException);
    exports$12.TooManyRequestsError$ = [-3, n0, _TMRE, { [_e]: _c, [_hE]: 429 }, [_e, _m], [0, 0], 2];
    n0_registry.registerError(exports$12.TooManyRequestsError$, errors_1.TooManyRequestsError);
    exports$12.ValidationException$ = [-3, n0, _VE, { [_e]: _c, [_hE]: 400 }, [_e, _m], [0, 0], 2];
    n0_registry.registerError(exports$12.ValidationException$, errors_1.ValidationException);
    exports$12.errorTypeRegistries = [_s_registry, n0_registry];
    var RefreshToken = [0, n0, _RT, 8, 0];
    exports$12.AccessToken$ = [
      3,
      n0,
      _AT,
      8,
      [_aKI, _sAK, _sT],
      [
        [0, { [_jN]: _aKI }],
        [0, { [_jN]: _sAK }],
        [0, { [_jN]: _sT }]
      ],
      3
    ];
    exports$12.CreateOAuth2TokenRequest$ = [
      3,
      n0,
      _COATR,
      0,
      [_tI],
      [[() => exports$12.CreateOAuth2TokenRequestBody$, 16]],
      1
    ];
    exports$12.CreateOAuth2TokenRequestBody$ = [
      3,
      n0,
      _COATRB,
      0,
      [_cI, _gT, _co, _rU, _cV, _rT],
      [
        [0, { [_jN]: _cI }],
        [0, { [_jN]: _gT }],
        0,
        [0, { [_jN]: _rU }],
        [0, { [_jN]: _cV }],
        [() => RefreshToken, { [_jN]: _rT }]
      ],
      2
    ];
    exports$12.CreateOAuth2TokenResponse$ = [
      3,
      n0,
      _COATRr,
      0,
      [_tO],
      [[() => exports$12.CreateOAuth2TokenResponseBody$, 16]],
      1
    ];
    exports$12.CreateOAuth2TokenResponseBody$ = [
      3,
      n0,
      _COATRBr,
      0,
      [_aT, _tT, _eI, _rT, _iT],
      [
        [() => exports$12.AccessToken$, { [_jN]: _aT }],
        [0, { [_jN]: _tT }],
        [1, { [_jN]: _eI }],
        [() => RefreshToken, { [_jN]: _rT }],
        [0, { [_jN]: _iT }]
      ],
      4
    ];
    exports$12.CreateOAuth2Token$ = [
      9,
      n0,
      _COAT,
      { [_h]: ["POST", "/v1/token", 200] },
      () => exports$12.CreateOAuth2TokenRequest$,
      () => exports$12.CreateOAuth2TokenResponse$
    ];
  })(schemas_0);
  return schemas_0;
}
var hasRequiredRuntimeConfig_shared;
function requireRuntimeConfig_shared() {
  if (hasRequiredRuntimeConfig_shared) return runtimeConfig_shared;
  hasRequiredRuntimeConfig_shared = 1;
  Object.defineProperty(runtimeConfig_shared, "__esModule", { value: true });
  runtimeConfig_shared.getRuntimeConfig = void 0;
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const protocols_1 = /* @__PURE__ */ requireProtocols();
  const core_2 = /* @__PURE__ */ requireDistCjs$1();
  const smithy_client_1 = require$$10;
  const url_parser_1 = require$$4;
  const util_base64_1 = require$$5;
  const util_utf8_1 = require$$6;
  const httpAuthSchemeProvider_1 = /* @__PURE__ */ requireHttpAuthSchemeProvider();
  const endpointResolver_1 = /* @__PURE__ */ requireEndpointResolver();
  const schemas_0_1 = /* @__PURE__ */ requireSchemas_0();
  const getRuntimeConfig = (config) => {
    return {
      apiVersion: "2023-01-01",
      base64Decoder: config?.base64Decoder ?? util_base64_1.fromBase64,
      base64Encoder: config?.base64Encoder ?? util_base64_1.toBase64,
      disableHostPrefix: config?.disableHostPrefix ?? false,
      endpointProvider: config?.endpointProvider ?? endpointResolver_1.defaultEndpointResolver,
      extensions: config?.extensions ?? [],
      httpAuthSchemeProvider: config?.httpAuthSchemeProvider ?? httpAuthSchemeProvider_1.defaultSigninHttpAuthSchemeProvider,
      httpAuthSchemes: config?.httpAuthSchemes ?? [
        {
          schemeId: "aws.auth#sigv4",
          identityProvider: (ipc) => ipc.getIdentityProvider("aws.auth#sigv4"),
          signer: new core_1.AwsSdkSigV4Signer()
        },
        {
          schemeId: "smithy.api#noAuth",
          identityProvider: (ipc) => ipc.getIdentityProvider("smithy.api#noAuth") || (async () => ({})),
          signer: new core_2.NoAuthSigner()
        }
      ],
      logger: config?.logger ?? new smithy_client_1.NoOpLogger(),
      protocol: config?.protocol ?? protocols_1.AwsRestJsonProtocol,
      protocolSettings: config?.protocolSettings ?? {
        defaultNamespace: "com.amazonaws.signin",
        errorTypeRegistries: schemas_0_1.errorTypeRegistries,
        version: "2023-01-01",
        serviceTarget: "Signin"
      },
      serviceId: config?.serviceId ?? "Signin",
      urlParser: config?.urlParser ?? url_parser_1.parseUrl,
      utf8Decoder: config?.utf8Decoder ?? util_utf8_1.fromUtf8,
      utf8Encoder: config?.utf8Encoder ?? util_utf8_1.toUtf8
    };
  };
  runtimeConfig_shared.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig_shared;
}
var hasRequiredRuntimeConfig;
function requireRuntimeConfig() {
  if (hasRequiredRuntimeConfig) return runtimeConfig;
  hasRequiredRuntimeConfig = 1;
  Object.defineProperty(runtimeConfig, "__esModule", { value: true });
  runtimeConfig.getRuntimeConfig = void 0;
  const tslib_1 = /* @__PURE__ */ requireTslib();
  const package_json_1 = tslib_1.__importDefault(require$$1);
  const core_1 = /* @__PURE__ */ requireDistCjs();
  const util_user_agent_node_1 = require$$3;
  const config_resolver_1 = require$$4$1;
  const hash_node_1 = require$$5$1;
  const middleware_retry_1 = require$$9;
  const node_config_provider_1 = require$$7;
  const node_http_handler_1 = require$$8;
  const smithy_client_1 = require$$10;
  const util_body_length_node_1 = require$$10$1;
  const util_defaults_mode_node_1 = require$$11;
  const util_retry_1 = require$$12;
  const runtimeConfig_shared_1 = /* @__PURE__ */ requireRuntimeConfig_shared();
  const getRuntimeConfig = (config) => {
    (0, smithy_client_1.emitWarningIfUnsupportedVersion)(process.version);
    const defaultsMode = (0, util_defaults_mode_node_1.resolveDefaultsModeConfig)(config);
    const defaultConfigProvider = () => defaultsMode().then(smithy_client_1.loadConfigsForDefaultMode);
    const clientSharedValues = (0, runtimeConfig_shared_1.getRuntimeConfig)(config);
    (0, core_1.emitWarningIfUnsupportedVersion)(process.version);
    const loaderConfig = {
      profile: config?.profile,
      logger: clientSharedValues.logger
    };
    return {
      ...clientSharedValues,
      ...config,
      runtime: "node",
      defaultsMode,
      authSchemePreference: config?.authSchemePreference ?? (0, node_config_provider_1.loadConfig)(core_1.NODE_AUTH_SCHEME_PREFERENCE_OPTIONS, loaderConfig),
      bodyLengthChecker: config?.bodyLengthChecker ?? util_body_length_node_1.calculateBodyLength,
      defaultUserAgentProvider: config?.defaultUserAgentProvider ?? (0, util_user_agent_node_1.createDefaultUserAgentProvider)({ serviceId: clientSharedValues.serviceId, clientVersion: package_json_1.default.version }),
      maxAttempts: config?.maxAttempts ?? (0, node_config_provider_1.loadConfig)(middleware_retry_1.NODE_MAX_ATTEMPT_CONFIG_OPTIONS, config),
      region: config?.region ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_REGION_CONFIG_OPTIONS, { ...config_resolver_1.NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig }),
      requestHandler: node_http_handler_1.NodeHttpHandler.create(config?.requestHandler ?? defaultConfigProvider),
      retryMode: config?.retryMode ?? (0, node_config_provider_1.loadConfig)({
        ...middleware_retry_1.NODE_RETRY_MODE_CONFIG_OPTIONS,
        default: async () => (await defaultConfigProvider()).retryMode || util_retry_1.DEFAULT_RETRY_MODE
      }, config),
      sha256: config?.sha256 ?? hash_node_1.Hash.bind(null, "sha256"),
      streamCollector: config?.streamCollector ?? node_http_handler_1.streamCollector,
      useDualstackEndpoint: config?.useDualstackEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_DUALSTACK_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      useFipsEndpoint: config?.useFipsEndpoint ?? (0, node_config_provider_1.loadConfig)(config_resolver_1.NODE_USE_FIPS_ENDPOINT_CONFIG_OPTIONS, loaderConfig),
      userAgentAppId: config?.userAgentAppId ?? (0, node_config_provider_1.loadConfig)(util_user_agent_node_1.NODE_APP_ID_CONFIG_OPTIONS, loaderConfig)
    };
  };
  runtimeConfig.getRuntimeConfig = getRuntimeConfig;
  return runtimeConfig;
}
var hasRequiredSignin;
function requireSignin() {
  if (hasRequiredSignin) return signin;
  hasRequiredSignin = 1;
  (function(exports$12) {
    var middlewareHostHeader = require$$0$1;
    var middlewareLogger = require$$1$3;
    var middlewareRecursionDetection = require$$2;
    var middlewareUserAgent = require$$3$1;
    var configResolver = require$$4$1;
    var core = /* @__PURE__ */ requireDistCjs$1();
    var schema = /* @__PURE__ */ requireSchema();
    var middlewareContentLength = require$$7$1;
    var middlewareEndpoint = require$$8$1;
    var middlewareRetry = require$$9;
    var smithyClient = require$$10;
    var httpAuthSchemeProvider2 = /* @__PURE__ */ requireHttpAuthSchemeProvider();
    var runtimeConfig2 = /* @__PURE__ */ requireRuntimeConfig();
    var regionConfigResolver = require$$13;
    var protocolHttp = require$$14;
    var schemas_02 = /* @__PURE__ */ requireSchemas_0();
    var errors2 = /* @__PURE__ */ requireErrors();
    var SigninServiceException2 = /* @__PURE__ */ requireSigninServiceException();
    const resolveClientEndpointParameters = (options) => {
      return Object.assign(options, {
        useDualstackEndpoint: options.useDualstackEndpoint ?? false,
        useFipsEndpoint: options.useFipsEndpoint ?? false,
        defaultSigningName: "signin"
      });
    };
    const commonParams = {
      UseFIPS: { type: "builtInParams", name: "useFipsEndpoint" },
      Endpoint: { type: "builtInParams", name: "endpoint" },
      Region: { type: "builtInParams", name: "region" },
      UseDualStack: { type: "builtInParams", name: "useDualstackEndpoint" }
    };
    const getHttpAuthExtensionConfiguration = (runtimeConfig3) => {
      const _httpAuthSchemes = runtimeConfig3.httpAuthSchemes;
      let _httpAuthSchemeProvider = runtimeConfig3.httpAuthSchemeProvider;
      let _credentials = runtimeConfig3.credentials;
      return {
        setHttpAuthScheme(httpAuthScheme) {
          const index2 = _httpAuthSchemes.findIndex((scheme) => scheme.schemeId === httpAuthScheme.schemeId);
          if (index2 === -1) {
            _httpAuthSchemes.push(httpAuthScheme);
          } else {
            _httpAuthSchemes.splice(index2, 1, httpAuthScheme);
          }
        },
        httpAuthSchemes() {
          return _httpAuthSchemes;
        },
        setHttpAuthSchemeProvider(httpAuthSchemeProvider3) {
          _httpAuthSchemeProvider = httpAuthSchemeProvider3;
        },
        httpAuthSchemeProvider() {
          return _httpAuthSchemeProvider;
        },
        setCredentials(credentials) {
          _credentials = credentials;
        },
        credentials() {
          return _credentials;
        }
      };
    };
    const resolveHttpAuthRuntimeConfig = (config) => {
      return {
        httpAuthSchemes: config.httpAuthSchemes(),
        httpAuthSchemeProvider: config.httpAuthSchemeProvider(),
        credentials: config.credentials()
      };
    };
    const resolveRuntimeExtensions = (runtimeConfig3, extensions) => {
      const extensionConfiguration = Object.assign(regionConfigResolver.getAwsRegionExtensionConfiguration(runtimeConfig3), smithyClient.getDefaultExtensionConfiguration(runtimeConfig3), protocolHttp.getHttpHandlerExtensionConfiguration(runtimeConfig3), getHttpAuthExtensionConfiguration(runtimeConfig3));
      extensions.forEach((extension) => extension.configure(extensionConfiguration));
      return Object.assign(runtimeConfig3, regionConfigResolver.resolveAwsRegionExtensionConfiguration(extensionConfiguration), smithyClient.resolveDefaultRuntimeConfig(extensionConfiguration), protocolHttp.resolveHttpHandlerRuntimeConfig(extensionConfiguration), resolveHttpAuthRuntimeConfig(extensionConfiguration));
    };
    class SigninClient extends smithyClient.Client {
      config;
      constructor(...[configuration]) {
        const _config_0 = runtimeConfig2.getRuntimeConfig(configuration || {});
        super(_config_0);
        this.initConfig = _config_0;
        const _config_1 = resolveClientEndpointParameters(_config_0);
        const _config_2 = middlewareUserAgent.resolveUserAgentConfig(_config_1);
        const _config_3 = middlewareRetry.resolveRetryConfig(_config_2);
        const _config_4 = configResolver.resolveRegionConfig(_config_3);
        const _config_5 = middlewareHostHeader.resolveHostHeaderConfig(_config_4);
        const _config_6 = middlewareEndpoint.resolveEndpointConfig(_config_5);
        const _config_7 = httpAuthSchemeProvider2.resolveHttpAuthSchemeConfig(_config_6);
        const _config_8 = resolveRuntimeExtensions(_config_7, configuration?.extensions || []);
        this.config = _config_8;
        this.middlewareStack.use(schema.getSchemaSerdePlugin(this.config));
        this.middlewareStack.use(middlewareUserAgent.getUserAgentPlugin(this.config));
        this.middlewareStack.use(middlewareRetry.getRetryPlugin(this.config));
        this.middlewareStack.use(middlewareContentLength.getContentLengthPlugin(this.config));
        this.middlewareStack.use(middlewareHostHeader.getHostHeaderPlugin(this.config));
        this.middlewareStack.use(middlewareLogger.getLoggerPlugin(this.config));
        this.middlewareStack.use(middlewareRecursionDetection.getRecursionDetectionPlugin(this.config));
        this.middlewareStack.use(core.getHttpAuthSchemeEndpointRuleSetPlugin(this.config, {
          httpAuthSchemeParametersProvider: httpAuthSchemeProvider2.defaultSigninHttpAuthSchemeParametersProvider,
          identityProviderConfigProvider: async (config) => new core.DefaultIdentityProviderConfig({
            "aws.auth#sigv4": config.credentials
          })
        }));
        this.middlewareStack.use(core.getHttpSigningPlugin(this.config));
      }
      destroy() {
        super.destroy();
      }
    }
    class CreateOAuth2TokenCommand extends smithyClient.Command.classBuilder().ep(commonParams).m(function(Command, cs, config, o) {
      return [middlewareEndpoint.getEndpointPlugin(config, Command.getEndpointParameterInstructions())];
    }).s("Signin", "CreateOAuth2Token", {}).n("SigninClient", "CreateOAuth2TokenCommand").sc(schemas_02.CreateOAuth2Token$).build() {
    }
    const commands = {
      CreateOAuth2TokenCommand
    };
    class Signin extends SigninClient {
    }
    smithyClient.createAggregatedClient(commands, Signin);
    const OAuth2ErrorCode = {
      AUTHCODE_EXPIRED: "AUTHCODE_EXPIRED",
      INSUFFICIENT_PERMISSIONS: "INSUFFICIENT_PERMISSIONS",
      INVALID_REQUEST: "INVALID_REQUEST",
      SERVER_ERROR: "server_error",
      TOKEN_EXPIRED: "TOKEN_EXPIRED",
      USER_CREDENTIALS_CHANGED: "USER_CREDENTIALS_CHANGED"
    };
    exports$12.$Command = smithyClient.Command;
    exports$12.__Client = smithyClient.Client;
    exports$12.SigninServiceException = SigninServiceException2.SigninServiceException;
    exports$12.CreateOAuth2TokenCommand = CreateOAuth2TokenCommand;
    exports$12.OAuth2ErrorCode = OAuth2ErrorCode;
    exports$12.Signin = Signin;
    exports$12.SigninClient = SigninClient;
    Object.prototype.hasOwnProperty.call(schemas_02, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: schemas_02["__proto__"]
    });
    Object.keys(schemas_02).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = schemas_02[k];
    });
    Object.prototype.hasOwnProperty.call(errors2, "__proto__") && !Object.prototype.hasOwnProperty.call(exports$12, "__proto__") && Object.defineProperty(exports$12, "__proto__", {
      enumerable: true,
      value: errors2["__proto__"]
    });
    Object.keys(errors2).forEach(function(k) {
      if (k !== "default" && !Object.prototype.hasOwnProperty.call(exports$12, k)) exports$12[k] = errors2[k];
    });
  })(signin);
  return signin;
}
var signinExports = /* @__PURE__ */ requireSignin();
const index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null
}, [signinExports]);
export {
  index$1 as a,
  index as b,
  index$2 as i,
  ssoExports as s
};
