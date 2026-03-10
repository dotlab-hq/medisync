import { d as getAugmentedNamespace } from "../react.mjs";
import { l as loadConfig } from "../smithy__node-config-provider.mjs";
import { b as NODE_REGION_CONFIG_FILE_OPTIONS, c as NODE_REGION_CONFIG_OPTIONS, R as REGION_ENV_NAME, d as REGION_INI_NAME, r as resolveRegionConfig } from "../smithy__config-resolver.mjs";
const getAwsRegionExtensionConfiguration = (runtimeConfig) => {
  return {
    setRegion(region) {
      runtimeConfig.region = region;
    },
    region() {
      return runtimeConfig.region;
    }
  };
};
const resolveAwsRegionExtensionConfiguration = (awsRegionExtensionConfiguration) => {
  return {
    region: awsRegionExtensionConfiguration.region()
  };
};
function stsRegionDefaultResolver(loaderConfig = {}) {
  return loadConfig({
    ...NODE_REGION_CONFIG_OPTIONS,
    async default() {
      if (!warning.silence) {
        console.warn("@aws-sdk - WARN - default STS region of us-east-1 used. See @aws-sdk/credential-providers README and set a region explicitly.");
      }
      return "us-east-1";
    }
  }, { ...NODE_REGION_CONFIG_FILE_OPTIONS, ...loaderConfig });
}
const warning = {
  silence: false
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  NODE_REGION_CONFIG_FILE_OPTIONS,
  NODE_REGION_CONFIG_OPTIONS,
  REGION_ENV_NAME,
  REGION_INI_NAME,
  getAwsRegionExtensionConfiguration,
  resolveAwsRegionExtensionConfiguration,
  resolveRegionConfig,
  stsRegionDefaultResolver,
  warning
});
const require$$13 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  require$$13 as a,
  getAwsRegionExtensionConfiguration as g,
  resolveAwsRegionExtensionConfiguration as r
};
