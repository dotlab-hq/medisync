import { d as getAugmentedNamespace } from "./react.mjs";
import { f as fromString, a as fromArrayBuffer, b as fromString$1 } from "./smithy__util-buffer-from.mjs";
const fromUtf8$1 = (input) => {
  const buf = fromString(input, "utf8");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
const toUint8Array = (data) => {
  if (typeof data === "string") {
    return fromUtf8$1(data);
  }
  if (ArrayBuffer.isView(data)) {
    return new Uint8Array(data.buffer, data.byteOffset, data.byteLength / Uint8Array.BYTES_PER_ELEMENT);
  }
  return new Uint8Array(data);
};
const toUtf8 = (input) => {
  if (typeof input === "string") {
    return input;
  }
  if (typeof input !== "object" || typeof input.byteOffset !== "number" || typeof input.byteLength !== "number") {
    throw new Error("@smithy/util-utf8: toUtf8 encoder function only accepts string | Uint8Array.");
  }
  return fromArrayBuffer(input.buffer, input.byteOffset, input.byteLength).toString("utf8");
};
const distEs = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  fromUtf8: fromUtf8$1,
  toUint8Array,
  toUtf8
});
const require$$6 = /* @__PURE__ */ getAugmentedNamespace(distEs);
const fromUtf8 = (input) => {
  const buf = fromString$1(input, "utf8");
  return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength / Uint8Array.BYTES_PER_ELEMENT);
};
export {
  toUtf8 as a,
  fromUtf8 as b,
  fromUtf8$1 as f,
  require$$6 as r,
  toUint8Array as t
};
