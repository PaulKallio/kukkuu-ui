import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, Log } from 'oidc-client';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

// Show a lot of info in the console about oidc!
Log.logger = console;
Log.level = Log.DEBUG;

/* eslint-disable @typescript-eslint/camelcase */
const settings: UserManagerSettings = {
  //includeIdTokenInSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
  accessTokenExpiringNotificationTime: 59 * 60, // This calculates to 1 minute, good for debugging
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  automaticSilentRenew: true,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}/callback`,
  response_type: 'id_token token',
  // You can also try the iframe solution which doesn't support redux-oidc but uses oidc-client directly:
  silent_redirect_uri: `${location}/silent_renew.html`,
  //silent_redirect_uri: `${location}/silent_renew`,
  scope: process.env.REACT_APP_OIDC_SCOPE,
  post_logout_redirect_uri: `${location}/`,
};
/* eslint-enable @typescript-eslint/camelcase */

const userManager = createUserManager(settings);

export default userManager;
