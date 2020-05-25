import React, { FunctionComponent } from 'react';
import { FieldProps, getIn } from 'formik';
import { useTranslation } from 'react-i18next';

import Select, { SelectProps } from '../../../select/Select';
import styles from './select.module.scss';

const SelectField: FunctionComponent<SelectProps & FieldProps> = ({
  field: { name, value, onChange, onBlur },
  form: { errors, touched },
  ...rest
}) => {
  const error = getIn(errors, name);
  const touch = getIn(touched, name);
  const inputError = touch && error ? error : null;

  const { t } = useTranslation();

  return (
    <div className={styles.selectFieldWrapper}>
      <Select
        {...rest}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      <div className={styles.selectError}>{t(inputError)}</div>
    </div>
  );
};

export default SelectField;
