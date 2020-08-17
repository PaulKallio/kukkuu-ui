import { ReactNode } from 'react';
import { FormikProps } from 'formik';
import { get } from 'lodash';

export function getIsInvalid<FormValues>(
  formikProps: FormikProps<FormValues>,
  fieldName: string
) {
  const isSubmitted = formikProps.submitCount > 0;
  const isError = Boolean(get(formikProps.errors, fieldName));

  return isSubmitted && isError;
}

const defaultErrorRender = (error: string) => error;

export function getError<FormValues>(
  formikProps: FormikProps<FormValues>,
  fieldName: string,
  render: (error: string) => ReactNode = defaultErrorRender
) {
  const errorMessage = get(formikProps.errors, fieldName);

  if (
    getIsInvalid(formikProps, fieldName) &&
    typeof errorMessage === 'string'
  ) {
    return render(errorMessage);
  }

  return undefined;
}
