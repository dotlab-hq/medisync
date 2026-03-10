import { d as getAugmentedNamespace } from "./react.mjs";
import { p as parseQueryString } from "./smithy__querystring-parser.mjs";
const parseUrl = (url) => {
  if (typeof url === "string") {
    return parseUrl(new URL(url));
  }
  const { hostname, pathname, port, protocol, search } = url;
  let query;
  if (search) {
    query = parseQueryString(search);
  }
  return {
    hostname,
    port: port ? parseInt(port) : void 0,
    protocol,
    path: pathname,
    query
  };
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  parseUrl
});
const require$$4 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  parseUrl as p,
  require$$4 as r
};
