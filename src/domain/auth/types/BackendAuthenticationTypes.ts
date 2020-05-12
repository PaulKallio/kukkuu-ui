export type BackendAuthenticationData = {
  isFetchingToken: boolean;
  apiToken: string | null;
  hasProfile: boolean;
  mustRenewToken: boolean;
  errors: object;
};

export type BackendTokenResponse = {
  ['https://api.hel.fi/auth/kukkuu']: string;
};
