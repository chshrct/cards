import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import s from './SuperButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary';
  shape?: 'round' | 'square';
};

export const SuperButton: FC<SuperButtonPropsType> = ({
  className,
  size,
  color,
  shape,
  ...restProps
}) => {
  let sizeClassName = s.sizeSmall;
  if (size === 'medium') sizeClassName = s.sizeMedium;
  if (size === 'large') sizeClassName = s.sizeLarge;
  let colorClassName = s.colorPrimary;
  if (color === 'secondary') colorClassName = s.colorSecondary;
  let shapeClassName = s.shapeRound;
  if (shape === 'square') shapeClassName = s.shapeSquare;
  const finalClassName = `${s.button} ${sizeClassName} ${colorClassName} ${shapeClassName} ${className}`;
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <button type="button" className={finalClassName} {...restProps} />;
};
