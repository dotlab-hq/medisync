import { d as getAugmentedNamespace } from "./react.mjs";
import { S as SMITHY_CONTEXT_KEY } from "./smithy__types.mjs";
const getSmithyContext = (context) => context[SMITHY_CONTEXT_KEY] || (context[SMITHY_CONTEXT_KEY] = {});
const normalizeProvider = (input) => {
  if (typeof input === "function")
    return input;
  const promisified = Promise.resolve(input);
  return () => promisified;
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getSmithyContext,
  normalizeProvider
});
const require$$1 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  getSmithyContext as g,
  normalizeProvider as n,
  require$$1 as r
};
