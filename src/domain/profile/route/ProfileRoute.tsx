import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Profile from '../Profile';
import { getCurrentLanguage } from '../../../common/translation/TranslationUtils';
import ProtectedRoute from '../../auth/route/ProtectedRoute';
import ProfileChildRoutes from './ProfileChildRoutes';
import useIsChildOfProfile from './useIsChildOfProfile';

const ProfileRoute = () => {
  const { i18n } = useTranslation();
  const currentLocale = getCurrentLanguage(i18n);
  const childRoutePath = `/${currentLocale}/profile/child/:childId`;
  const match = useRouteMatch<{ childId: string }>(childRoutePath);
  const [queryIsChildOfProfile] = useIsChildOfProfile();

  return (
    <Switch>
      <Route component={Profile} exact path={`/${currentLocale}/profile`} />
      <ProtectedRoute
        isAuthorized={() => queryIsChildOfProfile(match?.params.childId)}
        redirectTo="/wrong-login-method"
        component={ProfileChildRoutes}
        path={childRoutePath}
      />
    </Switch>
  );
};
export default ProfileRoute;
