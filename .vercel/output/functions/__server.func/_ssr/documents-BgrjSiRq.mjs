import { c as createServerRpc } from "./createServerRpc-29xaFZcb.mjs";
import { d as db, f as documentFolder, g as documentFile, i as userStorage } from "./index-Dc8WRQC8.mjs";
import { a as auth } from "./server-Cw4QVuYO.mjs";
import { e as createServerFn, g as getRequest } from "./index.mjs";
import { P as PutObjectCommand, D as DeleteObjectCommand, G as GetObjectCommand, S as S3Client } from "../_libs/aws-sdk__client-s3.mjs";
import { g as getSignedUrl } from "../_libs/aws-sdk__s3-request-presigner.mjs";
import { d as desc, e as eq, a as and, s as sql } from "../_libs/drizzle-orm.mjs";
import { o as object, c as array, s as string, n as number, b as boolean } from "../_libs/zod.mjs";
import "../_libs/resend.mjs";
import "../_libs/postal-mime.mjs";
import "../_libs/svix.mjs";
import "../_libs/uuid.mjs";
import "node:crypto";
import "../_libs/standardwebhooks.mjs";
import "../_libs/stablelib__base64.mjs";
import "../_libs/fast-sha256.mjs";
import "node:async_hooks";
import "../_libs/react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/tiny-invariant.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tiny-warning.mjs";
import "../_libs/@aws-sdk/middleware-expect-continue+[...].mjs";
import "../_libs/smithy__protocol-http.mjs";
import "../_libs/smithy__types.mjs";
import "../_libs/@aws-sdk/middleware-host-header+[...].mjs";
import "../_libs/smithy__core.mjs";
import "../_libs/smithy__util-utf8.mjs";
import "../_libs/smithy__util-buffer-from.mjs";
import "../_libs/smithy__is-array-buffer.mjs";
import "buffer";
import "../_libs/@smithy/util-body-length-browser+[...].mjs";
import "../_libs/smithy__util-middleware.mjs";
import "../_libs/smithy__util-base64.mjs";
import "../_libs/smithy__middleware-serde.mjs";
import "../_libs/smithy__util-stream.mjs";
import "stream";
import "../_libs/smithy__util-hex-encoding.mjs";
import "../_libs/smithy__fetch-http-handler.mjs";
import "../_libs/smithy__node-http-handler.mjs";
import "../_libs/smithy__querystring-builder.mjs";
import "../_libs/smithy__util-uri-escape.mjs";
import "http";
import "https";
import "http2";
import "../_libs/smithy__uuid.mjs";
import "crypto";
import "../_libs/@smithy/middleware-content-length+[...].mjs";
import "../_libs/aws-sdk__core.mjs";
import "../_libs/smithy__property-provider.mjs";
import "../_libs/smithy__signature-v4.mjs";
import "../_libs/smithy__smithy-client.mjs";
import "../_libs/smithy__middleware-stack.mjs";
import "../_libs/aws-sdk__xml-builder.mjs";
import "../_libs/fast-xml-parser.mjs";
import "../_libs/strnum.mjs";
import "../_libs/aws-sdk__util-endpoints.mjs";
import "../_libs/smithy__util-endpoints.mjs";
import "../_libs/smithy__url-parser.mjs";
import "../_libs/smithy__querystring-parser.mjs";
import "../_libs/smithy__middleware-endpoint.mjs";
import "../_libs/smithy__shared-ini-file-loader.mjs";
import "path";
import "fs/promises";
import "os";
import "node:fs/promises";
import "../_libs/smithy__node-config-provider.mjs";
import "../_libs/@aws-sdk/signature-v4-multi-region+[...].mjs";
import "../_libs/aws-sdk__middleware-sdk-s3.mjs";
import "../_libs/smithy__util-config-provider.mjs";
import "../_libs/aws-sdk__util-arn-parser.mjs";
import "../_libs/smithy__hash-node.mjs";
import "../_libs/@smithy/util-defaults-mode-node+[...].mjs";
import "../_libs/smithy__config-resolver.mjs";
import "../_libs/smithy__hash-stream-node.mjs";
import "../_libs/smithy__eventstream-serde-node.mjs";
import "../_libs/@smithy/eventstream-serde-universal+[...].mjs";
import "../_libs/smithy__eventstream-codec.mjs";
import "../_libs/aws-crypto__crc32.mjs";
import "tslib";
import "../_libs/aws-crypto__util.mjs";
import "../_libs/@aws-sdk/credential-provider-node+[...].mjs";
import "../_libs/@aws-sdk/credential-provider-env+[...].mjs";
import "../_libs/smithy__util-body-length-node.mjs";
import "node:fs";
import "../_libs/aws-sdk__util-user-agent-node.mjs";
import "node:os";
import "node:process";
import "node:path";
import "../_libs/aws-sdk__middleware-user-agent.mjs";
import "../_libs/smithy__util-retry.mjs";
import "../_libs/@smithy/service-error-classification+[...].mjs";
import "../_libs/@aws-sdk/middleware-bucket-endpoint+[...].mjs";
import "../_libs/smithy__middleware-retry.mjs";
import "../_libs/@aws-sdk/middleware-flexible-checksums+[...].mjs";
import "../_libs/aws-sdk__crc64-nvme.mjs";
import "node:zlib";
import "../_libs/aws-crypto__crc32c.mjs";
import "../_libs/@aws-sdk/region-config-resolver+[...].mjs";
import "../_libs/@smithy/eventstream-serde-config-resolver+[...].mjs";
import "../_libs/aws-sdk__middleware-logger.mjs";
import "../_libs/@aws-sdk/middleware-recursion-detection+[...].mjs";
import "../_libs/aws__lambda-invoke-store.mjs";
import "../_libs/aws-sdk__middleware-ssec.mjs";
import "../_libs/aws-sdk__util-format-url.mjs";
import "../_libs/pg.mjs";
import "events";
import "../_libs/pg-types.mjs";
import "../_libs/postgres-array.mjs";
import "../_libs/postgres-date.mjs";
import "../_libs/postgres-interval.mjs";
import "../_libs/xtend.mjs";
import "../_libs/postgres-bytea.mjs";
import "../_libs/pg-int8.mjs";
import "util";
import "dns";
import "../_libs/pg-connection-string.mjs";
import "fs";
import "../_libs/pg-protocol.mjs";
import "net";
import "tls";
import "../_libs/pg-cloudflare.mjs";
import "../_libs/pgpass.mjs";
import "../_libs/split2.mjs";
import "string_decoder";
import "../_libs/pg-pool.mjs";
const MAX_FILE_BYTES = 10 * 1024 * 1024;
const DEFAULT_QUOTA_BYTES = 100 * 1024 * 1024;
function getS3Client() {
  const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
  const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
  if (!accessKeyId || !secretAccessKey) {
    throw new Error("S3 credentials not configured. Set AWS_ACCESS_KEY_ID and AWS_SECRET_ACCESS_KEY.");
  }
  return new S3Client({
    region: process.env.AWS_REGION ?? "us-east-1",
    ...process.env.AWS_S3_ENDPOINT ? {
      endpoint: process.env.AWS_S3_ENDPOINT,
      forcePathStyle: true,
      bucketEndpoint: false
    } : {},
    credentials: {
      accessKeyId,
      secretAccessKey
    }
  });
}
async function ensureStorage(userId) {
  const existing = await db.query.userStorage.findFirst({
    where: eq(userStorage.userId, userId)
  });
  if (existing) return existing;
  const [created] = await db.insert(userStorage).values({
    userId,
    usedBytes: 0,
    quotaBytes: DEFAULT_QUOTA_BYTES
  }).returning();
  return created;
}
const getUserStorage_createServerFn_handler = createServerRpc({
  id: "cc9745db8fad86a735493935d9eeb57ee4eecdb832268b59a0c3c501063de8af",
  name: "getUserStorage",
  filename: "src/server/documents.ts"
}, (opts) => getUserStorage.__executeServer(opts));
const getUserStorage = createServerFn({
  method: "GET"
}).handler(getUserStorage_createServerFn_handler, async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return ensureStorage(session.user.id);
});
const listFolders_createServerFn_handler = createServerRpc({
  id: "4c117e8d0079052f62a87287f23c2e49c13bd6e1e565eccb194cac6870099604",
  name: "listFolders",
  filename: "src/server/documents.ts"
}, (opts) => listFolders.__executeServer(opts));
const listFolders = createServerFn({
  method: "GET"
}).handler(listFolders_createServerFn_handler, async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return db.query.documentFolder.findMany({
    where: eq(documentFolder.userId, session.user.id),
    orderBy: desc(documentFolder.createdAt)
  });
});
const createFolderSchema = object({
  name: string().min(1),
  labels: array(string()).optional().default([])
});
const createFolder_createServerFn_handler = createServerRpc({
  id: "cf3f572910cb5308e8bc4ad9ac3633a8114ecc754fe243243bf2c94bf18b3c0d",
  name: "createFolder",
  filename: "src/server/documents.ts"
}, (opts) => createFolder.__executeServer(opts));
const createFolder = createServerFn({
  method: "POST"
}).inputValidator((data) => createFolderSchema.parse(data)).handler(createFolder_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const [folder] = await db.insert(documentFolder).values({
    userId: session.user.id,
    name: data.name,
    labels: data.labels,
    parentFolderId: null
    // always root level
  }).returning();
  return folder;
});
const updateFolderSchema = object({
  id: string(),
  name: string().min(1).optional(),
  labels: array(string()).optional()
});
const updateFolder_createServerFn_handler = createServerRpc({
  id: "66521140a12ab3fd4280474daf49832bb5fb4c39d5bca921681160a2ffbcceda",
  name: "updateFolder",
  filename: "src/server/documents.ts"
}, (opts) => updateFolder.__executeServer(opts));
const updateFolder = createServerFn({
  method: "POST"
}).inputValidator((data) => updateFolderSchema.parse(data)).handler(updateFolder_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const {
    id,
    ...updateData
  } = data;
  const [updated] = await db.update(documentFolder).set(updateData).where(and(eq(documentFolder.id, id), eq(documentFolder.userId, session.user.id))).returning();
  return updated;
});
const deleteFolder_createServerFn_handler = createServerRpc({
  id: "3a97580e0a14fdde4264beadaf32cc2eb61b31a2ff1f6f27ed22c0ccd6de7cea",
  name: "deleteFolder",
  filename: "src/server/documents.ts"
}, (opts) => deleteFolder.__executeServer(opts));
const deleteFolder = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(deleteFolder_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  await db.delete(documentFolder).where(and(eq(documentFolder.id, data.id), eq(documentFolder.userId, session.user.id)));
  return {
    success: true
  };
});
const listDocsSchema = object({
  folderId: string().nullable().optional(),
  labels: array(string()).optional()
});
const listDocuments_createServerFn_handler = createServerRpc({
  id: "5320c8c2a3f8f4e9577aad6c4fb7c3b7fcc52be8e5d6fa67753d418790eefba4",
  name: "listDocuments",
  filename: "src/server/documents.ts"
}, (opts) => listDocuments.__executeServer(opts));
const listDocuments = createServerFn({
  method: "GET"
}).inputValidator((data) => listDocsSchema.parse(data)).handler(listDocuments_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const files = await db.query.documentFile.findMany({
    where: eq(documentFile.userId, userId),
    orderBy: desc(documentFile.createdAt),
    with: {
      folder: true
    }
  });
  let result = files;
  if (data?.folderId !== void 0 && data.folderId !== null) {
    result = result.filter((f) => f.folderId === data.folderId);
  }
  if (data?.labels && data.labels.length > 0) {
    result = result.filter((f) => data.labels.every((l) => f.labels.includes(l)));
  }
  return result;
});
const listAllDocuments_createServerFn_handler = createServerRpc({
  id: "a82808e548225ade1e4f43fa3a381e37aee2d02de030aaca853fdc34bd8fbf2b",
  name: "listAllDocuments",
  filename: "src/server/documents.ts"
}, (opts) => listAllDocuments.__executeServer(opts));
const listAllDocuments = createServerFn({
  method: "GET"
}).handler(listAllDocuments_createServerFn_handler, async () => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  return db.query.documentFile.findMany({
    where: eq(documentFile.userId, session.user.id),
    orderBy: desc(documentFile.createdAt),
    with: {
      folder: true
    }
  });
});
const presignSchema = object({
  fileName: string().min(1),
  fileType: string().min(1),
  // mime type
  fileSize: number().int().positive()
});
const generatePresignedUploadUrl_createServerFn_handler = createServerRpc({
  id: "88546af1900b2b535512a6fc0e468921ce2e929c6b9d9559b037cc3e94ec3903",
  name: "generatePresignedUploadUrl",
  filename: "src/server/documents.ts"
}, (opts) => generatePresignedUploadUrl.__executeServer(opts));
const generatePresignedUploadUrl = createServerFn({
  method: "POST"
}).inputValidator((data) => presignSchema.parse(data)).handler(generatePresignedUploadUrl_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  if (data.fileSize > MAX_FILE_BYTES) {
    throw new Error(`File exceeds 10 MB limit`);
  }
  const storage = await ensureStorage(userId);
  if (storage.usedBytes + data.fileSize > storage.quotaBytes) {
    throw new Error("Storage quota exceeded");
  }
  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) throw new Error("S3 bucket not configured");
  const s3Key = `documents/${userId}/${Date.now()}-${data.fileName.replace(/\s+/g, "_")}`;
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: s3Key,
    ContentType: data.fileType,
    ContentLength: data.fileSize
  });
  const s3 = getS3Client();
  const uploadUrl = await getSignedUrl(s3, command, {
    expiresIn: 300
  });
  return {
    uploadUrl,
    s3Key
  };
});
const createDocSchema = object({
  folderId: string().nullable().optional(),
  fileName: string().min(1),
  fileType: string().min(1),
  fileSize: number().int().positive(),
  s3Key: string().min(1),
  labels: array(string()).optional().default([]),
  description: string().optional(),
  isConfidential: boolean().optional().default(false)
});
const createDocument_createServerFn_handler = createServerRpc({
  id: "e3a4e9b021e590329d1b394019faf012fa72e29ff651b775ef33585bc43d8a02",
  name: "createDocument",
  filename: "src/server/documents.ts"
}, (opts) => createDocument.__executeServer(opts));
const createDocument = createServerFn({
  method: "POST"
}).inputValidator((data) => createDocSchema.parse(data)).handler(createDocument_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const [file] = await db.insert(documentFile).values({
    userId,
    folderId: data.folderId ?? null,
    fileName: data.fileName,
    fileType: data.fileType,
    fileSize: data.fileSize,
    s3Key: data.s3Key,
    labels: data.labels,
    description: data.description,
    isConfidential: data.isConfidential
  }).returning();
  await db.update(userStorage).set({
    usedBytes: sql`${userStorage.usedBytes} + ${data.fileSize}`
  }).where(eq(userStorage.userId, userId));
  return file;
});
const deleteDocument_createServerFn_handler = createServerRpc({
  id: "621b39c91dd810bf4185c91556da3ce67188c1e774320245ab1d0c7801eb3f1c",
  name: "deleteDocument",
  filename: "src/server/documents.ts"
}, (opts) => deleteDocument.__executeServer(opts));
const deleteDocument = createServerFn({
  method: "POST"
}).inputValidator((data) => object({
  id: string()
}).parse(data)).handler(deleteDocument_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const file = await db.query.documentFile.findFirst({
    where: and(eq(documentFile.id, data.id), eq(documentFile.userId, userId))
  });
  if (!file) throw new Error("Document not found");
  try {
    const s3 = getS3Client();
    await s3.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET,
      Key: file.s3Key
    }));
  } catch {
    console.error("S3 delete failed for key:", file.s3Key);
  }
  await db.delete(documentFile).where(and(eq(documentFile.id, data.id), eq(documentFile.userId, userId)));
  await db.update(userStorage).set({
    usedBytes: sql`GREATEST(${userStorage.usedBytes} - ${file.fileSize}, 0)`
  }).where(eq(userStorage.userId, userId));
  return {
    success: true
  };
});
const getPresignedViewUrl_createServerFn_handler = createServerRpc({
  id: "a48e9bd63a10a2126eca9b568a948ae37dcab4d15aaa13315a11217ba562c120",
  name: "getPresignedViewUrl",
  filename: "src/server/documents.ts"
}, (opts) => getPresignedViewUrl.__executeServer(opts));
const getPresignedViewUrl = createServerFn({
  method: "GET"
}).inputValidator((data) => object({
  id: string().min(1)
}).parse(data)).handler(getPresignedViewUrl_createServerFn_handler, async ({
  data
}) => {
  const request = getRequest();
  const session = await auth.api.getSession({
    headers: request.headers
  });
  if (!session?.user?.id) throw new Error("Unauthorized");
  const userId = session.user.id;
  const file = await db.query.documentFile.findFirst({
    where: and(eq(documentFile.id, data.id), eq(documentFile.userId, userId))
  });
  if (!file) throw new Error("Document not found");
  const bucket = process.env.AWS_S3_BUCKET;
  if (!bucket) throw new Error("S3 bucket not configured");
  const s3 = getS3Client();
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: file.s3Key
  });
  const url = await getSignedUrl(s3, command, {
    expiresIn: 3600
  });
  return {
    url
  };
});
export {
  createDocument_createServerFn_handler,
  createFolder_createServerFn_handler,
  deleteDocument_createServerFn_handler,
  deleteFolder_createServerFn_handler,
  generatePresignedUploadUrl_createServerFn_handler,
  getPresignedViewUrl_createServerFn_handler,
  getUserStorage_createServerFn_handler,
  listAllDocuments_createServerFn_handler,
  listDocuments_createServerFn_handler,
  listFolders_createServerFn_handler,
  updateFolder_createServerFn_handler
};
