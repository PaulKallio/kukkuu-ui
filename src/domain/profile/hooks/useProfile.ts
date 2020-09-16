import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from '@sentry/browser';

import { isAuthenticatedSelector } from '../../auth/state/AuthenticationSelectors';
import { profileQuery as ProfileQueryType } from '../../api/generatedTypes/profileQuery';
import { clearEvent, saveChildrenEvents } from '../../event/state/EventActions';
import profileQuery from '../queries/ProfileQuery';
import { clearProfile, saveProfile } from '../state/ProfileActions';
import { defaultProfileData } from '../state/ProfileReducers';
import { profileSelector } from '../state/ProfileSelectors';

function useProfile() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const profile = useSelector(profileSelector);

  const result = useQuery<ProfileQueryType>(profileQuery, {
    skip: !isAuthenticated,
    onCompleted: (data) => {
      dispatch(saveProfile(data?.myProfile || defaultProfileData));
      dispatch(clearEvent());
      dispatch(saveChildrenEvents(data?.myProfile?.children || undefined));
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error(error);
      dispatch(clearProfile());
      Sentry.captureException(error);
    },
  });

  return { ...result, data: profile };
}

export default useProfile;
