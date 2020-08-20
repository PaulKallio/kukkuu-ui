import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import styles from './hero.module.scss';
import { loginTunnistamo } from '../../auth/authenticate';
import Button from '../../../common/components/button/Button';

type HomeHero = {
  userHasProfile: boolean;
  userIsAuthenticated: boolean;
  scrollToForm: () => void;
};

const HomeHero: React.FunctionComponent<HomeHero> = ({
  userHasProfile,
  scrollToForm,
  userIsAuthenticated,
}) => {
  const { t } = useTranslation();
  const history = useHistory();

  return (
    <section className={styles.heroWrapper}>
      <div className={styles.heroContainer}>
        <div className={styles.hero}>
          <h1>{t('appName')}</h1>
          <p> {t('homePage.hero.descriptionText')}</p>
          <div className={styles.buttonGroup}>
            {!userHasProfile && (
              <Button className={styles.registerButton} onClick={scrollToForm}>
                {t('homePage.hero.buttonText')}
              </Button>
            )}
            {userHasProfile && (
              <Button
                className={styles.authenticateButton}
                onClick={() => history.push('/profile')}
              >
                {t('common.profile.goToProfile.buttonText')}
              </Button>
            )}
            {!userIsAuthenticated && (
              <Button
                variant="secondary"
                className={styles.authenticateButton}
                onClick={() => loginTunnistamo()}
              >
                {t('authentication.login.text')}
              </Button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.kidsImageContainer}>
        <div className={styles.kidsImage}></div>
      </div>
    </section>
  );
};

export default HomeHero;
