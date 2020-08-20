import * as React from 'react';
import { Formik, FormikProps, FormikErrors, Field, getIn } from 'formik';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@apollo/react-hooks';
import { toast } from 'react-toastify';
import * as Sentry from '@sentry/browser';
import { useMatomo } from '@datapunt/matomo-tracker-react';
import { TextInput } from 'hds-react';
import * as yup from 'yup';

import styles from './editProfileModal.module.scss';
import { ProfileType } from '../type/ProfileTypes';
import { Guardian } from '../../guardian/types/GuardianTypes';
import Modal from '../../../common/components/modal/Modal';
import { SUPPORT_LANGUAGES } from '../../../common/translation/TranslationConstants';
import profileQuery from '../queries/ProfileQuery';
import updateMyProfileMutation from '../mutations/updateMyProfileMutation';
import { updateMyProfile as UpdateMyProfileData } from '../../api/generatedTypes/updateMyProfile';
import adultIcon from '../../../assets/icons/svg/adultFaceHappy.svg';
import NavigationConfirm from '../../../common/components/confirm/NavigationConfirm';
import FormikDropdown, {
  HdsOptionType,
} from '../../../common/components/formikWrappers/FormikDropdown';
import {
  getIsInvalid,
  getError,
} from '../../../common/components/form/formikHelper';
import Button from '../../../common/components/button/Button';

export type EditProfileModalValues = Omit<ProfileType, 'children'>;

const schema = yup.object().shape({
  firstName: yup
    .string()
    .required('validation.general.required')
    .max(255, 'validation.maxLength'),
  lastName: yup
    .string()
    .required('validation.general.required')
    .max(255, 'validation.maxLength'),
  email: yup
    .string()
    .email('registration.form.guardian.email.input.error')
    .required('validation.general.required'),
  phoneNumber: yup
    .string()
    .required('validation.general.required')
    .max(255, 'validation.maxLength'),
  language: yup.string().max(255, 'validation.maxLength'),
});

interface EditProfileModalProps {
  initialValues: ProfileType;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const EditProfileModal: React.FunctionComponent<EditProfileModalProps> = ({
  initialValues,
  isOpen,
  setIsOpen,
}) => {
  const { trackEvent } = useMatomo();

  const [isFilling, setFormIsFilling] = React.useState(false);
  const [updateMyProfile] = useMutation<UpdateMyProfileData>(
    updateMyProfileMutation,
    {
      refetchQueries: [{ query: profileQuery }],
    }
  );

  const onSubmit = async (payload: Guardian) => {
    setFormIsFilling(false);
    try {
      await updateMyProfile({
        variables: {
          input: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            phoneNumber: payload.phoneNumber,
            language: payload.language,
            email: payload.email,
          },
        },
      });
      trackEvent({ category: 'action', action: 'Edit profile' });
      setIsOpen(false);
    } catch (error) {
      toast.error(t('registration.submitMutation.errorMessage'));
      Sentry.captureException(error);
    }
  };

  const validate = () => {
    if (!isFilling) {
      setFormIsFilling(true);
    }

    const errors: FormikErrors<EditProfileModalValues> = {};
    return errors;
  };

  const { t } = useTranslation();

  return (
    <div>
      {isOpen && (
        <NavigationConfirm
          warningMessage={t('common.form.leave.warning.text')}
          isHalfFilling={isFilling}
        />
      )}
      <Modal
        setFormIsFilling={setFormIsFilling}
        label={t('registration.form.guardian.info.heading')}
        isOpen={isOpen}
        icon={adultIcon}
        toggleModal={(value: boolean) => {
          setIsOpen(value);
        }}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validate={validate}
          validationSchema={schema}
        >
          {({
            isSubmitting,
            handleSubmit,
            setFieldValue,
            validateField,
            errors,
            touched,
          }: FormikProps<EditProfileModalValues>) => (
            <form onSubmit={handleSubmit} id="editProfileForm">
              <Field
                as={TextInput}
                className={styles.formField}
                id="email"
                name="email"
                required={true}
                label={t('registration.form.guardian.email.input.label')}
                placeholder={t(
                  'registration.form.guardian.email.input.placeholder'
                )}
                invalid={getIn(touched, 'email') && getIn(errors, 'email')}
                helperText={
                  getIn(touched, 'email') && t(getIn(errors, 'email'))
                }
              />
              <Field
                as={TextInput}
                className={styles.formField}
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                minLength="6"
                maxLength="255"
                required={true}
                label={t('registration.form.guardian.phoneNumber.input.label')}
                placeholder={t(
                  'registration.form.guardian.phoneNumber.input.placeholder'
                )}
                invalid={
                  getIn(touched, 'phoneNumber') && getIn(errors, 'phoneNumber')
                }
                helperText={
                  getIn(touched, 'phoneNumber') &&
                  t(getIn(errors, 'phoneNumber'))
                }
              />
              <div className={styles.profileName}>
                <Field
                  as={TextInput}
                  className={styles.formField}
                  type="text"
                  required={true}
                  id="firstName"
                  name="firstName"
                  label={t('registration.form.guardian.firstName.input.label')}
                  placeholder={t(
                    'registration.form.guardian.firstName.input.placeholder'
                  )}
                  invalid={
                    getIn(touched, 'firstName') && getIn(errors, 'firstName')
                  }
                  helperText={
                    getIn(touched, 'firstName') && t(getIn(errors, 'firstName'))
                  }
                />
                <Field
                  as={TextInput}
                  className={styles.formField}
                  type="text"
                  required={true}
                  id="lastName"
                  name="lastName"
                  label={t('registration.form.guardian.lastName.input.label')}
                  placeholder={t(
                    'registration.form.guardian.lastName.input.placeholder'
                  )}
                  invalid={
                    getIn(touched, 'lastName') && getIn(errors, 'lastName')
                  }
                  helperText={
                    getIn(touched, 'lastName') && t(getIn(errors, 'lastName'))
                  }
                />
              </div>
              <FormikDropdown
                className={styles.formField}
                id="language"
                name="language"
                label={t('registration.form.guardian.language.input.label')}
                required={true}
                options={[
                  {
                    label: t('common.language.en'),
                    value: SUPPORT_LANGUAGES.EN.toUpperCase(),
                  },
                  {
                    label: t('common.language.fi'),
                    value: SUPPORT_LANGUAGES.FI.toUpperCase(),
                  },
                  {
                    label: t('common.language.sv'),
                    value: SUPPORT_LANGUAGES.SV.toUpperCase(),
                  },
                ]}
                default={initialValues.language}
                onChange={(option: HdsOptionType) =>
                  setFieldValue('language', option.value)
                }
                placeholder={t(
                  'registration.form.guardian.language.input.placeholder'
                )}
              />
              <div className={styles.buttonsWrapper}>
                <Button
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  variant="secondary"
                  type="button"
                  className={styles.cancelButton}
                >
                  {t('common.modal.cancel.text')}
                </Button>

                <Button
                  type="submit"
                  className={styles.submitButton}
                  disabled={isSubmitting}
                >
                  {t('common.modal.save.text')}
                </Button>
              </div>
            </form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default EditProfileModal;
