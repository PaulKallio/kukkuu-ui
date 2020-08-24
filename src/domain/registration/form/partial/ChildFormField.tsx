import React from 'react';
import { ArrayHelpers, Field, FormikState, FormikHelpers, getIn } from 'formik';
import { useTranslation } from 'react-i18next';
import { TextInput } from 'hds-react';

import styles from './childFormField.module.scss';
import { formatTime, newMoment } from '../../../../common/time/utils';
import { DEFAULT_DATE_FORMAT } from '../../../../common/time/TimeConstants';
import { Child } from '../../../child/types/ChildTypes';
import { getTranslatedRelationshipOptions } from '../../../child/ChildUtils';
import Icon from '../../../../common/components/icon/Icon';
import happyChildIcon from '../../../../assets/icons/svg/childFaceHappy.svg';
import deleteIcon from '../../../../assets/icons/svg/delete.svg';
import { validatePostalCode } from '../../../../common/components/form/validationUtils';
import FormikDropdown from '../../../../common/components/formikWrappers/FormikDropdown';
import { RegistrationFormValues } from '../../types/RegistrationTypes';
import Button from '../../../../common/components/button/Button';

type ChildFormFieldProps = {
  child: Child;
  childIndex: number;
  arrayHelpers: ArrayHelpers;
} & Pick<FormikState<RegistrationFormValues>, 'errors' | 'touched'> &
  Pick<
    FormikHelpers<RegistrationFormValues>,
    'setFieldTouched' | 'setFieldValue'
  >;

const ChildFormFields: React.FunctionComponent<ChildFormFieldProps> = ({
  child,
  childIndex,
  arrayHelpers,
  errors,
  touched,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.childFields} key={childIndex}>
      <div className={styles.childInfo}>
        <div className={styles.heading}>
          <Icon src={happyChildIcon} className={styles.childImage} />
          <h2>{t('registration.form.child.info.heading')}</h2>
          {childIndex !== 0 && (
            <Button
              variant="secondary"
              iconRight={<Icon src={deleteIcon} />}
              aria-label={t('child.form.modal.delete.label')}
              onClick={() => arrayHelpers.remove(childIndex)}
            >
              {t('child.form.modal.delete.label')}
            </Button>
          )}
        </div>
        <div className={styles.childFixedInfo}>
          <div className={styles.childBirthdate}>
            <label>{t('registration.form.child.birthdate.input.label')}</label>
            <p>{formatTime(newMoment(child.birthdate), DEFAULT_DATE_FORMAT)}</p>
          </div>

          <div className={styles.childHomeCity}>
            <label>{t('registration.form.child.homeCity.input.label')}</label>
            <p>{child.homeCity}</p>
          </div>
        </div>

        <div className={styles.childName}>
          <Field
            as={TextInput}
            className={styles.formField}
            id={`children[${childIndex}].firstName`}
            name={`children[${childIndex}].firstName`}
            label={t('registration.form.child.firstName.input.label')}
            autoComplete="new-password"
            placeholder={t(
              'registration.form.child.firstName.input.placeholder'
            )}
          />
          <Field
            as={TextInput}
            className={styles.formField}
            id={`children[${childIndex}].lastName`}
            name={`children[${childIndex}].lastName`}
            autoComplete="new-password"
            label={t('registration.form.child.lastName.input.label')}
            placeholder={t(
              'registration.form.child.lastName.input.placeholder'
            )}
          />
        </div>

        <Field
          as={TextInput}
          className={styles.formField}
          id={`children[${childIndex}].postalCode`}
          name={`children[${childIndex}].postalCode`}
          label={t('registration.form.child.postalCode.input.label')}
          required={true}
          placeholder={t(
            'registration.form.child.postalCode.input.placeholder'
          )}
          invalid={
            getIn(touched, `children[${childIndex}].postalCode`) &&
            `children[${childIndex}].postalCode` !== undefined &&
            validatePostalCode(`children[${childIndex}].postalCode`) !==
              undefined &&
            getIn(errors, `children[${childIndex}].postalCode`)
          }
          helperText={
            getIn(touched, `children[${childIndex}].postalCode`) &&
            t(getIn(errors, `children[${childIndex}].postalCode`))
          }
        />

        <FormikDropdown
          className={styles.formField}
          id={`children[${childIndex}].relationship.type`}
          name={`children[${childIndex}].relationship.type`}
          value={child.relationship?.type || undefined}
          label={t('registration.form.child.relationship.input.label')}
          required={true}
          options={getTranslatedRelationshipOptions(t)}
          placeholder={t('common.select.default.text')}
        />
      </div>
    </div>
  );
};

export default ChildFormFields;
