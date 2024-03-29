/* eslint-disable react/jsx-props-no-spreading */
import React, {
  ChangeEvent,
  DetailedHTMLProps,
  FC,
  TextareaHTMLAttributes,
  useId,
} from 'react';

import s from './SuperTextarea.module.css';

type DefaultTextareaPropsType = DetailedHTMLProps<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  HTMLTextAreaElement
>;

type PropsType = DefaultTextareaPropsType & {
  label: string;
  onEnter?: () => void;
};

export const SuperTextarea: FC<PropsType> = ({
  label,
  placeholder,
  onChange,
  ...restProps
}) => {
  const id = useId();

  const onChangeCallback = (e: ChangeEvent<HTMLTextAreaElement>): void => {
    onChange?.(e);
  };
  const containerStyle = restProps.value
    ? `${s.container} ${s.containerValue}`
    : s.container;

  return (
    <div className={placeholder ? s.containerPlace : containerStyle}>
      <textarea
        required
        id={id}
        placeholder={placeholder}
        onChange={onChangeCallback}
        {...restProps}
      />
      {!placeholder && <label htmlFor={id}>{label || ''}</label>}
    </div>
  );
};
