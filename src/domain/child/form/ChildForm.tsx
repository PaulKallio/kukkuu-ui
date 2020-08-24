import React, { FunctionComponent } from 'react';
import {
  Formik,
  FieldArray,
  FormikErrors,
  Field,
  getIn,
  FormikProps,
} from 'formik';
import { useTranslation } from 'react-i18next';
import classnames from 'classnames';
import { TextInput } from 'hds-react';
import * as yup from 'yup';

import styles from './childForm.module.scss';
import BirthdateFormField from '../../home/form/partial/BirthdateFormField';
import FormikDropdown from '../../../common/components/formikWrappers/FormikDropdown';
import { Child } from '../types/ChildTypes';
import { getTranslatedRelationshipOptions } from '../ChildUtils';
import {
  validatePostalCode,
  validateDate,
} from '../../../common/components/form/validationUtils';
import { formatTime, newMoment } from '../../../common/time/utils';
import { BACKEND_DATE_FORMAT } from '../../../common/time/TimeConstants';
import Button from '../../../common/components/button/Button';

const schema = yup.object().shape({
  homeCity: yup.string().required('validation.general.required'),
  postalCode: yup.string().required('validation.general.required'),
  // birthdate is validated in validateForm
  relationship: yup.object().shape({
    type: yup.string().required('validation.general.required').nullable(),
  }),
});

export interface Birthdate {
  day: number | string;
  month: number | string;
  year: number | string;
}

interface ChildFormValues extends Omit<Child, 'birthdate'> {
  birthdate: Birthdate;
  childBirthdate?: string;
}

interface ChildFormProps {
  initialValues: ChildFormValues;
  onSubmit: (payload: Child) => void;
  onDelete?: () => void;
  onCancel: () => void;
  setFormIsFilling: (value: boolean) => void;
  formType?: CHILD_FORM_TYPES;
}

const immutableFields = ['birthdate'];

export enum CHILD_FORM_TYPES {
  ADD = 'ADD',
  EDIT = 'EDIT',
}

const ChildForm: FunctionComponent<ChildFormProps> = ({
  initialValues,
  onSubmit,
  onDelete,
  onCancel,
  setFormIsFilling,
  formType = CHILD_FORM_TYPES.ADD,
}) => {
  const { t } = useTranslation();
  const isEditForm = formType === CHILD_FORM_TYPES.EDIT;

  const onFormSubmit = (values: ChildFormValues) => {
    setFormIsFilling(false);
    const child: Child = Object.assign({}, values, {
      birthdate: formatTime(
        newMoment(
          `${values.birthdate.year}-${values.birthdate.month}-${values.birthdate.day}`,
          BACKEND_DATE_FORMAT
        )
      ),
    });
    onSubmit(child);
  };

  /**
   * Validate form
   *
   * Using both this validation function and yup schema is torta-på-torta,
   * TODO: Refactor birthdate field to work with a yup schema.
   * @param values
   */
  const validateForm = (values: ChildFormValues) => {
    setFormIsFilling(true);
    const {
      birthdate: { day, month, year },
    } = values;

    const errors: FormikErrors<ChildFormValues> = {};

    if (day && month && year) {
      errors.childBirthdate = validateDate(`${day}.${month}.${year}`);

      if (!errors.childBirthdate) {
        // Delete the property manually so form will be valid when this is undefined.
        delete errors.childBirthdate;
      }
    }
    return errors;
  };

  const isFieldImmutable = (fieldName: string) => {
    return isEditForm && immutableFields.includes(fieldName);
  };

  const relationshipOptions = getTranslatedRelationshipOptions(t);

  return (
    <Formik
      validate={validateForm}
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onFormSubmit}
    >
      {({
        isSubmitting,
        handleSubmit,
        values,
        errors,
        touched,
      }: FormikProps<ChildFormValues>) => (
        <form onSubmit={handleSubmit} id="childForm">
          <FieldArray
            name="birthdate"
            render={(props) => {
              const isImmutable = isFieldImmutable('birthdate');
              return (
                <BirthdateFormField
                  values={values['birthdate']}
                  isImmutable={isImmutable}
                  {...props}
                />
              );
            }}
          />
          <div className={styles.childInfo}>
            <Field
              as={TextInput}
              className={styles.formField}
              id="homeCity"
              name="homeCity"
              label={t('homePage.preliminaryForm.childHomeCity.input.label')}
              required={true}
              invalid={getIn(touched, 'homeCity') && getIn(errors, 'homeCity')}
              helperText={
                getIn(touched, 'homeCity') && t(getIn(errors, 'homeCity'))
              }
              placeholder={t(
                'homePage.preliminaryForm.childHomeCity.input.placeholder'
              )}
            />
            <Field
              as={TextInput}
              className={styles.formField}
              id="postalCode"
              name="postalCode"
              required={true}
              invalid={
                getIn(touched, 'postalCode') &&
                values.postalCode !== undefined &&
                validatePostalCode(values.postalCode) !== undefined
              }
              helperText={
                getIn(touched, 'postalCode') &&
                t(validatePostalCode(values.postalCode) || '')
              }
              label={t('registration.form.child.postalCode.input.label')}
              placeholder={t(
                'registration.form.child.postalCode.input.placeholder'
              )}
            />
          </div>
          <div className={styles.childName}>
            <Field
              as={TextInput}
              className={styles.formField}
              id="firstName"
              name="firstName"
              label={t('registration.form.child.firstName.input.label')}
              autoComplete="new-password"
              placeholder={t(
                'registration.form.child.firstName.input.placeholder'
              )}
            />
            <Field
              as={TextInput}
              className={styles.formField}
              id="lastName"
              name="lastName"
              autoComplete="new-password"
              label={t('registration.form.child.lastName.input.label')}
              placeholder={t(
                'registration.form.child.lastName.input.placeholder'
              )}
            />
          </div>
          <FormikDropdown
            className={styles.formField}
            name="relationship.type"
            id="relationship.type"
            value={values.relationship?.type || ''}
            label={t('registration.form.child.relationship.input.label')}
            required={true}
            options={relationshipOptions}
            placeholder={t('common.select.default.text')}
          />
          <div
            className={classnames(
              styles.buttonGroup,
              isEditForm ? styles.editChildButtons : styles.addChildButtons
            )}
          >
            {isEditForm && (
              <Button
                variant="secondary"
                className={styles.cancelButton}
                onClick={onCancel}
              >
                {t('common.modal.cancel.text')}
              </Button>
            )}
            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {t(
                isEditForm
                  ? 'common.modal.save.text'
                  : 'child.form.modal.add.label'
              )}
            </Button>
          </div>
          {isEditForm && (
            <Button
              variant="secondary"
              className={styles.deleteChild}
              onClick={onDelete}
            >
              {t('profile.child.detail.delete.text')}
            </Button>
          )}
        </form>
      )}
    </Formik>
  );
};

export default ChildForm;
