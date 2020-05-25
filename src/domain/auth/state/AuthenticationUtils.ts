import { store, persistor } from '../../app/state/AppStore';
import { resetFormValues } from '../../registration/state/RegistrationActions';
import { clearProfile } from '../../profile/state/ProfileActions';
import { resetBackendAuthentication } from './BackendAuthenticationActions';
import client from '../../api/client';
import { resetUIState } from '../../app/state/ui/UIActions';
import { clearEvent } from '../../event/state/EventActions';

type FlushStateOptions = {
  keepUserFormData?: boolean;
};

export const flushAllState = (options: FlushStateOptions) => {
  if (!options.keepUserFormData) {
    // Clear user form data
    store.dispatch(resetFormValues());
  }

  // Clear ui state
  store.dispatch(resetUIState());

  // Clear profile (fetched from API)
  store.dispatch(clearProfile());

  // Clear event child state
  store.dispatch(clearEvent());

  // Clear backend auth data
  store.dispatch(resetBackendAuthentication());

  // Flush data in redux store and localStorage
  persistor.flush();

  // Clear Apollo cache
  client.clearStore();
};
