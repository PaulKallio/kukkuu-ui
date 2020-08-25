import React, { ReactNode } from 'react';
import { Dropdown, DropdownProps as HDSDropdownProps } from 'hds-react';
import { useField } from 'formik';
import { useTranslation } from 'react-i18next';

import styles from './formikInputs.module.scss';

type SimulatedEvent = {
  target: {
    name: string;
    value: string;
  };
};

type DropdownProps = Pick<
  HDSDropdownProps,
  'className' | 'disabled' | 'required' | 'style' | 'invalid'
> & {
  name: string;
  id: string;
  onChange?: (e: SimulatedEvent) => void;
  value?: string;
  helperText?: string | ReactNode;
  labelText?: string | ReactNode;
  options: Array<{ label: string; value: string }>;
};

type Props = {
  name: string;
  default?: string;
  isSubmitting?: boolean;
  placeholder?: string;
  label?: string;
  helper?: string;
} & DropdownProps;

function FormikDropdown({
  name,
  id,
  onChange = () => ({}),
  value,
  helperText,
  labelText,
  options,
  ...rest
}: Props) {
  const { t } = useTranslation();
  const [field, meta, helpers] = useField(name);

  const handleChange = (selectedItem: any) => {
    helpers.setValue(selectedItem.value);
  };
  const defaultValue = options.find((option) => option.value === value);

  return (
    <Dropdown
      {...field}
      className={styles.formField}
      defaultValue={defaultValue}
      options={options}
      onChange={handleChange}
      invalid={Boolean(meta.error)}
      helper={Boolean(meta.error) && t(meta.error || '')}
      multiselect={false}
      {...rest}
    />
  );
}

export default FormikDropdown;
