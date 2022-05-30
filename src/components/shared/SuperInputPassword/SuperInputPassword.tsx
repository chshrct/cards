import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  InputHTMLAttributes,
  KeyboardEvent,
  useState,
} from 'react';

import s from './SuperInputPassword.module.css';

import { ReactComponent as EyeSlashIcon } from 'assets/icons/eye-slash.svg';
import { ReactComponent as EyeIcon } from 'assets/icons/eye.svg';

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

const SuperInputText: FC<SuperInputTextPropsType> = ({
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
  const [inputType, setInputType] = useState<string>('password');
  const passwordVisibleToggler = (): void => {
    setInputType(inputType === 'text' ? 'password' : 'text');
  };
  const onChangeCallback = (e: ChangeEvent<HTMLInputElement>): void => {
    if (onChange) onChange(e);

    if (onChangeText) onChangeText(e.currentTarget.value);
  };
  const onKeyPressCallback = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (onKeyPress) onKeyPress(e);

    if (onEnter && e.key === 'Enter') onEnter();
  };

  const finalSpanClassName = `${s.error} ${spanClassName || ''}`;
  const finalInputClassName = `${
    error ? `${s.superInput} ${s.errorInput}` : s.superInput
  } ${className}`;
  return (
    <>
      <div className={s.superInputWrapper}>
        <input
          type={inputType}
          onChange={onChangeCallback}
          onKeyPress={onKeyPressCallback}
          className={finalInputClassName}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...restProps}
        />
        {inputType === 'password' ? (
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
        )}
      </div>
      <span className={finalSpanClassName}>{error}</span>
    </>
  );
};

export default SuperInputText;
