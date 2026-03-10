import { d as getAugmentedNamespace } from "./react.mjs";
import { platform, release } from "node:os";
import { versions, env } from "node:process";
import { readFile } from "node:fs/promises";
import { join, normalize, sep } from "node:path";
import { D as DEFAULT_UA_APP_ID } from "./aws-sdk__middleware-user-agent.mjs";
const getRuntimeUserAgentPair = () => {
  const runtimesToCheck = ["deno", "bun", "llrt"];
  for (const runtime of runtimesToCheck) {
    if (versions[runtime]) {
      return [`md/${runtime}`, versions[runtime]];
    }
  }
  return ["md/nodejs", versions.node];
};
const SEMVER_REGEX = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+[0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*)?$/;
const getSanitizedTypeScriptVersion = (version = "") => {
  const match = version.match(SEMVER_REGEX);
  if (!match) {
    return void 0;
  }
  const [major, minor, patch, prerelease] = [match[1], match[2], match[3], match[4]];
  return prerelease ? `${major}.${minor}.${patch}-${prerelease}` : `${major}.${minor}.${patch}`;
};
const typescriptPackageJsonPath = join("node_modules", "typescript", "package.json");
const getTypeScriptPackageJsonPaths = (dirname) => {
  const cwdPath = join(process.cwd(), typescriptPackageJsonPath);
  if (!dirname) {
    return [cwdPath];
  }
  const normalizedPath = normalize(dirname);
  const parts = normalizedPath.split(sep);
  const nodeModulesIndex = parts.indexOf("node_modules");
  const parentDir = nodeModulesIndex !== -1 ? parts.slice(0, nodeModulesIndex).join(sep) : dirname;
  const parentDirPath = join(parentDir, typescriptPackageJsonPath);
  if (cwdPath === parentDirPath) {
    return [cwdPath];
  }
  return [parentDirPath, cwdPath];
};
let tscVersion;
const getTypeScriptUserAgentPair = async () => {
  if (tscVersion === null) {
    return void 0;
  } else if (typeof tscVersion === "string") {
    return ["md/tsc", tscVersion];
  }
  const dirname = typeof __dirname !== "undefined" ? __dirname : void 0;
  for (const typescriptPackageJsonPath2 of getTypeScriptPackageJsonPaths(dirname)) {
    try {
      const packageJson = await readFile(typescriptPackageJsonPath2, "utf-8");
      const { version } = JSON.parse(packageJson);
      const sanitizedVersion = getSanitizedTypeScriptVersion(version);
      if (typeof sanitizedVersion !== "string") {
        continue;
      }
      tscVersion = sanitizedVersion;
      return ["md/tsc", tscVersion];
    } catch {
    }
  }
  tscVersion = null;
  return void 0;
};
const crtAvailability = {
  isCrtAvailable: false
};
const isCrtAvailable = () => {
  if (crtAvailability.isCrtAvailable) {
    return ["md/crt-avail"];
  }
  return null;
};
const createDefaultUserAgentProvider = ({ serviceId, clientVersion }) => {
  const runtimeUserAgentPair = getRuntimeUserAgentPair();
  return async (config) => {
    const sections = [
      ["aws-sdk-js", clientVersion],
      ["ua", "2.1"],
      [`os/${platform()}`, release()],
      ["lang/js"],
      runtimeUserAgentPair
    ];
    const typescriptUserAgentPair = await getTypeScriptUserAgentPair();
    if (typescriptUserAgentPair) {
      sections.push(typescriptUserAgentPair);
    }
    const crtAvailable = isCrtAvailable();
    if (crtAvailable) {
      sections.push(crtAvailable);
    }
    if (serviceId) {
      sections.push([`api/${serviceId}`, clientVersion]);
    }
    if (env.AWS_EXECUTION_ENV) {
      sections.push([`exec-env/${env.AWS_EXECUTION_ENV}`]);
    }
    const appId = await config?.userAgentAppId?.();
    const resolvedUserAgent = appId ? [...sections, [`app/${appId}`]] : [...sections];
    return resolvedUserAgent;
  };
};
const defaultUserAgent = createDefaultUserAgentProvider;
const UA_APP_ID_ENV_NAME = "AWS_SDK_UA_APP_ID";
const UA_APP_ID_INI_NAME = "sdk_ua_app_id";
const UA_APP_ID_INI_NAME_DEPRECATED = "sdk-ua-app-id";
const NODE_APP_ID_CONFIG_OPTIONS = {
  environmentVariableSelector: (env2) => env2[UA_APP_ID_ENV_NAME],
  configFileSelector: (profile) => profile[UA_APP_ID_INI_NAME] ?? profile[UA_APP_ID_INI_NAME_DEPRECATED],
  default: DEFAULT_UA_APP_ID
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  NODE_APP_ID_CONFIG_OPTIONS,
  UA_APP_ID_ENV_NAME,
  UA_APP_ID_INI_NAME,
  createDefaultUserAgentProvider,
  crtAvailability,
  defaultUserAgent
});
const require$$3 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  NODE_APP_ID_CONFIG_OPTIONS as N,
  createDefaultUserAgentProvider as c,
  require$$3 as r
};
