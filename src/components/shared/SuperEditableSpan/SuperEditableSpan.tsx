import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  HTMLAttributes,
  useState,
  FC,
} from 'react';

import s from './SuperEditableSpan.module.css';

import { SuperInputText } from 'components';

type DefaultInputPropsType = DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;
type DefaultSpanPropsType = DetailedHTMLProps<
  HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>;
type SuperEditableSpanType = DefaultInputPropsType & {
  onChangeText?: (value: string) => void;
  onEnter?: () => void;
  error?: string;
  spanClassName?: string;

  spanProps?: DefaultSpanPropsType;
};

export const SuperEditableSpan: FC<SuperEditableSpanType> = ({
  onBlur,
  onEnter,
  spanProps,

  ...restProps
}) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const { children, onDoubleClick, className, ...restSpanProps } = spanProps || {};

  const onEnterCallback = (): void => {
    setEditMode(false);
    onEnter?.();
  };
  const onBlurCallback = (e: React.FocusEvent<HTMLInputElement>): void => {
    setEditMode(false);
    onBlur?.(e);
  };
  const onDoubleClickCallBack = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ): void => {
    setEditMode(true);
    onDoubleClick?.(e);
  };

  const spanClassName = `${s.spanStyle} ${className}`;

  if (editMode)
    return (
      <SuperInputText
        autoFocus
        onBlur={onBlurCallback}
        onEnter={onEnterCallback}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...restProps}
      />
    );

  return (
    <span
      onDoubleClick={onDoubleClickCallBack}
      className={spanClassName}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...restSpanProps}
    >
      {children || restProps.value}
    </span>
  );
};
