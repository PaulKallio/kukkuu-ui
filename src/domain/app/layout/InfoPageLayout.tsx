import React from 'react';

import adultFaceIcon from '../../../assets/icons/svg/adultFace.svg';
import Icon from '../../../common/components/icon/Icon';
import PageWrapper from '../../app/layout/PageWrapper';
import Button from '../../../common/components/button/Button';
import styles from './infoPageLayout.module.scss';

type Props = {
  title: string;
  description: string;
  icon?: string;
  callToAction?: {
    label: string;
    onClick: () => void;
  };
};

const InfoPageLayout = ({
  title,
  description,
  callToAction,
  icon = adultFaceIcon,
}: Props) => {
  return (
    <PageWrapper title={title}>
      <div className={styles.infoPageLayout}>
        <h1 className={styles.infoPageLayoutTitle}>{title}</h1>
        <Icon className={styles.infoPageLayoutFace} src={icon} />
        <p className={styles.infoPageLayoutDescription}>{description}</p>
        {callToAction && (
          <Button
            className={styles.callToActionButton}
            onClick={callToAction.onClick}
          >
            {callToAction.label}
          </Button>
        )}
      </div>
    </PageWrapper>
  );
};

export default InfoPageLayout;
