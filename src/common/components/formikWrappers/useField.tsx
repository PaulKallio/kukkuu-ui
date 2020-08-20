import {
  useField as useFieldBase,
  FieldHookConfig,
  FieldInputProps,
  FieldMetaProps,
  FieldHelperProps,
} from 'formik';
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function useField<Val = any>(
  propsOrFieldName: string | FieldHookConfig<Val>
): [FieldInputProps<Val>, FieldMetaProps<Val>, FieldHelperProps<Val>, string?] {
  const [t] = useTranslation();
  const [field, meta, helpers] = useFieldBase(propsOrFieldName);
  const valueWithoutNull = field.value === null ? '' : field.value;
  const fieldWithoutNullValue = {
    ...field,
    value: valueWithoutNull,
  };
  const showError = meta.touched && meta.error;
  const error = showError ? t(meta.error || '') : undefined;

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return [fieldWithoutNullValue, meta, helpers, error];
}

export default useField;
