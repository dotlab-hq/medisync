import { d as getAugmentedNamespace } from "./react.mjs";
import require$$0$1 from "crypto";
const randomUUID = require$$0$1.randomUUID.bind(require$$0$1);
const decimalToHex = Array.from({ length: 256 }, (_, i) => i.toString(16).padStart(2, "0"));
const v4 = () => {
  if (randomUUID) {
    return randomUUID();
  }
  const rnds = new Uint8Array(16);
  crypto.getRandomValues(rnds);
  rnds[6] = rnds[6] & 15 | 64;
  rnds[8] = rnds[8] & 63 | 128;
  return decimalToHex[rnds[0]] + decimalToHex[rnds[1]] + decimalToHex[rnds[2]] + decimalToHex[rnds[3]] + "-" + decimalToHex[rnds[4]] + decimalToHex[rnds[5]] + "-" + decimalToHex[rnds[6]] + decimalToHex[rnds[7]] + "-" + decimalToHex[rnds[8]] + decimalToHex[rnds[9]] + "-" + decimalToHex[rnds[10]] + decimalToHex[rnds[11]] + decimalToHex[rnds[12]] + decimalToHex[rnds[13]] + decimalToHex[rnds[14]] + decimalToHex[rnds[15]];
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  v4
});
const require$$0 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  require$$0 as r,
  v4 as v
};
