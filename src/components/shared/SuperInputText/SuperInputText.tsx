import React, {
  FC,
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';

import s from './SuperInputText.module.css';

import { ReactComponent as EyeSlashIcon } from 'assets/icons/eye-slash.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';
import { EMPTY_STRING } from 'constant';

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
  const [inputType, setInputType] = useState<string>('password');
  const passwordVisibleToggler = (): void => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };

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

  const finalSpanClassName: string = `${s.spanStyle} ${s.error} ${
    spanClassName || EMPTY_STRING
  }`;
  const finalInputClassName: string = `${
    error ? `${inputClassName} ${s.errorInput}` : inputClassName
  } ${className}`;

  let eye = null;
  if (type === 'password')
    eye =
      inputType === 'password' ? (
        <EyeIcon
          onClick={passwordVisibleToggler}
          className={s.eyeIcon}
          height={25}
          width={25}
          fill={error && 'red'}
        />
      ) : (
        <EyeSlashIcon
          onClick={passwordVisibleToggler}
          className={s.eyeIcon}
          height={25}
          width={25}
          fill={error && 'red'}
        />
      );

  return (
    <div className={s.superInputWrapper}>
      <input
        type={type === 'password' ? inputType : 'text'}
        onChange={onChangeCallback}
        onKeyPress={onKeyPressCallback}
        className={finalInputClassName}
        id={id}
        required
        disabled={disabled}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
      {label && (
        <label className={error && s.redLabel} htmlFor={id}>
          {label}
        </label>
      )}
      <span className={finalSpanClassName}>{error}</span>
      {eye}
    </div>
  );
};
