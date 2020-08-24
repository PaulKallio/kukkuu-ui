import React, { ComponentType, ReactEventHandler } from 'react';

import useField from './useField';

export type InputProps = {
  name: string;
  id: string;
  value: string;
  invalid?: boolean;
  helperText?: string;
  labelText: string;
  required?: boolean;
  onChange?: ReactEventHandler<HTMLInputElement>;
  onBlur?: ReactEventHandler<HTMLInputElement>;
  onFocus?: ReactEventHandler<HTMLInputElement>;
};

type Props = {
  name: string;
  id: string;
  helperText?: string;
  labelText: string;
  required?: boolean;
  component: ComponentType<InputProps>;
};

function TextAreaWithFormik({
  name,
  id,
  component: Component,
  helperText,
  labelText,
  required,
}: Props) {
  // eslint-disable-next-line react/destructuring-assignment
  const [field, , , error] = useField(name);

  return (
    <Component
      {...field}
      id={id}
      invalid={Boolean(error)}
      // eslint-disable-next-line react/destructuring-assignment
      helperText={error || helperText}
      labelText={labelText}
      required={required}
    />
  );
}

export default TextAreaWithFormik;
