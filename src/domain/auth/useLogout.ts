import React from 'react';
import { useMatomo } from '@datapunt/matomo-tracker-react';

import { logoutTunnistamo } from './authenticate';
import { flushAllState } from './state/AuthenticationUtils';

function useLogout() {
  const { trackEvent } = useMatomo();

  const logout = React.useCallback(() => {
    trackEvent({ category: 'action', action: 'Log out' });

    // Flush all cached state
    flushAllState({});

    // Log out
    logoutTunnistamo();
  }, [trackEvent]);

  return logout;
}

export default useLogout;
