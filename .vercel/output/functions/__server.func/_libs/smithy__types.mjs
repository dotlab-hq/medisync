import { d as getAugmentedNamespace } from "./react.mjs";
var HttpAuthLocation;
(function(HttpAuthLocation2) {
  HttpAuthLocation2["HEADER"] = "header";
  HttpAuthLocation2["QUERY"] = "query";
})(HttpAuthLocation || (HttpAuthLocation = {}));
var HttpApiKeyAuthLocation;
(function(HttpApiKeyAuthLocation2) {
  HttpApiKeyAuthLocation2["HEADER"] = "header";
  HttpApiKeyAuthLocation2["QUERY"] = "query";
})(HttpApiKeyAuthLocation || (HttpApiKeyAuthLocation = {}));
var EndpointURLScheme;
(function(EndpointURLScheme2) {
  EndpointURLScheme2["HTTP"] = "http";
  EndpointURLScheme2["HTTPS"] = "https";
})(EndpointURLScheme || (EndpointURLScheme = {}));
var AlgorithmId;
(function(AlgorithmId2) {
  AlgorithmId2["MD5"] = "md5";
  AlgorithmId2["CRC32"] = "crc32";
  AlgorithmId2["CRC32C"] = "crc32c";
  AlgorithmId2["SHA1"] = "sha1";
  AlgorithmId2["SHA256"] = "sha256";
})(AlgorithmId || (AlgorithmId = {}));
const getChecksumConfiguration = (runtimeConfig) => {
  const checksumAlgorithms = [];
  if (runtimeConfig.sha256 !== void 0) {
    checksumAlgorithms.push({
      algorithmId: () => AlgorithmId.SHA256,
      checksumConstructor: () => runtimeConfig.sha256
    });
  }
  if (runtimeConfig.md5 != void 0) {
    checksumAlgorithms.push({
      algorithmId: () => AlgorithmId.MD5,
      checksumConstructor: () => runtimeConfig.md5
    });
  }
  return {
    addChecksumAlgorithm(algo) {
      checksumAlgorithms.push(algo);
    },
    checksumAlgorithms() {
      return checksumAlgorithms;
    }
  };
};
const resolveChecksumRuntimeConfig = (clientConfig) => {
  const runtimeConfig = {};
  clientConfig.checksumAlgorithms().forEach((checksumAlgorithm) => {
    runtimeConfig[checksumAlgorithm.algorithmId()] = checksumAlgorithm.checksumConstructor();
  });
  return runtimeConfig;
};
const getDefaultClientConfiguration = (runtimeConfig) => {
  return getChecksumConfiguration(runtimeConfig);
};
const resolveDefaultRuntimeConfig = (config) => {
  return resolveChecksumRuntimeConfig(config);
};
var FieldPosition;
(function(FieldPosition2) {
  FieldPosition2[FieldPosition2["HEADER"] = 0] = "HEADER";
  FieldPosition2[FieldPosition2["TRAILER"] = 1] = "TRAILER";
})(FieldPosition || (FieldPosition = {}));
const SMITHY_CONTEXT_KEY = "__smithy_context";
var IniSectionType;
(function(IniSectionType2) {
  IniSectionType2["PROFILE"] = "profile";
  IniSectionType2["SSO_SESSION"] = "sso-session";
  IniSectionType2["SERVICES"] = "services";
})(IniSectionType || (IniSectionType = {}));
var RequestHandlerProtocol;
(function(RequestHandlerProtocol2) {
  RequestHandlerProtocol2["HTTP_0_9"] = "http/0.9";
  RequestHandlerProtocol2["HTTP_1_0"] = "http/1.0";
  RequestHandlerProtocol2["TDS_8_0"] = "tds/8.0";
})(RequestHandlerProtocol || (RequestHandlerProtocol = {}));
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  get AlgorithmId() {
    return AlgorithmId;
  },
  get EndpointURLScheme() {
    return EndpointURLScheme;
  },
  get FieldPosition() {
    return FieldPosition;
  },
  get HttpApiKeyAuthLocation() {
    return HttpApiKeyAuthLocation;
  },
  get HttpAuthLocation() {
    return HttpAuthLocation;
  },
  get IniSectionType() {
    return IniSectionType;
  },
  get RequestHandlerProtocol() {
    return RequestHandlerProtocol;
  },
  SMITHY_CONTEXT_KEY,
  getDefaultClientConfiguration,
  resolveDefaultRuntimeConfig
});
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  AlgorithmId as A,
  EndpointURLScheme as E,
  FieldPosition as F,
  IniSectionType as I,
  SMITHY_CONTEXT_KEY as S,
  require$$0 as r
};
