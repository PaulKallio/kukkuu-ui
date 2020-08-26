import React from 'react';
import { Button as HdsButton, ButtonProps } from 'hds-react';

const kukkuuSecondaryButtonStyles = {
  '--background-color': 'var(--color-white)',
  '--background-color-hover': 'var(--color-white)',
  '--background-color-focus': 'var(--color-white)',
  '--background-color-hover-focus': 'var(--color-white)',
};
const kukkuuSupplementaryButtonStyles = {
  '--background-color': 'transparent',
  '--background-color-hover': 'transparent',
  '--background-color-focus': 'transparent',
  '--background-color-hover-focus': 'transparent',
  '--border-color': 'none',
};

const kukkuuButtonStyles = {
  '--color': 'var(--color-black)',
  '--color-hover': 'var(--color-black)',
  '--color-focus': 'var(--color-black-90)',
  '--color-hover-focus': 'var(--color-black-90)',
  '--background-color': 'var(--color-summer)',
  '--background-color-hover': 'var(--color-summer-dark-50)',
  '--background-color-focus': 'var(--color-summer)',
  '--background-color-hover-focus': 'var(--color-summer-dark-50)',
  '--background-selected': 'var(--color-summer)',
  '--border-color': 'var(--color-summer)',
  '--border-color-hover': 'var(--color-summer-dark-50)',
  '--border-color-focus': 'var(--color-summer-dark-50)',
  '--border-color-hover-focus': 'var(--color-summer-dark-50)',
  '--border-color-selected': 'var(--color-summer)',
  '--border-color-selected-hover': 'var(--color-summer-dark-50)',
  '--border-color-selected-focus': 'var(--color-summer)',
  '--border-color-selected-hover-focus': 'var(--color-summer)',
} as React.CSSProperties;

const Button = ({
  style = kukkuuButtonStyles,
  className,
  variant,
  children,
  ...rest
}: ButtonProps) => {
  switch (variant) {
    case 'secondary':
      style = {
        ...kukkuuButtonStyles,
        ...kukkuuSecondaryButtonStyles,
      };
      break;
    case 'supplementary':
      style = {
        ...kukkuuButtonStyles,
        ...kukkuuSupplementaryButtonStyles,
      };
      break;
    default:
  }

  return (
    <HdsButton
      className={className}
      style={style}
      children={children}
      {...rest}
    ></HdsButton>
  );
};

export default Button;
