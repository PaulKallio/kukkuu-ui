import React, { FunctionComponent, ReactNode } from 'react';
import joinClassNames from 'classnames';

import styles from './button.module.scss';

type ReactButton = React.ButtonHTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends ReactButton {
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}
// TODO: Delete me when HDS buttons can be added without superficial whitespace
const Button: FunctionComponent<ButtonProps> = ({
  children,
  className,
  ariaLabel,
  ...rest
}) => {
  return (
    <div className={joinClassNames(className, styles.buttonWrapper)}>
      <button type="button" aria-label={ariaLabel} {...rest}>
        {children}
      </button>
    </div>
  );
};

export default Button;
