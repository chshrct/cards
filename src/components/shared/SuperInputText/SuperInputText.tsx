import React, {
  FC,
  ChangeEvent,
  DetailedHTMLProps,
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
  label?: string;
  id?: string;
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
  label,
  id,
  disabled,
  ...restProps
}) => {
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    onChange?.(e);

    onChangeText?.(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>): void => {
    onKeyPress?.(e);

    if (onEnter && e.key === 'Enter') {
      onEnter();
    }
  };
  const inputClassName = `${s.superInput}
     ${disabled ? `${s.superInput} ${s.disabledInput}` : s.superInput} `;

  const finalSpanClassName: string = `${s.error} ${spanClassName || ''}`;
  const finalInputClassName: string = `${
    error ? `${inputClassName} ${s.errorInput}` : inputClassName
  } ${className}`;

  return (
    <div className={s.superInputWrapper}>
      <input
        type="text"
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        id={id}
        required
        disabled={disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
      {label && <label htmlFor={id}>{label}</label>}
      <span className={finalSpanClassName}>{error}</span>
    </div>
  );
};
