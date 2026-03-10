import { r as require$$6 } from "./smithy__util-utf8.mjs";
import { r as require$$14 } from "./smithy__protocol-http.mjs";
import { r as require$$4 } from "./@smithy/util-body-length-browser+[...].mjs";
import { r as require$$1 } from "./smithy__util-middleware.mjs";
import { r as require$$5 } from "./smithy__util-base64.mjs";
import { r as require$$0$2 } from "./smithy__types.mjs";
import { r as require$$2 } from "./smithy__middleware-serde.mjs";
import { r as require$$0$1 } from "./smithy__util-stream.mjs";
import { r as require$$0 } from "./smithy__uuid.mjs";
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
var distCjs = {};
var protocols = {};
var schema = {};
var hasRequiredSchema;
function requireSchema() {
  if (hasRequiredSchema) return schema;
  hasRequiredSchema = 1;
  var protocolHttp = require$$14;
  var utilMiddleware = require$$1;
  const deref = (schemaRef) => {
    if (typeof schemaRef === "function") {
      return schemaRef();
    }
    return schemaRef;
  };
  const operation = (namespace, name, traits, input, output) => ({
    name,
    namespace,
    traits,
    input,
    output
  });
  const schemaDeserializationMiddleware = (config) => (next, context) => async (args) => {
    const { response } = await next(args);
    const { operationSchema } = utilMiddleware.getSmithyContext(context);
    const [, ns, n, t, i, o] = operationSchema ?? [];
    try {
      const parsed = await config.protocol.deserializeResponse(operation(ns, n, t, i, o), {
        ...config,
        ...context
      }, response);
      return {
        response,
        output: parsed
      };
    } catch (error2) {
      Object.defineProperty(error2, "$response", {
        value: response,
        enumerable: false,
        writable: false,
        configurable: false
      });
      if (!("$metadata" in error2)) {
        const hint = `Deserialization error: to see the raw response, inspect the hidden field {error}.$response on this object.`;
        try {
          error2.message += "\n  " + hint;
        } catch (e) {
          if (!context.logger || context.logger?.constructor?.name === "NoOpLogger") {
            console.warn(hint);
          } else {
            context.logger?.warn?.(hint);
          }
        }
        if (typeof error2.$responseBodyText !== "undefined") {
          if (error2.$response) {
            error2.$response.body = error2.$responseBodyText;
          }
        }
        try {
          if (protocolHttp.HttpResponse.isInstance(response)) {
            const { headers = {} } = response;
            const headerEntries = Object.entries(headers);
            error2.$metadata = {
              httpStatusCode: response.statusCode,
              requestId: findHeader(/^x-[\w-]+-request-?id$/, headerEntries),
              extendedRequestId: findHeader(/^x-[\w-]+-id-2$/, headerEntries),
              cfId: findHeader(/^x-[\w-]+-cf-id$/, headerEntries)
            };
          }
        } catch (e) {
        }
      }
      throw error2;
    }
  };
  const findHeader = (pattern, headers) => {
    return (headers.find(([k]) => {
      return k.match(pattern);
    }) || [void 0, void 0])[1];
  };
  const schemaSerializationMiddleware = (config) => (next, context) => async (args) => {
    const { operationSchema } = utilMiddleware.getSmithyContext(context);
    const [, ns, n, t, i, o] = operationSchema ?? [];
    const endpoint = context.endpointV2?.url && config.urlParser ? async () => config.urlParser(context.endpointV2.url) : config.endpoint;
    const request = await config.protocol.serializeRequest(operation(ns, n, t, i, o), args.input, {
      ...config,
      ...context,
      endpoint
    });
    return next({
      ...args,
      request
    });
  };
  const deserializerMiddlewareOption = {
    name: "deserializerMiddleware",
    step: "deserialize",
    tags: ["DESERIALIZER"],
    override: true
  };
  const serializerMiddlewareOption = {
    name: "serializerMiddleware",
    step: "serialize",
    tags: ["SERIALIZER"],
    override: true
  };
  function getSchemaSerdePlugin(config) {
    return {
      applyToStack: (commandStack) => {
        commandStack.add(schemaSerializationMiddleware(config), serializerMiddlewareOption);
        commandStack.add(schemaDeserializationMiddleware(config), deserializerMiddlewareOption);
        config.protocol.setSerdeContext(config);
      }
    };
  }
  class Schema {
    name;
    namespace;
    traits;
    static assign(instance, values) {
      const schema2 = Object.assign(instance, values);
      return schema2;
    }
    static [Symbol.hasInstance](lhs) {
      const isPrototype = this.prototype.isPrototypeOf(lhs);
      if (!isPrototype && typeof lhs === "object" && lhs !== null) {
        const list2 = lhs;
        return list2.symbol === this.symbol;
      }
      return isPrototype;
    }
    getName() {
      return this.namespace + "#" + this.name;
    }
  }
  class ListSchema extends Schema {
    static symbol = /* @__PURE__ */ Symbol.for("@smithy/lis");
    name;
    traits;
    valueSchema;
    symbol = ListSchema.symbol;
  }
  const list = (namespace, name, traits, valueSchema) => Schema.assign(new ListSchema(), {
    name,
    namespace,
    traits,
    valueSchema
  });
  class MapSchema extends Schema {
    static symbol = /* @__PURE__ */ Symbol.for("@smithy/map");
    name;
    traits;
    keySchema;
    valueSchema;
    symbol = MapSchema.symbol;
  }
  const map = (namespace, name, traits, keySchema, valueSchema) => Schema.assign(new MapSchema(), {
    name,
    namespace,
    traits,
    keySchema,
    valueSchema
  });
  class OperationSchema extends Schema {
    static symbol = /* @__PURE__ */ Symbol.for("@smithy/ope");
    name;
    traits;
    input;
    output;
    symbol = OperationSchema.symbol;
  }
  const op = (namespace, name, traits, input, output) => Schema.assign(new OperationSchema(), {
    name,
    namespace,
    traits,
    input,
    output
  });
  class StructureSchema extends Schema {
    static symbol = /* @__PURE__ */ Symbol.for("@smithy/str");
    name;
    traits;
    memberNames;
    memberList;
    symbol = StructureSchema.symbol;
  }
  const struct = (namespace, name, traits, memberNames, memberList) => Schema.assign(new StructureSchema(), {
    name,
    namespace,
    traits,
    memberNames,
    memberList
  });
  class ErrorSchema extends StructureSchema {
    static symbol = /* @__PURE__ */ Symbol.for("@smithy/err");
    ctor;
    symbol = ErrorSchema.symbol;
  }
  const error = (namespace, name, traits, memberNames, memberList, ctor) => Schema.assign(new ErrorSchema(), {
    name,
    namespace,
    traits,
    memberNames,
    memberList,
    ctor: null
  });
  function translateTraits(indicator) {
    if (typeof indicator === "object") {
      return indicator;
    }
    indicator = indicator | 0;
    const traits = {};
    let i = 0;
    for (const trait of [
      "httpLabel",
      "idempotent",
      "idempotencyToken",
      "sensitive",
      "httpPayload",
      "httpResponseCode",
      "httpQueryParams"
    ]) {
      if ((indicator >> i++ & 1) === 1) {
        traits[trait] = 1;
      }
    }
    return traits;
  }
  const anno = {
    it: /* @__PURE__ */ Symbol.for("@smithy/nor-struct-it")
  };
  class NormalizedSchema {
    ref;
    memberName;
    static symbol = /* @__PURE__ */ Symbol.for("@smithy/nor");
    symbol = NormalizedSchema.symbol;
    name;
    schema;
    _isMemberSchema;
    traits;
    memberTraits;
    normalizedTraits;
    constructor(ref, memberName) {
      this.ref = ref;
      this.memberName = memberName;
      const traitStack = [];
      let _ref = ref;
      let schema2 = ref;
      this._isMemberSchema = false;
      while (isMemberSchema(_ref)) {
        traitStack.push(_ref[1]);
        _ref = _ref[0];
        schema2 = deref(_ref);
        this._isMemberSchema = true;
      }
      if (traitStack.length > 0) {
        this.memberTraits = {};
        for (let i = traitStack.length - 1; i >= 0; --i) {
          const traitSet = traitStack[i];
          Object.assign(this.memberTraits, translateTraits(traitSet));
        }
      } else {
        this.memberTraits = 0;
      }
      if (schema2 instanceof NormalizedSchema) {
        const computedMemberTraits = this.memberTraits;
        Object.assign(this, schema2);
        this.memberTraits = Object.assign({}, computedMemberTraits, schema2.getMemberTraits(), this.getMemberTraits());
        this.normalizedTraits = void 0;
        this.memberName = memberName ?? schema2.memberName;
        return;
      }
      this.schema = deref(schema2);
      if (isStaticSchema(this.schema)) {
        this.name = `${this.schema[1]}#${this.schema[2]}`;
        this.traits = this.schema[3];
      } else {
        this.name = this.memberName ?? String(schema2);
        this.traits = 0;
      }
      if (this._isMemberSchema && !memberName) {
        throw new Error(`@smithy/core/schema - NormalizedSchema member init ${this.getName(true)} missing member name.`);
      }
    }
    static [Symbol.hasInstance](lhs) {
      const isPrototype = this.prototype.isPrototypeOf(lhs);
      if (!isPrototype && typeof lhs === "object" && lhs !== null) {
        const ns = lhs;
        return ns.symbol === this.symbol;
      }
      return isPrototype;
    }
    static of(ref) {
      const sc = deref(ref);
      if (sc instanceof NormalizedSchema) {
        return sc;
      }
      if (isMemberSchema(sc)) {
        const [ns, traits] = sc;
        if (ns instanceof NormalizedSchema) {
          Object.assign(ns.getMergedTraits(), translateTraits(traits));
          return ns;
        }
        throw new Error(`@smithy/core/schema - may not init unwrapped member schema=${JSON.stringify(ref, null, 2)}.`);
      }
      return new NormalizedSchema(sc);
    }
    getSchema() {
      const sc = this.schema;
      if (Array.isArray(sc) && sc[0] === 0) {
        return sc[4];
      }
      return sc;
    }
    getName(withNamespace = false) {
      const { name } = this;
      const short = !withNamespace && name && name.includes("#");
      return short ? name.split("#")[1] : name || void 0;
    }
    getMemberName() {
      return this.memberName;
    }
    isMemberSchema() {
      return this._isMemberSchema;
    }
    isListSchema() {
      const sc = this.getSchema();
      return typeof sc === "number" ? sc >= 64 && sc < 128 : sc[0] === 1;
    }
    isMapSchema() {
      const sc = this.getSchema();
      return typeof sc === "number" ? sc >= 128 && sc <= 255 : sc[0] === 2;
    }
    isStructSchema() {
      const sc = this.getSchema();
      if (typeof sc !== "object") {
        return false;
      }
      const id = sc[0];
      return id === 3 || id === -3 || id === 4;
    }
    isUnionSchema() {
      const sc = this.getSchema();
      if (typeof sc !== "object") {
        return false;
      }
      return sc[0] === 4;
    }
    isBlobSchema() {
      const sc = this.getSchema();
      return sc === 21 || sc === 42;
    }
    isTimestampSchema() {
      const sc = this.getSchema();
      return typeof sc === "number" && sc >= 4 && sc <= 7;
    }
    isUnitSchema() {
      return this.getSchema() === "unit";
    }
    isDocumentSchema() {
      return this.getSchema() === 15;
    }
    isStringSchema() {
      return this.getSchema() === 0;
    }
    isBooleanSchema() {
      return this.getSchema() === 2;
    }
    isNumericSchema() {
      return this.getSchema() === 1;
    }
    isBigIntegerSchema() {
      return this.getSchema() === 17;
    }
    isBigDecimalSchema() {
      return this.getSchema() === 19;
    }
    isStreaming() {
      const { streaming } = this.getMergedTraits();
      return !!streaming || this.getSchema() === 42;
    }
    isIdempotencyToken() {
      return !!this.getMergedTraits().idempotencyToken;
    }
    getMergedTraits() {
      return this.normalizedTraits ?? (this.normalizedTraits = {
        ...this.getOwnTraits(),
        ...this.getMemberTraits()
      });
    }
    getMemberTraits() {
      return translateTraits(this.memberTraits);
    }
    getOwnTraits() {
      return translateTraits(this.traits);
    }
    getKeySchema() {
      const [isDoc, isMap] = [this.isDocumentSchema(), this.isMapSchema()];
      if (!isDoc && !isMap) {
        throw new Error(`@smithy/core/schema - cannot get key for non-map: ${this.getName(true)}`);
      }
      const schema2 = this.getSchema();
      const memberSchema = isDoc ? 15 : schema2[4] ?? 0;
      return member([memberSchema, 0], "key");
    }
    getValueSchema() {
      const sc = this.getSchema();
      const [isDoc, isMap, isList] = [this.isDocumentSchema(), this.isMapSchema(), this.isListSchema()];
      const memberSchema = typeof sc === "number" ? 63 & sc : sc && typeof sc === "object" && (isMap || isList) ? sc[3 + sc[0]] : isDoc ? 15 : void 0;
      if (memberSchema != null) {
        return member([memberSchema, 0], isMap ? "value" : "member");
      }
      throw new Error(`@smithy/core/schema - ${this.getName(true)} has no value member.`);
    }
    getMemberSchema(memberName) {
      const struct2 = this.getSchema();
      if (this.isStructSchema() && struct2[4].includes(memberName)) {
        const i = struct2[4].indexOf(memberName);
        const memberSchema = struct2[5][i];
        return member(isMemberSchema(memberSchema) ? memberSchema : [memberSchema, 0], memberName);
      }
      if (this.isDocumentSchema()) {
        return member([15, 0], memberName);
      }
      throw new Error(`@smithy/core/schema - ${this.getName(true)} has no member=${memberName}.`);
    }
    getMemberSchemas() {
      const buffer = {};
      try {
        for (const [k, v] of this.structIterator()) {
          buffer[k] = v;
        }
      } catch (ignored) {
      }
      return buffer;
    }
    getEventStreamMember() {
      if (this.isStructSchema()) {
        for (const [memberName, memberSchema] of this.structIterator()) {
          if (memberSchema.isStreaming() && memberSchema.isStructSchema()) {
            return memberName;
          }
        }
      }
      return "";
    }
    *structIterator() {
      if (this.isUnitSchema()) {
        return;
      }
      if (!this.isStructSchema()) {
        throw new Error("@smithy/core/schema - cannot iterate non-struct schema.");
      }
      const struct2 = this.getSchema();
      const z = struct2[4].length;
      let it = struct2[anno.it];
      if (it && z === it.length) {
        yield* it;
        return;
      }
      it = Array(z);
      for (let i = 0; i < z; ++i) {
        const k = struct2[4][i];
        const v = member([struct2[5][i], 0], k);
        yield it[i] = [k, v];
      }
      struct2[anno.it] = it;
    }
  }
  function member(memberSchema, memberName) {
    if (memberSchema instanceof NormalizedSchema) {
      return Object.assign(memberSchema, {
        memberName,
        _isMemberSchema: true
      });
    }
    const internalCtorAccess = NormalizedSchema;
    return new internalCtorAccess(memberSchema, memberName);
  }
  const isMemberSchema = (sc) => Array.isArray(sc) && sc.length === 2;
  const isStaticSchema = (sc) => Array.isArray(sc) && sc.length >= 5;
  class SimpleSchema extends Schema {
    static symbol = /* @__PURE__ */ Symbol.for("@smithy/sim");
    name;
    schemaRef;
    traits;
    symbol = SimpleSchema.symbol;
  }
  const sim = (namespace, name, schemaRef, traits) => Schema.assign(new SimpleSchema(), {
    name,
    namespace,
    traits,
    schemaRef
  });
  const simAdapter = (namespace, name, traits, schemaRef) => Schema.assign(new SimpleSchema(), {
    name,
    namespace,
    traits,
    schemaRef
  });
  const SCHEMA = {
    BLOB: 21,
    STREAMING_BLOB: 42,
    BOOLEAN: 2,
    STRING: 0,
    NUMERIC: 1,
    BIG_INTEGER: 17,
    BIG_DECIMAL: 19,
    DOCUMENT: 15,
    TIMESTAMP_DEFAULT: 4,
    TIMESTAMP_DATE_TIME: 5,
    TIMESTAMP_HTTP_DATE: 6,
    TIMESTAMP_EPOCH_SECONDS: 7,
    LIST_MODIFIER: 64,
    MAP_MODIFIER: 128
  };
  class TypeRegistry {
    namespace;
    schemas;
    exceptions;
    static registries = /* @__PURE__ */ new Map();
    constructor(namespace, schemas = /* @__PURE__ */ new Map(), exceptions = /* @__PURE__ */ new Map()) {
      this.namespace = namespace;
      this.schemas = schemas;
      this.exceptions = exceptions;
    }
    static for(namespace) {
      if (!TypeRegistry.registries.has(namespace)) {
        TypeRegistry.registries.set(namespace, new TypeRegistry(namespace));
      }
      return TypeRegistry.registries.get(namespace);
    }
    copyFrom(other) {
      const { schemas, exceptions } = this;
      for (const [k, v] of other.schemas) {
        if (!schemas.has(k)) {
          schemas.set(k, v);
        }
      }
      for (const [k, v] of other.exceptions) {
        if (!exceptions.has(k)) {
          exceptions.set(k, v);
        }
      }
    }
    register(shapeId, schema2) {
      const qualifiedName = this.normalizeShapeId(shapeId);
      for (const r of [this, TypeRegistry.for(qualifiedName.split("#")[0])]) {
        r.schemas.set(qualifiedName, schema2);
      }
    }
    getSchema(shapeId) {
      const id = this.normalizeShapeId(shapeId);
      if (!this.schemas.has(id)) {
        throw new Error(`@smithy/core/schema - schema not found for ${id}`);
      }
      return this.schemas.get(id);
    }
    registerError(es, ctor) {
      const $error = es;
      const ns = $error[1];
      for (const r of [this, TypeRegistry.for(ns)]) {
        r.schemas.set(ns + "#" + $error[2], $error);
        r.exceptions.set($error, ctor);
      }
    }
    getErrorCtor(es) {
      const $error = es;
      if (this.exceptions.has($error)) {
        return this.exceptions.get($error);
      }
      const registry = TypeRegistry.for($error[1]);
      return registry.exceptions.get($error);
    }
    getBaseException() {
      for (const exceptionKey of this.exceptions.keys()) {
        if (Array.isArray(exceptionKey)) {
          const [, ns, name] = exceptionKey;
          const id = ns + "#" + name;
          if (id.startsWith("smithy.ts.sdk.synthetic.") && id.endsWith("ServiceException")) {
            return exceptionKey;
          }
        }
      }
      return void 0;
    }
    find(predicate) {
      return [...this.schemas.values()].find(predicate);
    }
    clear() {
      this.schemas.clear();
      this.exceptions.clear();
    }
    normalizeShapeId(shapeId) {
      if (shapeId.includes("#")) {
        return shapeId;
      }
      return this.namespace + "#" + shapeId;
    }
  }
  schema.ErrorSchema = ErrorSchema;
  schema.ListSchema = ListSchema;
  schema.MapSchema = MapSchema;
  schema.NormalizedSchema = NormalizedSchema;
  schema.OperationSchema = OperationSchema;
  schema.SCHEMA = SCHEMA;
  schema.Schema = Schema;
  schema.SimpleSchema = SimpleSchema;
  schema.StructureSchema = StructureSchema;
  schema.TypeRegistry = TypeRegistry;
  schema.deref = deref;
  schema.deserializerMiddlewareOption = deserializerMiddlewareOption;
  schema.error = error;
  schema.getSchemaSerdePlugin = getSchemaSerdePlugin;
  schema.isStaticSchema = isStaticSchema;
  schema.list = list;
  schema.map = map;
  schema.op = op;
  schema.operation = operation;
  schema.serializerMiddlewareOption = serializerMiddlewareOption;
  schema.sim = sim;
  schema.simAdapter = simAdapter;
  schema.struct = struct;
  schema.translateTraits = translateTraits;
  return schema;
}
var serde = {};
var hasRequiredSerde;
function requireSerde() {
  if (hasRequiredSerde) return serde;
  hasRequiredSerde = 1;
  var uuid = require$$0;
  const copyDocumentWithTransform = (source, schemaRef, transform = (_) => _) => source;
  const parseBoolean = (value) => {
    switch (value) {
      case "true":
        return true;
      case "false":
        return false;
      default:
        throw new Error(`Unable to parse boolean value "${value}"`);
    }
  };
  const expectBoolean = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (typeof value === "number") {
      if (value === 0 || value === 1) {
        logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
      }
      if (value === 0) {
        return false;
      }
      if (value === 1) {
        return true;
      }
    }
    if (typeof value === "string") {
      const lower = value.toLowerCase();
      if (lower === "false" || lower === "true") {
        logger.warn(stackTraceWarning(`Expected boolean, got ${typeof value}: ${value}`));
      }
      if (lower === "false") {
        return false;
      }
      if (lower === "true") {
        return true;
      }
    }
    if (typeof value === "boolean") {
      return value;
    }
    throw new TypeError(`Expected boolean, got ${typeof value}: ${value}`);
  };
  const expectNumber = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (!Number.isNaN(parsed)) {
        if (String(parsed) !== String(value)) {
          logger.warn(stackTraceWarning(`Expected number but observed string: ${value}`));
        }
        return parsed;
      }
    }
    if (typeof value === "number") {
      return value;
    }
    throw new TypeError(`Expected number, got ${typeof value}: ${value}`);
  };
  const MAX_FLOAT = Math.ceil(2 ** 127 * (2 - 2 ** -23));
  const expectFloat32 = (value) => {
    const expected = expectNumber(value);
    if (expected !== void 0 && !Number.isNaN(expected) && expected !== Infinity && expected !== -Infinity) {
      if (Math.abs(expected) > MAX_FLOAT) {
        throw new TypeError(`Expected 32-bit float, got ${value}`);
      }
    }
    return expected;
  };
  const expectLong = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (Number.isInteger(value) && !Number.isNaN(value)) {
      return value;
    }
    throw new TypeError(`Expected integer, got ${typeof value}: ${value}`);
  };
  const expectInt = expectLong;
  const expectInt32 = (value) => expectSizedInt(value, 32);
  const expectShort = (value) => expectSizedInt(value, 16);
  const expectByte = (value) => expectSizedInt(value, 8);
  const expectSizedInt = (value, size) => {
    const expected = expectLong(value);
    if (expected !== void 0 && castInt(expected, size) !== expected) {
      throw new TypeError(`Expected ${size}-bit integer, got ${value}`);
    }
    return expected;
  };
  const castInt = (value, size) => {
    switch (size) {
      case 32:
        return Int32Array.of(value)[0];
      case 16:
        return Int16Array.of(value)[0];
      case 8:
        return Int8Array.of(value)[0];
    }
  };
  const expectNonNull = (value, location) => {
    if (value === null || value === void 0) {
      if (location) {
        throw new TypeError(`Expected a non-null value for ${location}`);
      }
      throw new TypeError("Expected a non-null value");
    }
    return value;
  };
  const expectObject = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (typeof value === "object" && !Array.isArray(value)) {
      return value;
    }
    const receivedType = Array.isArray(value) ? "array" : typeof value;
    throw new TypeError(`Expected object, got ${receivedType}: ${value}`);
  };
  const expectString = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (typeof value === "string") {
      return value;
    }
    if (["boolean", "number", "bigint"].includes(typeof value)) {
      logger.warn(stackTraceWarning(`Expected string, got ${typeof value}: ${value}`));
      return String(value);
    }
    throw new TypeError(`Expected string, got ${typeof value}: ${value}`);
  };
  const expectUnion = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    const asObject = expectObject(value);
    const setKeys = Object.entries(asObject).filter(([, v]) => v != null).map(([k]) => k);
    if (setKeys.length === 0) {
      throw new TypeError(`Unions must have exactly one non-null member. None were found.`);
    }
    if (setKeys.length > 1) {
      throw new TypeError(`Unions must have exactly one non-null member. Keys ${setKeys} were not null.`);
    }
    return asObject;
  };
  const strictParseDouble = (value) => {
    if (typeof value == "string") {
      return expectNumber(parseNumber(value));
    }
    return expectNumber(value);
  };
  const strictParseFloat = strictParseDouble;
  const strictParseFloat32 = (value) => {
    if (typeof value == "string") {
      return expectFloat32(parseNumber(value));
    }
    return expectFloat32(value);
  };
  const NUMBER_REGEX = /(-?(?:0|[1-9]\d*)(?:\.\d+)?(?:[eE][+-]?\d+)?)|(-?Infinity)|(NaN)/g;
  const parseNumber = (value) => {
    const matches = value.match(NUMBER_REGEX);
    if (matches === null || matches[0].length !== value.length) {
      throw new TypeError(`Expected real number, got implicit NaN`);
    }
    return parseFloat(value);
  };
  const limitedParseDouble = (value) => {
    if (typeof value == "string") {
      return parseFloatString(value);
    }
    return expectNumber(value);
  };
  const handleFloat = limitedParseDouble;
  const limitedParseFloat = limitedParseDouble;
  const limitedParseFloat32 = (value) => {
    if (typeof value == "string") {
      return parseFloatString(value);
    }
    return expectFloat32(value);
  };
  const parseFloatString = (value) => {
    switch (value) {
      case "NaN":
        return NaN;
      case "Infinity":
        return Infinity;
      case "-Infinity":
        return -Infinity;
      default:
        throw new Error(`Unable to parse float value: ${value}`);
    }
  };
  const strictParseLong = (value) => {
    if (typeof value === "string") {
      return expectLong(parseNumber(value));
    }
    return expectLong(value);
  };
  const strictParseInt = strictParseLong;
  const strictParseInt32 = (value) => {
    if (typeof value === "string") {
      return expectInt32(parseNumber(value));
    }
    return expectInt32(value);
  };
  const strictParseShort = (value) => {
    if (typeof value === "string") {
      return expectShort(parseNumber(value));
    }
    return expectShort(value);
  };
  const strictParseByte = (value) => {
    if (typeof value === "string") {
      return expectByte(parseNumber(value));
    }
    return expectByte(value);
  };
  const stackTraceWarning = (message) => {
    return String(new TypeError(message).stack || message).split("\n").slice(0, 5).filter((s) => !s.includes("stackTraceWarning")).join("\n");
  };
  const logger = {
    warn: console.warn
  };
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function dateToUtcString(date2) {
    const year2 = date2.getUTCFullYear();
    const month = date2.getUTCMonth();
    const dayOfWeek = date2.getUTCDay();
    const dayOfMonthInt = date2.getUTCDate();
    const hoursInt = date2.getUTCHours();
    const minutesInt = date2.getUTCMinutes();
    const secondsInt = date2.getUTCSeconds();
    const dayOfMonthString = dayOfMonthInt < 10 ? `0${dayOfMonthInt}` : `${dayOfMonthInt}`;
    const hoursString = hoursInt < 10 ? `0${hoursInt}` : `${hoursInt}`;
    const minutesString = minutesInt < 10 ? `0${minutesInt}` : `${minutesInt}`;
    const secondsString = secondsInt < 10 ? `0${secondsInt}` : `${secondsInt}`;
    return `${DAYS[dayOfWeek]}, ${dayOfMonthString} ${MONTHS[month]} ${year2} ${hoursString}:${minutesString}:${secondsString} GMT`;
  }
  const RFC3339 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?[zZ]$/);
  const parseRfc3339DateTime = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339.exec(value);
    if (!match) {
      throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds] = match;
    const year2 = strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    return buildDate(year2, month, day, { hours, minutes, seconds, fractionalMilliseconds });
  };
  const RFC3339_WITH_OFFSET$1 = new RegExp(/^(\d{4})-(\d{2})-(\d{2})[tT](\d{2}):(\d{2}):(\d{2})(?:\.(\d+))?(([-+]\d{2}\:\d{2})|[zZ])$/);
  const parseRfc3339DateTimeWithOffset = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC-3339 date-times must be expressed as strings");
    }
    const match = RFC3339_WITH_OFFSET$1.exec(value);
    if (!match) {
      throw new TypeError("Invalid RFC-3339 date-time value");
    }
    const [_, yearStr, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, offsetStr] = match;
    const year2 = strictParseShort(stripLeadingZeroes(yearStr));
    const month = parseDateValue(monthStr, "month", 1, 12);
    const day = parseDateValue(dayStr, "day", 1, 31);
    const date2 = buildDate(year2, month, day, { hours, minutes, seconds, fractionalMilliseconds });
    if (offsetStr.toUpperCase() != "Z") {
      date2.setTime(date2.getTime() - parseOffsetToMilliseconds(offsetStr));
    }
    return date2;
  };
  const IMF_FIXDATE$1 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d{2}) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
  const RFC_850_DATE$1 = new RegExp(/^(?:Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? GMT$/);
  const ASC_TIME$1 = new RegExp(/^(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( [1-9]|\d{2}) (\d{1,2}):(\d{2}):(\d{2})(?:\.(\d+))? (\d{4})$/);
  const parseRfc7231DateTime = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC-7231 date-times must be expressed as strings");
    }
    let match = IMF_FIXDATE$1.exec(value);
    if (match) {
      const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
      return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    match = RFC_850_DATE$1.exec(value);
    if (match) {
      const [_, dayStr, monthStr, yearStr, hours, minutes, seconds, fractionalMilliseconds] = match;
      return adjustRfc850Year(buildDate(parseTwoDigitYear(yearStr), parseMonthByShortName(monthStr), parseDateValue(dayStr, "day", 1, 31), {
        hours,
        minutes,
        seconds,
        fractionalMilliseconds
      }));
    }
    match = ASC_TIME$1.exec(value);
    if (match) {
      const [_, monthStr, dayStr, hours, minutes, seconds, fractionalMilliseconds, yearStr] = match;
      return buildDate(strictParseShort(stripLeadingZeroes(yearStr)), parseMonthByShortName(monthStr), parseDateValue(dayStr.trimLeft(), "day", 1, 31), { hours, minutes, seconds, fractionalMilliseconds });
    }
    throw new TypeError("Invalid RFC-7231 date-time value");
  };
  const parseEpochTimestamp = (value) => {
    if (value === null || value === void 0) {
      return void 0;
    }
    let valueAsDouble;
    if (typeof value === "number") {
      valueAsDouble = value;
    } else if (typeof value === "string") {
      valueAsDouble = strictParseDouble(value);
    } else if (typeof value === "object" && value.tag === 1) {
      valueAsDouble = value.value;
    } else {
      throw new TypeError("Epoch timestamps must be expressed as floating point numbers or their string representation");
    }
    if (Number.isNaN(valueAsDouble) || valueAsDouble === Infinity || valueAsDouble === -Infinity) {
      throw new TypeError("Epoch timestamps must be valid, non-Infinite, non-NaN numerics");
    }
    return new Date(Math.round(valueAsDouble * 1e3));
  };
  const buildDate = (year2, month, day, time2) => {
    const adjustedMonth = month - 1;
    validateDayOfMonth(year2, adjustedMonth, day);
    return new Date(Date.UTC(year2, adjustedMonth, day, parseDateValue(time2.hours, "hour", 0, 23), parseDateValue(time2.minutes, "minute", 0, 59), parseDateValue(time2.seconds, "seconds", 0, 60), parseMilliseconds(time2.fractionalMilliseconds)));
  };
  const parseTwoDigitYear = (value) => {
    const thisYear = (/* @__PURE__ */ new Date()).getUTCFullYear();
    const valueInThisCentury = Math.floor(thisYear / 100) * 100 + strictParseShort(stripLeadingZeroes(value));
    if (valueInThisCentury < thisYear) {
      return valueInThisCentury + 100;
    }
    return valueInThisCentury;
  };
  const FIFTY_YEARS_IN_MILLIS = 50 * 365 * 24 * 60 * 60 * 1e3;
  const adjustRfc850Year = (input) => {
    if (input.getTime() - (/* @__PURE__ */ new Date()).getTime() > FIFTY_YEARS_IN_MILLIS) {
      return new Date(Date.UTC(input.getUTCFullYear() - 100, input.getUTCMonth(), input.getUTCDate(), input.getUTCHours(), input.getUTCMinutes(), input.getUTCSeconds(), input.getUTCMilliseconds()));
    }
    return input;
  };
  const parseMonthByShortName = (value) => {
    const monthIdx = MONTHS.indexOf(value);
    if (monthIdx < 0) {
      throw new TypeError(`Invalid month: ${value}`);
    }
    return monthIdx + 1;
  };
  const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const validateDayOfMonth = (year2, month, day) => {
    let maxDays = DAYS_IN_MONTH[month];
    if (month === 1 && isLeapYear(year2)) {
      maxDays = 29;
    }
    if (day > maxDays) {
      throw new TypeError(`Invalid day for ${MONTHS[month]} in ${year2}: ${day}`);
    }
  };
  const isLeapYear = (year2) => {
    return year2 % 4 === 0 && (year2 % 100 !== 0 || year2 % 400 === 0);
  };
  const parseDateValue = (value, type, lower, upper) => {
    const dateVal = strictParseByte(stripLeadingZeroes(value));
    if (dateVal < lower || dateVal > upper) {
      throw new TypeError(`${type} must be between ${lower} and ${upper}, inclusive`);
    }
    return dateVal;
  };
  const parseMilliseconds = (value) => {
    if (value === null || value === void 0) {
      return 0;
    }
    return strictParseFloat32("0." + value) * 1e3;
  };
  const parseOffsetToMilliseconds = (value) => {
    const directionStr = value[0];
    let direction = 1;
    if (directionStr == "+") {
      direction = 1;
    } else if (directionStr == "-") {
      direction = -1;
    } else {
      throw new TypeError(`Offset direction, ${directionStr}, must be "+" or "-"`);
    }
    const hour = Number(value.substring(1, 3));
    const minute = Number(value.substring(4, 6));
    return direction * (hour * 60 + minute) * 60 * 1e3;
  };
  const stripLeadingZeroes = (value) => {
    let idx = 0;
    while (idx < value.length - 1 && value.charAt(idx) === "0") {
      idx++;
    }
    if (idx === 0) {
      return value;
    }
    return value.slice(idx);
  };
  const LazyJsonString = function LazyJsonString2(val) {
    const str = Object.assign(new String(val), {
      deserializeJSON() {
        return JSON.parse(String(val));
      },
      toString() {
        return String(val);
      },
      toJSON() {
        return String(val);
      }
    });
    return str;
  };
  LazyJsonString.from = (object) => {
    if (object && typeof object === "object" && (object instanceof LazyJsonString || "deserializeJSON" in object)) {
      return object;
    } else if (typeof object === "string" || Object.getPrototypeOf(object) === String.prototype) {
      return LazyJsonString(String(object));
    }
    return LazyJsonString(JSON.stringify(object));
  };
  LazyJsonString.fromObject = LazyJsonString.from;
  function quoteHeader(part) {
    if (part.includes(",") || part.includes('"')) {
      part = `"${part.replace(/"/g, '\\"')}"`;
    }
    return part;
  }
  const ddd = `(?:Mon|Tue|Wed|Thu|Fri|Sat|Sun)(?:[ne|u?r]?s?day)?`;
  const mmm = `(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)`;
  const time = `(\\d?\\d):(\\d{2}):(\\d{2})(?:\\.(\\d+))?`;
  const date = `(\\d?\\d)`;
  const year = `(\\d{4})`;
  const RFC3339_WITH_OFFSET = new RegExp(/^(\d{4})-(\d\d)-(\d\d)[tT](\d\d):(\d\d):(\d\d)(\.(\d+))?(([-+]\d\d:\d\d)|[zZ])$/);
  const IMF_FIXDATE = new RegExp(`^${ddd}, ${date} ${mmm} ${year} ${time} GMT$`);
  const RFC_850_DATE = new RegExp(`^${ddd}, ${date}-${mmm}-(\\d\\d) ${time} GMT$`);
  const ASC_TIME = new RegExp(`^${ddd} ${mmm} ( [1-9]|\\d\\d) ${time} ${year}$`);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const _parseEpochTimestamp = (value) => {
    if (value == null) {
      return void 0;
    }
    let num = NaN;
    if (typeof value === "number") {
      num = value;
    } else if (typeof value === "string") {
      if (!/^-?\d*\.?\d+$/.test(value)) {
        throw new TypeError(`parseEpochTimestamp - numeric string invalid.`);
      }
      num = Number.parseFloat(value);
    } else if (typeof value === "object" && value.tag === 1) {
      num = value.value;
    }
    if (isNaN(num) || Math.abs(num) === Infinity) {
      throw new TypeError("Epoch timestamps must be valid finite numbers.");
    }
    return new Date(Math.round(num * 1e3));
  };
  const _parseRfc3339DateTimeWithOffset = (value) => {
    if (value == null) {
      return void 0;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC3339 timestamps must be strings");
    }
    const matches = RFC3339_WITH_OFFSET.exec(value);
    if (!matches) {
      throw new TypeError(`Invalid RFC3339 timestamp format ${value}`);
    }
    const [, yearStr, monthStr, dayStr, hours, minutes, seconds, , ms, offsetStr] = matches;
    range(monthStr, 1, 12);
    range(dayStr, 1, 31);
    range(hours, 0, 23);
    range(minutes, 0, 59);
    range(seconds, 0, 60);
    const date2 = new Date(Date.UTC(Number(yearStr), Number(monthStr) - 1, Number(dayStr), Number(hours), Number(minutes), Number(seconds), Number(ms) ? Math.round(parseFloat(`0.${ms}`) * 1e3) : 0));
    date2.setUTCFullYear(Number(yearStr));
    if (offsetStr.toUpperCase() != "Z") {
      const [, sign, offsetH, offsetM] = /([+-])(\d\d):(\d\d)/.exec(offsetStr) || [void 0, "+", 0, 0];
      const scalar = sign === "-" ? 1 : -1;
      date2.setTime(date2.getTime() + scalar * (Number(offsetH) * 60 * 60 * 1e3 + Number(offsetM) * 60 * 1e3));
    }
    return date2;
  };
  const _parseRfc7231DateTime = (value) => {
    if (value == null) {
      return void 0;
    }
    if (typeof value !== "string") {
      throw new TypeError("RFC7231 timestamps must be strings.");
    }
    let day;
    let month;
    let year2;
    let hour;
    let minute;
    let second;
    let fraction;
    let matches;
    if (matches = IMF_FIXDATE.exec(value)) {
      [, day, month, year2, hour, minute, second, fraction] = matches;
    } else if (matches = RFC_850_DATE.exec(value)) {
      [, day, month, year2, hour, minute, second, fraction] = matches;
      year2 = (Number(year2) + 1900).toString();
    } else if (matches = ASC_TIME.exec(value)) {
      [, month, day, hour, minute, second, fraction, year2] = matches;
    }
    if (year2 && second) {
      const timestamp = Date.UTC(Number(year2), months.indexOf(month), Number(day), Number(hour), Number(minute), Number(second), fraction ? Math.round(parseFloat(`0.${fraction}`) * 1e3) : 0);
      range(day, 1, 31);
      range(hour, 0, 23);
      range(minute, 0, 59);
      range(second, 0, 60);
      const date2 = new Date(timestamp);
      date2.setUTCFullYear(Number(year2));
      return date2;
    }
    throw new TypeError(`Invalid RFC7231 date-time value ${value}.`);
  };
  function range(v, min, max) {
    const _v = Number(v);
    if (_v < min || _v > max) {
      throw new Error(`Value ${_v} out of range [${min}, ${max}]`);
    }
  }
  function splitEvery(value, delimiter, numDelimiters) {
    if (numDelimiters <= 0 || !Number.isInteger(numDelimiters)) {
      throw new Error("Invalid number of delimiters (" + numDelimiters + ") for splitEvery.");
    }
    const segments = value.split(delimiter);
    if (numDelimiters === 1) {
      return segments;
    }
    const compoundSegments = [];
    let currentSegment = "";
    for (let i = 0; i < segments.length; i++) {
      if (currentSegment === "") {
        currentSegment = segments[i];
      } else {
        currentSegment += delimiter + segments[i];
      }
      if ((i + 1) % numDelimiters === 0) {
        compoundSegments.push(currentSegment);
        currentSegment = "";
      }
    }
    if (currentSegment !== "") {
      compoundSegments.push(currentSegment);
    }
    return compoundSegments;
  }
  const splitHeader = (value) => {
    const z = value.length;
    const values = [];
    let withinQuotes = false;
    let prevChar = void 0;
    let anchor = 0;
    for (let i = 0; i < z; ++i) {
      const char = value[i];
      switch (char) {
        case `"`:
          if (prevChar !== "\\") {
            withinQuotes = !withinQuotes;
          }
          break;
        case ",":
          if (!withinQuotes) {
            values.push(value.slice(anchor, i));
            anchor = i + 1;
          }
          break;
      }
      prevChar = char;
    }
    values.push(value.slice(anchor));
    return values.map((v) => {
      v = v.trim();
      const z2 = v.length;
      if (z2 < 2) {
        return v;
      }
      if (v[0] === `"` && v[z2 - 1] === `"`) {
        v = v.slice(1, z2 - 1);
      }
      return v.replace(/\\"/g, '"');
    });
  };
  const format = /^-?\d*(\.\d+)?$/;
  class NumericValue {
    string;
    type;
    constructor(string, type) {
      this.string = string;
      this.type = type;
      if (!format.test(string)) {
        throw new Error(`@smithy/core/serde - NumericValue must only contain [0-9], at most one decimal point ".", and an optional negation prefix "-".`);
      }
    }
    toString() {
      return this.string;
    }
    static [Symbol.hasInstance](object) {
      if (!object || typeof object !== "object") {
        return false;
      }
      const _nv = object;
      return NumericValue.prototype.isPrototypeOf(object) || _nv.type === "bigDecimal" && format.test(_nv.string);
    }
  }
  function nv(input) {
    return new NumericValue(String(input), "bigDecimal");
  }
  serde.generateIdempotencyToken = uuid.v4;
  serde.LazyJsonString = LazyJsonString;
  serde.NumericValue = NumericValue;
  serde._parseEpochTimestamp = _parseEpochTimestamp;
  serde._parseRfc3339DateTimeWithOffset = _parseRfc3339DateTimeWithOffset;
  serde._parseRfc7231DateTime = _parseRfc7231DateTime;
  serde.copyDocumentWithTransform = copyDocumentWithTransform;
  serde.dateToUtcString = dateToUtcString;
  serde.expectBoolean = expectBoolean;
  serde.expectByte = expectByte;
  serde.expectFloat32 = expectFloat32;
  serde.expectInt = expectInt;
  serde.expectInt32 = expectInt32;
  serde.expectLong = expectLong;
  serde.expectNonNull = expectNonNull;
  serde.expectNumber = expectNumber;
  serde.expectObject = expectObject;
  serde.expectShort = expectShort;
  serde.expectString = expectString;
  serde.expectUnion = expectUnion;
  serde.handleFloat = handleFloat;
  serde.limitedParseDouble = limitedParseDouble;
  serde.limitedParseFloat = limitedParseFloat;
  serde.limitedParseFloat32 = limitedParseFloat32;
  serde.logger = logger;
  serde.nv = nv;
  serde.parseBoolean = parseBoolean;
  serde.parseEpochTimestamp = parseEpochTimestamp;
  serde.parseRfc3339DateTime = parseRfc3339DateTime;
  serde.parseRfc3339DateTimeWithOffset = parseRfc3339DateTimeWithOffset;
  serde.parseRfc7231DateTime = parseRfc7231DateTime;
  serde.quoteHeader = quoteHeader;
  serde.splitEvery = splitEvery;
  serde.splitHeader = splitHeader;
  serde.strictParseByte = strictParseByte;
  serde.strictParseDouble = strictParseDouble;
  serde.strictParseFloat = strictParseFloat;
  serde.strictParseFloat32 = strictParseFloat32;
  serde.strictParseInt = strictParseInt;
  serde.strictParseInt32 = strictParseInt32;
  serde.strictParseLong = strictParseLong;
  serde.strictParseShort = strictParseShort;
  return serde;
}
var hasRequiredProtocols;
function requireProtocols() {
  if (hasRequiredProtocols) return protocols;
  hasRequiredProtocols = 1;
  var utilStream = require$$0$1;
  var schema2 = /* @__PURE__ */ requireSchema();
  var serde2 = /* @__PURE__ */ requireSerde();
  var protocolHttp = require$$14;
  var utilBase64 = require$$5;
  var utilUtf8 = require$$6;
  const collectBody = async (streamBody = new Uint8Array(), context) => {
    if (streamBody instanceof Uint8Array) {
      return utilStream.Uint8ArrayBlobAdapter.mutate(streamBody);
    }
    if (!streamBody) {
      return utilStream.Uint8ArrayBlobAdapter.mutate(new Uint8Array());
    }
    const fromContext = context.streamCollector(streamBody);
    return utilStream.Uint8ArrayBlobAdapter.mutate(await fromContext);
  };
  function extendedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
      return "%" + c.charCodeAt(0).toString(16).toUpperCase();
    });
  }
  class SerdeContext {
    serdeContext;
    setSerdeContext(serdeContext) {
      this.serdeContext = serdeContext;
    }
  }
  class HttpProtocol extends SerdeContext {
    options;
    compositeErrorRegistry;
    constructor(options) {
      super();
      this.options = options;
      this.compositeErrorRegistry = schema2.TypeRegistry.for(options.defaultNamespace);
      for (const etr of options.errorTypeRegistries ?? []) {
        this.compositeErrorRegistry.copyFrom(etr);
      }
    }
    getRequestType() {
      return protocolHttp.HttpRequest;
    }
    getResponseType() {
      return protocolHttp.HttpResponse;
    }
    setSerdeContext(serdeContext) {
      this.serdeContext = serdeContext;
      this.serializer.setSerdeContext(serdeContext);
      this.deserializer.setSerdeContext(serdeContext);
      if (this.getPayloadCodec()) {
        this.getPayloadCodec().setSerdeContext(serdeContext);
      }
    }
    updateServiceEndpoint(request, endpoint) {
      if ("url" in endpoint) {
        request.protocol = endpoint.url.protocol;
        request.hostname = endpoint.url.hostname;
        request.port = endpoint.url.port ? Number(endpoint.url.port) : void 0;
        request.path = endpoint.url.pathname;
        request.fragment = endpoint.url.hash || void 0;
        request.username = endpoint.url.username || void 0;
        request.password = endpoint.url.password || void 0;
        if (!request.query) {
          request.query = {};
        }
        for (const [k, v] of endpoint.url.searchParams.entries()) {
          request.query[k] = v;
        }
        return request;
      } else {
        request.protocol = endpoint.protocol;
        request.hostname = endpoint.hostname;
        request.port = endpoint.port ? Number(endpoint.port) : void 0;
        request.path = endpoint.path;
        request.query = {
          ...endpoint.query
        };
        return request;
      }
    }
    setHostPrefix(request, operationSchema, input) {
      if (this.serdeContext?.disableHostPrefix) {
        return;
      }
      const inputNs = schema2.NormalizedSchema.of(operationSchema.input);
      const opTraits = schema2.translateTraits(operationSchema.traits ?? {});
      if (opTraits.endpoint) {
        let hostPrefix = opTraits.endpoint?.[0];
        if (typeof hostPrefix === "string") {
          const hostLabelInputs = [...inputNs.structIterator()].filter(([, member]) => member.getMergedTraits().hostLabel);
          for (const [name] of hostLabelInputs) {
            const replacement = input[name];
            if (typeof replacement !== "string") {
              throw new Error(`@smithy/core/schema - ${name} in input must be a string as hostLabel.`);
            }
            hostPrefix = hostPrefix.replace(`{${name}}`, replacement);
          }
          request.hostname = hostPrefix + request.hostname;
        }
      }
    }
    deserializeMetadata(output) {
      return {
        httpStatusCode: output.statusCode,
        requestId: output.headers["x-amzn-requestid"] ?? output.headers["x-amzn-request-id"] ?? output.headers["x-amz-request-id"],
        extendedRequestId: output.headers["x-amz-id-2"],
        cfId: output.headers["x-amz-cf-id"]
      };
    }
    async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
      const eventStreamSerde = await this.loadEventStreamCapability();
      return eventStreamSerde.serializeEventStream({
        eventStream,
        requestSchema,
        initialRequest
      });
    }
    async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
      const eventStreamSerde = await this.loadEventStreamCapability();
      return eventStreamSerde.deserializeEventStream({
        response,
        responseSchema,
        initialResponseContainer
      });
    }
    async loadEventStreamCapability() {
      const { EventStreamSerde } = await Promise.resolve().then(function() {
        return index;
      });
      return new EventStreamSerde({
        marshaller: this.getEventStreamMarshaller(),
        serializer: this.serializer,
        deserializer: this.deserializer,
        serdeContext: this.serdeContext,
        defaultContentType: this.getDefaultContentType()
      });
    }
    getDefaultContentType() {
      throw new Error(`@smithy/core/protocols - ${this.constructor.name} getDefaultContentType() implementation missing.`);
    }
    async deserializeHttpMessage(schema3, context, response, arg4, arg5) {
      return [];
    }
    getEventStreamMarshaller() {
      const context = this.serdeContext;
      if (!context.eventStreamMarshaller) {
        throw new Error("@smithy/core - HttpProtocol: eventStreamMarshaller missing in serdeContext.");
      }
      return context.eventStreamMarshaller;
    }
  }
  class HttpBindingProtocol extends HttpProtocol {
    async serializeRequest(operationSchema, _input, context) {
      const input = {
        ..._input ?? {}
      };
      const serializer = this.serializer;
      const query = {};
      const headers = {};
      const endpoint = await context.endpoint();
      const ns = schema2.NormalizedSchema.of(operationSchema?.input);
      const payloadMemberNames = [];
      const payloadMemberSchemas = [];
      let hasNonHttpBindingMember = false;
      let payload;
      const request = new protocolHttp.HttpRequest({
        protocol: "",
        hostname: "",
        port: void 0,
        path: "",
        fragment: void 0,
        query,
        headers,
        body: void 0
      });
      if (endpoint) {
        this.updateServiceEndpoint(request, endpoint);
        this.setHostPrefix(request, operationSchema, input);
        const opTraits = schema2.translateTraits(operationSchema.traits);
        if (opTraits.http) {
          request.method = opTraits.http[0];
          const [path, search] = opTraits.http[1].split("?");
          if (request.path == "/") {
            request.path = path;
          } else {
            request.path += path;
          }
          const traitSearchParams = new URLSearchParams(search ?? "");
          Object.assign(query, Object.fromEntries(traitSearchParams));
        }
      }
      for (const [memberName, memberNs] of ns.structIterator()) {
        const memberTraits = memberNs.getMergedTraits() ?? {};
        const inputMemberValue = input[memberName];
        if (inputMemberValue == null && !memberNs.isIdempotencyToken()) {
          if (memberTraits.httpLabel) {
            if (request.path.includes(`{${memberName}+}`) || request.path.includes(`{${memberName}}`)) {
              throw new Error(`No value provided for input HTTP label: ${memberName}.`);
            }
          }
          continue;
        }
        if (memberTraits.httpPayload) {
          const isStreaming = memberNs.isStreaming();
          if (isStreaming) {
            const isEventStream = memberNs.isStructSchema();
            if (isEventStream) {
              if (input[memberName]) {
                payload = await this.serializeEventStream({
                  eventStream: input[memberName],
                  requestSchema: ns
                });
              }
            } else {
              payload = inputMemberValue;
            }
          } else {
            serializer.write(memberNs, inputMemberValue);
            payload = serializer.flush();
          }
          delete input[memberName];
        } else if (memberTraits.httpLabel) {
          serializer.write(memberNs, inputMemberValue);
          const replacement = serializer.flush();
          if (request.path.includes(`{${memberName}+}`)) {
            request.path = request.path.replace(`{${memberName}+}`, replacement.split("/").map(extendedEncodeURIComponent).join("/"));
          } else if (request.path.includes(`{${memberName}}`)) {
            request.path = request.path.replace(`{${memberName}}`, extendedEncodeURIComponent(replacement));
          }
          delete input[memberName];
        } else if (memberTraits.httpHeader) {
          serializer.write(memberNs, inputMemberValue);
          headers[memberTraits.httpHeader.toLowerCase()] = String(serializer.flush());
          delete input[memberName];
        } else if (typeof memberTraits.httpPrefixHeaders === "string") {
          for (const [key, val] of Object.entries(inputMemberValue)) {
            const amalgam = memberTraits.httpPrefixHeaders + key;
            serializer.write([memberNs.getValueSchema(), { httpHeader: amalgam }], val);
            headers[amalgam.toLowerCase()] = serializer.flush();
          }
          delete input[memberName];
        } else if (memberTraits.httpQuery || memberTraits.httpQueryParams) {
          this.serializeQuery(memberNs, inputMemberValue, query);
          delete input[memberName];
        } else {
          hasNonHttpBindingMember = true;
          payloadMemberNames.push(memberName);
          payloadMemberSchemas.push(memberNs);
        }
      }
      if (hasNonHttpBindingMember && input) {
        const [namespace, name] = (ns.getName(true) ?? "#Unknown").split("#");
        const requiredMembers = ns.getSchema()[6];
        const payloadSchema = [
          3,
          namespace,
          name,
          ns.getMergedTraits(),
          payloadMemberNames,
          payloadMemberSchemas,
          void 0
        ];
        if (requiredMembers) {
          payloadSchema[6] = requiredMembers;
        } else {
          payloadSchema.pop();
        }
        serializer.write(payloadSchema, input);
        payload = serializer.flush();
      }
      request.headers = headers;
      request.query = query;
      request.body = payload;
      return request;
    }
    serializeQuery(ns, data, query) {
      const serializer = this.serializer;
      const traits = ns.getMergedTraits();
      if (traits.httpQueryParams) {
        for (const [key, val] of Object.entries(data)) {
          if (!(key in query)) {
            const valueSchema = ns.getValueSchema();
            Object.assign(valueSchema.getMergedTraits(), {
              ...traits,
              httpQuery: key,
              httpQueryParams: void 0
            });
            this.serializeQuery(valueSchema, val, query);
          }
        }
        return;
      }
      if (ns.isListSchema()) {
        const sparse = !!ns.getMergedTraits().sparse;
        const buffer = [];
        for (const item of data) {
          serializer.write([ns.getValueSchema(), traits], item);
          const serializable = serializer.flush();
          if (sparse || serializable !== void 0) {
            buffer.push(serializable);
          }
        }
        query[traits.httpQuery] = buffer;
      } else {
        serializer.write([ns, traits], data);
        query[traits.httpQuery] = serializer.flush();
      }
    }
    async deserializeResponse(operationSchema, context, response) {
      const deserializer = this.deserializer;
      const ns = schema2.NormalizedSchema.of(operationSchema.output);
      const dataObject = {};
      if (response.statusCode >= 300) {
        const bytes = await collectBody(response.body, context);
        if (bytes.byteLength > 0) {
          Object.assign(dataObject, await deserializer.read(15, bytes));
        }
        await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
        throw new Error("@smithy/core/protocols - HTTP Protocol error handler failed to throw.");
      }
      for (const header in response.headers) {
        const value = response.headers[header];
        delete response.headers[header];
        response.headers[header.toLowerCase()] = value;
      }
      const nonHttpBindingMembers = await this.deserializeHttpMessage(ns, context, response, dataObject);
      if (nonHttpBindingMembers.length) {
        const bytes = await collectBody(response.body, context);
        if (bytes.byteLength > 0) {
          const dataFromBody = await deserializer.read(ns, bytes);
          for (const member of nonHttpBindingMembers) {
            if (dataFromBody[member] != null) {
              dataObject[member] = dataFromBody[member];
            }
          }
        }
      } else if (nonHttpBindingMembers.discardResponseBody) {
        await collectBody(response.body, context);
      }
      dataObject.$metadata = this.deserializeMetadata(response);
      return dataObject;
    }
    async deserializeHttpMessage(schema$1, context, response, arg4, arg5) {
      let dataObject;
      if (arg4 instanceof Set) {
        dataObject = arg5;
      } else {
        dataObject = arg4;
      }
      let discardResponseBody = true;
      const deserializer = this.deserializer;
      const ns = schema2.NormalizedSchema.of(schema$1);
      const nonHttpBindingMembers = [];
      for (const [memberName, memberSchema] of ns.structIterator()) {
        const memberTraits = memberSchema.getMemberTraits();
        if (memberTraits.httpPayload) {
          discardResponseBody = false;
          const isStreaming = memberSchema.isStreaming();
          if (isStreaming) {
            const isEventStream = memberSchema.isStructSchema();
            if (isEventStream) {
              dataObject[memberName] = await this.deserializeEventStream({
                response,
                responseSchema: ns
              });
            } else {
              dataObject[memberName] = utilStream.sdkStreamMixin(response.body);
            }
          } else if (response.body) {
            const bytes = await collectBody(response.body, context);
            if (bytes.byteLength > 0) {
              dataObject[memberName] = await deserializer.read(memberSchema, bytes);
            }
          }
        } else if (memberTraits.httpHeader) {
          const key = String(memberTraits.httpHeader).toLowerCase();
          const value = response.headers[key];
          if (null != value) {
            if (memberSchema.isListSchema()) {
              const headerListValueSchema = memberSchema.getValueSchema();
              headerListValueSchema.getMergedTraits().httpHeader = key;
              let sections;
              if (headerListValueSchema.isTimestampSchema() && headerListValueSchema.getSchema() === 4) {
                sections = serde2.splitEvery(value, ",", 2);
              } else {
                sections = serde2.splitHeader(value);
              }
              const list = [];
              for (const section of sections) {
                list.push(await deserializer.read(headerListValueSchema, section.trim()));
              }
              dataObject[memberName] = list;
            } else {
              dataObject[memberName] = await deserializer.read(memberSchema, value);
            }
          }
        } else if (memberTraits.httpPrefixHeaders !== void 0) {
          dataObject[memberName] = {};
          for (const [header, value] of Object.entries(response.headers)) {
            if (header.startsWith(memberTraits.httpPrefixHeaders)) {
              const valueSchema = memberSchema.getValueSchema();
              valueSchema.getMergedTraits().httpHeader = header;
              dataObject[memberName][header.slice(memberTraits.httpPrefixHeaders.length)] = await deserializer.read(valueSchema, value);
            }
          }
        } else if (memberTraits.httpResponseCode) {
          dataObject[memberName] = response.statusCode;
        } else {
          nonHttpBindingMembers.push(memberName);
        }
      }
      nonHttpBindingMembers.discardResponseBody = discardResponseBody;
      return nonHttpBindingMembers;
    }
  }
  class RpcProtocol extends HttpProtocol {
    async serializeRequest(operationSchema, input, context) {
      const serializer = this.serializer;
      const query = {};
      const headers = {};
      const endpoint = await context.endpoint();
      const ns = schema2.NormalizedSchema.of(operationSchema?.input);
      const schema$1 = ns.getSchema();
      let payload;
      const request = new protocolHttp.HttpRequest({
        protocol: "",
        hostname: "",
        port: void 0,
        path: "/",
        fragment: void 0,
        query,
        headers,
        body: void 0
      });
      if (endpoint) {
        this.updateServiceEndpoint(request, endpoint);
        this.setHostPrefix(request, operationSchema, input);
      }
      const _input = {
        ...input
      };
      if (input) {
        const eventStreamMember = ns.getEventStreamMember();
        if (eventStreamMember) {
          if (_input[eventStreamMember]) {
            const initialRequest = {};
            for (const [memberName, memberSchema] of ns.structIterator()) {
              if (memberName !== eventStreamMember && _input[memberName]) {
                serializer.write(memberSchema, _input[memberName]);
                initialRequest[memberName] = serializer.flush();
              }
            }
            payload = await this.serializeEventStream({
              eventStream: _input[eventStreamMember],
              requestSchema: ns,
              initialRequest
            });
          }
        } else {
          serializer.write(schema$1, _input);
          payload = serializer.flush();
        }
      }
      request.headers = headers;
      request.query = query;
      request.body = payload;
      request.method = "POST";
      return request;
    }
    async deserializeResponse(operationSchema, context, response) {
      const deserializer = this.deserializer;
      const ns = schema2.NormalizedSchema.of(operationSchema.output);
      const dataObject = {};
      if (response.statusCode >= 300) {
        const bytes = await collectBody(response.body, context);
        if (bytes.byteLength > 0) {
          Object.assign(dataObject, await deserializer.read(15, bytes));
        }
        await this.handleError(operationSchema, context, response, dataObject, this.deserializeMetadata(response));
        throw new Error("@smithy/core/protocols - RPC Protocol error handler failed to throw.");
      }
      for (const header in response.headers) {
        const value = response.headers[header];
        delete response.headers[header];
        response.headers[header.toLowerCase()] = value;
      }
      const eventStreamMember = ns.getEventStreamMember();
      if (eventStreamMember) {
        dataObject[eventStreamMember] = await this.deserializeEventStream({
          response,
          responseSchema: ns,
          initialResponseContainer: dataObject
        });
      } else {
        const bytes = await collectBody(response.body, context);
        if (bytes.byteLength > 0) {
          Object.assign(dataObject, await deserializer.read(ns, bytes));
        }
      }
      dataObject.$metadata = this.deserializeMetadata(response);
      return dataObject;
    }
  }
  const resolvedPath = (resolvedPath2, input, memberName, labelValueProvider, uriLabel, isGreedyLabel) => {
    if (input != null && input[memberName] !== void 0) {
      const labelValue = labelValueProvider();
      if (labelValue == null || labelValue.length <= 0) {
        throw new Error("Empty value provided for input HTTP label: " + memberName + ".");
      }
      resolvedPath2 = resolvedPath2.replace(uriLabel, isGreedyLabel ? labelValue.split("/").map((segment) => extendedEncodeURIComponent(segment)).join("/") : extendedEncodeURIComponent(labelValue));
    } else {
      throw new Error("No value provided for input HTTP label: " + memberName + ".");
    }
    return resolvedPath2;
  };
  function requestBuilder(input, context) {
    return new RequestBuilder(input, context);
  }
  class RequestBuilder {
    input;
    context;
    query = {};
    method = "";
    headers = {};
    path = "";
    body = null;
    hostname = "";
    resolvePathStack = [];
    constructor(input, context) {
      this.input = input;
      this.context = context;
    }
    async build() {
      const { hostname, protocol = "https", port, path: basePath } = await this.context.endpoint();
      this.path = basePath;
      for (const resolvePath of this.resolvePathStack) {
        resolvePath(this.path);
      }
      return new protocolHttp.HttpRequest({
        protocol,
        hostname: this.hostname || hostname,
        port,
        method: this.method,
        path: this.path,
        query: this.query,
        body: this.body,
        headers: this.headers
      });
    }
    hn(hostname) {
      this.hostname = hostname;
      return this;
    }
    bp(uriLabel) {
      this.resolvePathStack.push((basePath) => {
        this.path = `${basePath?.endsWith("/") ? basePath.slice(0, -1) : basePath || ""}` + uriLabel;
      });
      return this;
    }
    p(memberName, labelValueProvider, uriLabel, isGreedyLabel) {
      this.resolvePathStack.push((path) => {
        this.path = resolvedPath(path, this.input, memberName, labelValueProvider, uriLabel, isGreedyLabel);
      });
      return this;
    }
    h(headers) {
      this.headers = headers;
      return this;
    }
    q(query) {
      this.query = query;
      return this;
    }
    b(body) {
      this.body = body;
      return this;
    }
    m(method) {
      this.method = method;
      return this;
    }
  }
  function determineTimestampFormat(ns, settings) {
    if (settings.timestampFormat.useTrait) {
      if (ns.isTimestampSchema() && (ns.getSchema() === 5 || ns.getSchema() === 6 || ns.getSchema() === 7)) {
        return ns.getSchema();
      }
    }
    const { httpLabel, httpPrefixHeaders, httpHeader, httpQuery } = ns.getMergedTraits();
    const bindingFormat = settings.httpBindings ? typeof httpPrefixHeaders === "string" || Boolean(httpHeader) ? 6 : Boolean(httpQuery) || Boolean(httpLabel) ? 5 : void 0 : void 0;
    return bindingFormat ?? settings.timestampFormat.default;
  }
  class FromStringShapeDeserializer extends SerdeContext {
    settings;
    constructor(settings) {
      super();
      this.settings = settings;
    }
    read(_schema, data) {
      const ns = schema2.NormalizedSchema.of(_schema);
      if (ns.isListSchema()) {
        return serde2.splitHeader(data).map((item) => this.read(ns.getValueSchema(), item));
      }
      if (ns.isBlobSchema()) {
        return (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(data);
      }
      if (ns.isTimestampSchema()) {
        const format = determineTimestampFormat(ns, this.settings);
        switch (format) {
          case 5:
            return serde2._parseRfc3339DateTimeWithOffset(data);
          case 6:
            return serde2._parseRfc7231DateTime(data);
          case 7:
            return serde2._parseEpochTimestamp(data);
          default:
            console.warn("Missing timestamp format, parsing value with Date constructor:", data);
            return new Date(data);
        }
      }
      if (ns.isStringSchema()) {
        const mediaType = ns.getMergedTraits().mediaType;
        let intermediateValue = data;
        if (mediaType) {
          if (ns.getMergedTraits().httpHeader) {
            intermediateValue = this.base64ToUtf8(intermediateValue);
          }
          const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
          if (isJson) {
            intermediateValue = serde2.LazyJsonString.from(intermediateValue);
          }
          return intermediateValue;
        }
      }
      if (ns.isNumericSchema()) {
        return Number(data);
      }
      if (ns.isBigIntegerSchema()) {
        return BigInt(data);
      }
      if (ns.isBigDecimalSchema()) {
        return new serde2.NumericValue(data, "bigDecimal");
      }
      if (ns.isBooleanSchema()) {
        return String(data).toLowerCase() === "true";
      }
      return data;
    }
    base64ToUtf8(base64String) {
      return (this.serdeContext?.utf8Encoder ?? utilUtf8.toUtf8)((this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(base64String));
    }
  }
  class HttpInterceptingShapeDeserializer extends SerdeContext {
    codecDeserializer;
    stringDeserializer;
    constructor(codecDeserializer, codecSettings) {
      super();
      this.codecDeserializer = codecDeserializer;
      this.stringDeserializer = new FromStringShapeDeserializer(codecSettings);
    }
    setSerdeContext(serdeContext) {
      this.stringDeserializer.setSerdeContext(serdeContext);
      this.codecDeserializer.setSerdeContext(serdeContext);
      this.serdeContext = serdeContext;
    }
    read(schema$1, data) {
      const ns = schema2.NormalizedSchema.of(schema$1);
      const traits = ns.getMergedTraits();
      const toString = this.serdeContext?.utf8Encoder ?? utilUtf8.toUtf8;
      if (traits.httpHeader || traits.httpResponseCode) {
        return this.stringDeserializer.read(ns, toString(data));
      }
      if (traits.httpPayload) {
        if (ns.isBlobSchema()) {
          const toBytes = this.serdeContext?.utf8Decoder ?? utilUtf8.fromUtf8;
          if (typeof data === "string") {
            return toBytes(data);
          }
          return data;
        } else if (ns.isStringSchema()) {
          if ("byteLength" in data) {
            return toString(data);
          }
          return data;
        }
      }
      return this.codecDeserializer.read(ns, data);
    }
  }
  class ToStringShapeSerializer extends SerdeContext {
    settings;
    stringBuffer = "";
    constructor(settings) {
      super();
      this.settings = settings;
    }
    write(schema$1, value) {
      const ns = schema2.NormalizedSchema.of(schema$1);
      switch (typeof value) {
        case "object":
          if (value === null) {
            this.stringBuffer = "null";
            return;
          }
          if (ns.isTimestampSchema()) {
            if (!(value instanceof Date)) {
              throw new Error(`@smithy/core/protocols - received non-Date value ${value} when schema expected Date in ${ns.getName(true)}`);
            }
            const format = determineTimestampFormat(ns, this.settings);
            switch (format) {
              case 5:
                this.stringBuffer = value.toISOString().replace(".000Z", "Z");
                break;
              case 6:
                this.stringBuffer = serde2.dateToUtcString(value);
                break;
              case 7:
                this.stringBuffer = String(value.getTime() / 1e3);
                break;
              default:
                console.warn("Missing timestamp format, using epoch seconds", value);
                this.stringBuffer = String(value.getTime() / 1e3);
            }
            return;
          }
          if (ns.isBlobSchema() && "byteLength" in value) {
            this.stringBuffer = (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(value);
            return;
          }
          if (ns.isListSchema() && Array.isArray(value)) {
            let buffer = "";
            for (const item of value) {
              this.write([ns.getValueSchema(), ns.getMergedTraits()], item);
              const headerItem = this.flush();
              const serialized = ns.getValueSchema().isTimestampSchema() ? headerItem : serde2.quoteHeader(headerItem);
              if (buffer !== "") {
                buffer += ", ";
              }
              buffer += serialized;
            }
            this.stringBuffer = buffer;
            return;
          }
          this.stringBuffer = JSON.stringify(value, null, 2);
          break;
        case "string":
          const mediaType = ns.getMergedTraits().mediaType;
          let intermediateValue = value;
          if (mediaType) {
            const isJson = mediaType === "application/json" || mediaType.endsWith("+json");
            if (isJson) {
              intermediateValue = serde2.LazyJsonString.from(intermediateValue);
            }
            if (ns.getMergedTraits().httpHeader) {
              this.stringBuffer = (this.serdeContext?.base64Encoder ?? utilBase64.toBase64)(intermediateValue.toString());
              return;
            }
          }
          this.stringBuffer = value;
          break;
        default:
          if (ns.isIdempotencyToken()) {
            this.stringBuffer = serde2.generateIdempotencyToken();
          } else {
            this.stringBuffer = String(value);
          }
      }
    }
    flush() {
      const buffer = this.stringBuffer;
      this.stringBuffer = "";
      return buffer;
    }
  }
  class HttpInterceptingShapeSerializer {
    codecSerializer;
    stringSerializer;
    buffer;
    constructor(codecSerializer, codecSettings, stringSerializer = new ToStringShapeSerializer(codecSettings)) {
      this.codecSerializer = codecSerializer;
      this.stringSerializer = stringSerializer;
    }
    setSerdeContext(serdeContext) {
      this.codecSerializer.setSerdeContext(serdeContext);
      this.stringSerializer.setSerdeContext(serdeContext);
    }
    write(schema$1, value) {
      const ns = schema2.NormalizedSchema.of(schema$1);
      const traits = ns.getMergedTraits();
      if (traits.httpHeader || traits.httpLabel || traits.httpQuery) {
        this.stringSerializer.write(ns, value);
        this.buffer = this.stringSerializer.flush();
        return;
      }
      return this.codecSerializer.write(ns, value);
    }
    flush() {
      if (this.buffer !== void 0) {
        const buffer = this.buffer;
        this.buffer = void 0;
        return buffer;
      }
      return this.codecSerializer.flush();
    }
  }
  protocols.FromStringShapeDeserializer = FromStringShapeDeserializer;
  protocols.HttpBindingProtocol = HttpBindingProtocol;
  protocols.HttpInterceptingShapeDeserializer = HttpInterceptingShapeDeserializer;
  protocols.HttpInterceptingShapeSerializer = HttpInterceptingShapeSerializer;
  protocols.HttpProtocol = HttpProtocol;
  protocols.RequestBuilder = RequestBuilder;
  protocols.RpcProtocol = RpcProtocol;
  protocols.SerdeContext = SerdeContext;
  protocols.ToStringShapeSerializer = ToStringShapeSerializer;
  protocols.collectBody = collectBody;
  protocols.determineTimestampFormat = determineTimestampFormat;
  protocols.extendedEncodeURIComponent = extendedEncodeURIComponent;
  protocols.requestBuilder = requestBuilder;
  protocols.resolvedPath = resolvedPath;
  return protocols;
}
var hasRequiredDistCjs;
function requireDistCjs() {
  if (hasRequiredDistCjs) return distCjs;
  hasRequiredDistCjs = 1;
  var types = require$$0$2;
  var utilMiddleware = require$$1;
  var middlewareSerde = require$$2;
  var protocolHttp = require$$14;
  var protocols2 = /* @__PURE__ */ requireProtocols();
  const getSmithyContext = (context) => context[types.SMITHY_CONTEXT_KEY] || (context[types.SMITHY_CONTEXT_KEY] = {});
  const resolveAuthOptions = (candidateAuthOptions, authSchemePreference) => {
    if (!authSchemePreference || authSchemePreference.length === 0) {
      return candidateAuthOptions;
    }
    const preferredAuthOptions = [];
    for (const preferredSchemeName of authSchemePreference) {
      for (const candidateAuthOption of candidateAuthOptions) {
        const candidateAuthSchemeName = candidateAuthOption.schemeId.split("#")[1];
        if (candidateAuthSchemeName === preferredSchemeName) {
          preferredAuthOptions.push(candidateAuthOption);
        }
      }
    }
    for (const candidateAuthOption of candidateAuthOptions) {
      if (!preferredAuthOptions.find(({ schemeId }) => schemeId === candidateAuthOption.schemeId)) {
        preferredAuthOptions.push(candidateAuthOption);
      }
    }
    return preferredAuthOptions;
  };
  function convertHttpAuthSchemesToMap(httpAuthSchemes) {
    const map = /* @__PURE__ */ new Map();
    for (const scheme of httpAuthSchemes) {
      map.set(scheme.schemeId, scheme);
    }
    return map;
  }
  const httpAuthSchemeMiddleware = (config, mwOptions) => (next, context) => async (args) => {
    const options = config.httpAuthSchemeProvider(await mwOptions.httpAuthSchemeParametersProvider(config, context, args.input));
    const authSchemePreference = config.authSchemePreference ? await config.authSchemePreference() : [];
    const resolvedOptions = resolveAuthOptions(options, authSchemePreference);
    const authSchemes = convertHttpAuthSchemesToMap(config.httpAuthSchemes);
    const smithyContext = utilMiddleware.getSmithyContext(context);
    const failureReasons = [];
    for (const option of resolvedOptions) {
      const scheme = authSchemes.get(option.schemeId);
      if (!scheme) {
        failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` was not enabled for this service.`);
        continue;
      }
      const identityProvider = scheme.identityProvider(await mwOptions.identityProviderConfigProvider(config));
      if (!identityProvider) {
        failureReasons.push(`HttpAuthScheme \`${option.schemeId}\` did not have an IdentityProvider configured.`);
        continue;
      }
      const { identityProperties = {}, signingProperties = {} } = option.propertiesExtractor?.(config, context) || {};
      option.identityProperties = Object.assign(option.identityProperties || {}, identityProperties);
      option.signingProperties = Object.assign(option.signingProperties || {}, signingProperties);
      smithyContext.selectedHttpAuthScheme = {
        httpAuthOption: option,
        identity: await identityProvider(option.identityProperties),
        signer: scheme.signer
      };
      break;
    }
    if (!smithyContext.selectedHttpAuthScheme) {
      throw new Error(failureReasons.join("\n"));
    }
    return next(args);
  };
  const httpAuthSchemeEndpointRuleSetMiddlewareOptions = {
    step: "serialize",
    tags: ["HTTP_AUTH_SCHEME"],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: "endpointV2Middleware"
  };
  const getHttpAuthSchemeEndpointRuleSetPlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
        httpAuthSchemeParametersProvider,
        identityProviderConfigProvider
      }), httpAuthSchemeEndpointRuleSetMiddlewareOptions);
    }
  });
  const httpAuthSchemeMiddlewareOptions = {
    step: "serialize",
    tags: ["HTTP_AUTH_SCHEME"],
    name: "httpAuthSchemeMiddleware",
    override: true,
    relation: "before",
    toMiddleware: middlewareSerde.serializerMiddlewareOption.name
  };
  const getHttpAuthSchemePlugin = (config, { httpAuthSchemeParametersProvider, identityProviderConfigProvider }) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(httpAuthSchemeMiddleware(config, {
        httpAuthSchemeParametersProvider,
        identityProviderConfigProvider
      }), httpAuthSchemeMiddlewareOptions);
    }
  });
  const defaultErrorHandler = (signingProperties) => (error) => {
    throw error;
  };
  const defaultSuccessHandler = (httpResponse, signingProperties) => {
  };
  const httpSigningMiddleware = (config) => (next, context) => async (args) => {
    if (!protocolHttp.HttpRequest.isInstance(args.request)) {
      return next(args);
    }
    const smithyContext = utilMiddleware.getSmithyContext(context);
    const scheme = smithyContext.selectedHttpAuthScheme;
    if (!scheme) {
      throw new Error(`No HttpAuthScheme was selected: unable to sign request`);
    }
    const { httpAuthOption: { signingProperties = {} }, identity, signer } = scheme;
    const output = await next({
      ...args,
      request: await signer.sign(args.request, identity, signingProperties)
    }).catch((signer.errorHandler || defaultErrorHandler)(signingProperties));
    (signer.successHandler || defaultSuccessHandler)(output.response, signingProperties);
    return output;
  };
  const httpSigningMiddlewareOptions = {
    step: "finalizeRequest",
    tags: ["HTTP_SIGNING"],
    name: "httpSigningMiddleware",
    aliases: ["apiKeyMiddleware", "tokenMiddleware", "awsAuthMiddleware"],
    override: true,
    relation: "after",
    toMiddleware: "retryMiddleware"
  };
  const getHttpSigningPlugin = (config) => ({
    applyToStack: (clientStack) => {
      clientStack.addRelativeTo(httpSigningMiddleware(), httpSigningMiddlewareOptions);
    }
  });
  const normalizeProvider = (input) => {
    if (typeof input === "function")
      return input;
    const promisified = Promise.resolve(input);
    return () => promisified;
  };
  const makePagedClientRequest = async (CommandCtor, client, input, withCommand = (_) => _, ...args) => {
    let command = new CommandCtor(input);
    command = withCommand(command) ?? command;
    return await client.send(command, ...args);
  };
  function createPaginator(ClientCtor, CommandCtor, inputTokenName, outputTokenName, pageSizeTokenName) {
    return async function* paginateOperation(config, input, ...additionalArguments) {
      const _input = input;
      let token = config.startingToken ?? _input[inputTokenName];
      let hasNext = true;
      let page;
      while (hasNext) {
        _input[inputTokenName] = token;
        if (pageSizeTokenName) {
          _input[pageSizeTokenName] = _input[pageSizeTokenName] ?? config.pageSize;
        }
        if (config.client instanceof ClientCtor) {
          page = await makePagedClientRequest(CommandCtor, config.client, input, config.withCommand, ...additionalArguments);
        } else {
          throw new Error(`Invalid client, expected instance of ${ClientCtor.name}`);
        }
        yield page;
        const prevToken = token;
        token = get(page, outputTokenName);
        hasNext = !!(token && (!config.stopOnSameToken || token !== prevToken));
      }
      return void 0;
    };
  }
  const get = (fromObject, path) => {
    let cursor = fromObject;
    const pathComponents = path.split(".");
    for (const step of pathComponents) {
      if (!cursor || typeof cursor !== "object") {
        return void 0;
      }
      cursor = cursor[step];
    }
    return cursor;
  };
  function setFeature(context, feature, value) {
    if (!context.__smithy_context) {
      context.__smithy_context = {
        features: {}
      };
    } else if (!context.__smithy_context.features) {
      context.__smithy_context.features = {};
    }
    context.__smithy_context.features[feature] = value;
  }
  class DefaultIdentityProviderConfig {
    authSchemes = /* @__PURE__ */ new Map();
    constructor(config) {
      for (const [key, value] of Object.entries(config)) {
        if (value !== void 0) {
          this.authSchemes.set(key, value);
        }
      }
    }
    getIdentityProvider(schemeId) {
      return this.authSchemes.get(schemeId);
    }
  }
  class HttpApiKeyAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
      if (!signingProperties) {
        throw new Error("request could not be signed with `apiKey` since the `name` and `in` signer properties are missing");
      }
      if (!signingProperties.name) {
        throw new Error("request could not be signed with `apiKey` since the `name` signer property is missing");
      }
      if (!signingProperties.in) {
        throw new Error("request could not be signed with `apiKey` since the `in` signer property is missing");
      }
      if (!identity.apiKey) {
        throw new Error("request could not be signed with `apiKey` since the `apiKey` is not defined");
      }
      const clonedRequest = protocolHttp.HttpRequest.clone(httpRequest);
      if (signingProperties.in === types.HttpApiKeyAuthLocation.QUERY) {
        clonedRequest.query[signingProperties.name] = identity.apiKey;
      } else if (signingProperties.in === types.HttpApiKeyAuthLocation.HEADER) {
        clonedRequest.headers[signingProperties.name] = signingProperties.scheme ? `${signingProperties.scheme} ${identity.apiKey}` : identity.apiKey;
      } else {
        throw new Error("request can only be signed with `apiKey` locations `query` or `header`, but found: `" + signingProperties.in + "`");
      }
      return clonedRequest;
    }
  }
  class HttpBearerAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
      const clonedRequest = protocolHttp.HttpRequest.clone(httpRequest);
      if (!identity.token) {
        throw new Error("request could not be signed with `token` since the `token` is not defined");
      }
      clonedRequest.headers["Authorization"] = `Bearer ${identity.token}`;
      return clonedRequest;
    }
  }
  class NoAuthSigner {
    async sign(httpRequest, identity, signingProperties) {
      return httpRequest;
    }
  }
  const createIsIdentityExpiredFunction = (expirationMs) => function isIdentityExpired2(identity) {
    return doesIdentityRequireRefresh(identity) && identity.expiration.getTime() - Date.now() < expirationMs;
  };
  const EXPIRATION_MS = 3e5;
  const isIdentityExpired = createIsIdentityExpiredFunction(EXPIRATION_MS);
  const doesIdentityRequireRefresh = (identity) => identity.expiration !== void 0;
  const memoizeIdentityProvider = (provider, isExpired, requiresRefresh) => {
    if (provider === void 0) {
      return void 0;
    }
    const normalizedProvider = typeof provider !== "function" ? async () => Promise.resolve(provider) : provider;
    let resolved;
    let pending;
    let hasResult;
    let isConstant = false;
    const coalesceProvider = async (options) => {
      if (!pending) {
        pending = normalizedProvider(options);
      }
      try {
        resolved = await pending;
        hasResult = true;
        isConstant = false;
      } finally {
        pending = void 0;
      }
      return resolved;
    };
    if (isExpired === void 0) {
      return async (options) => {
        if (!hasResult || options?.forceRefresh) {
          resolved = await coalesceProvider(options);
        }
        return resolved;
      };
    }
    return async (options) => {
      if (!hasResult || options?.forceRefresh) {
        resolved = await coalesceProvider(options);
      }
      if (isConstant) {
        return resolved;
      }
      if (!requiresRefresh(resolved)) {
        isConstant = true;
        return resolved;
      }
      if (isExpired(resolved)) {
        await coalesceProvider(options);
        return resolved;
      }
      return resolved;
    };
  };
  distCjs.requestBuilder = protocols2.requestBuilder;
  distCjs.DefaultIdentityProviderConfig = DefaultIdentityProviderConfig;
  distCjs.EXPIRATION_MS = EXPIRATION_MS;
  distCjs.HttpApiKeyAuthSigner = HttpApiKeyAuthSigner;
  distCjs.HttpBearerAuthSigner = HttpBearerAuthSigner;
  distCjs.NoAuthSigner = NoAuthSigner;
  distCjs.createIsIdentityExpiredFunction = createIsIdentityExpiredFunction;
  distCjs.createPaginator = createPaginator;
  distCjs.doesIdentityRequireRefresh = doesIdentityRequireRefresh;
  distCjs.getHttpAuthSchemeEndpointRuleSetPlugin = getHttpAuthSchemeEndpointRuleSetPlugin;
  distCjs.getHttpAuthSchemePlugin = getHttpAuthSchemePlugin;
  distCjs.getHttpSigningPlugin = getHttpSigningPlugin;
  distCjs.getSmithyContext = getSmithyContext;
  distCjs.httpAuthSchemeEndpointRuleSetMiddlewareOptions = httpAuthSchemeEndpointRuleSetMiddlewareOptions;
  distCjs.httpAuthSchemeMiddleware = httpAuthSchemeMiddleware;
  distCjs.httpAuthSchemeMiddlewareOptions = httpAuthSchemeMiddlewareOptions;
  distCjs.httpSigningMiddleware = httpSigningMiddleware;
  distCjs.httpSigningMiddlewareOptions = httpSigningMiddlewareOptions;
  distCjs.isIdentityExpired = isIdentityExpired;
  distCjs.memoizeIdentityProvider = memoizeIdentityProvider;
  distCjs.normalizeProvider = normalizeProvider;
  distCjs.setFeature = setFeature;
  return distCjs;
}
var cbor = {};
var hasRequiredCbor;
function requireCbor() {
  if (hasRequiredCbor) return cbor;
  hasRequiredCbor = 1;
  var serde2 = /* @__PURE__ */ requireSerde();
  var utilUtf8 = require$$6;
  var protocols2 = /* @__PURE__ */ requireProtocols();
  var protocolHttp = require$$14;
  var utilBodyLengthBrowser = require$$4;
  var schema2 = /* @__PURE__ */ requireSchema();
  var utilMiddleware = require$$1;
  var utilBase64 = require$$5;
  const majorUint64 = 0;
  const majorNegativeInt64 = 1;
  const majorUnstructuredByteString = 2;
  const majorUtf8String = 3;
  const majorList = 4;
  const majorMap = 5;
  const majorTag = 6;
  const majorSpecial = 7;
  const specialFalse = 20;
  const specialTrue = 21;
  const specialNull = 22;
  const specialUndefined = 23;
  const extendedOneByte = 24;
  const extendedFloat16 = 25;
  const extendedFloat32 = 26;
  const extendedFloat64 = 27;
  const minorIndefinite = 31;
  function alloc(size) {
    return typeof Buffer !== "undefined" ? Buffer.alloc(size) : new Uint8Array(size);
  }
  const tagSymbol = /* @__PURE__ */ Symbol("@smithy/core/cbor::tagSymbol");
  function tag(data2) {
    data2[tagSymbol] = true;
    return data2;
  }
  const USE_TEXT_DECODER = typeof TextDecoder !== "undefined";
  const USE_BUFFER$1 = typeof Buffer !== "undefined";
  let payload = alloc(0);
  let dataView$1 = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
  const textDecoder = USE_TEXT_DECODER ? new TextDecoder() : null;
  let _offset = 0;
  function setPayload(bytes) {
    payload = bytes;
    dataView$1 = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
  }
  function decode(at, to) {
    if (at >= to) {
      throw new Error("unexpected end of (decode) payload.");
    }
    const major = (payload[at] & 224) >> 5;
    const minor = payload[at] & 31;
    switch (major) {
      case majorUint64:
      case majorNegativeInt64:
      case majorTag:
        let unsignedInt;
        let offset;
        if (minor < 24) {
          unsignedInt = minor;
          offset = 1;
        } else {
          switch (minor) {
            case extendedOneByte:
            case extendedFloat16:
            case extendedFloat32:
            case extendedFloat64:
              const countLength = minorValueToArgumentLength[minor];
              const countOffset = countLength + 1;
              offset = countOffset;
              if (to - at < countOffset) {
                throw new Error(`countLength ${countLength} greater than remaining buf len.`);
              }
              const countIndex = at + 1;
              if (countLength === 1) {
                unsignedInt = payload[countIndex];
              } else if (countLength === 2) {
                unsignedInt = dataView$1.getUint16(countIndex);
              } else if (countLength === 4) {
                unsignedInt = dataView$1.getUint32(countIndex);
              } else {
                unsignedInt = dataView$1.getBigUint64(countIndex);
              }
              break;
            default:
              throw new Error(`unexpected minor value ${minor}.`);
          }
        }
        if (major === majorUint64) {
          _offset = offset;
          return castBigInt(unsignedInt);
        } else if (major === majorNegativeInt64) {
          let negativeInt;
          if (typeof unsignedInt === "bigint") {
            negativeInt = BigInt(-1) - unsignedInt;
          } else {
            negativeInt = -1 - unsignedInt;
          }
          _offset = offset;
          return castBigInt(negativeInt);
        } else {
          if (minor === 2 || minor === 3) {
            const length = decodeCount(at + offset, to);
            let b = BigInt(0);
            const start = at + offset + _offset;
            for (let i = start; i < start + length; ++i) {
              b = b << BigInt(8) | BigInt(payload[i]);
            }
            _offset = offset + _offset + length;
            return minor === 3 ? -b - BigInt(1) : b;
          } else if (minor === 4) {
            const decimalFraction = decode(at + offset, to);
            const [exponent, mantissa] = decimalFraction;
            const normalizer = mantissa < 0 ? -1 : 1;
            const mantissaStr = "0".repeat(Math.abs(exponent) + 1) + String(BigInt(normalizer) * BigInt(mantissa));
            let numericString;
            const sign = mantissa < 0 ? "-" : "";
            numericString = exponent === 0 ? mantissaStr : mantissaStr.slice(0, mantissaStr.length + exponent) + "." + mantissaStr.slice(exponent);
            numericString = numericString.replace(/^0+/g, "");
            if (numericString === "") {
              numericString = "0";
            }
            if (numericString[0] === ".") {
              numericString = "0" + numericString;
            }
            numericString = sign + numericString;
            _offset = offset + _offset;
            return serde2.nv(numericString);
          } else {
            const value = decode(at + offset, to);
            const valueOffset = _offset;
            _offset = offset + valueOffset;
            return tag({ tag: castBigInt(unsignedInt), value });
          }
        }
      case majorUtf8String:
      case majorMap:
      case majorList:
      case majorUnstructuredByteString:
        if (minor === minorIndefinite) {
          switch (major) {
            case majorUtf8String:
              return decodeUtf8StringIndefinite(at, to);
            case majorMap:
              return decodeMapIndefinite(at, to);
            case majorList:
              return decodeListIndefinite(at, to);
            case majorUnstructuredByteString:
              return decodeUnstructuredByteStringIndefinite(at, to);
          }
        } else {
          switch (major) {
            case majorUtf8String:
              return decodeUtf8String(at, to);
            case majorMap:
              return decodeMap(at, to);
            case majorList:
              return decodeList(at, to);
            case majorUnstructuredByteString:
              return decodeUnstructuredByteString(at, to);
          }
        }
      default:
        return decodeSpecial(at, to);
    }
  }
  function bytesToUtf8(bytes, at, to) {
    if (USE_BUFFER$1 && bytes.constructor?.name === "Buffer") {
      return bytes.toString("utf-8", at, to);
    }
    if (textDecoder) {
      return textDecoder.decode(bytes.subarray(at, to));
    }
    return utilUtf8.toUtf8(bytes.subarray(at, to));
  }
  function demote(bigInteger) {
    const num = Number(bigInteger);
    if (num < Number.MIN_SAFE_INTEGER || Number.MAX_SAFE_INTEGER < num) {
      console.warn(new Error(`@smithy/core/cbor - truncating BigInt(${bigInteger}) to ${num} with loss of precision.`));
    }
    return num;
  }
  const minorValueToArgumentLength = {
    [extendedOneByte]: 1,
    [extendedFloat16]: 2,
    [extendedFloat32]: 4,
    [extendedFloat64]: 8
  };
  function bytesToFloat16(a, b) {
    const sign = a >> 7;
    const exponent = (a & 124) >> 2;
    const fraction = (a & 3) << 8 | b;
    const scalar = sign === 0 ? 1 : -1;
    let exponentComponent;
    let summation;
    if (exponent === 0) {
      if (fraction === 0) {
        return 0;
      } else {
        exponentComponent = Math.pow(2, 1 - 15);
        summation = 0;
      }
    } else if (exponent === 31) {
      if (fraction === 0) {
        return scalar * Infinity;
      } else {
        return NaN;
      }
    } else {
      exponentComponent = Math.pow(2, exponent - 15);
      summation = 1;
    }
    summation += fraction / 1024;
    return scalar * (exponentComponent * summation);
  }
  function decodeCount(at, to) {
    const minor = payload[at] & 31;
    if (minor < 24) {
      _offset = 1;
      return minor;
    }
    if (minor === extendedOneByte || minor === extendedFloat16 || minor === extendedFloat32 || minor === extendedFloat64) {
      const countLength = minorValueToArgumentLength[minor];
      _offset = countLength + 1;
      if (to - at < _offset) {
        throw new Error(`countLength ${countLength} greater than remaining buf len.`);
      }
      const countIndex = at + 1;
      if (countLength === 1) {
        return payload[countIndex];
      } else if (countLength === 2) {
        return dataView$1.getUint16(countIndex);
      } else if (countLength === 4) {
        return dataView$1.getUint32(countIndex);
      }
      return demote(dataView$1.getBigUint64(countIndex));
    }
    throw new Error(`unexpected minor value ${minor}.`);
  }
  function decodeUtf8String(at, to) {
    const length = decodeCount(at, to);
    const offset = _offset;
    at += offset;
    if (to - at < length) {
      throw new Error(`string len ${length} greater than remaining buf len.`);
    }
    const value = bytesToUtf8(payload, at, at + length);
    _offset = offset + length;
    return value;
  }
  function decodeUtf8StringIndefinite(at, to) {
    at += 1;
    const vector = [];
    for (const base = at; at < to; ) {
      if (payload[at] === 255) {
        const data2 = alloc(vector.length);
        data2.set(vector, 0);
        _offset = at - base + 2;
        return bytesToUtf8(data2, 0, data2.length);
      }
      const major = (payload[at] & 224) >> 5;
      const minor = payload[at] & 31;
      if (major !== majorUtf8String) {
        throw new Error(`unexpected major type ${major} in indefinite string.`);
      }
      if (minor === minorIndefinite) {
        throw new Error("nested indefinite string.");
      }
      const bytes = decodeUnstructuredByteString(at, to);
      const length = _offset;
      at += length;
      for (let i = 0; i < bytes.length; ++i) {
        vector.push(bytes[i]);
      }
    }
    throw new Error("expected break marker.");
  }
  function decodeUnstructuredByteString(at, to) {
    const length = decodeCount(at, to);
    const offset = _offset;
    at += offset;
    if (to - at < length) {
      throw new Error(`unstructured byte string len ${length} greater than remaining buf len.`);
    }
    const value = payload.subarray(at, at + length);
    _offset = offset + length;
    return value;
  }
  function decodeUnstructuredByteStringIndefinite(at, to) {
    at += 1;
    const vector = [];
    for (const base = at; at < to; ) {
      if (payload[at] === 255) {
        const data2 = alloc(vector.length);
        data2.set(vector, 0);
        _offset = at - base + 2;
        return data2;
      }
      const major = (payload[at] & 224) >> 5;
      const minor = payload[at] & 31;
      if (major !== majorUnstructuredByteString) {
        throw new Error(`unexpected major type ${major} in indefinite string.`);
      }
      if (minor === minorIndefinite) {
        throw new Error("nested indefinite string.");
      }
      const bytes = decodeUnstructuredByteString(at, to);
      const length = _offset;
      at += length;
      for (let i = 0; i < bytes.length; ++i) {
        vector.push(bytes[i]);
      }
    }
    throw new Error("expected break marker.");
  }
  function decodeList(at, to) {
    const listDataLength = decodeCount(at, to);
    const offset = _offset;
    at += offset;
    const base = at;
    const list = Array(listDataLength);
    for (let i = 0; i < listDataLength; ++i) {
      const item = decode(at, to);
      const itemOffset = _offset;
      list[i] = item;
      at += itemOffset;
    }
    _offset = offset + (at - base);
    return list;
  }
  function decodeListIndefinite(at, to) {
    at += 1;
    const list = [];
    for (const base = at; at < to; ) {
      if (payload[at] === 255) {
        _offset = at - base + 2;
        return list;
      }
      const item = decode(at, to);
      const n = _offset;
      at += n;
      list.push(item);
    }
    throw new Error("expected break marker.");
  }
  function decodeMap(at, to) {
    const mapDataLength = decodeCount(at, to);
    const offset = _offset;
    at += offset;
    const base = at;
    const map = {};
    for (let i = 0; i < mapDataLength; ++i) {
      if (at >= to) {
        throw new Error("unexpected end of map payload.");
      }
      const major = (payload[at] & 224) >> 5;
      if (major !== majorUtf8String) {
        throw new Error(`unexpected major type ${major} for map key at index ${at}.`);
      }
      const key = decode(at, to);
      at += _offset;
      const value = decode(at, to);
      at += _offset;
      map[key] = value;
    }
    _offset = offset + (at - base);
    return map;
  }
  function decodeMapIndefinite(at, to) {
    at += 1;
    const base = at;
    const map = {};
    for (; at < to; ) {
      if (at >= to) {
        throw new Error("unexpected end of map payload.");
      }
      if (payload[at] === 255) {
        _offset = at - base + 2;
        return map;
      }
      const major = (payload[at] & 224) >> 5;
      if (major !== majorUtf8String) {
        throw new Error(`unexpected major type ${major} for map key.`);
      }
      const key = decode(at, to);
      at += _offset;
      const value = decode(at, to);
      at += _offset;
      map[key] = value;
    }
    throw new Error("expected break marker.");
  }
  function decodeSpecial(at, to) {
    const minor = payload[at] & 31;
    switch (minor) {
      case specialTrue:
      case specialFalse:
        _offset = 1;
        return minor === specialTrue;
      case specialNull:
        _offset = 1;
        return null;
      case specialUndefined:
        _offset = 1;
        return null;
      case extendedFloat16:
        if (to - at < 3) {
          throw new Error("incomplete float16 at end of buf.");
        }
        _offset = 3;
        return bytesToFloat16(payload[at + 1], payload[at + 2]);
      case extendedFloat32:
        if (to - at < 5) {
          throw new Error("incomplete float32 at end of buf.");
        }
        _offset = 5;
        return dataView$1.getFloat32(at + 1);
      case extendedFloat64:
        if (to - at < 9) {
          throw new Error("incomplete float64 at end of buf.");
        }
        _offset = 9;
        return dataView$1.getFloat64(at + 1);
      default:
        throw new Error(`unexpected minor value ${minor}.`);
    }
  }
  function castBigInt(bigInt) {
    if (typeof bigInt === "number") {
      return bigInt;
    }
    const num = Number(bigInt);
    if (Number.MIN_SAFE_INTEGER <= num && num <= Number.MAX_SAFE_INTEGER) {
      return num;
    }
    return bigInt;
  }
  const USE_BUFFER = typeof Buffer !== "undefined";
  const initialSize = 2048;
  let data = alloc(initialSize);
  let dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
  let cursor = 0;
  function ensureSpace(bytes) {
    const remaining = data.byteLength - cursor;
    if (remaining < bytes) {
      if (cursor < 16e6) {
        resize(Math.max(data.byteLength * 4, data.byteLength + bytes));
      } else {
        resize(data.byteLength + bytes + 16e6);
      }
    }
  }
  function toUint8Array() {
    const out = alloc(cursor);
    out.set(data.subarray(0, cursor), 0);
    cursor = 0;
    return out;
  }
  function resize(size) {
    const old = data;
    data = alloc(size);
    if (old) {
      if (old.copy) {
        old.copy(data, 0, 0, old.byteLength);
      } else {
        data.set(old, 0);
      }
    }
    dataView = new DataView(data.buffer, data.byteOffset, data.byteLength);
  }
  function encodeHeader(major, value) {
    if (value < 24) {
      data[cursor++] = major << 5 | value;
    } else if (value < 1 << 8) {
      data[cursor++] = major << 5 | 24;
      data[cursor++] = value;
    } else if (value < 1 << 16) {
      data[cursor++] = major << 5 | extendedFloat16;
      dataView.setUint16(cursor, value);
      cursor += 2;
    } else if (value < 2 ** 32) {
      data[cursor++] = major << 5 | extendedFloat32;
      dataView.setUint32(cursor, value);
      cursor += 4;
    } else {
      data[cursor++] = major << 5 | extendedFloat64;
      dataView.setBigUint64(cursor, typeof value === "bigint" ? value : BigInt(value));
      cursor += 8;
    }
  }
  function encode(_input) {
    const encodeStack = [_input];
    while (encodeStack.length) {
      const input = encodeStack.pop();
      ensureSpace(typeof input === "string" ? input.length * 4 : 64);
      if (typeof input === "string") {
        if (USE_BUFFER) {
          encodeHeader(majorUtf8String, Buffer.byteLength(input));
          cursor += data.write(input, cursor);
        } else {
          const bytes = utilUtf8.fromUtf8(input);
          encodeHeader(majorUtf8String, bytes.byteLength);
          data.set(bytes, cursor);
          cursor += bytes.byteLength;
        }
        continue;
      } else if (typeof input === "number") {
        if (Number.isInteger(input)) {
          const nonNegative = input >= 0;
          const major = nonNegative ? majorUint64 : majorNegativeInt64;
          const value = nonNegative ? input : -input - 1;
          if (value < 24) {
            data[cursor++] = major << 5 | value;
          } else if (value < 256) {
            data[cursor++] = major << 5 | 24;
            data[cursor++] = value;
          } else if (value < 65536) {
            data[cursor++] = major << 5 | extendedFloat16;
            data[cursor++] = value >> 8;
            data[cursor++] = value;
          } else if (value < 4294967296) {
            data[cursor++] = major << 5 | extendedFloat32;
            dataView.setUint32(cursor, value);
            cursor += 4;
          } else {
            data[cursor++] = major << 5 | extendedFloat64;
            dataView.setBigUint64(cursor, BigInt(value));
            cursor += 8;
          }
          continue;
        }
        data[cursor++] = majorSpecial << 5 | extendedFloat64;
        dataView.setFloat64(cursor, input);
        cursor += 8;
        continue;
      } else if (typeof input === "bigint") {
        const nonNegative = input >= 0;
        const major = nonNegative ? majorUint64 : majorNegativeInt64;
        const value = nonNegative ? input : -input - BigInt(1);
        const n = Number(value);
        if (n < 24) {
          data[cursor++] = major << 5 | n;
        } else if (n < 256) {
          data[cursor++] = major << 5 | 24;
          data[cursor++] = n;
        } else if (n < 65536) {
          data[cursor++] = major << 5 | extendedFloat16;
          data[cursor++] = n >> 8;
          data[cursor++] = n & 255;
        } else if (n < 4294967296) {
          data[cursor++] = major << 5 | extendedFloat32;
          dataView.setUint32(cursor, n);
          cursor += 4;
        } else if (value < BigInt("18446744073709551616")) {
          data[cursor++] = major << 5 | extendedFloat64;
          dataView.setBigUint64(cursor, value);
          cursor += 8;
        } else {
          const binaryBigInt = value.toString(2);
          const bigIntBytes = new Uint8Array(Math.ceil(binaryBigInt.length / 8));
          let b = value;
          let i = 0;
          while (bigIntBytes.byteLength - ++i >= 0) {
            bigIntBytes[bigIntBytes.byteLength - i] = Number(b & BigInt(255));
            b >>= BigInt(8);
          }
          ensureSpace(bigIntBytes.byteLength * 2);
          data[cursor++] = nonNegative ? 194 : 195;
          if (USE_BUFFER) {
            encodeHeader(majorUnstructuredByteString, Buffer.byteLength(bigIntBytes));
          } else {
            encodeHeader(majorUnstructuredByteString, bigIntBytes.byteLength);
          }
          data.set(bigIntBytes, cursor);
          cursor += bigIntBytes.byteLength;
        }
        continue;
      } else if (input === null) {
        data[cursor++] = majorSpecial << 5 | specialNull;
        continue;
      } else if (typeof input === "boolean") {
        data[cursor++] = majorSpecial << 5 | (input ? specialTrue : specialFalse);
        continue;
      } else if (typeof input === "undefined") {
        throw new Error("@smithy/core/cbor: client may not serialize undefined value.");
      } else if (Array.isArray(input)) {
        for (let i = input.length - 1; i >= 0; --i) {
          encodeStack.push(input[i]);
        }
        encodeHeader(majorList, input.length);
        continue;
      } else if (typeof input.byteLength === "number") {
        ensureSpace(input.length * 2);
        encodeHeader(majorUnstructuredByteString, input.length);
        data.set(input, cursor);
        cursor += input.byteLength;
        continue;
      } else if (typeof input === "object") {
        if (input instanceof serde2.NumericValue) {
          const decimalIndex = input.string.indexOf(".");
          const exponent = decimalIndex === -1 ? 0 : decimalIndex - input.string.length + 1;
          const mantissa = BigInt(input.string.replace(".", ""));
          data[cursor++] = 196;
          encodeStack.push(mantissa);
          encodeStack.push(exponent);
          encodeHeader(majorList, 2);
          continue;
        }
        if (input[tagSymbol]) {
          if ("tag" in input && "value" in input) {
            encodeStack.push(input.value);
            encodeHeader(majorTag, input.tag);
            continue;
          } else {
            throw new Error("tag encountered with missing fields, need 'tag' and 'value', found: " + JSON.stringify(input));
          }
        }
        const keys = Object.keys(input);
        for (let i = keys.length - 1; i >= 0; --i) {
          const key = keys[i];
          encodeStack.push(input[key]);
          encodeStack.push(key);
        }
        encodeHeader(majorMap, keys.length);
        continue;
      }
      throw new Error(`data type ${input?.constructor?.name ?? typeof input} not compatible for encoding.`);
    }
  }
  const cbor$1 = {
    deserialize(payload2) {
      setPayload(payload2);
      return decode(0, payload2.length);
    },
    serialize(input) {
      try {
        encode(input);
        return toUint8Array();
      } catch (e) {
        toUint8Array();
        throw e;
      }
    },
    resizeEncodingBuffer(size) {
      resize(size);
    }
  };
  const parseCborBody = (streamBody, context) => {
    return protocols2.collectBody(streamBody, context).then(async (bytes) => {
      if (bytes.length) {
        try {
          return cbor$1.deserialize(bytes);
        } catch (e) {
          Object.defineProperty(e, "$responseBodyText", {
            value: context.utf8Encoder(bytes)
          });
          throw e;
        }
      }
      return {};
    });
  };
  const dateToTag = (date) => {
    return tag({
      tag: 1,
      value: date.getTime() / 1e3
    });
  };
  const parseCborErrorBody = async (errorBody, context) => {
    const value = await parseCborBody(errorBody, context);
    value.message = value.message ?? value.Message;
    return value;
  };
  const loadSmithyRpcV2CborErrorCode = (output, data2) => {
    const sanitizeErrorCode = (rawValue) => {
      let cleanValue = rawValue;
      if (typeof cleanValue === "number") {
        cleanValue = cleanValue.toString();
      }
      if (cleanValue.indexOf(",") >= 0) {
        cleanValue = cleanValue.split(",")[0];
      }
      if (cleanValue.indexOf(":") >= 0) {
        cleanValue = cleanValue.split(":")[0];
      }
      if (cleanValue.indexOf("#") >= 0) {
        cleanValue = cleanValue.split("#")[1];
      }
      return cleanValue;
    };
    if (data2["__type"] !== void 0) {
      return sanitizeErrorCode(data2["__type"]);
    }
    const codeKey = Object.keys(data2).find((key) => key.toLowerCase() === "code");
    if (codeKey && data2[codeKey] !== void 0) {
      return sanitizeErrorCode(data2[codeKey]);
    }
  };
  const checkCborResponse = (response) => {
    if (String(response.headers["smithy-protocol"]).toLowerCase() !== "rpc-v2-cbor") {
      throw new Error("Malformed RPCv2 CBOR response, status: " + response.statusCode);
    }
  };
  const buildHttpRpcRequest = async (context, headers, path, resolvedHostname, body) => {
    const { hostname, protocol = "https", port, path: basePath } = await context.endpoint();
    const contents = {
      protocol,
      hostname,
      port,
      method: "POST",
      path: basePath.endsWith("/") ? basePath.slice(0, -1) + path : basePath + path,
      headers: {
        ...headers
      }
    };
    if (resolvedHostname !== void 0) {
      contents.hostname = resolvedHostname;
    }
    if (body !== void 0) {
      contents.body = body;
      try {
        contents.headers["content-length"] = String(utilBodyLengthBrowser.calculateBodyLength(body));
      } catch (e) {
      }
    }
    return new protocolHttp.HttpRequest(contents);
  };
  class CborCodec extends protocols2.SerdeContext {
    createSerializer() {
      const serializer = new CborShapeSerializer();
      serializer.setSerdeContext(this.serdeContext);
      return serializer;
    }
    createDeserializer() {
      const deserializer = new CborShapeDeserializer();
      deserializer.setSerdeContext(this.serdeContext);
      return deserializer;
    }
  }
  class CborShapeSerializer extends protocols2.SerdeContext {
    value;
    write(schema3, value) {
      this.value = this.serialize(schema3, value);
    }
    serialize(schema$1, source) {
      const ns = schema2.NormalizedSchema.of(schema$1);
      if (source == null) {
        if (ns.isIdempotencyToken()) {
          return serde2.generateIdempotencyToken();
        }
        return source;
      }
      if (ns.isBlobSchema()) {
        if (typeof source === "string") {
          return (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(source);
        }
        return source;
      }
      if (ns.isTimestampSchema()) {
        if (typeof source === "number" || typeof source === "bigint") {
          return dateToTag(new Date(Number(source) / 1e3 | 0));
        }
        return dateToTag(source);
      }
      if (typeof source === "function" || typeof source === "object") {
        const sourceObject = source;
        if (ns.isListSchema() && Array.isArray(sourceObject)) {
          const sparse = !!ns.getMergedTraits().sparse;
          const newArray = [];
          let i = 0;
          for (const item of sourceObject) {
            const value = this.serialize(ns.getValueSchema(), item);
            if (value != null || sparse) {
              newArray[i++] = value;
            }
          }
          return newArray;
        }
        if (sourceObject instanceof Date) {
          return dateToTag(sourceObject);
        }
        const newObject = {};
        if (ns.isMapSchema()) {
          const sparse = !!ns.getMergedTraits().sparse;
          for (const key of Object.keys(sourceObject)) {
            const value = this.serialize(ns.getValueSchema(), sourceObject[key]);
            if (value != null || sparse) {
              newObject[key] = value;
            }
          }
        } else if (ns.isStructSchema()) {
          for (const [key, memberSchema] of ns.structIterator()) {
            const value = this.serialize(memberSchema, sourceObject[key]);
            if (value != null) {
              newObject[key] = value;
            }
          }
          const isUnion = ns.isUnionSchema();
          if (isUnion && Array.isArray(sourceObject.$unknown)) {
            const [k, v] = sourceObject.$unknown;
            newObject[k] = v;
          } else if (typeof sourceObject.__type === "string") {
            for (const [k, v] of Object.entries(sourceObject)) {
              if (!(k in newObject)) {
                newObject[k] = this.serialize(15, v);
              }
            }
          }
        } else if (ns.isDocumentSchema()) {
          for (const key of Object.keys(sourceObject)) {
            newObject[key] = this.serialize(ns.getValueSchema(), sourceObject[key]);
          }
        } else if (ns.isBigDecimalSchema()) {
          return sourceObject;
        }
        return newObject;
      }
      return source;
    }
    flush() {
      const buffer = cbor$1.serialize(this.value);
      this.value = void 0;
      return buffer;
    }
  }
  class CborShapeDeserializer extends protocols2.SerdeContext {
    read(schema3, bytes) {
      const data2 = cbor$1.deserialize(bytes);
      return this.readValue(schema3, data2);
    }
    readValue(_schema, value) {
      const ns = schema2.NormalizedSchema.of(_schema);
      if (ns.isTimestampSchema()) {
        if (typeof value === "number") {
          return serde2._parseEpochTimestamp(value);
        }
        if (typeof value === "object") {
          if (value.tag === 1 && "value" in value) {
            return serde2._parseEpochTimestamp(value.value);
          }
        }
      }
      if (ns.isBlobSchema()) {
        if (typeof value === "string") {
          return (this.serdeContext?.base64Decoder ?? utilBase64.fromBase64)(value);
        }
        return value;
      }
      if (typeof value === "undefined" || typeof value === "boolean" || typeof value === "number" || typeof value === "string" || typeof value === "bigint" || typeof value === "symbol") {
        return value;
      } else if (typeof value === "object") {
        if (value === null) {
          return null;
        }
        if ("byteLength" in value) {
          return value;
        }
        if (value instanceof Date) {
          return value;
        }
        if (ns.isDocumentSchema()) {
          return value;
        }
        if (ns.isListSchema()) {
          const newArray = [];
          const memberSchema = ns.getValueSchema();
          for (const item of value) {
            const itemValue = this.readValue(memberSchema, item);
            newArray.push(itemValue);
          }
          return newArray;
        }
        const newObject = {};
        if (ns.isMapSchema()) {
          const targetSchema = ns.getValueSchema();
          for (const key of Object.keys(value)) {
            const itemValue = this.readValue(targetSchema, value[key]);
            newObject[key] = itemValue;
          }
        } else if (ns.isStructSchema()) {
          const isUnion = ns.isUnionSchema();
          let keys;
          if (isUnion) {
            keys = new Set(Object.keys(value).filter((k) => k !== "__type"));
          }
          for (const [key, memberSchema] of ns.structIterator()) {
            if (isUnion) {
              keys.delete(key);
            }
            if (value[key] != null) {
              newObject[key] = this.readValue(memberSchema, value[key]);
            }
          }
          if (isUnion && keys?.size === 1 && Object.keys(newObject).length === 0) {
            const k = keys.values().next().value;
            newObject.$unknown = [k, value[k]];
          } else if (typeof value.__type === "string") {
            for (const [k, v] of Object.entries(value)) {
              if (!(k in newObject)) {
                newObject[k] = v;
              }
            }
          }
        } else if (value instanceof serde2.NumericValue) {
          return value;
        }
        return newObject;
      } else {
        return value;
      }
    }
  }
  class SmithyRpcV2CborProtocol extends protocols2.RpcProtocol {
    codec = new CborCodec();
    serializer = this.codec.createSerializer();
    deserializer = this.codec.createDeserializer();
    constructor({ defaultNamespace, errorTypeRegistries }) {
      super({ defaultNamespace, errorTypeRegistries });
    }
    getShapeId() {
      return "smithy.protocols#rpcv2Cbor";
    }
    getPayloadCodec() {
      return this.codec;
    }
    async serializeRequest(operationSchema, input, context) {
      const request = await super.serializeRequest(operationSchema, input, context);
      Object.assign(request.headers, {
        "content-type": this.getDefaultContentType(),
        "smithy-protocol": "rpc-v2-cbor",
        accept: this.getDefaultContentType()
      });
      if (schema2.deref(operationSchema.input) === "unit") {
        delete request.body;
        delete request.headers["content-type"];
      } else {
        if (!request.body) {
          this.serializer.write(15, {});
          request.body = this.serializer.flush();
        }
        try {
          request.headers["content-length"] = String(request.body.byteLength);
        } catch (e) {
        }
      }
      const { service, operation } = utilMiddleware.getSmithyContext(context);
      const path = `/service/${service}/operation/${operation}`;
      if (request.path.endsWith("/")) {
        request.path += path.slice(1);
      } else {
        request.path += path;
      }
      return request;
    }
    async deserializeResponse(operationSchema, context, response) {
      return super.deserializeResponse(operationSchema, context, response);
    }
    async handleError(operationSchema, context, response, dataObject, metadata) {
      const errorName = loadSmithyRpcV2CborErrorCode(response, dataObject) ?? "Unknown";
      const errorMetadata = {
        $metadata: metadata,
        $fault: response.statusCode <= 500 ? "client" : "server"
      };
      let namespace = this.options.defaultNamespace;
      if (errorName.includes("#")) {
        [namespace] = errorName.split("#");
      }
      const registry = this.compositeErrorRegistry;
      const nsRegistry = schema2.TypeRegistry.for(namespace);
      registry.copyFrom(nsRegistry);
      let errorSchema;
      try {
        errorSchema = registry.getSchema(errorName);
      } catch (e) {
        if (dataObject.Message) {
          dataObject.message = dataObject.Message;
        }
        const syntheticRegistry = schema2.TypeRegistry.for("smithy.ts.sdk.synthetic." + namespace);
        registry.copyFrom(syntheticRegistry);
        const baseExceptionSchema = registry.getBaseException();
        if (baseExceptionSchema) {
          const ErrorCtor2 = registry.getErrorCtor(baseExceptionSchema);
          throw Object.assign(new ErrorCtor2({ name: errorName }), errorMetadata, dataObject);
        }
        throw Object.assign(new Error(errorName), errorMetadata, dataObject);
      }
      const ns = schema2.NormalizedSchema.of(errorSchema);
      const ErrorCtor = registry.getErrorCtor(errorSchema);
      const message = dataObject.message ?? dataObject.Message ?? "Unknown";
      const exception = new ErrorCtor(message);
      const output = {};
      for (const [name, member] of ns.structIterator()) {
        output[name] = this.deserializer.readValue(member, dataObject[name]);
      }
      throw Object.assign(exception, errorMetadata, {
        $fault: ns.getMergedTraits().error,
        message
      }, output);
    }
    getDefaultContentType() {
      return "application/cbor";
    }
  }
  cbor.CborCodec = CborCodec;
  cbor.CborShapeDeserializer = CborShapeDeserializer;
  cbor.CborShapeSerializer = CborShapeSerializer;
  cbor.SmithyRpcV2CborProtocol = SmithyRpcV2CborProtocol;
  cbor.buildHttpRpcRequest = buildHttpRpcRequest;
  cbor.cbor = cbor$1;
  cbor.checkCborResponse = checkCborResponse;
  cbor.dateToTag = dateToTag;
  cbor.loadSmithyRpcV2CborErrorCode = loadSmithyRpcV2CborErrorCode;
  cbor.parseCborBody = parseCborBody;
  cbor.parseCborErrorBody = parseCborErrorBody;
  cbor.tag = tag;
  cbor.tagSymbol = tagSymbol;
  return cbor;
}
var protocolsExports = /* @__PURE__ */ requireProtocols();
var schemaExports = /* @__PURE__ */ requireSchema();
var serdeExports = /* @__PURE__ */ requireSerde();
var distCjsExports = /* @__PURE__ */ requireDistCjs();
var eventStreams = {};
var hasRequiredEventStreams;
function requireEventStreams() {
  if (hasRequiredEventStreams) return eventStreams;
  hasRequiredEventStreams = 1;
  var utilUtf8 = require$$6;
  class EventStreamSerde {
    marshaller;
    serializer;
    deserializer;
    serdeContext;
    defaultContentType;
    constructor({ marshaller, serializer, deserializer, serdeContext, defaultContentType }) {
      this.marshaller = marshaller;
      this.serializer = serializer;
      this.deserializer = deserializer;
      this.serdeContext = serdeContext;
      this.defaultContentType = defaultContentType;
    }
    async serializeEventStream({ eventStream, requestSchema, initialRequest }) {
      const marshaller = this.marshaller;
      const eventStreamMember = requestSchema.getEventStreamMember();
      const unionSchema = requestSchema.getMemberSchema(eventStreamMember);
      const serializer = this.serializer;
      const defaultContentType = this.defaultContentType;
      const initialRequestMarker = /* @__PURE__ */ Symbol("initialRequestMarker");
      const eventStreamIterable = {
        async *[Symbol.asyncIterator]() {
          if (initialRequest) {
            const headers = {
              ":event-type": { type: "string", value: "initial-request" },
              ":message-type": { type: "string", value: "event" },
              ":content-type": { type: "string", value: defaultContentType }
            };
            serializer.write(requestSchema, initialRequest);
            const body = serializer.flush();
            yield {
              [initialRequestMarker]: true,
              headers,
              body
            };
          }
          for await (const page of eventStream) {
            yield page;
          }
        }
      };
      return marshaller.serialize(eventStreamIterable, (event) => {
        if (event[initialRequestMarker]) {
          return {
            headers: event.headers,
            body: event.body
          };
        }
        const unionMember = Object.keys(event).find((key) => {
          return key !== "__type";
        }) ?? "";
        const { additionalHeaders, body, eventType, explicitPayloadContentType } = this.writeEventBody(unionMember, unionSchema, event);
        const headers = {
          ":event-type": { type: "string", value: eventType },
          ":message-type": { type: "string", value: "event" },
          ":content-type": { type: "string", value: explicitPayloadContentType ?? defaultContentType },
          ...additionalHeaders
        };
        return {
          headers,
          body
        };
      });
    }
    async deserializeEventStream({ response, responseSchema, initialResponseContainer }) {
      const marshaller = this.marshaller;
      const eventStreamMember = responseSchema.getEventStreamMember();
      const unionSchema = responseSchema.getMemberSchema(eventStreamMember);
      const memberSchemas = unionSchema.getMemberSchemas();
      const initialResponseMarker = /* @__PURE__ */ Symbol("initialResponseMarker");
      const asyncIterable = marshaller.deserialize(response.body, async (event) => {
        const unionMember = Object.keys(event).find((key) => {
          return key !== "__type";
        }) ?? "";
        const body = event[unionMember].body;
        if (unionMember === "initial-response") {
          const dataObject = await this.deserializer.read(responseSchema, body);
          delete dataObject[eventStreamMember];
          return {
            [initialResponseMarker]: true,
            ...dataObject
          };
        } else if (unionMember in memberSchemas) {
          const eventStreamSchema = memberSchemas[unionMember];
          if (eventStreamSchema.isStructSchema()) {
            const out = {};
            let hasBindings = false;
            for (const [name, member] of eventStreamSchema.structIterator()) {
              const { eventHeader, eventPayload } = member.getMergedTraits();
              hasBindings = hasBindings || Boolean(eventHeader || eventPayload);
              if (eventPayload) {
                if (member.isBlobSchema()) {
                  out[name] = body;
                } else if (member.isStringSchema()) {
                  out[name] = (this.serdeContext?.utf8Encoder ?? utilUtf8.toUtf8)(body);
                } else if (member.isStructSchema()) {
                  out[name] = await this.deserializer.read(member, body);
                }
              } else if (eventHeader) {
                const value = event[unionMember].headers[name]?.value;
                if (value != null) {
                  if (member.isNumericSchema()) {
                    if (value && typeof value === "object" && "bytes" in value) {
                      out[name] = BigInt(value.toString());
                    } else {
                      out[name] = Number(value);
                    }
                  } else {
                    out[name] = value;
                  }
                }
              }
            }
            if (hasBindings) {
              return {
                [unionMember]: out
              };
            }
            if (body.byteLength === 0) {
              return {
                [unionMember]: {}
              };
            }
          }
          return {
            [unionMember]: await this.deserializer.read(eventStreamSchema, body)
          };
        } else {
          return {
            $unknown: event
          };
        }
      });
      const asyncIterator = asyncIterable[Symbol.asyncIterator]();
      const firstEvent = await asyncIterator.next();
      if (firstEvent.done) {
        return asyncIterable;
      }
      if (firstEvent.value?.[initialResponseMarker]) {
        if (!responseSchema) {
          throw new Error("@smithy::core/protocols - initial-response event encountered in event stream but no response schema given.");
        }
        for (const [key, value] of Object.entries(firstEvent.value)) {
          initialResponseContainer[key] = value;
        }
      }
      return {
        async *[Symbol.asyncIterator]() {
          if (!firstEvent?.value?.[initialResponseMarker]) {
            yield firstEvent.value;
          }
          while (true) {
            const { done, value } = await asyncIterator.next();
            if (done) {
              break;
            }
            yield value;
          }
        }
      };
    }
    writeEventBody(unionMember, unionSchema, event) {
      const serializer = this.serializer;
      let eventType = unionMember;
      let explicitPayloadMember = null;
      let explicitPayloadContentType;
      const isKnownSchema = (() => {
        const struct = unionSchema.getSchema();
        return struct[4].includes(unionMember);
      })();
      const additionalHeaders = {};
      if (!isKnownSchema) {
        const [type, value] = event[unionMember];
        eventType = type;
        serializer.write(15, value);
      } else {
        const eventSchema = unionSchema.getMemberSchema(unionMember);
        if (eventSchema.isStructSchema()) {
          for (const [memberName, memberSchema] of eventSchema.structIterator()) {
            const { eventHeader, eventPayload } = memberSchema.getMergedTraits();
            if (eventPayload) {
              explicitPayloadMember = memberName;
            } else if (eventHeader) {
              const value = event[unionMember][memberName];
              let type = "binary";
              if (memberSchema.isNumericSchema()) {
                if ((-2) ** 31 <= value && value <= 2 ** 31 - 1) {
                  type = "integer";
                } else {
                  type = "long";
                }
              } else if (memberSchema.isTimestampSchema()) {
                type = "timestamp";
              } else if (memberSchema.isStringSchema()) {
                type = "string";
              } else if (memberSchema.isBooleanSchema()) {
                type = "boolean";
              }
              if (value != null) {
                additionalHeaders[memberName] = {
                  type,
                  value
                };
                delete event[unionMember][memberName];
              }
            }
          }
          if (explicitPayloadMember !== null) {
            const payloadSchema = eventSchema.getMemberSchema(explicitPayloadMember);
            if (payloadSchema.isBlobSchema()) {
              explicitPayloadContentType = "application/octet-stream";
            } else if (payloadSchema.isStringSchema()) {
              explicitPayloadContentType = "text/plain";
            }
            serializer.write(payloadSchema, event[unionMember][explicitPayloadMember]);
          } else {
            serializer.write(eventSchema, event[unionMember]);
          }
        } else if (eventSchema.isUnitSchema()) {
          serializer.write(eventSchema, {});
        } else {
          throw new Error("@smithy/core/event-streams - non-struct member not supported in event stream union.");
        }
      }
      const messageSerialization = serializer.flush() ?? new Uint8Array();
      const body = typeof messageSerialization === "string" ? (this.serdeContext?.utf8Decoder ?? utilUtf8.fromUtf8)(messageSerialization) : messageSerialization;
      return {
        body,
        eventType,
        explicitPayloadContentType,
        additionalHeaders
      };
    }
  }
  eventStreams.EventStreamSerde = EventStreamSerde;
  return eventStreams;
}
var eventStreamsExports = /* @__PURE__ */ requireEventStreams();
const index = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null
}, [eventStreamsExports]);
export {
  requireSchema as a,
  requireProtocols as b,
  requireSerde as c,
  requireDistCjs as d,
  serdeExports as e,
  distCjsExports as f,
  protocolsExports as p,
  requireCbor as r,
  schemaExports as s
};
