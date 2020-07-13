import React from 'react';
import { ArrayHelpers, Field, getIn } from 'formik';
import { useTranslation } from 'react-i18next';
import { Button, TextInput } from 'hds-react';

import styles from './childFormField.module.scss';
import { formatTime, newMoment } from '../../../../common/time/utils';
import { DEFAULT_DATE_FORMAT } from '../../../../common/time/TimeConstants';
import { Child } from '../../../child/types/ChildTypes';
import { getTranslatedRelationshipOptions } from '../../../child/ChildUtils';
import Icon from '../../../../common/components/icon/Icon';
import happyChildIcon from '../../../../assets/icons/svg/childFaceHappy.svg';
import deleteIcon from '../../../../assets/icons/svg/delete.svg';
import { validatePostalCode } from '../../../../common/components/form/validationUtils';
import FormikDropdown, {
  HdsOptionType,
} from '../../../../common/components/form/fields/dropdown/FormikDropdown';

interface ChildFormFieldProps {
  child: Child;
  childIndex: number;
  arrayHelpers: ArrayHelpers;
  setFieldValue: any;
  errors: any;
  touched: any;
}

const ChildFormField: React.FunctionComponent<ChildFormFieldProps> = ({
  child,
  childIndex,
  arrayHelpers,
  setFieldValue,
  errors,
  touched,
}) => {
  const { t } = useTranslation();

  return (
    <div className={styles.childField} key={childIndex}>
      <div className={styles.childInfo}>
        <div className={styles.heading}>
          <Icon src={happyChildIcon} className={styles.childImage} />
          <h2>{t('registration.form.child.info.heading')}</h2>
          {childIndex !== 0 && (
            <Button
              aria-label={t('child.form.modal.delete.label')}
              onClick={() => arrayHelpers.remove(childIndex)}
            >
              {t('child.form.modal.delete.label')}
              <Icon src={deleteIcon} />
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
          id={`children[${childIndex}].postalCode`}
          name={`children[${childIndex}].postalCode`}
          label={t('registration.form.child.postalCode.input.label')}
          required={true}
          placeholder={t(
            'registration.form.child.postalCode.input.placeholder'
          )}
          // TODO: validate postcode
          invalid={
            getIn(touched, `children[${childIndex}].postalCode`) &&
            getIn(errors, `children[${childIndex}].postalCode`)
          }
          helperText={
            getIn(touched, `children[${childIndex}].postalCode`) &&
            t(getIn(errors, `children[${childIndex}].postalCode`))
          }
        />

        <Field
          as={FormikDropdown}
          id={`children[${childIndex}].relationship.type`}
          name={`children[${childIndex}].relationship.type`}
          label={t('registration.form.child.relationship.input.label')}
          required={true}
          options={getTranslatedRelationshipOptions(t)}
          onBlur={console.log('TODO: set touched')}
          onChange={(option: HdsOptionType) =>
            setFieldValue(
              `children[${childIndex}].relationship.type`,
              option.value
            )
          }
          placeholder={t(
            'registration.form.child.relationship.input.placeholder'
          )}
          invalid={
            getIn(touched, `children[${childIndex}].relationship.type`) &&
            getIn(errors, `children[${childIndex}].relationship.type`)
          }
          helper={
            getIn(touched, `children[${childIndex}].relationship.type`) &&
            t(getIn(errors, `children[${childIndex}].relationship.type`))
          }
        />
      </div>
    </div>
  );
};

export default ChildFormField;
