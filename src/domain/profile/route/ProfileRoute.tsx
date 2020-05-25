import React, { FunctionComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Profile from '../Profile';
import Event from '../../event/Event';
import ProfileChildDetail from '../children/child/ProfileChildDetail';
import { getCurrentLanguage } from '../../../common/translation/TranslationUtils';
import Enrol from '../../event/enrol/Enrol';
import EventIsEnrolled from '../../event/EventIsEnrolled';

const ProfileRoute: FunctionComponent = () => {
  const { i18n } = useTranslation();
  const currentLocale = getCurrentLanguage(i18n);
  return (
    <Switch>
      <Route
        exact
        component={ProfileChildDetail}
        path={`/${currentLocale}/profile/child/:childId`}
      />
      <Route component={Profile} exact path={`/${currentLocale}/profile`} />
      <Route
        exact
        component={Event}
        path={`/${currentLocale}/profile/child/:childId/event/:eventId`}
      />
      <Route
        exact
        component={Event}
        path={`/${currentLocale}/profile/child/:childId/event/:eventId/past`}
      />
      <Route
        exact
        component={EventIsEnrolled}
        path={`/${currentLocale}/profile/child/:childId/occurrence/:occurrenceId`}
      />
      <Route
        exact
        component={Enrol}
        path={`/${currentLocale}/profile/child/:childId/event/:eventId/occurrence/:occurrenceId/enrol`}
      />
    </Switch>
  );
};
export default ProfileRoute;
