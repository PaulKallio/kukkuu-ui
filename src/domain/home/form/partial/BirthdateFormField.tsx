import React, { FunctionComponent } from 'react';
import { FieldArrayRenderProps, getIn, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';

import styles from './birthdateFormField.module.scss';
import { validateRequire } from '../../../../common/components/form/validationUtils';
import {
  formatTime,
  newMoment,
  toZeroBasedMonth,
} from '../../../../common/time/utils';
import { DEFAULT_DATE_FORMAT } from '../../../../common/time/TimeConstants';
import { Birthdate } from '../../../child/form/ChildForm';
interface BirthdateFormFieldProps extends FieldArrayRenderProps {
  isImmutable?: boolean;
  values?: Birthdate;
}

const BirthdateFormField: FunctionComponent<BirthdateFormFieldProps> = ({
  name,
  isImmutable = false,
  values,
  form: { errors, touched },
}) => {
  const fieldTouched =
    getIn(touched, 'child.birthdate.day') || getIn(touched, 'birthdate.day');
  const error = getIn(errors, 'childBirthdate');
  const { t } = useTranslation();

  if (isImmutable && values) {
    const monthZeroBased = toZeroBasedMonth(values.month);
    const birthdate = formatTime(
      newMoment([values.year, monthZeroBased, values.day]),
      DEFAULT_DATE_FORMAT
    );

    return (
      <div className={styles.birthdateField}>
        <label>{`${t(
          'homePage.preliminaryForm.childBirthdate.input.label'
        )}*`}</label>
        <p className={styles.immutableField}>{birthdate}</p>
      </div>
    );
  }

  return (
    <div className={styles.birthdateField}>
      <label>{`${t(
        'homePage.preliminaryForm.childBirthdate.input.label'
      )}*`}</label>
      <div className={styles.inputWrapper}>
        <Field
          as={TextInput}
          type="number"
          name={`${name}.day`}
          aria-label={t(
            'homePage.preliminaryForm.childBirthdate.input.day.placeholder'
          )}
          placeholder={t(
            'homePage.preliminaryForm.childBirthdate.input.day.placeholder'
          )}
          required={true}
          min={1}
          max={31}
          maxLength={2}
          validate={(value: number) => validateRequire(value)}
          invalid={
            getIn(touched, `${name}.day`) && getIn(errors, `${name}.day`)
          }
          helperText={
            getIn(touched, `${name}.day`) &&
            getIn(errors, `${name}.day`) &&
            t('validation.general.required')
          }
        />
        <div className={styles.dot}>.</div>
        <Field
          as={TextInput}
          type="number"
          name={`${name}.month`}
          required={true}
          aria-label={t(
            'homePage.preliminaryForm.childBirthdate.input.month.placeholder'
          )}
          placeholder={t(
            'homePage.preliminaryForm.childBirthdate.input.month.placeholder'
          )}
          min={1}
          max={12}
          maxLength={2}
          validate={(value: number) => validateRequire(value)}
          invalid={
            getIn(touched, `${name}.month`) && getIn(errors, `${name}.month`)
          }
          helperText={
            (getIn(touched, `${name}.month`) &&
              getIn(errors, `${name}.month`) &&
              t('validation.general.required')) || <></>
          }
        />
        <div className={styles.dot}>.</div>
        <Field
          as={TextInput}
          type="number"
          required={true}
          name={`${name}.year`}
          maxLength={4}
          min={2019}
          validate={(value: number) => validateRequire(value)}
          invalid={
            getIn(touched, `${name}.year`) && getIn(errors, `${name}.year`)
          }
          aria-label={t(
            'homePage.preliminaryForm.childBirthdate.input.year.placeholder'
          )}
          placeholder={t(
            'homePage.preliminaryForm.childBirthdate.input.year.placeholder'
          )}
          helperText={
            getIn(touched, `${name}.year`) &&
            getIn(errors, `${name}.year`) &&
            t('validation.general.required')
          }
        />
      </div>
    </div>
  );
};

export default BirthdateFormField;
