import { createUserManager } from 'redux-oidc';
import { UserManagerSettings, Log, WebStorageStateStore } from 'oidc-client';

const location = `${window.location.protocol}//${window.location.hostname}${
  window.location.port ? `:${window.location.port}` : ''
}`;

if (process.env.NODE_ENV === 'development') {
  Log.logger = console;
  Log.level = Log.INFO;
}

/* eslint-disable @typescript-eslint/camelcase */
const settings: UserManagerSettings = {
  loadUserInfo: true,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  // This calculates to 1 minute, good for debugging:
  // accessTokenExpiringNotificationTime: 59.65 * 60,
  authority: process.env.REACT_APP_OIDC_AUTHORITY,
  automaticSilentRenew: true,
  client_id: process.env.REACT_APP_OIDC_CLIENT_ID,
  redirect_uri: `${location}/callback`,
  response_type: 'id_token token',
  silent_redirect_uri: `${location}/silent_renew.html`,
  scope: process.env.REACT_APP_OIDC_SCOPE,
  post_logout_redirect_uri: `${location}/`,
};
/* eslint-enable @typescript-eslint/camelcase */

const userManager = createUserManager(settings);

export default userManager;
