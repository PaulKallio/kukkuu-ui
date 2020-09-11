import React, { useState } from 'react';
import { CallbackComponent } from 'redux-oidc';
import { User } from 'oidc-client';
import { RouteChildrenProps } from 'react-router';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';

import userManager from './userManager';
import PageWrapper from '../app/layout/PageWrapper';
import ErrorMessage from '../../common/components/error/Error';

function OidcCallback(props: RouteChildrenProps) {
  const { t } = useTranslation();

  const [callbackMessage, setCallbackMessage] = useState({
    message: <p>{t('authentication.redirect.text')}</p>,
  });

  const onSuccess = (user: User) => {
    if (user.state.path) props.history.replace(user.state.path);
    else props.history.replace('/profile');
  };

  const onError = (error: Error) => {
    let message = <ErrorMessage message={t('authentication.errorMessage')} />;
    let shortMessage = t('authentication.errorMessage');

    // Handle error caused by device time being more than 5 minutes off:
    if (
      error.message.includes('iat is in the future') ||
      error.message.includes('exp is in the past')
    ) {
      message = (
        <ErrorMessage message={t('authentication.deviceTimeError.message')} />
      );
      shortMessage = t('authentication.deviceTimeError.shortMessage');
    } else if (
      // Handle error caused by end user choosing Deny in Tunnistamo's Permission Request:
      // We could send an event to Analytics for this.
      error.message ===
      'The resource owner or authorization server denied the request'
    ) {
      message = (
        <ErrorMessage message={t('authentication.permRequestDenied.message')} />
      );
      shortMessage = t('authentication.permRequestDenied.shortMessage');
    } else {
      // Send other errors to Sentry for analysis - they might be bugs:
      Sentry.captureException(error);
    }

    setCallbackMessage({ message });
    toast.error(shortMessage);
  };

  return (
    <PageWrapper>
      <CallbackComponent
        successCallback={onSuccess}
        errorCallback={onError}
        userManager={userManager}
      >
        {callbackMessage.message}
      </CallbackComponent>
    </PageWrapper>
  );
}

export default OidcCallback;
