import { c as clientExports } from "../aws-sdk__core.mjs";
import { f as fromSso } from "../aws-sdk__token-providers.mjs";
import { a as getSSOTokenFromFile, g as getProfileName, p as parseKnownFiles, b as loadSsoSessionData } from "../smithy__shared-ini-file-loader.mjs";
import { C as CredentialsProviderError } from "../smithy__property-provider.mjs";
import { s as ssoExports } from "../aws-sdk__nested-clients.mjs";
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
import "node:fs";
import "path";
import "fs/promises";
import "os";
import "node:fs/promises";
import "./middleware-host-header+[...].mjs";
import "../aws-sdk__middleware-logger.mjs";
import "./middleware-recursion-detection+[...].mjs";
import "../aws__lambda-invoke-store.mjs";
import "../aws-sdk__middleware-user-agent.mjs";
import "../aws-sdk__util-endpoints.mjs";
import "../smithy__util-endpoints.mjs";
import "../smithy__url-parser.mjs";
import "../smithy__querystring-parser.mjs";
import "../smithy__util-retry.mjs";
import "../@smithy/service-error-classification+[...].mjs";
import "../smithy__config-resolver.mjs";
import "../smithy__util-config-provider.mjs";
import "../@smithy/middleware-content-length+[...].mjs";
import "../smithy__middleware-endpoint.mjs";
import "../smithy__node-config-provider.mjs";
import "../smithy__middleware-retry.mjs";
import "../tslib.mjs";
import "../aws-sdk__util-user-agent-node.mjs";
import "node:os";
import "node:process";
import "node:path";
import "../smithy__hash-node.mjs";
import "../smithy__util-body-length-node.mjs";
import "../@smithy/util-defaults-mode-node+[...].mjs";
import "./region-config-resolver+[...].mjs";
const isSsoProfile = (arg) => arg && (typeof arg.sso_start_url === "string" || typeof arg.sso_account_id === "string" || typeof arg.sso_session === "string" || typeof arg.sso_region === "string" || typeof arg.sso_role_name === "string");
const SHOULD_FAIL_CREDENTIAL_CHAIN = false;
const resolveSSOCredentials = async ({ ssoStartUrl, ssoSession, ssoAccountId, ssoRegion, ssoRoleName, ssoClient, clientConfig, parentClientConfig, callerClientConfig, profile, filepath, configFilepath, ignoreCache, logger }) => {
  let token;
  const refreshMessage = `To refresh this SSO session run aws sso login with the corresponding profile.`;
  if (ssoSession) {
    try {
      const _token = await fromSso({
        profile,
        filepath,
        configFilepath,
        ignoreCache
      })();
      token = {
        accessToken: _token.token,
        expiresAt: new Date(_token.expiration).toISOString()
      };
    } catch (e) {
      throw new CredentialsProviderError(e.message, {
        tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
        logger
      });
    }
  } else {
    try {
      token = await getSSOTokenFromFile(ssoStartUrl);
    } catch (e) {
      throw new CredentialsProviderError(`The SSO session associated with this profile is invalid. ${refreshMessage}`, {
        tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
        logger
      });
    }
  }
  if (new Date(token.expiresAt).getTime() - Date.now() <= 0) {
    throw new CredentialsProviderError(`The SSO session associated with this profile has expired. ${refreshMessage}`, {
      tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
      logger
    });
  }
  const { accessToken } = token;
  const { SSOClient, GetRoleCredentialsCommand } = await Promise.resolve().then(function() {
    return loadSso;
  });
  const sso = ssoClient || new SSOClient(Object.assign({}, clientConfig ?? {}, {
    logger: clientConfig?.logger ?? callerClientConfig?.logger ?? parentClientConfig?.logger,
    region: clientConfig?.region ?? ssoRegion,
    userAgentAppId: clientConfig?.userAgentAppId ?? callerClientConfig?.userAgentAppId ?? parentClientConfig?.userAgentAppId
  }));
  let ssoResp;
  try {
    ssoResp = await sso.send(new GetRoleCredentialsCommand({
      accountId: ssoAccountId,
      roleName: ssoRoleName,
      accessToken
    }));
  } catch (e) {
    throw new CredentialsProviderError(e, {
      tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
      logger
    });
  }
  const { roleCredentials: { accessKeyId, secretAccessKey, sessionToken, expiration, credentialScope, accountId } = {} } = ssoResp;
  if (!accessKeyId || !secretAccessKey || !sessionToken || !expiration) {
    throw new CredentialsProviderError("SSO returns an invalid temporary credential.", {
      tryNextLink: SHOULD_FAIL_CREDENTIAL_CHAIN,
      logger
    });
  }
  const credentials = {
    accessKeyId,
    secretAccessKey,
    sessionToken,
    expiration: new Date(expiration),
    ...credentialScope && { credentialScope },
    ...accountId && { accountId }
  };
  if (ssoSession) {
    clientExports.setCredentialFeature(credentials, "CREDENTIALS_SSO", "s");
  } else {
    clientExports.setCredentialFeature(credentials, "CREDENTIALS_SSO_LEGACY", "u");
  }
  return credentials;
};
const validateSsoProfile = (profile, logger) => {
  const { sso_start_url, sso_account_id, sso_region, sso_role_name } = profile;
  if (!sso_start_url || !sso_account_id || !sso_region || !sso_role_name) {
    throw new CredentialsProviderError(`Profile is configured with invalid SSO credentials. Required parameters "sso_account_id", "sso_region", "sso_role_name", "sso_start_url". Got ${Object.keys(profile).join(", ")}
Reference: https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-sso.html`, { tryNextLink: false, logger });
  }
  return profile;
};
const fromSSO = (init = {}) => async ({ callerClientConfig } = {}) => {
  init.logger?.debug("@aws-sdk/credential-provider-sso - fromSSO");
  const { ssoStartUrl, ssoAccountId, ssoRegion, ssoRoleName, ssoSession } = init;
  const { ssoClient } = init;
  const profileName = getProfileName({
    profile: init.profile ?? callerClientConfig?.profile
  });
  if (!ssoStartUrl && !ssoAccountId && !ssoRegion && !ssoRoleName && !ssoSession) {
    const profiles = await parseKnownFiles(init);
    const profile = profiles[profileName];
    if (!profile) {
      throw new CredentialsProviderError(`Profile ${profileName} was not found.`, { logger: init.logger });
    }
    if (!isSsoProfile(profile)) {
      throw new CredentialsProviderError(`Profile ${profileName} is not configured with SSO credentials.`, {
        logger: init.logger
      });
    }
    if (profile?.sso_session) {
      const ssoSessions = await loadSsoSessionData(init);
      const session = ssoSessions[profile.sso_session];
      const conflictMsg = ` configurations in profile ${profileName} and sso-session ${profile.sso_session}`;
      if (ssoRegion && ssoRegion !== session.sso_region) {
        throw new CredentialsProviderError(`Conflicting SSO region` + conflictMsg, {
          tryNextLink: false,
          logger: init.logger
        });
      }
      if (ssoStartUrl && ssoStartUrl !== session.sso_start_url) {
        throw new CredentialsProviderError(`Conflicting SSO start_url` + conflictMsg, {
          tryNextLink: false,
          logger: init.logger
        });
      }
      profile.sso_region = session.sso_region;
      profile.sso_start_url = session.sso_start_url;
    }
    const { sso_start_url, sso_account_id, sso_region, sso_role_name, sso_session } = validateSsoProfile(profile, init.logger);
    return resolveSSOCredentials({
      ssoStartUrl: sso_start_url,
      ssoSession: sso_session,
      ssoAccountId: sso_account_id,
      ssoRegion: sso_region,
      ssoRoleName: sso_role_name,
      ssoClient,
      clientConfig: init.clientConfig,
      parentClientConfig: init.parentClientConfig,
      callerClientConfig: init.callerClientConfig,
      profile: profileName,
      filepath: init.filepath,
      configFilepath: init.configFilepath,
      ignoreCache: init.ignoreCache,
      logger: init.logger
    });
  } else if (!ssoStartUrl || !ssoAccountId || !ssoRegion || !ssoRoleName) {
    throw new CredentialsProviderError('Incomplete configuration. The fromSSO() argument hash must include "ssoStartUrl", "ssoAccountId", "ssoRegion", "ssoRoleName"', { tryNextLink: false, logger: init.logger });
  } else {
    return resolveSSOCredentials({
      ssoStartUrl,
      ssoSession,
      ssoAccountId,
      ssoRegion,
      ssoRoleName,
      ssoClient,
      clientConfig: init.clientConfig,
      parentClientConfig: init.parentClientConfig,
      callerClientConfig: init.callerClientConfig,
      profile: profileName,
      filepath: init.filepath,
      configFilepath: init.configFilepath,
      ignoreCache: init.ignoreCache,
      logger: init.logger
    });
  }
};
const loadSso = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  GetRoleCredentialsCommand: ssoExports.GetRoleCredentialsCommand,
  SSOClient: ssoExports.SSOClient
});
export {
  fromSSO,
  isSsoProfile,
  validateSsoProfile
};
