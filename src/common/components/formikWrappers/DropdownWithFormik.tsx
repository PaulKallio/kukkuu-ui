import React, { ComponentType, ReactNode } from 'react';
import { Dropdown, DropdownProps as HDSDropdownProps } from 'hds-react';
import { Field, FieldProps } from 'formik';

import useField from './useField';

type SimulatedEvent = {
  target: {
    name: string;
    value: string;
  };
};

export type DropdownProps = Pick<
  HDSDropdownProps,
  'className' | 'disabled' | 'required' | 'style' | 'invalid'
> & {
  name: string;
  id: string;
  onChange: (e: SimulatedEvent) => void;
  value: string;
  helperText?: string | ReactNode;
  labelText?: string | ReactNode;
  options: Array<{ label: string; value: string }>;
};

type Props = Omit<DropdownProps, 'value' | 'onChange'> & {
  component: ComponentType<DropdownProps>;
};

export type OptionType = {
  value: string;
  label: string;
};

export type HdsOptionType = {
  //eslint-disable-next-line
  [key: string]: any;
};

const FormikDropdown = ({
  component: Component,
  name,
  helperText,
  ...rest
}: Props) => {
  const [field, , , error] = useField(name);

  return (
    <Component
      {...field}
      invalid={Boolean(error)}
      helperText={error || helperText}
      {...rest}
    />
  );
};

export default FormikDropdown;
