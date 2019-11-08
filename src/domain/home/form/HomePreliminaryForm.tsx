import React, { FunctionComponent } from 'react';
import { Formik, Field, FieldArray, FormikErrors } from 'formik';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';

import authenticate from '../../auth/authenticate';
import styles from './homePreliminaryForm.module.scss';
import Button from '../../../common/components/button/Button';
import InputField from '../../../common/components/form/fields/input/InputField';
import {
  validateEqual,
  validateRequire,
  validateBirthday,
} from '../../../common/components/form/validationUtils';
import BirthdayFormField from './partial/BirthdayFormField';
import { setFormValues } from '../../registration/state/RegistrationActions';
import { RegistrationFormValues } from '../../registration/types/RegistrationTypes';
import { defaultRegistrationData } from '../../registration/state/RegistrationReducers';
import { StoreState } from '../../app/types/AppTypes';
import { HomeFormValues } from './types/HomeFormTypes';
import { convertFormValues } from './HomePreliminaryFormUtils';

interface Props {
  setFormValues: (values: RegistrationFormValues) => void;
  stateFormValues: RegistrationFormValues;
}

const HomePreliminaryForm: FunctionComponent<Props> = ({
  setFormValues,
  stateFormValues,
}) => {
  const { t } = useTranslation();

  const handleSubmit = (values: HomeFormValues) => {
    const defaultFormValues = defaultRegistrationData.formValues;
    const payload = Object.assign({}, defaultFormValues, {
      child: {
        birthday: `${values.child.birthday.day}.${values.child.birthday.month}.${values.child.birthday.year}`,
        homeCity: values.child.homeCity,
      },
      verifyInformation: values.verifyInformation,
    });

    setFormValues(payload);
    authenticate();
  };

  const validate = (values: HomeFormValues) => {
    const {
      child: {
        birthday: { day, month, year },
      },
    } = values;
    const errors: FormikErrors<HomeFormValues> = {};

    if (day && month && year) {
      errors.childBirthday = validateBirthday(`${day}.${month}.${year}`, t);

      if (!errors.childBirthday) {
        // Delete the property manually so form will be valid when this is undefined.
        delete errors.childBirthday;
      }
    }
    return errors;
  };
  return (
    <div className={styles.homeForm}>
      <Formik
        initialValues={convertFormValues(stateFormValues)}
        onSubmit={handleSubmit}
        validate={validate}
      >
        {({ values, handleChange, handleSubmit, isSubmitting, isValid }) => (
          <form onSubmit={handleSubmit}>
            <div className={styles.inputWrapper}>
              <FieldArray
                name="child.birthday"
                render={props => <BirthdayFormField {...props} />}
              />

              <Field
                className={styles.childHomeCity}
                type="text"
                name="child.homeCity"
                label={t('homePage.preliminaryForm.childHomeCity.input.label')}
                onChange={handleChange}
                value={values.child.homeCity}
                component={InputField}
                placeholder={t(
                  'homePage.preliminaryForm.childHomeCity.input.placeholder'
                )}
                validate={(value: string | number) =>
                  validateEqual(
                    value,
                    t('homePage.preliminaryForm.childHomeCity.supportCity'),
                    t('validation.general.unSupportedCity'),
                    t
                  )
                }
              />
            </div>

            <Field
              className={styles.verifyInformationCheckbox}
              type="checkbox"
              label={t(
                'homePage.preliminaryForm.verifyInformation.checkbox.label'
              )}
              name="verifyInformation"
              onChange={handleChange}
              value={values.verifyInformation}
              checked={values.verifyInformation}
              component={InputField}
              validate={(value: boolean) =>
                validateRequire(
                  value,
                  t,
                  t(
                    'homePage.preliminaryForm.verifyInformation.checkbox.required.label'
                  )
                )
              }
            />

            <Button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting || !isValid}
            >
              {t('homePage.hero.buttonText')}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};

const actions = {
  setFormValues,
};

const mapStateToProps = (state: StoreState) => ({
  stateFormValues: state.registration.formValues,
});

export const UnconnectedHomePreliminaryForm = HomePreliminaryForm;

export default connect(
  mapStateToProps,
  actions
)(HomePreliminaryForm);
