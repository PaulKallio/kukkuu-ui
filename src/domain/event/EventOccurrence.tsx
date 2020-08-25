import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { eventQuery_event_occurrences_edges_node as OccurrencesEdgeNode } from '../api/generatedTypes/eventQuery';
import { formatTime, newMoment } from '../../common/time/utils';
import styles from './eventOccurrence.module.scss';
import Button from '../../common/components/button/Button';

interface EventOccurrenceProps {
  occurrence: OccurrencesEdgeNode;
}

const EventOccurrence: React.FunctionComponent<EventOccurrenceProps> = ({
  occurrence,
}) => {
  const { t } = useTranslation();

  const date = formatTime(newMoment(occurrence.time), 'dd D.M.YYYY');
  const time = formatTime(newMoment(occurrence.time), 'hh:mm');

  const hasCapacity =
    occurrence.remainingCapacity && occurrence.remainingCapacity > 0;

  return (
    <tr className={styles.occurrence}>
      <td className={styles.occurrenceDate}>{date}</td>
      <td className={styles.occurrenceTime}>{time}</td>
      <td className={styles.occurrenceVenue}>{occurrence.venue.name}</td>
      <td className={styles.remainingCapacity}>
        {occurrence?.remainingCapacity}
      </td>
      <td className={styles.occurrenceSubmit}>
        {
          // TODO: KK-300 Make the back-button not confusing
        }

        {hasCapacity ? (
          <Link
            className={styles.linkButton}
            to={`${occurrence.event.id}/occurrence/${occurrence.id}/enrol`}
          >
            <Button type="submit" className={styles.submitButton}>
              {t('event.register.occurrenceTableHeader.buttonText')}
            </Button>
          </Link>
        ) : (
          <Button className={styles.fullButton} disabled>
            {t('enrollment.button.occurenceFull')}
          </Button>
        )}
      </td>
    </tr>
  );
};

export default EventOccurrence;
