import { c as clientExports } from "../aws-sdk__core.mjs";
import { C as CredentialsProviderError } from "../smithy__property-provider.mjs";
import "../smithy__protocol-http.mjs";
import "../react.mjs";
import "../smithy__types.mjs";
import "../smithy__core.mjs";
import "../smithy__util-utf8.mjs";
import "../smithy__util-buffer-from.mjs";
import "../smithy__is-array-buffer.mjs";
import "buffer";
import "../@smithy/util-body-length-browser+[...].mjs";
import "../smithy__util-middleware.mjs";
import "../smithy__util-base64.mjs";
import "../smithy__middleware-serde.mjs";
import "../smithy__util-stream.mjs";
import "stream";
import "node:stream";
import "../smithy__util-hex-encoding.mjs";
import "../smithy__fetch-http-handler.mjs";
import "../smithy__node-http-handler.mjs";
import "../smithy__querystring-builder.mjs";
import "../smithy__util-uri-escape.mjs";
import "http";
import "https";
import "http2";
import "../smithy__uuid.mjs";
import "crypto";
import "../smithy__signature-v4.mjs";
import "../smithy__smithy-client.mjs";
import "../smithy__middleware-stack.mjs";
import "../aws-sdk__xml-builder.mjs";
import "../fast-xml-parser.mjs";
import "../strnum.mjs";
const ENV_KEY = "AWS_ACCESS_KEY_ID";
const ENV_SECRET = "AWS_SECRET_ACCESS_KEY";
const ENV_SESSION = "AWS_SESSION_TOKEN";
const ENV_EXPIRATION = "AWS_CREDENTIAL_EXPIRATION";
const ENV_CREDENTIAL_SCOPE = "AWS_CREDENTIAL_SCOPE";
const ENV_ACCOUNT_ID = "AWS_ACCOUNT_ID";
const fromEnv = (init) => async () => {
  init?.logger?.debug("@aws-sdk/credential-provider-env - fromEnv");
  const accessKeyId = process.env[ENV_KEY];
  const secretAccessKey = process.env[ENV_SECRET];
  const sessionToken = process.env[ENV_SESSION];
  const expiry = process.env[ENV_EXPIRATION];
  const credentialScope = process.env[ENV_CREDENTIAL_SCOPE];
  const accountId = process.env[ENV_ACCOUNT_ID];
  if (accessKeyId && secretAccessKey) {
    const credentials = {
      accessKeyId,
      secretAccessKey,
      ...sessionToken && { sessionToken },
      ...expiry && { expiration: new Date(expiry) },
      ...credentialScope && { credentialScope },
      ...accountId && { accountId }
    };
    clientExports.setCredentialFeature(credentials, "CREDENTIALS_ENV_VARS", "g");
    return credentials;
  }
  throw new CredentialsProviderError("Unable to find environment variable credentials.", { logger: init?.logger });
};
export {
  ENV_ACCOUNT_ID,
  ENV_CREDENTIAL_SCOPE,
  ENV_EXPIRATION,
  ENV_KEY,
  ENV_SECRET,
  ENV_SESSION,
  fromEnv
};
