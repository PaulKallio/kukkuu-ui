import { useQuery } from '@apollo/react-hooks';
import { useDispatch, useSelector } from 'react-redux';
import * as Sentry from '@sentry/browser';
import { QueryResult as GenericQueryResult } from '@apollo/react-common';

import { isAuthenticatedSelector } from '../../auth/state/AuthenticationSelectors';
import {
  profileQuery as ProfileQueryType,
  profileQuery_myProfile as Profile,
} from '../../api/generatedTypes/profileQuery';
import { clearEvent, saveChildrenEvents } from '../../event/state/EventActions';
import profileQuery from '../queries/ProfileQuery';
import { clearProfile, saveProfile } from '../state/ProfileActions';
import { defaultProfileData } from '../state/ProfileReducers';

export type ProfileQueryResult = Omit<
  GenericQueryResult<ProfileQueryType>,
  'data'
> & {
  data: Profile | null | undefined;
};

function useProfile(): ProfileQueryResult {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(isAuthenticatedSelector);

  const result = useQuery<ProfileQueryType>(profileQuery, {
    skip: !isAuthenticated,
    onCompleted: (data) => {
      // Sync data to redux. Note that the redux state won't be updated
      // when apollo re-fetches queries based on refetchQueries. It's
      // better to source data from Apollo instead.
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

  return { ...result, data: result.data?.myProfile };
}

export default useProfile;
