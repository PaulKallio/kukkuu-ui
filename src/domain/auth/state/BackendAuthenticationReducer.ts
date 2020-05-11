import { createReducer } from '@reduxjs/toolkit';
import { USER_FOUND } from 'redux-oidc';

import { API_AUTHENTICATION_ACTIONS } from '../constants/BackendAuthenticationActionConstants';
import { BackendAuthenticationData } from '../types/BackendAuthenticationTypes';

export const defaultApiAuthenticationData: BackendAuthenticationData = {
  // The idea is making the whole app rendering wait for apiToken check to resolve first
  // On first load, spinner will load no matter what
  // When either token is fetched from redux store, token is fetched successfully, token is failed to fetch
  // Then the app route can render
  isFetchingToken: true,
  mustRenewToken: true,
  hasProfile: false,
  apiToken: null,
  errors: {},
};

export default createReducer(defaultApiAuthenticationData, {
  // Renew backend API token after silent renew
  [USER_FOUND]: (state, action) => {
    state.mustRenewToken = true;
  },
  [API_AUTHENTICATION_ACTIONS.START_FETCHING_TOKEN]: (state) =>
    Object.assign({}, state, { isFetchingToken: true }),
  [API_AUTHENTICATION_ACTIONS.FETCH_TOKEN_SUCCESS]: (state, action) =>
    Object.assign({}, state, {
      isFetchingToken: false,
      mustRenewToken: false,
      hasProfile: true,
      apiToken: Object.values(action.payload)[0],
    }),
  [API_AUTHENTICATION_ACTIONS.FETCH_TOKEN_ERROR]: (state, action) =>
    Object.assign({}, state, {
      isFetchingToken: false,
      apiToken: null,
      hasProfile: false,
      errors: action.payload,
    }),
  [API_AUTHENTICATION_ACTIONS.RESET_BACKEND_AUTHENTICATION]: (state, action) =>
    (state = defaultApiAuthenticationData),
  [API_AUTHENTICATION_ACTIONS.TOKEN_FETCHED]: (state, action) =>
    Object.assign({}, state, { isFetchingToken: false }),
});
