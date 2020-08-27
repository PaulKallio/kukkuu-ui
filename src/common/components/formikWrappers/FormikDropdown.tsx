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
    <div
      // unknown to work around typing error:
      // Argument of type 'EventTarget | null' is not assignable to parameter of type 'Node | null'.
      // Type 'EventTarget' is missing the following properties from type 'Node': baseURI, (...) and 44 more.
      onBlur={(e: unknown) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (e && !e.currentTarget.contains(e.relatedTarget)) {
          // The check above equals 'focusleave'
          helpers.setTouched(true);
        }
      }}
    >
      <Dropdown
        {...field}
        className={styles.formField}
        defaultValue={defaultValue}
        options={options}
        onChange={handleChange}
        invalid={meta.touched && Boolean(meta.error)}
        helper={meta.touched && Boolean(meta.error) && t(meta.error || '')}
        multiselect={false}
        {...rest}
      />
    </div>
  );
}

export default FormikDropdown;
