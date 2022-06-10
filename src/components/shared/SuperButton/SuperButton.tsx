import { ButtonHTMLAttributes, DetailedHTMLProps, FC } from 'react';

import { ReactComponent as ButtonLoader } from '../../../assets/loaders/button-loader.svg';

import s from './SuperButton.module.css';

type DefaultButtonPropsType = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

type SuperButtonPropsType = DefaultButtonPropsType & {
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'secondary' | 'alerty';
  shape?: 'round' | 'square';
  isLoading?: boolean;
};

export const SuperButton: FC<SuperButtonPropsType> = ({
  className,
  size,
  color,
  shape,
  isLoading,
  disabled,
  children,
  ...restProps
}) => {
  let sizeClassName = s.sizeSmall;
  if (size === 'medium') sizeClassName = s.sizeMedium;
  if (size === 'large') sizeClassName = s.sizeLarge;
  let colorClassName = s.colorPrimary;
  if (color === 'secondary') colorClassName = s.colorSecondary;
  if (color === 'alerty') colorClassName = s.colorAlerty;
  let shapeClassName = s.shapeRound;
  if (shape === 'square') shapeClassName = s.shapeSquare;
  const finalClassName = `${s.button} ${sizeClassName} ${colorClassName} ${shapeClassName} ${className}`;
  return (
    <button
      type="button"
      className={finalClassName}
      disabled={isLoading ? true : disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    >
      {isLoading ? (
        <>
          <span style={{ opacity: 0 }}>{children}</span>
          <ButtonLoader height={50} width={50} className={s.buttonLoader} />
        </>
      ) : (
        children
      )}
    </button>
  );
};
