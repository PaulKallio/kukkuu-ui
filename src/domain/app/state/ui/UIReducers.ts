import { createReducer } from '@reduxjs/toolkit';
import { SILENT_RENEW_ERROR } from 'redux-oidc';

import { UI_ACTIONS } from './UIActionsConstants';
import { UIData } from '../../types/ui/UITypes';

export const defaultUIState: UIData = {
  sessionExpiredPrompt: {
    isOpen: false,
  },
};

export default createReducer(defaultUIState, {
  [SILENT_RENEW_ERROR]: (state) => {
    state.sessionExpiredPrompt.isOpen = true;
  },
  [UI_ACTIONS.SESSION_EXPIRED_PROMPT.SHOW]: (state) => {
    state.sessionExpiredPrompt.isOpen = true;
  },
  [UI_ACTIONS.SESSION_EXPIRED_PROMPT.CLOSE]: (state, action) => {
    state.sessionExpiredPrompt.isOpen = false;
  },
  [UI_ACTIONS.RESET_UI_STATE]: (state) => (state = defaultUIState),
});
