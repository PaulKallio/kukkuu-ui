import React, { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { useQuery } from '@apollo/react-hooks';

import { profileQuery as ProfileQueryType } from '../../../api/generatedTypes/profileQuery';
import personIcon from '../../../../assets/icons/svg/person.svg';
import Dropdown from '../../../../common/components/dropdown/Dropdown';
import { isAuthenticatedSelector } from '../../../auth/state/AuthenticationSelectors';
import { loginTunnistamo, logoutTunnistamo } from '../../../auth/authenticate';
import UserMenu from '../userMenu/UserMenu';
import { flushAllState } from '../../../auth/state/AuthenticationUtils';
import profileQuery from '../../../profile/queries/ProfileQuery';
import LoadingSpinner from '../../../../common/components/spinner/LoadingSpinner';
import { saveProfile } from '../../../profile/state/ProfileActions';
import {
  clearEvent,
  saveChildrenEvents,
} from '../../../event/state/EventActions';
import { defaultProfileData } from '../../../profile/state/ProfileReducers';

export interface UserDropdownProps {
  isSmallScreen?: boolean;
}

const UserDropdown: FunctionComponent<UserDropdownProps> = ({
  isSmallScreen,
}) => {
  const { t } = useTranslation();
  const history = useHistory();
  const isAuthenticated = useSelector(isAuthenticatedSelector);
  const dispatch = useDispatch();

  const { loading, error, data } = useQuery<ProfileQueryType>(profileQuery, {
    skip: !isAuthenticated,
  });
  const { trackEvent } = useMatomo();

  useEffect(() => {
    console.count('UserDropdown useEffect');
    dispatch(saveProfile(data?.myProfile || defaultProfileData));
    dispatch(clearEvent());
    dispatch(saveChildrenEvents(data?.myProfile?.children || undefined));
  }, [data, dispatch]);

  if (loading) return <LoadingSpinner isLoading={true} />;
  if (error) {
    console.error(error);
  }

  const logout = {
    label: t('authentication.logout.text'),
    id: 'logoutButton',
    onClick: () => {
      trackEvent({ category: 'action', action: 'Log out' });

      // Flush all cached state
      flushAllState({});

      // Log out;
      logoutTunnistamo();
    },
  };

  const user = {
    id: 'userButton',
    label: data?.myProfile?.firstName
      ? data?.myProfile?.firstName
      : t('navbar.profileDropdown.profile.text'),
    icon: personIcon,
  };

  const frontPage = {
    id: 'frontPageButton',
    label: t('navbar.smallScreenMenu.homepageLinkText'),
    onClick: () => history.push('/'),
  };

  const profile = {
    id: 'profileButton',
    label: t('navbar.profileDropdown.profile.text'),
    onClick: () => {
      history.push('/profile');
    },
  };

  const login = {
    id: 'loginButton',
    label: t('authentication.login.text'),
    icon: personIcon,
    onClick: () => {
      trackEvent({ category: 'action', action: 'Log in' });
      loginTunnistamo();
    },
  };

  if (!isSmallScreen) {
    const dropdownOptions = isAuthenticated ? [user, profile, logout] : [login];
    return <Dropdown options={dropdownOptions} />;
  } else {
    const userMenuOptions = isAuthenticated
      ? [frontPage, profile, logout]
      : [frontPage, login];
    return <UserMenu options={userMenuOptions} />;
  }
};

export default UserDropdown;
