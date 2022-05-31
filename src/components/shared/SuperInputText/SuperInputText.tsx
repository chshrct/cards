import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
} from 'react';

import s from './SuperInputText.module.css';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

type SuperInputTextPropsType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;
};

export const SuperInputText: FC<SuperInputTextPropsType> = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  type,
  onChange,
  onChangeText,
  onKeyPress,
  onEnter,
  error,
  className,
  spanClassName,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e);

    onChangeText?.(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>): void => {
    onKeyPress?.(e);

    if (onEnter && e.key === 'Enter') onEnter();
  };

  const finalSpanClassName = `${s.error} ${spanClassName || ''}`;
  const finalInputClassName = `${
    error ? `${s.superInput} ${s.errorInput}` : s.superInput
  } ${className}`;

  return (
    <>
      <input
        type="text"
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
      <span className={finalSpanClassName}>{error}</span>
    </>
  );
};
