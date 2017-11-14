import { OpenIdConnectConfiguration } from "aurelia-open-id-connect";
import { UserManagerSettings, WebStorageStateStore } from "oidc-client";
import { PLATFORM } from 'aurelia-framework';

const appHost = "http://localhost:5000";

export default {
  loginRedirectModuleId: "login",
  logoutRedirectModuleId: "login",
  userManagerSettings: {
    // The number of seconds in advance of access token expiry
    // to raise the access token expiring event.
    accessTokenExpiringNotificationTime: 1,
    // Either host your own OpenID Provider or select a certified authority
    // from the list http://openid.net/certification/
    // We are using Azure Active Directory as our authority.
    // See http://bit.ly/2wrX5Wg for details.
    //authority: "https://login.microsoft.com/common",
    authority: "http://localhost:5000",
    automaticSilentRenew: false,
    // The interval in milliseconds between checking the user's session.
    checkSessionInterval: 10000,
    // The client or application ID that the authority issues.
    client_id: "aurelia-openiddict",
    filterProtocolClaims: true,
    loadUserInfo: false,
    post_logout_redirect_uri: `${appHost}/counter`,
    redirect_uri: `${appHost}/singin-success`,
    response_type: "token id_token",
    scope: "openid email UserRight api1",
    // number of millisecods to wait for the authorization
    // server to response to silent renew request
    silentRequestTimeout: 10000,
    silent_redirect_uri: `${appHost}/singin-success`,
    userStore: new WebStorageStateStore({
      prefix: "oidc",
      store: window.localStorage,
    }),
  } as UserManagerSettings,
} as OpenIdConnectConfiguration;