import React from 'react';
import { useTranslation } from 'react-i18next';
import { Formik } from 'formik';

import Icon from '../../common/components/icon/Icon';
import styles from './event.module.scss';
import personIcon from '../../assets/icons/svg/person.svg';
import EnhancedInputField from '../../common/components/form/fields/input/EnhancedInputField';
import SelectField from '../../common/components/form/fields/select/SelectField';
import { eventQuery as EventQueryType } from '../api/generatedTypes/eventQuery';
import EventOccurrenceList from './EventOccurrenceList';
import { FilterValues, FilterOptions } from './Event';
export interface EventEnrolProps {
  data: EventQueryType;
  filterValues: FilterValues;
  options: FilterOptions;
  onFilterUpdate: (filterValues: FilterValues) => void;
}

const EventEnrol = ({
  data,
  filterValues,
  options,
  onFilterUpdate,
}: EventEnrolProps) => {
  const { t } = useTranslation();

  const handleSubmit = (filterValues: FilterValues) => {
    const z: FilterValues = {};
    if (filterValues.date) z.date = filterValues.date;
    if (filterValues.time) z.time = filterValues.time;
    onFilterUpdate(z);
  };

  if (!data?.event) return <div></div>;

  const participantsPerInvite = data.event.participantsPerInvite
    ? t(`event.participantsPerInviteEnum.${data.event.participantsPerInvite}`)
    : '';

  return (
    <>
      <div className={styles.register}>
        <h2>{t('event.register.form.header')}</h2>
        <div className={styles.attendees}>
          <Icon src={personIcon} className={styles.icon} />
          {participantsPerInvite}
        </div>
        <div className={styles.signup}>
          <Formik
            key="eventPageFormKey"
            initialValues={filterValues}
            onSubmit={handleSubmit}
            validate={(values: FilterValues) => {
              handleSubmit(values);
            }}
          >
            {({ handleSubmit, values }) => {
              return (
                <form onSubmit={handleSubmit} id="eventPageForm">
                  <EnhancedInputField
                    className={styles.dateField}
                    id="date"
                    name="date"
                    placeholder="placeholder"
                    label="Choose date"
                    options={options.dates}
                    component={SelectField}
                    value={values.date}
                  />
                  <EnhancedInputField
                    className={styles.timeField}
                    id="time"
                    name="time"
                    placeholder="placeholdertime"
                    label="Choose time"
                    options={options.times}
                    component={SelectField}
                    value={values.time}
                  />
                </form>
              );
            }}
          </Formik>
        </div>
      </div>
      {data.event.occurrences.edges && (
        <EventOccurrenceList
          occurrences={data.event.occurrences}
          eventId={data.event.id}
        />
      )}
    </>
  );
};

export default EventEnrol;
