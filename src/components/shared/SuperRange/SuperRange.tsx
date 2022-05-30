import React, { ChangeEvent, DetailedHTMLProps, FC, InputHTMLAttributes } from 'react';

import s from './SuperRange.module.css';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperRangePropsType = DefaultInputPropsType & {
  onChangeRange?: (value: number) => void;
};

const SuperRange: FC<SuperRangePropsType> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  onChange,
  onChangeRange,
  className,

  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e);

    onChangeRange?.(+e.currentTarget.value);
  };

  const finalRangeClassName = `${s.range} ${className || ''}`;

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

export default SuperRange;
