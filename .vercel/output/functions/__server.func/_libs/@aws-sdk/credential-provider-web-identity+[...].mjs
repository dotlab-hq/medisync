import { c as clientExports } from "../aws-sdk__core.mjs";
import { readFileSync } from "node:fs";
import { e as externalDataInterceptor } from "../smithy__shared-ini-file-loader.mjs";
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
import "path";
import "fs/promises";
import "os";
import "node:fs/promises";
const fromWebToken = (init) => async (awsIdentityProperties) => {
  init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromWebToken");
  const { roleArn, roleSessionName, webIdentityToken, providerId, policyArns, policy, durationSeconds } = init;
  let { roleAssumerWithWebIdentity } = init;
  if (!roleAssumerWithWebIdentity) {
    const { getDefaultRoleAssumerWithWebIdentity } = await import("../aws-sdk__nested-clients.mjs").then(function(n) {
      return n.a;
    });
    roleAssumerWithWebIdentity = getDefaultRoleAssumerWithWebIdentity({
      ...init.clientConfig,
      credentialProviderLogger: init.logger,
      parentClientConfig: {
        ...awsIdentityProperties?.callerClientConfig,
        ...init.parentClientConfig
      }
    }, init.clientPlugins);
  }
  return roleAssumerWithWebIdentity({
    RoleArn: roleArn,
    RoleSessionName: roleSessionName ?? `aws-sdk-js-session-${Date.now()}`,
    WebIdentityToken: webIdentityToken,
    ProviderId: providerId,
    PolicyArns: policyArns,
    Policy: policy,
    DurationSeconds: durationSeconds
  });
};
const ENV_TOKEN_FILE = "AWS_WEB_IDENTITY_TOKEN_FILE";
const ENV_ROLE_ARN = "AWS_ROLE_ARN";
const ENV_ROLE_SESSION_NAME = "AWS_ROLE_SESSION_NAME";
const fromTokenFile = (init = {}) => async (awsIdentityProperties) => {
  init.logger?.debug("@aws-sdk/credential-provider-web-identity - fromTokenFile");
  const webIdentityTokenFile = init?.webIdentityTokenFile ?? process.env[ENV_TOKEN_FILE];
  const roleArn = init?.roleArn ?? process.env[ENV_ROLE_ARN];
  const roleSessionName = init?.roleSessionName ?? process.env[ENV_ROLE_SESSION_NAME];
  if (!webIdentityTokenFile || !roleArn) {
    throw new CredentialsProviderError("Web identity configuration not specified", {
      logger: init.logger
    });
  }
  const credentials = await fromWebToken({
    ...init,
    webIdentityToken: externalDataInterceptor?.getTokenRecord?.()[webIdentityTokenFile] ?? readFileSync(webIdentityTokenFile, { encoding: "ascii" }),
    roleArn,
    roleSessionName
  })(awsIdentityProperties);
  if (webIdentityTokenFile === process.env[ENV_TOKEN_FILE]) {
    clientExports.setCredentialFeature(credentials, "CREDENTIALS_ENV_VARS_STS_WEB_ID_TOKEN", "h");
  }
  return credentials;
};
export {
  fromTokenFile,
  fromWebToken
};
