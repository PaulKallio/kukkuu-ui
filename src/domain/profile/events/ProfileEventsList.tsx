import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { QRCode } from 'react-qrcode-logo';

import Card from '../../../common/components/card/Card';
import {
  childByIdQuery_child_availableEvents as AvailableEventsTypes,
  childByIdQuery_child_pastEvents as PastEventsTypes,
  childByIdQuery_child_occurrences as Occurrences,
} from '../../api/generatedTypes/childByIdQuery';
import styles from './profileEventsList.module.scss';
import OccurrenceInfo from '../../event/partial/OccurrenceInfo';
import Paragraph from '../../../common/components/paragraph/Paragraph';

interface ProfileEventsListProps {
  availableEvents: AvailableEventsTypes | null;
  childId: string;
  pastEvents: PastEventsTypes | null;
  occurrences: Occurrences | null;
}

const QR_CODE_SIZE_PX = 300;

const ProfileEventsList: FunctionComponent<ProfileEventsListProps> = ({
  availableEvents,
  childId,
  occurrences,
  pastEvents,
}) => {
  const history = useHistory();
  const { t } = useTranslation();

  const gotoEventPage = (eventId: string, past = false) => {
    const pastUrl = past ? '/past' : '';
    history.push(`/profile/child/${childId}/event/${eventId}${pastUrl}`);
  };

  const gotoOccurrencePage = (occurrenceId: string) => {
    history.push(`/profile/child/${childId}/occurrence/${occurrenceId}`);
  };

  return (
    <>
      {availableEvents?.edges?.[0] && (
        <div className={styles.eventsList}>
          <h2>{t('profile.events.invitations.heading')}</h2>
          {availableEvents.edges.map(
            (eventEdge) =>
              eventEdge?.node && (
                <Card
                  key={eventEdge.node.id}
                  imageSrc={eventEdge.node.image}
                  alt={eventEdge.node.imageAltText || ''}
                  title={eventEdge.node.name || ''} // TODO
                  action={() => gotoEventPage(eventEdge.node?.id || '')} // TODO
                  actionText={t('enrollment.enroll.buttonText')}
                  primaryAction={() => gotoEventPage(eventEdge.node?.id || '')} // TODO
                  primaryActionText={t('enrollment.enroll.buttonText')}
                >
                  <Paragraph text={eventEdge.node.shortDescription || ''} />
                </Card>
              )
          )}
        </div>
      )}
      {occurrences?.edges?.[0] && (
        <div className={styles.eventsList}>
          <h2>{t('profile.events.upcoming.heading')}</h2>
          {occurrences.edges.map(
            (occurrenceEdge) =>
              occurrenceEdge?.node && (
                <Card
                  key={occurrenceEdge.node.event.id}
                  title={occurrenceEdge.node.event.name || ''}
                  imageElement={
                    <div className={styles.qrWrapper}>
                      <QRCode
                        quietZone={0}
                        size={QR_CODE_SIZE_PX}
                        value={occurrenceEdge.node.event.name || ''}
                        ecLevel={'H'}
                      />
                    </div>
                  }
                  action={() =>
                    gotoOccurrencePage(occurrenceEdge.node?.id || '')
                  }
                  actionText={t('enrollment.showEventInfo.buttonText')}
                  focalContent={OccurrenceInfo({
                    occurrence: occurrenceEdge.node,
                    show: ['time', 'duration', 'venue'],
                  })}
                >
                  <p>{occurrenceEdge.node.event.shortDescription}</p>
                </Card>
              )
          )}
        </div>
      )}
      {pastEvents?.edges?.[0] && (
        <div className={styles.eventsList}>
          <h2>{t('profile.events.past.heading')}</h2>
          {pastEvents.edges.map(
            (pastEventEdge) =>
              pastEventEdge?.node && (
                <Card
                  key={pastEventEdge.node.id}
                  imageSrc={pastEventEdge.node.image}
                  title={pastEventEdge.node.name || ''}
                  action={() =>
                    gotoEventPage(pastEventEdge.node?.id || '', true)
                  }
                  actionText={t('enrollment.showEventInfo.buttonText')}
                >
                  <p>{pastEventEdge.node.shortDescription}</p>
                </Card>
              )
          )}
        </div>
      )}
    </>
  );
};

export default ProfileEventsList;
