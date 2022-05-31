import React, { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import s from './SuperButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  red?: boolean;
};

export const SuperButton: FC<SuperButtonPropsType> = ({
  red,
  className,
  ...restProps
}) => {
  const finalClassName = `${red ? `${s.button} ${s.red}` : s.button} ${className}`;

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <button type="button" className={finalClassName} {...restProps} />;
};
