import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import s from './SuperRange.module.css';

import { EMPTY_STRING } from 'constant';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperRangePropsType = DefaultInputPropsType & {
  onChangeRange?: (value: number) => void;
};

export const SuperRange: FC<SuperRangePropsType> = ({
  onChange,
  onChangeRange,
  className,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e);

    onChangeRange?.(+e.currentTarget.value);
  };

  const finalRangeClassName = `${s.range} ${className || EMPTY_STRING}`;

  return (
    <input
      title="SuperRange"
      type="range"
      onChange={onChangeCallback}
      className={finalRangeClassName}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restProps}
    />
  );
};
