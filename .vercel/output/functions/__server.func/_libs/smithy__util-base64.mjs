import { d as getAugmentedNamespace } from "./react.mjs";
import { f as fromString, a as fromArrayBuffer } from "./smithy__util-buffer-from.mjs";
import { f as fromUtf8 } from "./smithy__util-utf8.mjs";
const BASE64_REGEX = /^[A-Za-z0-9+/]*={0,2}$/;
const fromBase64 = (input) => {
  if (input.length * 3 % 4 !== 0) {
    throw new TypeError(`Incorrect padding on base64 string.`);
  }
  if (!BASE64_REGEX.exec(input)) {
    throw new TypeError(`Invalid base64 string.`);
  }
  const buffer = fromString(input, "base64");
  return new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
};
const toBase64 = (_input) => {
  let input;
  if (typeof _input === "string") {
    input = fromUtf8(_input);
  } else {
    input = _input;
  }
  if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
    throw new Error("@smithy/util-base64: toBase64 encoder function only accepts string | Uint8Array.");
  }
  return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("base64");
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fromBase64,
  toBase64
});
const require$$5 = /* @__PURE__ */ getAugmentedNamespace(distEs);
export {
  fromBase64 as f,
  require$$5 as r,
  toBase64 as t
};
