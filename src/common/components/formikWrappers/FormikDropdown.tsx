import React, { ReactNode, useState } from 'react';
import { Dropdown, DropdownProps as HDSDropdownProps } from 'hds-react';
import { Field, FieldProps, useField } from 'formik';
import { useTranslation } from 'react-i18next';

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

export type OptionType = {
  value: string;
  label: string;
};

export type HdsOptionType = {
  //eslint-disable-next-line
  [key: string]: any;
};

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
  const [isInvalid, setIsInvalid] = useState(false); // Lol where do we call this

  const handleChange = (selectedItem: any) => {
    console.log(selectedItem);
    helpers.setValue(selectedItem.value);
  };
  const defaultValue = options.find((option) => option.value === value);

  return (
    <Field name={name}>
      {(fieldProps: FieldProps<string>) => (
        <Dropdown
          {...field}
          defaultValue={defaultValue}
          options={options}
          onChange={handleChange}
          invalid={isInvalid}
          helper={isInvalid && t(meta.error || '')}
          multiselect={false}
          {...rest}
        />
      )}
    </Field>
  );
}

export default FormikDropdown;
